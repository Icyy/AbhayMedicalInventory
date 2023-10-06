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

interface ManuArr {
  _id: string;
  name: string;
  status: string;
}

const page = () => {
  const [manufacturers, setManufacturers] = useState<ManuArr[]>([]);

  const fetchManu = async () => {
    try {
      const response = await axios.get("/api/manufacturers");
      if (response.status === 200) {
        setManufacturers(response.data.body);
        console.log(response.data.body);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchManu();
  }, []);

  return (
    <>
      <button
        style={{ float: "right", marginTop: "2%", marginRight: "1.5%" }}
        className="inline-flex text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg"
      >
        <Link href={`/manufacturers/add`}>Add Manufacturers</Link>
      </button>

      <div style={containerStyle}>
        <Typography variant="h5">List of Manufacturers</Typography>
        <Paper elevation={3}>
          <div className="relative overflow-x-auto overflow-y-scroll mt-6">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Manufacturer Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {manufacturers.map((manu) => (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {manu.name}
                    </th>
                    <td className="px-6 py-4">{manu.status}</td>
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

export default page;
