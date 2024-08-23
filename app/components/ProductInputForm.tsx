//path: price-monitor\app\components\ProductInputForm.tsx

"use client";

import { useState } from "react";

const ProductInputForm = () => {
  const [productName, setProductName] = useState("");
  const [productUrl, setProductUrl] = useState("");
  const [cssSelector, setCssSelector] = useState("");
  const [price, setPrice] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/get-product-price", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: productUrl, selector: cssSelector }),
      });

      if (response.ok) {
        const data = await response.json();
        setPrice(data.price);
      } else {
        setPrice("Error fetching data");
      }
    } catch (error) {
      setPrice("Error fetching data");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="productName"
            className="block text-sm font-medium text-white"
          >
            Product Name
          </label>
          <input
            id="productName"
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-black overflow-hidden text-ellipsis"
          />
        </div>
        <div>
          <label
            htmlFor="productUrl"
            className="block text-sm font-medium text-white"
          >
            Product URL
          </label>
          <input
            id="productUrl"
            type="text"
            value={productUrl}
            onChange={(e) => setProductUrl(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-black"
          />
        </div>
        <div>
          <label
            htmlFor="cssSelector"
            className="block text-sm font-medium text-white"
          >
            CSS Selector
          </label>
          <input
            id="cssSelector"
            type="text"
            value={cssSelector}
            onChange={(e) => setCssSelector(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-black"
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>

      {price && (
        <div className="mt-4 p-4 border border-gray-300 rounded-md">
          <h2 className="text-xl font-bold text-white">Product Price</h2>
          <p>Product is: {productName}</p>
          <p>Price is: {price}</p>
        </div>
      )}
    </div>
  );
};

export default ProductInputForm;
