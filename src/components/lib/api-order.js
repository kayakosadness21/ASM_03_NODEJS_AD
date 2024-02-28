import setHearder from "./set_hearder_auth";
export const orderAPI = (userId) => {
  return async (dispatch) => {
    // send request to Server
    const res = await fetch(
      process.env.REACT_APP_DOMAIN +
        `/order/get-orders-by-user?userId=${userId}`,
      {
        method: "GET",
        headers: setHearder({
          "Content-Type": "application/json",
        }),
      }
    );
    // 200 = ok
    if (res.status === 200) {
      const data = await res.json();
      dispatch({ type: "GET_ORDER", payload: data });
    }
  };
};
export const getAllOrderAPI = () => {
  return async (dispatch) => {
    // send request to Server
    const res = await fetch(
      process.env.REACT_APP_DOMAIN + `/order/get-all-order`,
      {
        method: "GET",
        headers: setHearder({
          "Content-Type": "application/json",
        }),
      }
    );
    // 200 = ok
    if (res.status === 200) {
      const data = await res.json();
      dispatch({ type: "GET_ORDER", payload: data });
    }
  };
};
