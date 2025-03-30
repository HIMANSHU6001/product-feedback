import { NextRequest, NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI || ""; // Add your MongoDB Atlas connection string to .env
const client = new MongoClient(uri);

async function connectToDatabase() {
  //@ts-expect-error No inbuilt types defined
  if (!client.isConnected) {
    await client.connect();
  }
  return client.db("product-feedback"); // Replace with your database name
}

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.pathname.split("/").pop(); // Extract the product ID from the URL
    if (!id) {
      return new NextResponse(
        JSON.stringify({ message: "productId is required", success: false }),
        { status: 400 }
      );
    }

    const db = await connectToDatabase();
    const productsCollection = db.collection("products");

    // Fetch the product document by its ID
    const product = await productsCollection.findOne({ _id: new ObjectId(id) });

    if (!product) {
      return new NextResponse(
        JSON.stringify({ message: "product not found", success: false }),
        { status: 404 }
      );
    }

    return new NextResponse(JSON.stringify({ product, success: true }), {
      status: 200,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return new NextResponse(
      JSON.stringify({ error: errorMessage, success: false }),
      { status: 500 }
    );
  }
}
