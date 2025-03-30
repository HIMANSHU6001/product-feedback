"use client";
import React, { ReactNode } from "react";
import { createContext } from "react";

interface productContextType {
  getProducts: () => Promise<any>;
  getProduct: (id: string) => Promise<any>;
  sendFeedback: (id: string, data: any) => Promise<any>;
}

const productContext = createContext<productContextType | undefined>(undefined);

interface ProductStateProps {
  children: ReactNode;
}

const getProducts = async () => {
  try {
    var url = `${process.env.NEXT_PUBLIC_DOMAIN}/api/products`;
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
    var url = `${process.env.NEXT_PUBLIC_DOMAIN}/api/products/` + id;
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

const sendFeedback = async (id: string, data: any) => {
  try {
    var url = `${process.env.NEXT_PUBLIC_DOMAIN}/api/product-feedback/${id}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const res = await response.json();
    if (res.success) {
      return res.product;
    }
  } catch (error) {
    console.log("Error: ", error);
  }
}

const ProductState: React.FC<ProductStateProps> = ({ children }) => {
  return (
    <productContext.Provider value={{ getProduct, getProducts, sendFeedback }}>
      {children}
    </productContext.Provider>
  );
};

export default ProductState;
