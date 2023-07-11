"use client";
import React, { useState, useEffect } from "react";
import Header from "/components/Header";

export default function Home() {
  const [productForm, setProductForm] = useState({
    productName: "",
    quantity: "",
    price: "",
  });

  const [alert, setAlert] = useState("");
  const [products, setProducts] = useState([]);
  const [dropdown, setDropdown] = useState([{
    "_id": "64a8f557212258c3c26e230d",
    "slug": "ka",
    "quantity": "1",
    "price": "1"
    }])

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("http://localhost:3000/api/productb");
      let rjson = await response.json();
      setProducts(rjson.products);
    };
    fetchProducts();
  }, []);

  const addProduct = async (e) => {
    try {
      const response = await fetch("/api/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productForm),
      });

      if (response.ok) {
        // Product added successfully
        console.log("jainam");
        setAlert("Your Product has been added!");
        setProductForm();
      } else {
        // Handle error case
        console.error("Error adding product");
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }

    // Fetch all the products again to sync back
    const response = await fetch("/api/product");
    let rjson = await response.json();
    setProducts(rjson.products);
    e.preventDefault();
  };

  const handleChange = (e) => {
    setProductForm({ ...productForm, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="container mx-auto">
        <Header />

        
        
        {/* Searching a product  */}
        <div className="container mx-auto">
          <div className="text-green-800 text-center"></div>
          <h1 className=" text-3xl font-bold mt-8 my-2">Search a Product</h1>

          <div className="flex items-center mb-4 my-2">
            <input
              type="text"
              // value={searchQuery}
              // onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-gray-300 px-4 py-2 w-full mr-2"
              placeholder="Search..."
            />
            
            <select
              // value={selectedOption}
              // onChange={(e) => setSelectedOption(e.target.value)}
              className="border border-gray-300 px-4 py-2"
            >
              <option value="">All</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>

            <button
              // onClick={handleSearch}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ml-4"
            >
              Search
            </button>
          
          </div>
          
        </div>
        <div className="container">
          {dropdown.map(item=>{
            
          })}
        </div>
       
        
        {/* Adding a product  */}
        <div className="container mx-auto">
          <h1 className="text-3xl font-semibold mb-6">Add a Product</h1>

          <form>
            <div className="mb-4">
              <label htmlFor="productName" className="block mb-2">
                Product Slug
              </label>
              <input
                value={productForm?.slug || ""}
                name="slug"
                onChange={handleChange}
                type="text"
                id="productName"
                className="w-full border border-gray-300 px-4 py-2"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="quantity" className="block mb-2">
                Quantity
              </label>
              <input
                value={productForm?.quantity || ""}
                name="quantity"
                onChange={handleChange}
                type="number"
                id="quantity"
                className="w-full border border-gray-300 px-4 py-2"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="price" className="block mb-2">
                Price
              </label>
              <input
                value={productForm?.price || ""}
                name="price"
                onChange={handleChange}
                type="number"
                id="price"
                className="w-full border border-gray-300 px-4 py-2"
              />
            </div>

            <button
              onClick={addProduct}
              type="submit"
              className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg shadow-md font-semibold"
            >
              Add Product
            </button>
          </form>
        </div>
      </div>

      {/* // Display Current Stock  */}

      <div className="container mx-auto">
        {/* <h1 className="font-bold mb-6 my-10">Display Current Stock </h1> */}

        <h1 className=" text-3xl font-bold mb-6 my-5">Display Current Stock</h1>

        <table className="w-full mt-4">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-200">Product Name</th>
              <th className="py-2 px-4 bg-gray-200">Price</th>
              <th className="py-2 px-4 bg-gray-200">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              return (
                <tr key={product.slug}>
                  <td className="border px-4 py-2">{product.slug}</td>
                  <td className="border px-4 py-2">{product.quantity}</td>
                  <td className="border px-4 py-2">₹{product.price}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
