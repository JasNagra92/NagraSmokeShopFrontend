import { useState, useEffect } from "react";
import axios from "../services/axios";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./CartContext";
import { ToastContainer } from "react-toastify";
import { AuthContextProvider } from "./authContext";
import DarkNavbar from "./DarkNavbar";
import "../Styles/App.css";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
import Menu from "./Menu";
import Home from "./Home";
import Cart from "./Cart";
import OrderConfirmation from "./OrderConfirmation";
import Cancelled from "./Cancelled";
import Signup from "./Signup";
import Login from "./Login";
import Location from "./Location";
import MyAccount from "./MyAccount";

function App() {
  const [menuItems, setMenuItems] = useState(null);

  useEffect(() => {
    let menu;
    const getMenuItems = async () => {
      try {
        const data = await axios.get("/menu");
        console.log(data);
        const menuArray = data.data.menu;
        menu = menuArray.map((menuItem) => {
          return { ...menuItem, quantity: 1 };
        });
      } catch (ex) {
        console.log(ex);
      }

      setMenuItems(menu);
    };
    getMenuItems();
  }, []);

  return (
    <BrowserRouter>
      <AuthContextProvider>
        <CartProvider>
          <div className="background">
            <div className="overlay">
              <ToastContainer autoClose={2000} />
              <DarkNavbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/location" element={<Location />} />
                <Route path="/menu" element={<Menu menuItems={menuItems} />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/success" element={<OrderConfirmation />} />
                <Route path="/cancelled=true" element={<Cancelled />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/myAccount" element={<MyAccount />} />
              </Routes>
            </div>
          </div>
        </CartProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
