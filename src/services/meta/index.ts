"use server";

import { cookies } from "next/headers";

export const getMetaData = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/meta`, {
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
      },

      next: {
        tags: ["Meta"],
      },
    });

    return res.json() || [];
  } catch (error: any) {
    return Error(error);
  }
};
