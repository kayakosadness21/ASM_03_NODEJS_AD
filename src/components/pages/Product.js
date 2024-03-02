import classes from "./Product.module.css";
import BannerShop from "../banner/BannerShop";
import ProductTable from "../product/product-table";
import { useEffect, useState } from "react";
import { deleteProductAPI, getAllProductAPI } from "../lib/api-product";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import environment from "../../environment";

const Product = () => {
  const navigate = useNavigate();
  const { productList, deleteNotSucceed } = useSelector(
    (state) => state.productReducer
  );
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);

  const url = `${environment.api.url}${environment.api.product.origin}`;

  // componentDidMount
  // useEffect(() => {
  //   dispatch(getAllProductAPI());
  //   dispatch({ type: "ACTIVE_PRODUCT_PAGE" });
  // }, []);

  // rerender when get all product from DB
  // useEffect(() => {
  //   setProducts(productList);
  // }, [productList]);

  // handle status delete
  // useEffect(() => {
  //   if (deleteNotSucceed) {
  //     alert("Can not delete. This product is used by order collection");
  //     dispatch({ type: "CLEAR_DELETE_SUCCEED" });
  //   }
  // }, [deleteNotSucceed]);

  // search function
  // const searchProductHandler = (e) => {
  //   // search product by name
  //   const searchResult = productList.filter((item) => {
  //     return item.name.toLowerCase().includes(e.target.value.toLowerCase());
  //   });
  //   // set product to showup
  //   setProducts(searchResult);
  // };

  useEffect(() => {
    let callApi = async () => {
      let res = await fetch(url, {
          method: "GET",
          headers: {
              "Content-Type": "application/json"
          }
      })

      if(!res.ok) throw new Error("Call api unsuccess");
      let { status, products} = await res.json();
      if(status) {
          console.log(products);
          setProducts(products);
      }
  }

  callApi();

  }, [])

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

  const onDeleteProductHandler = (event) => {
    let { id } = event.target.dataset;
    console.log(id);
  }

  const addNewHandler = () => {
    navigate("/products/add-new");
  };

  return (
    <div className={classes["product-container"]}>
      <BannerShop text={{ left: "ADMIN", right: "ADMIN" }} />
      <div className={classes["product-content"]}>

        <div className={classes["product-table-container"]}>
          <button className={classes["add-new-btn"]} onClick={addNewHandler}>
            Add New +
          </button>

          <table className="table">
              <thead>
                  <tr>
                  <th scope="col">#</th>
                  <th scope="col">Tên sản phẩm</th>
                  <th scope="col">Ảnh</th>
                  <th scope="col">Giá</th>
                  <th scope="col">Số lượng</th>
                  <th scope="col">Chức năng</th>
                  </tr>
              </thead>
              <tbody>
                  {products.length > 0 && products.map((product, index) => {
                      return (
                          <tr key={product._id}>
                              <th scope="row">{index}</th>
                              <td>{product.name}</td>
                              <td>
                                <img style={{width: "90px"}} src={product.images[0]} alt=""/>
                              </td>
                              <td>{product.price}</td>
                              <td>{product?.quantity}</td>
                              <td>
                                  <button
                                      onClick={onDeleteProductHandler}
                                      className="btn btn-danger mr-2"
                                      data-id={product._id}>Xoá</button>
                                  <button
                                      data-id={product._id}
                                      className="btn btn-warning">Sửa</button>
                              </td>
                          </tr>
                      )
                  })}
              </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default Product;
