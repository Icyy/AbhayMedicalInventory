"use client"
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import { TextField, Button, Container, Typography, Grid } from '@mui/material';
import StockDisplay from './components/StockDisplay';
require('dotenv').config();
import axios from 'axios';
import Layout from './components/Layout';
import NavBar from './components/NavBar';


interface ProductArr {
  _id: string;
  medicineName: string;
  batchNumber: string;
  category: string;
  description: string;
  expiryDate: string;
  manufacturer: string;
  purchasePrice: string;
  quantityInStock: string;
  reorderLevel: string;
  sellingPrice: string;
  supplierInfo: string;
  manufacDate: string;
}
const containerStyle = {
  marginTop: '20px', // Add top margin
  padding: '20px',   // Add padding
  backgroundColor: '#f0f0f0', // Set a background color
};

export default function Home() {
 
  const [products, setProducts] = useState<ProductArr[]>([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("/api/product");
      if (response.status === 200) {
        console.log(response.data.body);
        setProducts(response.data.body);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  },[]);



  return (
    <>
    {/* <Layout> */}
      {/* <Header /> */}
      <NavBar />
      <Container style={containerStyle}>
        <StockDisplay products={products}/>
      </Container>
    {/* </Layout> */}
    </>
    
  );
}
