'use client'
import React, {useState,useEffect} from 'react'
import Link from 'next/link'
import NavBar from '../components/NavBar'
import StockDisplay from '../components/StockDisplay'
import axios from 'axios'

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

const page = () => {
  
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
      <button style={{float: 'right',marginTop: '2%',marginRight: "1.5%"}} className="inline-flex text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg" >
          <Link href={`/medicines/add`}>
            Add Medicines
            </Link>    
        </button>
     
        <div>
        <>
        <StockDisplay products={products} />
        </>
        </div>
    </>
  )
}

export default page