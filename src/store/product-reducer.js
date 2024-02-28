const initialState = {
  productList: [],
  succeed: false,
  deleteNotSucceed: false,
};

const productReducer = (state = initialState, action) => {
  // console.log("CHECK ACTION: ", action);
  if (action.type === "GET_ALL_PRODUCT")
    return {
      productList: [...action.payload.data],
      succeed: false,
      deleteNotSucceed: false,
    };

  if (action.type === "DELETE") {
    // state.productList.splice(action.payload, 1);
    const temp = state.productList.filter(
      (item) => item._id !== action.payload
    );
    return {
      productList: [...temp],
      succeed: false,
      deleteNotSucceed: false,
    };
  }
  if (action.type === "UPDATE") {
    const productListUpdated = state.productList.map((item) => {
      if (item._id === action.payload._id) {
        item = action.payload;
      }
      return item;
    });
    return {
      productList: [...productListUpdated],
      succeed: true,
      deleteNotSucceed: false,
    };
  }
  if (action.type === "ADD_NEW") {
    return {
      productList: [...state.productList],
      succeed: true,
      deleteNotSucceed: false,
    };
  }
  // clear add new succeed
  if (action.type === "CLEAR_SUCCEED") {
    return {
      productList: state.productList,
      succeed: false,
      deleteNotSucceed: false,
    };
  }
  if (action.type === "DELETE_NOT_SUCCEED") {
    return {
      productList: state.productList,
      succeed: false,
      deleteNotSucceed: true,
    };
  }
  if (action.type === "CLEAR_DELETE_SUCCEED") {
    return {
      productList: state.productList,
      succeed: false,
      deleteNotSucceed: false,
    };
  }

  return state;
};
export default productReducer;
