"use client"
import React, {useState, useEffect} from 'react';
import { TextField, Grid, Select, MenuItem } from '@mui/material';
import axios from 'axios';

interface StockSearchBarProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
    categories: Array<string>;
  }
  
  const StockSearchBar: React.FC<StockSearchBarProps> = ({ searchQuery, setSearchQuery, categories ,selectedCategory, setSelectedCategory }) => {
    
  
    return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Select
          label="Category"
          variant="outlined"
          fullWidth
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <MenuItem value="">All Categories</MenuItem>
        {categories.map((category) => (
          <MenuItem key={category} value={category}>
            {category}
          </MenuItem>
        ))}
        </Select>
      </Grid>
    </Grid>
  );
};

export default StockSearchBar;
