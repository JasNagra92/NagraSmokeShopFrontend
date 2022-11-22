import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { BsFillCartFill } from "react-icons/bs";
import { BsFillPersonFill } from "react-icons/bs";
import { CartContext } from "./CartContext";
import styles from "../Styles/Nav.module.css";
import useLogout from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

const DarkNavbar = () => {
  // import cart from context provider to update number of items
  const [cart] = useContext(CartContext);
  const Navigate = useNavigate();
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
    Navigate("/");
  };

  return (
    <div className="container">
      <div className={styles.NavContainer}>
        <div className={styles.Logo}>
          <h5>
            <span id={styles.nagra}>nagra</span> SMOKE HOUSE
          </h5>
        </div>
        <div className={styles.links}>
          <div>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? styles.activeClassName : undefined
              }
            >
              <p className={styles.link}>HOME</p>
            </NavLink>
          </div>
          <div>
            <NavLink
              to="/location"
              className={({ isActive }) =>
                isActive ? styles.activeClassName : undefined
              }
            >
              <p className={styles.link}>LOCATION</p>
            </NavLink>
          </div>
          <div>
            <NavLink
              to="/menu"
              className={({ isActive }) =>
                isActive ? styles.activeClassName : undefined
              }
            >
              <p>MENU</p>
            </NavLink>
          </div>

          {user && (
            <div
              className={({ isActive }) =>
                isActive ? styles.activeClassName : undefined
              }
            >
              <div style={{ display: "flex", gap: "10px" }}>
                <span
                  style={{ cursor: "pointer", marginRight: "10px" }}
                  onClick={() => Navigate("/myAccount")}
                >
                  <BsFillPersonFill size={"25px"} color={"orange"} />
                </span>
                <button onClick={handleClick}>Logout</button>
              </div>
            </div>
          )}
          {!user && (
            <div style={{ display: "flex", gap: "10px" }}>
              <div>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive ? styles.activeClassName : undefined
                  }
                >
                  <p>Login</p>
                </NavLink>
              </div>
              <div>
                <NavLink
                  to="/signup"
                  className={({ isActive }) =>
                    isActive ? styles.activeClassName : undefined
                  }
                >
                  <p>Signup</p>
                </NavLink>
              </div>
            </div>
          )}
          <div>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive ? styles.activeClassName : undefined
              }
            >
              <BsFillCartFill size={"30px"} />
              <div className={styles.cart}>{cart.length}</div>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DarkNavbar;
