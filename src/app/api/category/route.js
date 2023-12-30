import { NextResponse } from "next/server";
import { conn, connectDB } from "@/libs/mongodb";
import getCategories from "@/libs/getCategories";
import getCategoriesById from "@/libs/getCategoryById";
import createCategory from "@/libs/createCategory";
import deleteCategory from "@/libs/deleteCategory";
import updateCategory from "@/libs/updateCategory";
import next from "next";

export default async function handler(request, { query, paramas }) {
    try {
        const { method } = request;
        const id = paramas.id;

        if(!conn.isConnected) connectDB();

        switch(method) {
            case 'GET':
                if(id){
                    const queryCategory = await getCategoriesById({ query: { id } });
                    return NextResponse.json({ queryCategory}, { status:200 });

                }else{

                    const categories = await getCategories(request);
                    return NextResponse.json({ categories }, { status: 200 });
                }

            case 'POST':
                const newCategory = await createCategory(request);
                return NextResponse.json({ newCategory }, { status: 201 });

            case 'PUT':
                const updateCategory = await updateCategory({ query: { id }, ...request });
                return NextResponse.json({ updateCategory }, {status: 200});

            case 'DELETE':
                const deletedCategory = await deleteCategory({query : { id }});
                return NextResponse.json({}, { status: 204 });

            default:
                return NextResponse.json({ error: `Method ${method} not allowed`}, { status: 405})
        }
    } catch (error) {
        return NextResponse.json(error.message, { status: 500 });
    }
}