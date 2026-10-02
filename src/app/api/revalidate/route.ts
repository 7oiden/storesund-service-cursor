import { revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";
import { parseBody } from "next-sanity/webhook";
import { SANITY_TAG } from "@/sanity/client";

export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return Response.json({ message: "Missing secret" }, { status: 500 });
  }

  const { isValidSignature } = await parseBody(request, secret);
  if (!isValidSignature) {
    return Response.json({ message: "Invalid signature" }, { status: 401 });
  }

  revalidateTag(SANITY_TAG, { expire: 0 });
  return Response.json({ revalidated: true });
}
