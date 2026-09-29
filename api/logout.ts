import type { VercelRequest, VercelResponse } from "@vercel/node";
import * as cookie from "cookie";

export default function handler(req: VercelRequest, res: VercelResponse) {
  const cookieHeader = cookie.stringifySetCookie({
    name: "token",
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  res.setHeader("Set-Cookie", cookieHeader);
  return res.status(200).json({ message: "Logged out" });
}