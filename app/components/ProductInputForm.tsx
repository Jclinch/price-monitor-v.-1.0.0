//path: price-monitor\app\components\ProductInputForm.tsx


"use client";


import { useState } from "react";
import "@/app/components/styles/loader.css"
import "@/app/components/styles/input.css"

const ProductInputForm = () => {
  const [productName, setProductName] = useState("");
  const [productUrl, setProductUrl] = useState("");
  const [cssSelector, setCssSelector] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [notifyTime, setNotifyTime] = useState("10:00"); // Default time
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      const response = await fetch("/api/save-product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productName, productUrl, cssSelector, userEmail, notifyTime }),
      });

      if (response.ok) {
        const data = await response.json();
        setPrice(data.price);
      } else {
        setPrice("Error fetching data");
      }
    } catch (error) {
      setPrice("Error fetching data");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Product Name Input */}
        <div className="container">
          <input
            id="productName"
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="input"
            required
          />
          <label htmlFor="productName" className="label">Product Name</label>
        </div>

        {/* Product URL Input */}
        <div className="container">
          <input
            id="productUrl"
            type="text"
            value={productUrl}
            onChange={(e) => setProductUrl(e.target.value)}
            className="input"
            required
          />
          <label htmlFor="productUrl" className="label">Product URL</label>
        </div>

        {/* CSS Selector Input */}
        <div className="container">
          <input
            id="cssSelector"
            type="text"
            value={cssSelector}
            onChange={(e) => setCssSelector(e.target.value)}
            className="input"
            required
          />
          <label htmlFor="cssSelector" className="label">CSS Selector</label>
        </div>

        {/* User Email Input */}
        <div className="container">
          <input
            id="userEmail"
            type="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            className="input"
            required
          />
          <label htmlFor="userEmail" className="label">User Email</label>
        </div>

        {/* Notification Time Input */}
        <div className="container relative">
          <input
            id="notifyTime"
            type="time"
            value={notifyTime}
            onChange={(e) => setNotifyTime(e.target.value)}
            className="input"
            required
          />
              <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 6v6l4 2" />
      <circle cx="12" cy="12" r="10" />
    </svg>
          <label htmlFor="notifyTime" className="label">Notification Time</label>
        </div>

        <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>

      {/* Loading Indicator */}
      {loading && (
        <div className="mt-4 p-4 border border-gray-300 rounded-md">
          <div className="honeycomb">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}

      {/* Price Display */}
      {!loading && price && (
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