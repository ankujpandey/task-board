import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

interface JwtPayload {
  userId: string;
}

export function generateToken(userId: string) {
  return jwt.sign(
    { userId },
    JWT_SECRET,
    {
      expiresIn: "4h",
    }
  );
}

export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
}
