"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const getAllProducts = async (
  page?: any,
  limit?: string,
  query?: { [key: string]: string | string[] | undefined }
) => {
  const params = new URLSearchParams();

  if (query?.price) {
    params.append("minPrice", "0");
    params.append("maxPrice", query?.price.toString());
  }
  if (query?.offerPrice) {
    params.append("minOfferPrice", "0");
    params.append("maxOfferPrice", query?.offerPrice.toString());
  }

  if (query?.parentCategory) {
    params.append("parentCategory", query?.parentCategory.toString());
  }
  if (query?.subCategory) {
    params.append("subCategory", query?.subCategory.toString());
  }

  if (query?.thirdSubCategory) {
    params.append("thirdSubCategory", query?.thirdSubCategory.toString());
  }

  if (query?.rating) {
    params.append("ratings", query?.rating.toString());
  }
  if (query?.stock) {
    params.append("minStock", "0");
    params.append("maxStock", query?.stock.toString());
  }
  if (query?.sort) {
    params.append("sort", query?.sort.toString());
  }

  if (query?.searchTerm) {
    params.append("searchTerm", query?.searchTerm.toString());
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
export const getAllProductsWithoutPagination = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/product/all-products`,
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

export const getNewArrivalProducts = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/product/new-arrival`,
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

export const getTopRatedProduct = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/product/top-rated`,
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

export const getTrendingProducts = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/product/trending`,
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

export const deleteProduct = async (productId: string): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/product/${productId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );
    revalidateTag("Product");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
