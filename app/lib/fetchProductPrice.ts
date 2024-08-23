// path: price-monitor\lib\fetchProductPrice.ts

import puppeteer from "puppeteer";

export async function fetchProductPrice(
  url: string,
  selector: string
): Promise<string> {
  let price = "Not available";

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "domcontentloaded" });

    const priceElement = await page.$(selector);
    if (priceElement) {
      price = await page.evaluate(
        (el) => el.textContent || "Not available",
        priceElement
      );
    }

    await browser.close();
  } catch (error) {
    console.error("Error scraping the product price:", error);
  }

  return price;
}
