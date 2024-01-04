import { NextResponse } from 'next/server';
import createCategory from '@/libs/createCategory';
import deleteCategory from '@/libs/deleteCategory';
import getCategories from '@/libs/getcategories';
import getCategoryById from '@/libs/getCategoryById';
import updateCategory from '@/libs/updateCategory';

export default async function handler(request, response) {
  const { categoryId } = request.query;

  if (request.method === 'GET') {
    if (!categoryId) {
      try {
        const categories = await getCategories();
        return NextResponse.json(categories, { status: 200 });
      } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
    } else {
      try {
        const category = await getCategoryById(categoryId);
        if (category) {
          return NextResponse.json(category, { status: 200 });
        } else {
          return NextResponse.json({ error: 'Category not found' }, { status: 404 });
        }
      } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
    }
  }

  if (request.method === 'PUT') {
    try {
      const data = await request.json();
      const putCategory = await updateCategory(categoryId, data);
      return NextResponse.json(putCategory, { status: 200 });
    } catch (error) {
      return NextResponse.json(error.message, { status: 404 });
    }
  }

  if (request.method === 'DELETE') {
    try {
      const deletedCategory = await deleteCategory(categoryId);
      return NextResponse.json(deletedCategory, { status: 200 });
    } catch (error) {
      return NextResponse.json(error.message, { status: 404 });
    }
  }

  if (request.method === 'POST') {
    try {
        const data = await request.json();
        const postCategory = await createCategory(categoryId, data);
        return NextResponse.json(postCategory, { status: 200 });
    } catch (error) {
        return NextResponse.json(error.message, { status: 400 });
    }
  }

  return NextResponse.forbidden();
}