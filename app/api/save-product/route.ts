// path: price-monitor\app\api\save-product\route.ts
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabaseClient"; // Adjust this path accordingly
import { fetchProductPrice } from "@/app/lib/fetchProductPrice"; // Adjust this path accordingly

export async function POST(req: NextRequest) {
  try {
    const { productName, productUrl, cssSelector, userEmail, notifyTime } = await req.json();

    // Fetch the product price
    const price = await fetchProductPrice(productUrl, cssSelector);

    // Save the product details along with the price
    const { error } = await supabase
      .from("user_products")
      .insert([
        {
          product_name: productName,
          product_url: productUrl,
          css_selector: cssSelector,
          user_email: userEmail,
          notify_time: notifyTime,
          current_price: price, // Add the scraped price here
        },
      ]);

    if (error) throw error;

    return NextResponse.json({ message: "Details and price saved successfully.", price });
  } catch (error) {
    console.error("Error saving product details:", error);
    return NextResponse.json({ error: "Failed to save product details" }, { status: 500 });
  }
}
