import React, { useState, useContext} from "react";
import { CartContext } from "./CartContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { Puff } from "react-loader-spinner";
import { toast } from "react-toastify";
import Modal from "./Modal";
import axios from "axios";
import brisket from "../Images/brisket.jpg";
import pork from "../Images/Pork-Butt.jpg";
import smPork from '../Images/Pork-Butt-small.jpg'
import smBrisket from '../Images/brisket-small.jpeg'
import styles from "../Styles/Menu.module.css";
import MenuItem from "./MenuItem";
import SeasoningsTable from "./SeasoningsTable";
axios.defaults.baseURL =
  process.env.REACT_APP_baseURL || "http://localhost:4000";

const Menu = ({ menuItems }) => {
  const [cart, setCart] = useContext(CartContext);
  const [openModal, setOpenModal] = useState(false);
  const { user } = useAuthContext();

  const itemAdded = () => {
    toast.success("Item Added to Cart!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  const itemNotAdded = () => {
    toast.error("Not enough Stock to add item!");
  };
  const pleaseLogin = () => {
    toast.error("please login or signup to make purchase");
  };

  // on click will set the menu items in cart but only their _ids,
  // only _ids will be sent to server then prices will be fetched from mongoDB
  const handleClick = (item) => {
    if (!user) {
      pleaseLogin();
      return;
    }

    let foundProduct = cart.find((cartItem) => cartItem._id === item._id);
    if (foundProduct && foundProduct.quantity >= item.stock) {
      itemNotAdded();
    } else if (foundProduct) {
      itemAdded();
      setCart(
        cart.map((cartItem) =>
          cartItem._id === item._id
            ? {
                ...cartItem,
                quantity: (cartItem.quantity += 1),
              }
            : cartItem
        )
      );
    } else {
      setCart([...cart, item]);
      itemAdded();
    }
  };

  const onChangeInput = (value, item) => {
    console.log(value);
    console.log(item);
  };

  return (
    <div className={styles.menuContainer}>
      {menuItems ? (
        <div>
          <div className="container">
            <MenuItem
              smImage={smBrisket}
              image={brisket}
              addItem={handleClick}
              item={menuItems[0]}
              onChange={onChangeInput}
            />
            <MenuItem
              smImage={smPork}
              image={pork}
              addItem={handleClick}
              item={menuItems[1]}
              onChange={onChangeInput}
            />
            {/* <MenuItem
             image={chicken}
             addItem={handleClick}
             item={menuItems[2]}
             /> */}
            <SeasoningsTable />
          </div>
          {openModal ? (
            <Modal closeModal={() => setOpenModal(!openModal)} />
          ) : null}
        </div>
      ) : (
        <Puff
          height={100}
          width={100}
          radius={5}
          color="white"
          ariaLabel="ball-triangle-loading"
          wrapperClass={{}}
          wrapperStyle=""
          visible={true}
        />
      )}
    </div>
  );
};
export default Menu;
