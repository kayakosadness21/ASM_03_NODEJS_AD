import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import classes from "./NavBar.module.css";

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loginPage, chatRoomPage, productPage, dashboardPage } = useSelector(
    (state) => state.navBarActiveReducer
  );

  const { isLoggedIn, user, isAdmin } = useSelector(
    (state) => state.logInReducer
  );
  const shareSocket = useSelector((state) => state.storeSocket);


  const [active, setActive] = useState();

  useEffect(() => {
    return () => {
      setActive(null);
    };
  });

  // handle onClick and navigate to page
  const onClickHandler = (e) => {
    //get name attribute
    const nameOftarget = e.target.getAttribute("name");
    setActive(nameOftarget);
    switch (nameOftarget) {
      case "login":
        navigate("/");
        break;
      // case "logout":
      //   localStorage.removeItem("cartState");
      //   dispatch({ type: "ON_LOGOUT" });
      //   navigate("/");
      //   break;
      case "chatRoom":
        navigate("/chat-room");
        break;
      case "product":
        navigate("/products");
        break;
      case "dashboard":
        navigate("/dashboard");
        break;
      case "user":
        navigate("/users");
        break
      case "role":
        navigate("/roles");
        break
      default:
        navigate("/");
    }
  };


  const onLogoutHandler = (e) => {
    shareSocket.socket?.emit("ADMIN-SIGNOUT", {email: user.email});
    localStorage.removeItem("cartState");
    dispatch({ type: "ON_LOGOUT" });
    navigate("/");
  }

  return (
    // NavBar container
    <div className={classes.container}>
      {/* Navbar left */}

      <ul className={classes["nav-bar-left"]}>
        {isLoggedIn && (
          <li
            onClick={onClickHandler}
            name="chatRoom"
            // className={active === "home" || homePage ? classes.active : null}
            className={chatRoomPage ? classes.active : null}
          >
            Chat room
          </li>
        )}
        {isLoggedIn && isAdmin && (
          <>
            <li>|</li>
            <li
              onClick={onClickHandler}
              name="product"
              className={productPage ? classes.active : null}
            >
              Product
            </li>
            <li>|</li>
            <li
              onClick={onClickHandler}
              name="dashboard"
              className={dashboardPage ? classes.active : null}
            >
              Dashboard
            </li>

            <li>|</li>
            <li
              onClick={onClickHandler}
              name="user"
              className={dashboardPage ? classes.active : null}
            >
              Users
            </li>

            <li>|</li>
            <li
              onClick={onClickHandler}
              name="role"
              className={dashboardPage ? classes.active : null}
            >
              Roles
            </li>

          </>
        )}
      </ul>

      {/* Navbar center */}
      <div className={classes["nav-bar-center"]}>BOUTIQUE</div>

      {/* Navbar right */}
      <ul className={classes["nav-bar-right"]}>
        {!isLoggedIn && (
          <li
            className={active === "login" || loginPage ? classes.active : null}
          >
            <svg
              className={classes["login-icon"]}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                name="login"
                onClick={onClickHandler}
                d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"
              />
            </svg>
            <div name="login" onClick={onClickHandler}>
              Login
            </div>
          </li>
        )}

        {isLoggedIn && (
          <li>
            <svg
              className={classes["login-icon"]}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
            </svg>
            <div onClick={onLogoutHandler}>
              {user.fullName}
              <svg
                className={classes["login-icon-arrow-down"]}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
              >
                <path d="M182.6 470.6c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8H288c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128z" />
              </svg>
              <span name="logout">(Logout)</span>
            </div>
          </li>
        )}
      </ul>
    </div>
  );
};
export default NavBar;
