"use client";
import React, { useEffect, useState } from "react";
import {
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import StockSearchBar from "./StockSearchBar";
import axios from "axios";

const containerStyle = {
  backgroundColor: "#f0f0f0",
  padding: "20px",
  borderRadius: "8px",
  marginBottom: "20px",
};

const searchContainerStyle = {
  marginBottom: "20px",
};

// Sample list of medicines in stock (you can replace this with actual data)
// const stockData = [
//   // Sample medicine objects
//   {
//     id: 1,
//     name: "Medicine A",
//     category: "Category 1",
//     quantity: 100,
//     expiryDate: "2023-12-31",
//     batchNumber: "12345",
//     manufacturer: "Manufacturer A",
//     sellingPrice: "10.00",
//   },
//   {
//     id: 2,
//     name: "Medicine B",
//     category: "Category 2",
//     quantity: 50,
//     expiryDate: "2023-10-15",
//     batchNumber: "54321",
//     manufacturer: "Manufacturer B",
//     sellingPrice: "15.00",
//   },
//   // Add more medicine objects as needed
// ];
interface Product {
  _id: string;
  medicineName: string;
  manufacturer: string;
  manufacDate: string;
  expiryDate: string;
  batchNumber: string;
  sellingPrice: string;
  quantityInStock: string;
  category: string;
}

interface StockDisplayProps {
  products: Product[];
}

const StockDisplay = ({ products }: StockDisplayProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("/api/category");
      if (response.status === 200) {
        console.log(response.data.body);
        setCategories(response.data.body);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
    console.log(categories);
  }, []);

  // Function to filter stock based on search and category
  const filteredStock = products.filter((medicine) => {
    const matchSearch = medicine.medicineName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchCategory =
      selectedCategory === "" || medicine.category === selectedCategory;
    return matchSearch && matchCategory;
  });

  return (
    <div style={containerStyle}>
      <Typography variant="h5">Current Medicines in Stock</Typography>
      <StockSearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
      />
      <Paper elevation={3}>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-950 uppercase dark:text-gray-400">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 bg-gray-50 dark:bg-gray-800"
                >
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Manufacturer
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 bg-gray-50 dark:bg-gray-800"
                >
                  Manufacturing Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Expiry Date
                </th>
                <th scope="col" className="px-6 py-4">
                  Batch Number
                </th>
                <th
                  scope="col"
                  className="px-6 py-3  bg-gray-50 dark:bg-gray-800"
                >
                  Selling Price
                </th>
                <th scope="col" className="px-6 py-4">
                  Quantity
                </th>
                <th
                  scope="col"
                  className="px-6 py-3  bg-gray-50 dark:bg-gray-800"
                >
                  Category
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredStock.map((medicine) => (
                <tr
                  key={medicine._id}
                  className="border-b border-gray-200 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
                  >
                    {medicine.medicineName}
                  </th>
                  <td className="px-6 py-4">{medicine.manufacDate}</td>
                  <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                    {medicine.expiryDate}
                  </td>
                  <td className="px-6 py-4">{medicine.batchNumber}</td>
                  <td className="px-6 py-4">{medicine.sellingPrice}</td>
                  <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                    {medicine.quantityInStock}
                  </td>
                  <td className="px-6 py-4">{medicine.category}</td>
                  <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                    {medicine.manufacturer}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Paper>
    </div>
  );
};

export default StockDisplay;
