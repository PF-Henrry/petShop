import { NextResponse } from "next/server";
import { conn, connectDB } from "@/libs/mongodb";
import Products from "@/models/products";
// obtener producto por id.

export async function GET(request, { params }) {
  try {
    const id = params.id;

    //asd

    if (!conn.isConnected) connectDB();

    const result = await Products.findOne({ _id: id, active: true })
      .populate("category", {
        _id: 0,
        name: 1,
      })
      .populate("species", {
        _id: 0,
        name: 1,
      })
      .populate("brand", {
        _id: 0,
        name: 1,
      });

    if (!result) throw new TypeError("Product not found");

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json(error.message, { status: 404 });
  }
}
