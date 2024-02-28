import setHearder from "./set_hearder_auth";

// const URL =
//   "https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74";

const URL = process.env.REACT_APP_DOMAIN;
// Fetch all products
export const getProducts = async () => {
  const res = await fetch(URL + "/product/get-all-products");
  const data = await res.json();
  if (!res.ok) {
    throw new Error("Something wrong");
  }
  return data.data;
};

export const addNewOrder = async (order) => {
  const res = await fetch(URL + "/order/add-new-order", {
    method: "POST",
    headers: setHearder({
      "Content-Type": "application/json",
    }),
    body: JSON.stringify(order),
  });
  const data = await res.json();
  // console.log("CHCK DATA IN API: ", res);
  if (!res.ok) {
    throw new Error("Something wrong");
  }
  return data;
};

// Fetch product by id
// export const getProductByID = async (id) => {
//   const res = await fetch(URL);
//   const data = await res.json();
//   if (!res.ok) {
//     throw new Error("Something wrong");
//   }
//   return data.filter((item) => item._id.$oid === id);
// };
