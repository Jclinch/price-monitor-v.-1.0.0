// path: price-monitor\app\api\get-product-price\route.ts

import { NextRequest, NextResponse } from "next/server";
import { fetchProductPrice } from "@/app/lib/fetchProductPrice";

export async function POST(req: NextRequest) {
  try {
    const { url, selector } = await req.json();

    if (!url || !selector) {
      return NextResponse.json(
        { error: "Missing url or selector" },
        { status: 400 }
      );
    }

    const price = await fetchProductPrice(url, selector);
    return NextResponse.json({ price });
  } catch (error) {
    console.error("Error fetching product price:", error);
    return NextResponse.json(
      { error: "Failed to fetch product price" },
      { status: 500 }
    );
  }
}
