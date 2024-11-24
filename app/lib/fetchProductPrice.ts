// path: price-monitor\app\lib\fetchProductPrice.ts

//envelope starts
// import axios from 'axios';
// import cheerio from 'cheerio';

// export async function fetchProductPrice(url: string, selector: string): Promise<string> {
//   let price = "Not available";

//   try {
//     // Fetch the HTML content of the page
//     const { data } = await axios.get(url, {
//       headers: {
//         'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
//       },
//     });

//     // Load the HTML into cheerio
//     const $ = cheerio.load(data);

//     // Attempt to find the price using the provided CSS selector
//     const priceElement = $(selector);
//     if (priceElement.length > 0) {
//       price = priceElement.text().trim() || "Not available";
//     } else {
//       console.error(`Element not found with selector: ${selector}`);
//     }
//   } catch (error) {
//     // Narrow down the error type
//     if (error instanceof Error) {
//       console.error("Error fetching the product price:", error.message);
//     } else {
//       console.error("An unknown error occurred while fetching the product price.");
//     }
//   }

//   return price;
// }





//     await browser.close();
//   } catch (error) {
//     console.error("Error scraping the product price:", error);
//   }

//   return price;
// }
//envelope ends





// path: price-monitor\app\lib\fetchProductPrice.ts

import puppeteer from "puppeteer";

export async function fetchProductPrice(
  url: string,
  selector: string
): Promise<string> {
  let price = "Not available";

  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" }); //networkidle2 domcontentloaded

    // Wait explicitly for a reasonable time
    await new Promise((resolve) => setTimeout(resolve, 15000)); // Wait for 5 seconds
    // Wait for the selector to be available
    await page.waitForSelector(selector, { timeout: 30000 });


    const priceElement = await page.$(selector);
    if (priceElement) {
      
      price = await page.evaluate(
        (el) => el.textContent?.trim() || "Not available",
        priceElement
      );
    }

    await browser.close();
  } catch (error) {
    console.error("Error scraping the product price:", error);
  }

  return price;
}
