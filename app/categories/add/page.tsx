'use client'
import React, { useState } from 'react';

const categoryAdd = () => {
  const [categoryName, setCategoryName] = useState('');

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Create an object with the data to be sent to the API
      const categoryData = {
        name: categoryName,
      };

      // Make a POST request to your API endpoint
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(categoryData),
      });

      if (response.status === 200) {
        // Successfully added the category
        alert('Category added successfully');
        // Clear the form
        setCategoryName('');
      } else {
        // Handle errors here
        alert('Failed to add category');
      }
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  return (
    <>
      <div className="container mx-auto mt-10 p-5 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-semibold mb-6">Add Category</h1>
        <form onSubmit={handleFormSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray">
                Category Name
              </label>
              <input
                type="text"
                id="categoryName"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Category Name"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                required
              />
            </div>
          </div>
          <button
            type="submit"
            style={{marginTop:'-3.55%', marginRight:'32%'}}
            className=" text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg w-52 float-right"
          >
            Add Category
          </button>
        </form>
      </div>
    </>
  );
};

export default categoryAdd;
