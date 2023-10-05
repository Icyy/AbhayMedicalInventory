'use client'
import NavBar from '@/app/components/NavBar';
import React, { useState } from 'react';

const page = () => {
  const [manufacturerName, setManufacturerName] = useState('');
  const [manufacturerStatus, setManufacturerStatus] = useState('available');

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Create an object with the data to be sent to the API
      const manufacturerData = {
        name: manufacturerName,
        status: manufacturerStatus,
      };

      // Make a POST request to your API endpoint
      const response = await fetch('/api/manufacturers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(manufacturerData),
      });

      if (response.status === 200) {
        // Successfully added the manufacturer
        alert('Manufacturer added successfully');
        // Clear the form
        setManufacturerName('');
        setManufacturerStatus('available');
      } else {
        // Handle errors here
        alert('Failed to add manufacturer');
      }
    } catch (error) {
      console.error('Error adding manufacturer:', error);
    }
  };

  return (
    <>
    <NavBar />
    <div className="container mx-auto mt-10 p-5 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-semibold mb-6">Add Manufacturer</h1>
      <form onSubmit={handleFormSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="manufacturerName" className="block text-sm font-medium text-gray-900 dark:text-white">
              Manufacturer Name
            </label>
            <input
              type="text"
              id="manufacturerName"
              name="manufacturerName"
              value={manufacturerName}
              onChange={(e) => setManufacturerName(e.target.value)}
              className="input-style"
              placeholder="Enter manufacturer name"
              required
            />
          </div>
          <div>
            <label htmlFor="manufacturerStatus" className="block text-sm font-medium text-gray-900 dark:text-white">
              Manufacturer Status
            </label>
            <select
              id="manufacturerStatus"
              name="manufacturerStatus"
              value={manufacturerStatus}
              onChange={(e) => setManufacturerStatus(e.target.value)}
              className="input-style"
              required
            >
              <option value="available">Available</option>
              <option value="not-available">Not Available</option>
            </select>
          </div>
        
        <button type="submit" className="inline-flex text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg w-52 float-right">
          Add Manufacturer
        </button>
        </div>
      </form>
    </div>
    </>
  );
};

export default page;
