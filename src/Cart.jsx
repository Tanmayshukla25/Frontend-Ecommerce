import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "./UserContext";
import axios from "axios";

function Cart() {
  const { addtocartid, setAddtocartid, Cart, setCart, Quantity, setQuantity } = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  
  useEffect(() => {
    async function fetchData() {
      if (addtocartid.length === 0) return;

      try {
        const results = await Promise.all(
          addtocartid.map(async (id) => {
            const response = await axios.get(`https://ecommerce-api-8ga2.onrender.com/api/product/${id}`);
            return response.data;
          })
        );

       
        const newQuantities = {};
        results.forEach((item) => {
          if (!Quantity[item.id]) newQuantities[item.id] = 1;
        });
        setQuantity((prev) => ({ ...prev, ...newQuantities }));

        setProducts(results);
      } catch (error) {
        console.error("Failed to fetch cart products:", error);
      }
    }

    fetchData();
  }, [addtocartid]);


  function increment(id) {
    setQuantity((prev) => ({
      ...prev,
      [id]: (prev[id] || 1) + 1,
    }));
  }

 
  function decrement(id) {
    setQuantity((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) - 1),
    }));
  }

 
  function removeFromCart(index, productId) {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);

    const updatedIds = [...addtocartid];
    updatedIds.splice(index, 1);
    setAddtocartid(updatedIds);

    setCart(Cart - 1);

    const updatedQuantities = { ...Quantity };
    delete updatedQuantities[productId];
    setQuantity(updatedQuantities);
  }

  
  useEffect(() => {
    let total = 0;
    products.forEach((item) => {
      const qty = Quantity[item.id] || 1;
      total += item.price * qty;
    });
    setTotalAmount(total);
  }, [products, Quantity]);

  if (addtocartid.length === 0) {
    return (
      <h1 className="text-center text-2xl font-semibold text-gray-700 mt-24">
        🛒 Cart is empty
      </h1>
    );
  }

  return (
    <div className="mt-24 w-full mx-auto px-4 space-y-6">
      {products.map((item, index) => (
        <div
          key={item.id}
          className="flex flex-col md:flex-row items-center justify-between border rounded-lg shadow-md p-4 bg-white"
        >
          <div className="w-52 h-42 flex-shrink-0 flex items-center justify-center bg-gray-100 rounded-md">
            <img src={item.url} alt={item.title} className="h-42 object-contain" />
          </div>

          <div className="flex-1 md:ml-6 mt-4 md:mt-0 space-y-1">
            <h2 className="text-lg font-semibold text-gray-800">{item.title}</h2>
            <h3 className="text-gray-600">Price: ${item.price}</h3>
            <h3 className="text-gray-600">Rating: {item.rating?.rate}</h3>
            <h3 className="text-gray-600">Count: {item.rating?.count}</h3>
            <div className="flex items-center mt-2 space-x-3">
              <button
                onClick={() => decrement(item.id)}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                -
              </button>
              <span className="font-medium text-gray-700">{Quantity[item.id] || 1}</span>
              <button
                onClick={() => increment(item.id)}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                +
              </button>
            </div>
          </div>

          <div className="mt-4 md:mt-0 md:ml-6 text-right">
            <span className="block text-sm text-gray-500 mb-1">Remove</span>
            <button
              onClick={() => removeFromCart(index, item.id)}
              className="text-red-500 text-2xl hover:text-red-700"
            >
              &times;
            </button>
          </div>
        </div>
      ))}

      <hr className="border-t border-gray-300" />

      <div className="text-right text-xl font-semibold text-gray-800">
        GRAND TOTAL: ${totalAmount.toFixed(2)}
      </div>
    </div>
  );
}

export default Cart;