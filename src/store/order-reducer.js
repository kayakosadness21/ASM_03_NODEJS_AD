const initialStateOrder = {
  listOrders: [],
};

const orderReducer = (state = initialStateOrder, action) => {
  //   const { total, listCart } = state;
  //   console.log("CHECK listCart in action: ", action);
  switch (action.type) {
    case "GET_ORDER":
      return {
        listOrders: [...action.payload.orders],
      };
    default:
      return state;
  }
};

export default orderReducer;
