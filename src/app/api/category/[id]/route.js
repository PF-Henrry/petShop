import { NextResponse } from "next/server";
import { connectDB, conn } from "@/libs/mongodb";
import category from "@/models/category";

export async function GET(request, {params}) {
    try {
        const id = params.id;

        if(!conn.isConnected) connectDB();

        const queryCategory = await category.findById(id);

        if(!queryCategory) throw TypeError('Category not found');
        return new NextResponse.json({ queryCategory }, { status: 200});
    } catch (error) {
        return NextResponse.json(error.message, { status: 404 });
    }
};