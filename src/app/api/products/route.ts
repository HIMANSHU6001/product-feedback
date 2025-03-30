import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || ""; // Add your MongoDB Atlas connection string to .env
const client = new MongoClient(uri);

let isConnected = false;

async function connectToDatabase() {
  if (!isConnected) {
    await client.connect();
    isConnected = true;
  }
  return client.db("product-feedback"); // Replace with your database name
}

export async function GET(req: NextRequest) {
  try {
    const db = await connectToDatabase();
    const productsCollection = db.collection("products");

    // Fetch all documents in the collection
    const products = await productsCollection.find({}).toArray();

    return new NextResponse(JSON.stringify({ products, success: true }), {
      status: 200,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return new NextResponse(
      JSON.stringify({ error: errorMessage, success: false }),
      {
        status: 500,
      }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); // Parse the request body
    const { productName, feedBacks } = body;

    // Validate required fields
    if (!productName) {
      return new NextResponse(
        JSON.stringify({ message: "Product name is required", success: false }),
        { status: 400 }
      );
    }

    // Create a new product document
    const productData = {
      productName,
      feedBacks: feedBacks || [], // Default to an empty array if no feedbacks are provided
    };

    const db = await connectToDatabase();
    const productsCollection = db.collection("products");
    const result = await productsCollection.insertOne(productData);

    return new NextResponse(
      JSON.stringify({
        message: "Product created successfully",
        productId: result.insertedId,
        success: true,
      }),
      { status: 201 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return new NextResponse(
      JSON.stringify({ error: errorMessage, success: false }),
      { status: 500 }
    );
  }
}