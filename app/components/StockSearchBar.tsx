"use client"
import React from 'react';
import { TextField, Grid, Select, MenuItem } from '@mui/material';
interface StockSearchBarProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
  }
  
  const StockSearchBar: React.FC<StockSearchBarProps> = ({ searchQuery, setSearchQuery, selectedCategory, setSelectedCategory }) => {
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
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Category 1">Category 1</MenuItem>
          <MenuItem value="Category 2">Category 2</MenuItem>
          {/* Add more categories as needed */}
        </Select>
      </Grid>
    </Grid>
  );
};

export default StockSearchBar;
