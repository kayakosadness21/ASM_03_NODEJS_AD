import classes from "./Product.module.css";
import BannerShop from "../banner/BannerShop";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import environment from "../../environment";

const Product = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  const url = `${environment.api.url}${environment.api.product.origin}`;
  const urlDestroy = `${environment.api.url}${environment.api.product.destroyProduct}`;
  const localState = JSON.parse(localStorage.getItem("cartState"));

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

  }, [reload])

  const addNewHandler = () => {
    navigate("/products/add-new");
  };

  const onUpdateProductHandler = (event) => {
    let { id } = event.target.dataset;
    navigate(`/products/update/${id}`);
  }

  const onDestroyProductHandler = async(event) => {
    let { id } = event.target.dataset;

    let res = await fetch(urlDestroy, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": localState.logInReducer.user.token
        },
        body: JSON.stringify({id})
    })

    if(!res.ok) throw new Error("Call api unsuccess");
    let { status} = await res.json();
    if(status) {
      setReload(!reload);
    }
  }

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
                                      onClick={onDestroyProductHandler}
                                      className="btn btn-danger mr-2"
                                      data-id={product._id}>Xoá</button>
                                  <button
                                    onClick={onUpdateProductHandler}
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
