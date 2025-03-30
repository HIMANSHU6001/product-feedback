"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Home = () => {
  const [products, setProducts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // Fetch the list of products from the API
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();
        if (data.success) {
          setProducts(data.products);
        } else {
          console.error("Failed to fetch products:", data.message);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleProductClick = (id: string) => {
    router.push(`/product-feedback/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-6">Available Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl">
        {products.map((product: { _id: string; productName: string }) => (
          <div
            key={product._id}
            className="p-6 bg-white border rounded-xl shadow-md hover:shadow-lg cursor-pointer transition-transform transform hover:scale-105"
            onClick={() => handleProductClick(product._id)}
          >
            <h2 className="text-lg font-semibold text-gray-700">{product.productName}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
