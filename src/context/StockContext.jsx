
import { createContext, useContext, useState, useEffect } from "react";

const StockContext = createContext(null);

// Our initial products
const initialProducts = [
  {
    id: 1,
    name: "Laptop",
    category: "Electronics",
    price: 450000,
    quantity: 15,
    minimum: 5,
  },
  {
    id: 2,
    name: "Wireless Mouse",
    category: "Accessories",
    price: 15000,
    quantity: 30,
    minimum: 10,
  },
  {
    id: 3,
    name: "Keyboard",
    category: "Accessories",
    price: 25000,
    quantity: 8,
    minimum: 10,
  },
  {
    id: 4,
    name: "Monitor",
    category: "Electronics",
    price: 180000,
    quantity: 12,
    minimum: 5,
  },
  {
    id: 5,
    name: "Headphones",
    category: "Accessories",
    price: 30000,
    quantity: 0,
    minimum: 5,
  },
];

// Our initial sales
const initialSales = [
  {
    id: 1,
    product: "Laptop",
    customer: "John Smith",
    quantity: 2,
    price: 450000,
    amount: 900000,
    date: "Nov 01, 2026",
  },
  {
    id: 2,
    product: "Wireless Mouse",
    customer: "Mary James",
    quantity: 5,
    price: 15000,
    amount: 75000,
    date: "Nov 02, 2026",
  },
  {
    id: 3,
    product: "Keyboard",
    customer: "David Paul",
    quantity: 3,
    price: 25000,
    amount: 75000,
    date: "Nov 03, 2026",
  },
];

// Load saved data from the browser
const loadSavedData = (key, initialData) => {
  try {
    const savedData = localStorage.getItem(key);

    return savedData ? JSON.parse(savedData) : initialData;
  } catch (error) {
    console.error("Could not load saved data:", error);
    return initialData;
  }
};

export const StockProvider = ({ children }) => {
  // Load saved products when StockPro starts
  const [products, setProducts] = useState(() =>
    loadSavedData("stockpro_products", initialProducts)
  );

  // Load saved sales when StockPro starts
  const [sales, setSales] = useState(() =>
    loadSavedData("stockpro_sales", initialSales)
  );

  // Save products whenever they change
  useEffect(() => {
    localStorage.setItem("stockpro_products", JSON.stringify(products));
  }, [products]);

  // Save sales whenever they change
  useEffect(() => {
    localStorage.setItem("stockpro_sales", JSON.stringify(sales));
  }, [sales]);

  return (
    <StockContext.Provider
      value={{ products, setProducts, sales, setSales }}
    >
      {children}
    </StockContext.Provider>
  );
};

export const useStock = () => {
  const context = useContext(StockContext);

  if (!context) {
    throw new Error("useStock must be used inside StockProvider");
  }

  return context;
};
