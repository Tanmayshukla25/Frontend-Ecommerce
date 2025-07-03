import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "./UserContext";
import axios from "axios";

function Cart() {
  const { addtocartid, setAddtocartid, Cart, setCart, Quantity, setQuantity } = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    if (addtocartid.length === 0) return;

    async function fetchCartItemsSequentially() {
      const items = [];

      for (let id of addtocartid) {
        try {
          const response = await axios.get(`https://ecommerce-api-8ga2.onrender.com/api/product/${id}`);
          items.push(response.data);
        } catch (err) {
          console.error(`Error fetching product ${id}:`, err);
        }
      }

 
      const initialQty = {};
      items.forEach(item => {
        if (!Quantity[item.id]) initialQty[item.id] = 1;
      });
      setQuantity(prev => ({ ...prev, ...initialQty }));

      setProducts(items);
    }

    fetchCartItemsSequentially();
  }, [addtocartid]);

  useEffect(() => {
    let total = 0;
    products.forEach(item => {
      total += item.price * (Quantity[item.id] || 1);
    });
    setTotalAmount(total);
  }, [products, Quantity]);

  const increment = (id) => {
    setQuantity(prev => ({ ...prev, [id]: (prev[id] || 1) + 1 }));
  };

  const decrement = (id) => {
    setQuantity(prev => ({ ...prev, [id]: Math.max(1, (prev[id] || 1) - 1) }));
  };

  const removeFromCart = (index, id) => {
    setProducts(prev => prev.filter((_, i) => i !== index));
    const newIds = [...addtocartid];
    newIds.splice(index, 1);
    setAddtocartid(newIds);
    setCart(prev => prev - 1);

    const updatedQty = { ...Quantity };
    delete updatedQty[id];
    setQuantity(updatedQty);
  };

  if (addtocartid.length === 0) {
    return <h2 className="text-center mt-24 text-xl font-semibold">🛒 Your cart is empty!</h2>;
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
