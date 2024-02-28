import { forwardRef, useEffect, useState } from "react";
import classes from "./InputOrderedProducts.module.css";

const InputOrderedProducts = forwardRef((props, ref) => {
  // const [count, setCount] = useState(props.quantity ? props.quantity : 1);
  const [count, setCount] = useState(props.quantity);

  useEffect(() => {
    setCount(props.quantity);
  }, [props.quantity]);

  const decreaseHandler = () => {
    if (count > 1) {
      if (props.isInCartTable) {
        props.onDecreaseHandler();
      } else {
        setCount((count) => --count);
      }
    }
  };
  const increaseHandler = () => {
    if (props.isInCartTable) {
      props.onIncreaseHandler();
    } else {
      setCount((count) => ++count);
    }
  };

  return (
    <div className={classes["input-container"]}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 256 512"
        onClick={decreaseHandler}
      >
        <path d="M9.4 278.6c-12.5-12.5-12.5-32.8 0-45.3l128-128c9.2-9.2 22.9-11.9 34.9-6.9s19.8 16.6 19.8 29.6l0 256c0 12.9-7.8 24.6-19.8 29.6s-25.7 2.2-34.9-6.9l-128-128z" />
      </svg>
      <label ref={ref} data-value={count}>
        {count}
      </label>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 256 512"
        onClick={increaseHandler}
      >
        <path d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z" />
      </svg>
    </div>
  );
});
export default InputOrderedProducts;
