import { NextResponse } from "next/server";
import { connectDB, conn } from "@/libs/mongodb";
import orderPaymet from "@/models/orderPaymet";
import { Types } from "mongoose";

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.search);
    const id = searchParams.get("id");

    if (!conn.isConnected) await connectDB();

    let query = {}; // La consulta por defecto para obtener todos los carritos

    if (id) {
      // Si hay un ID, ajusta la consulta para buscar por ese ID
      const userID = new Types.ObjectId(id);
      query = { userID: { _id: userID } };
    }

    const findCarts = await orderPaymet
      .find(query)
      .populate("items.product", {
        _id: 1,
        name: 1,
        price: 1,
        detail: 1,
        image: 1,
        stock: 1,
      })
      .populate("userID", {
        name: 1,
        lastname: 1,
        username: 1,
        email: 1,
        adress: 1,
        _id: 1,
      });

    if (!findCarts || findCarts.length === 0) {
      throw TypeError("No carts found");
    }

    return NextResponse.json(findCarts, { status: 200 });
  } catch (error) {
    return NextResponse.json(error.message, { status: 400 });
  }
}
