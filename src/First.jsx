import { useState } from "react";
import { UserContext } from "./UserContext";
import { Outlet } from "react-router-dom";
import Header from "./Header";

function First() {
  const [Cart, setCart] = useState(0);
  const [addtocartid, setAddtocartid] = useState([]);
  const [data, setData] = useState([]);
  const [Quantity, setQuantity] = useState({});
  const [wishlistIds, setWishlistIds] = useState([]);
  const [input, setInput] = useState("");

  const AddtoWishlist = (productId) => {
    setWishlistIds((prev) => {
      if (prev.includes(productId)) return prev;
      return [...prev, productId];
    });
  };

  return (
    <UserContext.Provider
      value={{
        Cart,
        setCart,
        wishlistIds,
        setWishlistIds,
        addtocartid,
        setAddtocartid,
        data,
        setData,
        Quantity,
        setQuantity,
        AddtoWishlist,
        input,
        setInput,
      }}
    >
      <Header />
      <Outlet />
    </UserContext.Provider>
  );
}

export default First;
