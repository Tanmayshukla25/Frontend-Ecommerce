import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";
import { RxCross2 } from "react-icons/rx";
import { PiCurrencyDollarBold } from "react-icons/pi";
import { ToastContainer, toast } from "react-toastify";


function Cart() {
  const { Cart, setCart, cartItems, setCartItems } = useContext(UserContext);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch cart data on component mount
  useEffect(() => {
    async function fetchCart() {
      setLoading(true);
      try {
        const res = await axios.get(
          "https://ecommerce-api-8ga2.onrender.com/api/cart/get",
          { withCredentials: true }
        );
        setCartItems(res.data.items);
        setCart(res.data.items.length); // ✅ Update context Cart count
      } catch (err) {
        console.error("Cart fetch error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchCart();
  }, []);

  // ✅ Calculate total amount whenever cartItems change
  useEffect(() => {
    const total = cartItems.reduce(
      (acc, item) => acc + item.product?.price * item.quantity,
      0
    );
    setTotalAmount(total);
  }, [cartItems]);

  // ✅ Remove item from cart
  async function handleRemoveItem(productId) {
    try {
      await axios.post(
        "https://ecommerce-api-8ga2.onrender.com/api/cart/remove",
        { productId },
        { withCredentials: true }
      );

      // Filter out removed item
      const updatedItems = cartItems.filter(
        (item) => item.product._id !== productId
      );
      setCartItems(updatedItems);
      setCart(updatedItems.length); 
      toast.success("Removed from Cart", {
        position: "bottom-right",
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Remove error:", error);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-8">
      <ToastContainer />
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Your Shopping Cart</h2>

        {cartItems.length === 0 ? (
          <div className="bg-white p-6 rounded-lg shadow text-center text-gray-600">
            Your cart is empty.
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-6 space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.product._id}
                className="flex flex-col sm:flex-row items-center justify-between border-b pb-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    className="w-24 h-24 object-contain rounded-lg"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{item.product.title}</h3>
                    <p className="text-sm text-gray-500">{item.product.category}</p>
                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-4 sm:mt-0">
                  <span className="text-xl font-bold text-green-600 flex items-center">
                    <PiCurrencyDollarBold />
                    {item.product.price}
                  </span>
                  <button
                    onClick={() => handleRemoveItem(item.product._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <RxCross2 size={20} />
                  </button>
                </div>
              </div>
            ))}

            <div className="text-right pt-4 border-t mt-4">
              <p className="text-xl font-semibold text-gray-700">
                Total:{" "}
                <span className="text-green-600">${totalAmount.toFixed(2)}</span>
              </p>
              <button
                className="mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
