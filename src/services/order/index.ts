"use server";

import { getValidToken } from "@/lib/verifyToken";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const getAllOrders = async () => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/order/my-orders`,
      {
        headers: {
          Authorization: token,
        },

        next: {
          tags: ["Orders"],
        },
      }
    );

    return res.json() || [];
  } catch (error: any) {
    return Error(error);
  }
};

export const getOrdersByAdmin = async () => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/order/admin-orders`,
      {
        headers: {
          Authorization: token,
        },

        next: {
          tags: ["Orders"],
        },
      }
    );

    return res.json() || [];
  } catch (error: any) {
    return Error(error);
  }
};

export const changeOrderStatus = async (
  productId: string,
  status: object
): Promise<any> => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/order/${productId}/status`,
      {
        method: "PATCH",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(status),
      }
    );
    revalidateTag("Orders");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
