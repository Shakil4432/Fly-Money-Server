// types/jwt.ts
export interface MyJwtPayload {
  sub?: string; // optional: user id
  email?: string;
  role: "user" | "admin"; // adjust to your roles
  exp: number;
}
