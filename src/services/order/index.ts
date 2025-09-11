"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const getAllOrders = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/order/my-orders`,
      {
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
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
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/order/admin-orders`,
      {
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
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
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/order/${productId}/status`,
      {
        method: "PATCH",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
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
