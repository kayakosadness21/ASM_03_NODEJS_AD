import Modal from "../UI/Modal";
import classes from "./popup-product-detail.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useRef } from "react";

const PopupProductDetail = () => {
  const refModal = useRef();
  // call closeModal() from child component (<Modal/>)
  const onClickBackgroundHandler = () => {
    refModal.current.closeModal();
  };
  const productDetail = useSelector(
    (state) => state.productDetailReducer.productDetail
  );
  const dispatch = useDispatch();
  // dispatch an action to hide Modal to Redux
  const closeHandler = () => {
    setTimeout(() => {
      dispatch({ type: "HIDE_POPUP" });
    }, 300);
  };
  console.log("CHECK PRODUCT DETAIL: ", productDetail);
  return (
    <div className={classes.background} onClick={onClickBackgroundHandler}>
      <Modal data={productDetail} onClick={closeHandler} ref={refModal} />
    </div>
  );
};
export default PopupProductDetail;
