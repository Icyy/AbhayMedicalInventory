"use client"
import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Grid, Select, MenuItem } from '@mui/material';
require('dotenv').config();
import axios from 'axios';
import Layout from '@/app/components/Layout';
import NavBar from '@/app/components/NavBar';

  

  
  const buttonStyle = {
    backgroundColor: '#007bff',   // Set a background color
    color: '#fff',               // Set text color
    '&:hover': {
      backgroundColor: '#0056b3',  // Change color on hover
    },
  };

  interface ManuArr {
    _id: string;
    name: string;
    status: string;
  }

const page = () => {
     // Define state variables to store input values
  const [medicineName, setMedicineName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [quantityInStock, setQuantityInStock] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [manufacDate, setManufacDate] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');
  const [reorderLevel, setReorderLevel] = useState('');
  const [supplierInfo, setSupplierInfo] = useState('');
  const [batchNumber, setBatchNumber] = useState('');

  const [manufacturersList, setManufacturersList] = useState<ManuArr[]>([]);


    // Function to handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    
        // Create an object to hold the form data
        const formData = {
          medicineName,
          description,
          category,
          manufacturer,
          quantityInStock,
          expiryDate,
          purchasePrice,
          sellingPrice,
          reorderLevel,
          supplierInfo,
          batchNumber,
          manufacDate
        };
    
        // You can now send this formData to your backend for processing or perform any other desired actions
        console.log(formData);
      };
    
      const addProduct = async ()=>{
        const productData = {
          medicineName,
          description,
          category,
          manufacturer,
          quantityInStock,
          expiryDate,
          purchasePrice,
          sellingPrice,
          reorderLevel,
          supplierInfo,
          batchNumber,
          manufacDate,
        };
    
        try {
          // Make a POST request using Axios
          const response = await axios.post('/api/product', productData);
    
          // Check if the request was successful (status code 200)
          if (response.status === 200) {
            // Clear the form fields after successfully adding the product
            setMedicineName('');
            setDescription('');
            setCategory('');
            setManufacturer('');
            setQuantityInStock('');
            setExpiryDate('');
            setPurchasePrice('');
            setSellingPrice('');
            setReorderLevel('');
            setSupplierInfo('');
            setBatchNumber('');
            setManufacDate('');
    
            // You can also show a success message or perform any other actions
              console.log('Product added successfully!');      
            
          } else {
            // Handle any error responses here
            console.error('Failed to add product:', response.statusText);
          }
        } catch (error) {
          console.error('Error adding product:', error);
        }
      }

      useEffect(() => {
        // Fetch manufacturers list from your backend API
        axios.get('/api/manufacturers')
          .then((response) => {
            if (response.status === 200) {
              setManufacturersList(response.data.body);
            } else {
              console.error('Failed to fetch manufacturers:', response.statusText);
            }
          })
          .catch((error) => {
            console.error('Error fetching manufacturers:', error);
          });
      }, []);

  return (
    <div>
    <>
    <Typography variant="h4">Add Medicine</Typography>
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="Medicine Name"
            variant="outlined"
            fullWidth
            required
            value={medicineName}
            onChange={(e) => setMedicineName(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Category"
            variant="outlined"
            fullWidth
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
            <Select
              label="Manufacturer"
              variant="outlined"
              fullWidth
              value={manufacturer}
              onChange={(e) => setManufacturer(e.target.value)}
              required
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {manufacturersList.map((manufacturer) => (
                <MenuItem key={manufacturer._id} value={manufacturer.name}>
                  {manufacturer.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        <Grid item xs={6}>
          <TextField
            label="Quantity in Stock"
            variant="outlined"
            fullWidth
            required
            value={quantityInStock}
            onChange={(e) => setQuantityInStock(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Expiry Date"
            variant="outlined"
            fullWidth
            required
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Manufacturing Date"
            variant="outlined"
            fullWidth
            required
            value={manufacDate}
            onChange={(e) => setManufacDate(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Purchase Price"
            variant="outlined"
            fullWidth
            required
            value={purchasePrice}
            onChange={(e) => setPurchasePrice(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Selling Price"
            variant="outlined"
            fullWidth
            required
            value={sellingPrice}
            onChange={(e) => setSellingPrice(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Reorder Level"
            variant="outlined"
            fullWidth
            required
            value={reorderLevel}
            onChange={(e) => setReorderLevel(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Supplier Information"
            variant="outlined"
            fullWidth
            value={supplierInfo}
            onChange={(e) => setSupplierInfo(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Batch Number"
            variant="outlined"
            fullWidth
            value={batchNumber}
            onChange={(e) => setBatchNumber(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" onClick={addProduct} style={buttonStyle}>
            Add Medicine
          </Button>
        </Grid>
      </Grid>
            </form>
    </>

    </div>
  )
}

export default page