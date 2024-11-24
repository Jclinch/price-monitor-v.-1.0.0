//path: price-monitor\utils\cronJobs.ts

import cron from "node-cron";
import { supabase } from "@/app/lib/supabaseClient";
import { fetchProductPrice } from "@/app/lib/fetchProductPrice";
import nodemailer from "nodemailer";

cron.schedule("* * * * *", async () => {
  console.log("Cron job started"); // Add logging to confirm execution
  try {
    const { data: products } = await supabase.from("user_products").select("*");

    if (products) {
      for (const product of products) {
        console.log(`Processing product: ${product.product_name}`); // Log each product being processed
        const price = await fetchProductPrice(product.product_url, product.css_selector);

        // Log the fetched price
        console.log(`Fetched price for ${product.product_name}: ${price}`);

        // Send an email with the product price
        await sendEmail(product.user_email, product.product_name, price);

        // Optionally update the current price in the database
        await supabase
          .from("user_products")
          .update({ current_price: price, last_checked: new Date() })
          .eq("id", product.id);
      }
    }
  } catch (error) {
    console.error("Error in cron job:", error);
  }
});

async function sendEmail(to: string, productName: string, price: string) {
  const transporter = nodemailer.createTransport({
    service: "gmail", // Replace with your email provider
    auth: {
      user: process.env.EMAIL_USER, // Your email address
      pass: process.env.EMAIL_PASS, // Your email password
    },
    logger: true, // Enable logging
  debug: true, // Enable debugging
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: `Daily Price Update for ${productName}`,
    text: `The current price for ${productName} is ${price}.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error(`Failed to send email to ${to}:`, error);
  }
}
