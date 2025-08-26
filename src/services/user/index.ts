"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const getAllUser = async (
  page?: any,
  limit?: string,
  query?: {
    [key: string]: string | string[] | undefined;
  }
) => {
  try {
    const token = (await cookies()).get("accessToken")?.value;
    if (!token) {
      throw new Error("No access token found");
    }

    const params = new URLSearchParams();

    if (query?.role) {
      params.append("role", query?.role.toString());
    }

    if (query?.isActive) {
      params.append("isActive", query?.isActive.toString());
    }

    if (query?.sort) {
      params.append("sort", query?.sort.toString());
    }
    if (query?.searchTerm) {
      params.append("searchTerm", query?.searchTerm.toString());
    }

    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_BASE_API
      }/user?page=${page}&limit=${limit}&${params?.toString()}`,
      {
        headers: {
          Authorization: token,
        },
        next: {
          tags: ["User"],
        },
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch users: ${res.statusText}`);
    }

    const data = await res.json();
    return data || [];
  } catch (error) {
    return { error: (error as Error).message };
  }
};

export const getAllUserWithOrders = async (userId: string) => {
  try {
    const token = (await cookies()).get("accessToken")?.value;
    if (!token) {
      throw new Error("No access token found");
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/user/${userId}/details`,
      {
        headers: {
          Authorization: token,
        },
        next: {
          tags: ["User"],
        },
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch users: ${res.statusText}`);
    }

    const data = await res.json();
    return data || [];
  } catch (error) {
    return { error: (error as Error).message };
  }
};

export const changeUserStatus = async (userId: string): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/user/${userId}/status`,
      {
        method: "PATCH",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
          "Content-Type": "application/json",
        },
      }
    );
    revalidateTag("User");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const UpdateUserProfile = async (
  ProfileData: FormData
): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/user/update-profile`,
      {
        method: "PATCH",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
        body: ProfileData,
      }
    );
    revalidateTag("User");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const getUserProfile = async () => {
  try {
    const token = (await cookies()).get("accessToken")?.value;
    if (!token) {
      throw new Error("No access token found");
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user/me`, {
      headers: {
        Authorization: token,
      },
      next: {
        tags: ["User"],
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch users: ${res.statusText}`);
    }

    const data = await res.json();
    return data || [];
  } catch (error) {
    return { error: (error as Error).message };
  }
};
