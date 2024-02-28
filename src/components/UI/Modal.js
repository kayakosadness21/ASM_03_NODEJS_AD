import { forwardRef, useState, useImperativeHandle } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Modal.module.css";

const Modal = forwardRef((props, ref) => {
  const [amiClose, setAmiClose] = useState(false);
  const navigation = useNavigate();
  const product = props.data;
  // console.log("CHECK DATA: ", props.data);

  // parent component can call "closeModal()" in children component via ref
  useImperativeHandle(ref, () => {
    return {
      closeModal() {
        closeHandler();
      },
    };
  });

  // handle close
  const closeHandler = () => {
    setAmiClose(true);
    props.onClick(); //close modal
  };

  // Handle press key Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeHandler();
    }
  });
  const viewDetailHandler = () => {
    closeHandler();
    navigation("/cart");
  };
  // set animation when close
  const addClass = amiClose
    ? `${classes["modal-container"]} + ${classes["ami-close"]}`
    : classes["modal-container"];
  // stop event. do not bubble up.
  const stopPropagationHandler = (e) => {
    e.stopPropagation();
  };
  return (
    <div className={addClass} onClick={stopPropagationHandler}>
      {/* Image of product */}
      <div className={classes.image}>
        <img src={product.images[0]} alt={product.name} />
      </div>
      {/* Content of product */}
      <div className={classes.content}>
        <h2 className={classes.title}>{product.name}</h2>
        <div className={classes.price}>
          {new Intl.NumberFormat("vi").format(product.price)} VND
        </div>
        <p className={classes.desc}>{product.short_desc}</p>
        <button>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
            <path d="M24 0C10.7 0 0 10.7 0 24S10.7 48 24 48H76.1l60.3 316.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24-10.7 24-24s-10.7-24-24-24H179.9l-9.1-48h317c14.3 0 26.9-9.5 30.8-23.3l54-192C578.3 52.3 563 32 541.8 32H122l-2.4-12.5C117.4 8.2 107.5 0 96 0H24zM176 512c26.5 0 48-21.5 48-48s-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48zm336-48c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48z" />
          </svg>
          <span onClick={viewDetailHandler}>View Detail</span>
        </button>
      </div>
      {/* Close icon */}
      <div className={classes.close}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 512"
          onClick={closeHandler}
        >
          <path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z" />
        </svg>
      </div>
    </div>
  );
});
export default Modal;
