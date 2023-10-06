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
import axios from "axios";
import Link from "next/link";

const containerStyle = {
  backgroundColor: "#f0f0f0",
  padding: "20px",
  borderRadius: "8px",
  marginBottom: "20px",
};

interface Category {
  _id: string;
  name: string;
}

const CategoryListPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("/api/categories");
      if (response.status === 200) {
        setCategories(response.data.body);
        console.log(response.data.body);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
    console.log(categories)
  }, []);

  useEffect(() => {
    console.log(categories)
  }, [categories]);

  return (
    <>
      <button
        style={{ float: "right", marginTop: "2%", marginRight: "1.5%" }}
        className="inline-flex text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg"
      >
        <Link href={`/categories/add`}>Add Categories</Link>
      </button>

      <div style={containerStyle}>
        <Typography variant="h5">List of Categories</Typography>
        <Paper elevation={3}>
          <div className="relative overflow-x-auto overflow-y-scroll mt-6">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Category Name
                  </th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {category.name}
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Paper>
      </div>
    </>
  );
};

export default CategoryListPage;
