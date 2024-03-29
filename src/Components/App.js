import { useState, useEffect } from "react";
import axios from "axios";
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

axios.defaults.baseURL =
  process.env.REACT_APP_baseURL || "http://localhost:4000";

function App() {
  const [menuItems, setMenuItems] = useState(null);

  useEffect(() => {
    let menu;
    const getMenuItems = async () => {
      try {
        const data = await axios.get("/api/menu");
        console.log(data);
        const menuArray = data.data.items;
        menu = menuArray.map((menuItem) => {
          return { ...menuItem, quantity: 1 };
        });
      } catch (ex) {
        if (
          ex &&
          ex !== undefined &&
          ex.toString &&
          ex.toString !== undefined
        ) {
          // print the general exception
          console.log(ex.toString());
        }
        if (
          ex.response &&
          ex.response !== undefined &&
          ex.response.data &&
          ex.response.data !== undefined
        ) {
          // print the exception message from axios response
          console.log(ex.response.data);
        }
      }

      setMenuItems(menu);
    };
    getMenuItems();
  }, []);

  return (
    <BrowserRouter>
      <AuthContextProvider>
        <CartProvider>
          <div class="background">
            <div class="overlay">
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
