import type { VercelRequest, VercelResponse } from "@vercel/node";
import jwt from "jsonwebtoken";
import * as cookie from "cookie";

const JWT_SECRET = process.env.JWT_SECRET as string;

export default function handler(req: VercelRequest, res: VercelResponse) {
  const cookies = cookie.parseCookie(req.headers.cookie || "");
  const token = cookies.token;

  if (!token) {
    return res.status(401).json({ user: null });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { email: string; name: string };
    return res.status(200).json({ user: { email: decoded.email, name: decoded.name } });
  } catch {
    return res.status(401).json({ user: null });
  }
}