"use server";

import { getValidToken } from "@/lib/verifyToken";
import { revalidateTag } from "next/cache";

export const createReview = async (productData: any): Promise<any> => {
  const token = await getValidToken();
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/review`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(productData),
    });
    revalidateTag("Review");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const getAllReviews = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/review`, {
      next: {
        tags: ["Review"],
      },
    });
    return res.json() || [];
  } catch (error: any) {
    return Error(error);
  }
};
