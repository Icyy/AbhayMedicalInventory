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
    _id:string
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

  const StockDisplay = ({products}: StockDisplayProps) => {
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
    console.log(categories)
  },[]);

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
        categories = {categories}
      />
      <Paper elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Manufacturer</TableCell>
              <TableCell>Manufacturing Date</TableCell>
              <TableCell>Expiry Date</TableCell>
              <TableCell>Batch Number</TableCell>
              <TableCell>Selling Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Category</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredStock.map((medicine) => (
              <TableRow key={medicine._id}>
                <TableCell>{medicine.medicineName}</TableCell>
                <TableCell>{medicine.manufacturer}</TableCell>
                <TableCell>{medicine.manufacDate}</TableCell>
                <TableCell>{medicine.expiryDate}</TableCell>
                <TableCell>{medicine.batchNumber}</TableCell>
                <TableCell>{medicine.sellingPrice}</TableCell>
                <TableCell>{medicine.quantityInStock}</TableCell>
                <TableCell>{medicine.category}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
};

export default StockDisplay;
