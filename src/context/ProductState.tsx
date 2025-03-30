"use client";
import { Product } from "@/models/product";
import React, { ReactNode } from "react";
import { createContext } from "react";

interface productContextType {
  getProducts: () => Promise<Product[] | undefined>;
  getProduct: (id: string) => Promise<Product | undefined>;
  sendFeedback: (id: string, data: FeedbackData) => Promise<boolean>;
}

const productContext = createContext<productContextType | undefined>(undefined);

interface ProductStateProps {
  children: ReactNode;
}

const getProducts = async () => {
  try {
    const url = `${process.env.NEXT_PUBLIC_DOMAIN}/api/products`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.success) {
      return data.products;
    }
    return;
  } catch (error) {
    console.log("Error:", error);
  }
};

const getProduct = async (id: string) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_DOMAIN}/api/products/` + id;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    if (data.success) {
      return data.product;
    }
  } catch (error) {
    console.log("Error: ", error);
  }
};

interface FeedbackData {
  [key: string]: string | number;
}

interface FeedbackResponse {
  success: boolean;
}

const sendFeedback = async (id: string, data: FeedbackData): Promise<boolean> => {
  try {
    const url = `${process.env.NEXT_PUBLIC_DOMAIN}/api/product-feedback/${id}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const res: FeedbackResponse = await response.json();
    return res.success || false;
  } catch (error) {
    console.log("Error: ", error);
    return false; 
  }
};

const ProductState: React.FC<ProductStateProps> = ({ children }) => {
  return (
    <productContext.Provider value={{ getProduct, getProducts, sendFeedback }}>
      {children}
    </productContext.Provider>
  );
};

export default ProductState;
