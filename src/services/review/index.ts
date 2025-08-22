"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const createReview = async (productData: any): Promise<any> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/review`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: (await cookies()).get("accessToken")!.value,
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
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
      },

      next: {
        tags: ["Review"],
      },
    });

    return res.json() || [];
  } catch (error: any) {
    return Error(error);
  }
};
