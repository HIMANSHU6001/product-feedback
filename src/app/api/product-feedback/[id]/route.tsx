import { NextRequest, NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI || ""; // Add your MongoDB Atlas connection string to .env
const client = new MongoClient(uri);

async function connectToDatabase() {
  //@ts-ignore
  if (!client.isConnected) {
    await client.connect();
  }
  return client.db("product-feedback"); // Replace with your database name
}

export async function POST(req: NextRequest) {
  try {
    const id = req.nextUrl.pathname.split("/").pop(); // Extract the product ID from the URL
    if (!id) {
      return new NextResponse(
        JSON.stringify({ message: "Product ID is required", success: false }),
        { status: 400 }
      );
    }

    const body = await req.json(); // Parse the request body
    const {
      rating,
      userType,
      occupation,
      state,
      favoriteFeature,
      productAppearanceRating,
      comments,
    } = body;

    // Validate required fields
    if (
      !rating ||
      !userType ||
      !occupation ||
      !state ||
      !favoriteFeature ||
      !productAppearanceRating ||
      !comments
    ) {
      return new NextResponse(
        JSON.stringify({
          message: "All feedback fields are required",
          success: false,
        }),
        { status: 400 }
      );
    }

    const db = await connectToDatabase();
    const productsCollection = db.collection("products");

    // Find the product by ID
    const product = await productsCollection.findOne({ _id: new ObjectId(id) });

    if (!product) {
      return new NextResponse(
        JSON.stringify({ message: "Product not found", success: false }),
        { status: 404 }
      );
    }

    // Update the feedbacks array in the product document
    const updatedFeedbacks = [
      ...(product.feedBacks || []), // Append to existing feedbacks
      {
        rating,
        userType,
        occupation,
        state,
        favoriteFeature,
        productAppearanceRating,
        comments,
      },
    ];

    await productsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { feedBacks: updatedFeedbacks } }
    );

    return new NextResponse(
      JSON.stringify({ message: "Feedback added successfully", success: true }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating feedback:", error);
    return new NextResponse(
      JSON.stringify({
        error:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
        success: false,
      }),
      { status: 500 }
    );
  }
}
