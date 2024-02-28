import classes from "./Dashboard.module.css";
import BannerShop from "../banner/BannerShop";
import OrderTable from "../order/order-table";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllOrderAPI } from "../lib/api-order";

const Dashboard = () => {
  const { listOrders } = useSelector((state) => state.orderReducer);
  const dispatch = useDispatch();
  // count number of client that bought
  let numberOfClient = 0;
  let orders = [...listOrders];
  while (orders?.length > 0) {
    orders = orders.filter((item) => {
      return item.user_id._id !== orders[0].user_id._id;
    });
    ++numberOfClient;
  }
  // count number of order
  const numberOfOrder = listOrders?.length;
  // total earning of month
  let totalPrice = 0;
  console.log("CHECK ORDER", listOrders);
  listOrders &&
    listOrders.map((item, index) => {
      // total price
      totalPrice += item.products.reduce((total, product) => {
        return (total += product.quantity * product.product_id?.price);
      }, 0);
      return;
    });

  // componetDidMount
  useEffect(() => {
    dispatch({ type: "ACTIVE_DASHBOARD_PAGE" });
    dispatch(getAllOrderAPI());
  }, []);

  return (
    <div className={classes["dashboard-container"]}>
      <BannerShop text={{ left: "ADMIN", right: "ADMIN" }} />
      <div className={classes["dashboard-content"]}>
        {/* Dashboard Header */}
        <h4>Dashboard</h4>
        <div className={classes["dashboard-header"]}>
          <div className={classes["client"]}>
            <div className={classes["client-left"]}>
              <div className={classes["number"]}>{numberOfClient}</div>
              <div className={classes["label"]}>Client</div>
            </div>
            <div className={classes["client-right"]}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                <path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM504 312V248H440c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V136c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H552v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
              </svg>
            </div>
          </div>
          <div className={classes["earning"]}>
            <div className={classes["earning-left"]}>
              <div className={classes["number"]}>
                {Intl.NumberFormat("vi").format(totalPrice / 12)}
                <span>VND</span>
              </div>
              <div className={classes["label"]}>
                Earnings of Month (Average)
              </div>
            </div>
            <div className={classes["earning-right"]}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                <path d="M160 0c17.7 0 32 14.3 32 32V67.7c1.6 .2 3.1 .4 4.7 .7c.4 .1 .7 .1 1.1 .2l48 8.8c17.4 3.2 28.9 19.9 25.7 37.2s-19.9 28.9-37.2 25.7l-47.5-8.7c-31.3-4.6-58.9-1.5-78.3 6.2s-27.2 18.3-29 28.1c-2 10.7-.5 16.7 1.2 20.4c1.8 3.9 5.5 8.3 12.8 13.2c16.3 10.7 41.3 17.7 73.7 26.3l2.9 .8c28.6 7.6 63.6 16.8 89.6 33.8c14.2 9.3 27.6 21.9 35.9 39.5c8.5 17.9 10.3 37.9 6.4 59.2c-6.9 38-33.1 63.4-65.6 76.7c-13.7 5.6-28.6 9.2-44.4 11V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V445.1c-.4-.1-.9-.1-1.3-.2l-.2 0 0 0c-24.4-3.8-64.5-14.3-91.5-26.3c-16.1-7.2-23.4-26.1-16.2-42.2s26.1-23.4 42.2-16.2c20.9 9.3 55.3 18.5 75.2 21.6c31.9 4.7 58.2 2 76-5.3c16.9-6.9 24.6-16.9 26.8-28.9c1.9-10.6 .4-16.7-1.3-20.4c-1.9-4-5.6-8.4-13-13.3c-16.4-10.7-41.5-17.7-74-26.3l-2.8-.7 0 0C119.4 279.3 84.4 270 58.4 253c-14.2-9.3-27.5-22-35.8-39.6c-8.4-17.9-10.1-37.9-6.1-59.2C23.7 116 52.3 91.2 84.8 78.3c13.3-5.3 27.9-8.9 43.2-11V32c0-17.7 14.3-32 32-32z" />
              </svg>
            </div>
          </div>
          <div className={classes["client"]}>
            <div className={classes["client-left"]}>
              <div className={classes["number"]}>{numberOfOrder}</div>
              <div className={classes["label"]}>New Order</div>
            </div>
            <div className={classes["client-right"]}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                <path d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM160 240c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v48h48c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H224v48c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V352H112c-8.8 0-16-7.2-16-16V304c0-8.8 7.2-16 16-16h48V240z" />
              </svg>
            </div>
          </div>
        </div>
        {/* Dashboard Table */}
        <div className={classes["dashboard-table-container"]}>
          <OrderTable />
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
