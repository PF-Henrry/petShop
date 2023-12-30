import { NextResponse } from "next/server";
import { conn, connectDB } from "@/libs/mongodb";
import getCategories from "@/libs/getCategories";
import getCategoriesById from "@/libs/getCategoryById";
import createCategory from "@/libs/createCategory";
import deleteCategory from "@/libs/deleteCategory";
import updateCategory from "@/libs/updateCategory";

export async function GET(request, { query, params }) {
    try {
      const { method } = request;
      const id = params? params.id: undefined;
  
      if (!conn.isConnected) connectDB();
  
      switch (method) {
        case 'GET':
          if (id) {
            const queryCategory = await getCategoriesById({ query: { id } });
            return NextResponse.json({ queryCategory }, { status: 200 });
  
          } else {
  
            const categories = await getCategories(request);
            return NextResponse.json({ categories }, { status: 200 });
          }
  
        default:
          return NextResponse.json({ error: `Method ${method} not allowed` }, { status: 405 });
      }
    } catch (error) {
      return NextResponse.json(error.message, { status: 500 });
    }
  }
  
  export async function POST(request) {
    try {
      const newCategory = await createCategory(request);
      return NextResponse.json({ newCategory }, { status: 201 });
    } catch (error) {
      return NextResponse.json(error.message, { status: 500 });
    }
  }
  
  export async function PUT(request, { params }) {
    try {
      const { id } = params;
      const putCategory = await updateCategory({ query: { id }, ...request });
      return NextResponse.json({ putCategory }, { status: 200 });
    } catch (error) {
      return NextResponse.json(error.message, { status: 500 });
    }
  }
  
  export async function DELETE(request, { params }) {
    try {
      const { id } = params;
      const deletCategory = await deleteCategory({ query: { id } });
      return NextResponse.json({}, { status: 204 });
    } catch (error) {
      return NextResponse.json(error.message, { status: 500 });
    }
  }