import { useSelector } from "react-redux";
import classes from "./OrderDetail.module.css";
import BannerShop from "../banner/BannerShop";
import { useParams } from "react-router-dom";
import OrderTableDetail from "../order/order-table-detail";

const OrderDetail = () => {
  // const { user } = useSelector((state) => state.logInReducer);
  const { listOrders } = useSelector((state) => state.orderReducer);
  const { id } = useParams();

  console.log("CHECK LIST ORDER: ", listOrders);
  //fillter products by order id
  const { products, user_id } = listOrders.filter((item) => item._id === id)[0];
  // caculate the total price
  const totalPrice = products.reduce((total, item) => {
    return (total += item.quantity * item.product_id.price);
  }, 0);

  return (
    <div className={classes["order-container"]}>
      <BannerShop text={{ left: "HISTORY", right: "HISTORY" }} />
      <div className={classes["order-content"]}>
        <div>
          <h1>INFORMATION ORDER</h1>
          <h4>ID User: {user_id._id}</h4>
          <h4>Full Name: {user_id.fullName}</h4>
          <h4>Phone: {user_id.phoneNumber}</h4>
          <h4>Address: {user_id.address}</h4>
          <h4>Total: {Intl.NumberFormat("vi").format(totalPrice)} VND</h4>
        </div>
        <div className={classes["order-table-container"]}>
          <OrderTableDetail products={products} />
        </div>
      </div>
    </div>
  );
};
export default OrderDetail;
