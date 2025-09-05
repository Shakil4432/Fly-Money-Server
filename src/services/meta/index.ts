"use server";

import { getValidToken } from "@/lib/verifyToken";

export const getMetaData = async () => {
  const token = await getValidToken();
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/meta`, {
      headers: {
        Authorization: token,
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
