// // path: price-monitor\app\api\get-product-price\route.ts

// import { NextRequest, NextResponse } from "next/server";
// import { fetchProductPrice } from "@/app/lib/fetchProductPrice";

// export async function POST(req: NextRequest) {
//   try {
//     const { url, selector } = await req.json();

//     if (!url || !selector) {
//       return NextResponse.json(
//         { error: "Missing url or selector" },
//         { status: 400 }
//       );
//     }

//     const price = await fetchProductPrice(url, selector);
//     return NextResponse.json({ price });
//   } catch (error) {
//     console.error("Error fetching product price:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch product price" },
//       { status: 500 }
//     );
//   }
// }


//----------------------------------

// path: price-monitor\app\api\get-product-price\route.ts

import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import cheerio from "cheerio";

export async function POST(req: NextRequest) {
  try {
    const { url, selector } = await req.json();

    if (!url || !selector) {
      return NextResponse.json({ error: "Missing url or selector" }, { status: 400 });
    }

    // Fetch the HTML of the page
    const { data } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36'
      }
    });

    // Load the HTML into cheerio
    const $ = cheerio.load(data);

    // Extract the product price using the selector provided
    const price = $(selector).text().trim() || "Not available";

    return NextResponse.json({ price });
  } catch (error) {
    console.error("Error scraping the product price:", error);
    return NextResponse.json({ error: "Failed to fetch product price" }, { status: 500 });
  }
}
