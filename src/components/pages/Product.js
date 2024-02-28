import classes from "./Product.module.css";
import BannerShop from "../banner/BannerShop";
import ProductTable from "../product/product-table";
import { useEffect, useState } from "react";
import { deleteProductAPI, getAllProductAPI } from "../lib/api-product";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Product = () => {
  const navigate = useNavigate();
  const { productList, deleteNotSucceed } = useSelector(
    (state) => state.productReducer
  );
  const dispatch = useDispatch();
  const [products, setProducts] = useState(null);
  // componentDidMount
  useEffect(() => {
    dispatch(getAllProductAPI());
    dispatch({ type: "ACTIVE_PRODUCT_PAGE" });
  }, []);
  // rerender when get all product from DB
  useEffect(() => {
    setProducts(productList);
  }, [productList]);
  // handle status delete
  useEffect(() => {
    if (deleteNotSucceed) {
      alert("Can not delete. This product is used by order collection");
      dispatch({ type: "CLEAR_DELETE_SUCCEED" });
    }
  }, [deleteNotSucceed]);
  // search function
  const searchProductHandler = (e) => {
    // search product by name
    const searchResult = productList.filter((item) => {
      return item.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    // set product to showup
    setProducts(searchResult);
  };
  // crud handler
  const crudHandler = (type, productId) => {
    if (type === "delete") {
      if (!window.confirm(`Do you want to delete id: ${productId}?`)) return;
      dispatch(deleteProductAPI(productId));
    }
    if (type === "update") {
      navigate(`/products/update/${productId}`);
      // const searchResult=data.filter(item=>item._id!==payload)
      // setProducts(searchResult)
      // return
    }
  };
  const addNewHandler = () => {
    navigate("/products/add-new");
  };
  return (
    <div className={classes["product-container"]}>
      <BannerShop text={{ left: "ADMIN", right: "ADMIN" }} />
      <div className={classes["product-content"]}>
        <div>
          <h4>Products</h4>
          <input
            type="text"
            placeholder="Enter search"
            onChange={searchProductHandler}
          />
        </div>
        <div className={classes["product-table-container"]}>
          <button className={classes["add-new-btn"]} onClick={addNewHandler}>
            Add New +
          </button>
          {productList?.length > 0 && (
            <ProductTable products={products} crud={crudHandler} />
          )}
        </div>
      </div>
    </div>
  );
};
export default Product;
