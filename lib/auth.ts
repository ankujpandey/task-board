import { cookies } from "next/headers";
import { verifyToken } from "./jwt";
import { UnauthorizedError } from "./errors";

export async function getUserIdFromRequest() {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  if (!token) {
    throw new UnauthorizedError("Authentication required");
  }

  try {
    const decoded = verifyToken(token);

    return decoded.userId;
  } catch {
    throw new UnauthorizedError("Invalid or expired token");
  }
}