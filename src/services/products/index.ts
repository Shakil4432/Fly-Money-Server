"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const getAllProducts = async (
  page?: string,
  limit?: string,
  query?: { [key: string]: string | string[] | undefined }
) => {
  const params = new URLSearchParams();

  if (query?.price) {
    params.append("minPrice", "0");
    params.append("maxPrice", query?.price.toString());
  }

  if (query?.category) {
    params.append("categories", query?.category.toString());
  }

  if (query?.rating) {
    params.append("ratings", query?.rating.toString());
  }
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/product?page=${page}&limit=${limit}&${params}`,
      {
        next: {
          tags: ["Product"],
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const addProduct = async (productData: FormData): Promise<any> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/product`, {
      method: "POST",
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
      },
      body: productData,
    });
    revalidateTag("Product");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const updateProduct = async (
  productData: FormData,
  productId: string
): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/product/${productId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
        body: productData,
      }
    );
    revalidateTag("Product");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const getSingleProduct = async (productId: string): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/product/${productId}`,
      {
        next: {
          tags: ["Product"],
        },
      }
    );
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
