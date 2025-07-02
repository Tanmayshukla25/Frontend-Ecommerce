import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { LuLogIn, LuLogOut } from "react-icons/lu";
import { UserContext } from "./UserContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function Header() {
  const { input, setInput, Cart } = useContext(UserContext);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation(); 

  const fetchUser = async () => {
    try {
      const res = await axios.get("https://ecommerce-api-8ga2.onrender.com/user/me", {
        withCredentials: true,
      });
      setUser(res.data);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

 
  useEffect(() => {
    fetchUser();
  }, [location]);

  const handleLogout = async () => {
    try {
      const logout = await axios.post(
        "https://ecommerce-api-8ga2.onrender.com/user/logout",
        {},
        { withCredentials: true }
      );

      toast.success("Logout Successfully", {
        position: "bottom-right",
        autoClose: 3000,
      });

      setUser(null);

      if (logout.status === 200) {
        navigate("/login");
      }
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <div className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <ToastContainer />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
        
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-gray-900">
              <Link to="/" className="hover:text-blue-600 transition-colors duration-200">
                Ecommerce
              </Link>
            </h1>
          </div>

     
          <nav className="flex items-center space-x-8">
         
            <div className="hidden md:block">
              <input
                type="text"
                className="w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none placeholder-gray-500"
                placeholder="Search Products With Ecommerce"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>

         
            <ul className="flex items-center space-x-6">
              <li>
                <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/cart" className="relative text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
                  Cart
                  <sup className="absolute -top-2 -right-4 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {Cart || 0}
                  </sup>
                </Link>
              </li>

             
              <li>
                {loading ? null : user ? (
                  <button
                    className="p-2 text-gray-700 hover:text-red-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
                    onClick={handleLogout}
                    title="Logout"
                  >
                    <LuLogOut size={23} />
                  </button>
                ) : (
                  <Link to="/login">
                    <button
                      className="p-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
                      title="Login"
                    >
                      <LuLogIn size={23} />
                    </button>
                  </Link>
                )}
              </li>
            </ul>
          </nav>
        </div>

       
        <div className="md:hidden pb-4">
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none placeholder-gray-500"
            placeholder="Search Products With Ecommerce"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
