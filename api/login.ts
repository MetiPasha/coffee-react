import type { VercelRequest, VercelResponse } from "@vercel/node";
import jwt from "jsonwebtoken";
import * as cookie from "cookie";

const JWT_SECRET = process.env.JWT_SECRET as string;
const DEMO_PASSWORD = "coffee123";

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, password } = req.body as { email?: string; password?: string };

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  if (password !== DEMO_PASSWORD) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const user = { email, name: email.split("@")[0] };
  const token = jwt.sign(user, JWT_SECRET, { expiresIn: "7d" });

  const cookieHeader = cookie.stringifySetCookie({
    name: "token",
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  res.setHeader("Set-Cookie", cookieHeader);
  return res.status(200).json({ user });
}