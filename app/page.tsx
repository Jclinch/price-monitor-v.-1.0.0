//path: price-monitor\app\page.tsx
"use client";

import ProductInputForm from "./components/ProductInputForm";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center space-y-8">
      <div className="flex space-x-4">
        <ProductInputForm />
      </div>
    </div>
  );
}
