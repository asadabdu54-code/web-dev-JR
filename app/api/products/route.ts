import { NextResponse } from "next/server";

import { products } from "@/lib/data/products";
import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/models/Product";

export async function GET() {
  try {
    const connection = await connectToDatabase();

    if (!connection) {
      return NextResponse.json(products, { status: 200 });
    }

    const existingProducts = await Product.countDocuments();

    if (existingProducts === 0) {
      await Product.insertMany(
        products.map((product) => ({
          ...product,
          price: Number(product.price),
          oldPrice: product.oldPrice ? Number(product.oldPrice) : undefined,
          rating: Number(product.rating),
        })),
      );
    }

    const allProducts = await Product.find().sort({ featured: -1 }).lean();

    return NextResponse.json(
      allProducts.map((product) => ({
        ...product,
        _id: String(product._id),
        id: String(product.id || product._id),
        price: Number(product.price),
        oldPrice: product.oldPrice ? Number(product.oldPrice) : undefined,
      })),
      { status: 200 },
    );
  } catch (error) {
    console.error("Failed to fetch products", error);
    return NextResponse.json(products, { status: 200 });
  }
}
