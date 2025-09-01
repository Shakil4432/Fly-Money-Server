"use server";

import { getValidToken } from "@/lib/verifyToken";
import { revalidateTag } from "next/cache";

export const createCategory = async (data: FormData) => {
  const token = await getValidToken();

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/category`, {
      method: "POST",
      headers: {
        Authorization: token,
      },
      body: data,
    });
    revalidateTag("Category");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const getAllCategories = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/category`, {
      next: {
        tags: ["Category"],
      },
    });
    return res.json() || [];
  } catch (error: any) {
    return Error(error);
  }
};

export const getParentCategores = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/category/parent-category`,
      {
        next: {
          tags: ["Category"],
        },
      }
    );
    return res.json() || [];
  } catch (error: any) {
    return Error(error);
  }
};

export const deleteCategory = async (categoryId: string): Promise<any> => {
  const token = await getValidToken();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/category/${categoryId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      }
    );
    revalidateTag("Category");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
