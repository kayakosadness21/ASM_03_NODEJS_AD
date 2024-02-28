import classes from "./ProductUpdate.module.css";
import BannerShop from "../banner/BannerShop";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { updateProductAPI } from "../lib/api-product";

const ProductUpdate = () => {
  const { id } = useParams();
  const refProductName = useRef();
  const refCategory = useRef();
  const refShortDescription = useRef();
  const refLongDescription = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { productList, succeed } = useSelector((state) => state.productReducer);
  const productUpdate = productList?.filter((item) => item._id === id)[0];
  // add data product to control
  useEffect(() => {
    refProductName.current.value = productUpdate.name;
    refCategory.current.value = productUpdate.category;
    refShortDescription.current.value = productUpdate.short_desc;
    refLongDescription.current.value = productUpdate.long_desc;
  }, []);

  const updateProductHandler = () => {
    productUpdate.name = refProductName.current.value;
    productUpdate.category = refCategory.current.value;
    productUpdate.short_desc = refShortDescription.current.value;
    productUpdate.long_desc = refLongDescription.current.value;
    dispatch(updateProductAPI(productUpdate));
  };
  // waiting for save succeed, then navigation to /products
  useEffect(() => {
    if (!succeed) return;
    dispatch({ type: "CLEAR_SUCCEED" });
    navigate("/products");
  }, [succeed]);
  return (
    <div className={classes["product-container"]}>
      <BannerShop text={{ left: "ADMIN", right: "UPDATE" }} />
      <div className={classes["product-content"]}>
        <div className={classes["product-name"]}>
          <label htmlFor="product-name">Product Name</label>
          <input
            type="text"
            id="product-name"
            placeholder="Enter product name"
            ref={refProductName}
          />
        </div>
        <div className={classes["category"]}>
          <label htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            placeholder="Enter category"
            ref={refCategory}
          />
        </div>
        <div className={classes["short-description"]}>
          <label htmlFor="short-description">Short Description</label>
          <textarea
            id="short-description"
            placeholder="Enter short description"
            rows={5}
            ref={refShortDescription}
          />
        </div>
        <div className={classes["long-description"]}>
          <label htmlFor="long-description">Long description</label>
          <textarea
            id="long-description"
            placeholder="Enter long description"
            rows={10}
            ref={refLongDescription}
          />
        </div>
        <button onClick={updateProductHandler}>Submit</button>
      </div>
    </div>
  );
};
export default ProductUpdate;
