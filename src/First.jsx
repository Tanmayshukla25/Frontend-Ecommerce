import { useState } from "react";
import { UserContext } from "./UserContext";
import { Outlet } from "react-router-dom";
import Header from "./Header";

function First() {
  const [Cart, setCart] = useState(0);
  const [addtocartid, setAddtocartid] = useState([]);
  const [data, setData] = useState([]);
  const [Quantity, setQuantity] = useState({});
  const [AddtoWishlist, setAddtoWishlist] = useState([]);
  const [input, setInput] = useState("");
  return (
    <UserContext.Provider
      value={{
        Cart,
        setCart,
        addtocartid,
        setAddtocartid,
        data,
        setData,
        Quantity,
        setQuantity,
        AddtoWishlist,
        setAddtoWishlist,
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
