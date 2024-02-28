import { useState } from "react";
import classes from "./menu-shop.module.css";

const MenuShop = (props) => {
  const [active, setActive] = useState("all");
  const onClickHandler = (e) => {
    // set active
    const name = e.target.getAttribute("name");
    setActive(name);
    // filter
    props.onCategoryFilter(name);
  };
  return (
    <div className={classes["menu-container"]}>
      <h2>CATGORIES</h2>
      <div className={classes.header}>APPLE</div>
      <p
        className={active === "all" ? classes.active : null}
        onClick={onClickHandler}
        name="all"
      >
        All
      </p>
      <div className={classes["sub-header"]}>iPHONE & MAC</div>
      <ul>
        <li
          className={active === "iphone" ? classes.active : null}
          onClick={onClickHandler}
          name="iphone"
        >
          iPhone
        </li>
        <li
          className={active === "ipad" ? classes.active : null}
          onClick={onClickHandler}
          name="ipad"
        >
          ipad
        </li>
        <li
          className={active === "macbook" ? classes.active : null}
          onClick={onClickHandler}
          name="macbook"
        >
          Macbook
        </li>
      </ul>
      <div className={classes["sub-header"]}>WIRELESS</div>
      <ul>
        <li
          className={active === "airpod" ? classes.active : null}
          onClick={onClickHandler}
          name="airpod"
        >
          Airpod
        </li>
        <li
          className={active === "watch" ? classes.active : null}
          onClick={onClickHandler}
          name="watch"
        >
          Watch
        </li>
      </ul>
      <div className={classes["sub-header"]}>OTHER</div>
      <ul>
        <li
          className={active === "mouse" ? classes.active : null}
          onClick={onClickHandler}
          name="mouse"
        >
          Mouse
        </li>
        <li
          className={active === "keyboard" ? classes.active : null}
          onClick={onClickHandler}
          name="keyboard"
        >
          Keyboard
        </li>
        <li
          className={active === "other" ? classes.active : null}
          onClick={onClickHandler}
          name="other"
        >
          Other
        </li>
      </ul>
    </div>
  );
};
export default MenuShop;
