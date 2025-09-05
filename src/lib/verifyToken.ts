"use server";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { getNewToken } from "@/services/AuthService";
export const isTokenExpired = async (token: string): Promise<boolean> => {
  if (!token) return true;
  try {
    const decoded: { exp: number } = jwtDecode(token);
    return decoded.exp * 1000 < Date.now();
  } catch (err) {
    console.error(err);
    return true;
  }
};
export const getValidToken = async (): Promise<string> => {
  const cookieStore = await cookies();
  let token = cookieStore.get("accessToken")?.value;
  if (!token || (await isTokenExpired(token))) {
    const { data } = await getNewToken();
    token = data?.accessToken;
    if (token) {
      cookieStore.set("accessToken", token);
    }
  }
  return token!;
};
