import setHearder from "./set_hearder_auth";

// import setHearder from "./set_hearder_auth";
export const getAllProductAPI = () => {
  return async (dispatch) => {
    // send request to Server
    const res = await fetch(
      process.env.REACT_APP_DOMAIN + "/product/get-all-products"
    );
    // 200 = ok
    if (res.status === 200) {
      const data = await res.json();
      dispatch({ type: "GET_ALL_PRODUCT", payload: data });
    }
  };
};
export const deleteProductAPI = (productId) => {
  return async (dispatch) => {
    // send request to Server
    const res = await fetch(
      process.env.REACT_APP_DOMAIN +
        `/product/delete-product?productId=${productId}`,
      {
        method: "DELETE",
        headers: setHearder({
          "Content-Type": "application/json",
        }),
      }
    );
    // 200 = ok
    if (res.status === 200) {
      dispatch({ type: "DELETE", payload: productId });
    }
    if (res.status === 402) {
      dispatch({ type: "DELETE_NOT_SUCCEED", payload: productId });
    }
  };
};
export const updateProductAPI = (product) => {
  return async (dispatch) => {
    // send request to Server
    const res = await fetch(
      process.env.REACT_APP_DOMAIN + `/product/update-product`,
      {
        method: "POST",
        headers: setHearder({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(product),
      }
    );
    // 200 = ok
    if (res.status === 200) {
      dispatch({ type: "UPDATE", payload: product });
    }
  };
};
export const addNewProductAPI = (payload) => {
  console.log("CHECK DISPATCH DATA: ", payload);
  // crate formData
  let data = new FormData();
  // add image file to form data
  data.append("userId", payload.userId);
  data.append("category", payload.product.category);
  data.append("long_desc", payload.product.long_desc);
  data.append("name", payload.product.name);
  data.append("short_desc", payload.product.short_desc);
  data.append("price", payload.product.price);
  data.append("quantity", payload.product.quantity);
  payload.product.images.forEach((file, index) => {
    data.append("multiple_images", file, file.name);
  });
  // data.append('name', newItem.name);
  return async (dispatch) => {
    // send request to Server
    const res = await fetch(
      process.env.REACT_APP_DOMAIN + `/product/add-new-product`,
      {
        method: "POST",
        headers: setHearder(),
        body: data,
      }
    );
    // 200 = ok
    if (res.status === 200) {
      const product = await res.json();
      dispatch({ type: "ADD_NEW" });
    }
  };
};
