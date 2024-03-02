import classes from "./ProductUpdate.module.css";
import BannerShop from "../banner/BannerShop";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { updateProductAPI } from "../lib/api-product";
import environment from "../../environment";

const ProductUpdate = () => {
  const { id } = useParams();

  const refProductName = useRef();
  const refCategory = useRef();
  const refShortDescription = useRef();
  const refLongDescription = useRef();
  const refProductPrice = useRef();
  const refProductQuantity = useRef();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { productList, succeed } = useSelector((state) => state.productReducer);
  const productUpdate = productList?.filter((item) => item._id === id)[0];

  let url = `${environment.api.url}${environment.api.product.origin}/${id}`;
  let urlUpdate = `${environment.api.url}${environment.api.product.updateProduct}`;

  const localState = JSON.parse(localStorage.getItem("cartState"));

  // add data product to control
  useEffect(() => {
    // refProductName.current.value = productUpdate.name;
    // refCategory.current.value = productUpdate.category;
    // refShortDescription.current.value = productUpdate.short_desc;
    // refLongDescription.current.value = productUpdate.long_desc;

    let callApi = async () => {
        let res = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })

        if(!res.ok) throw new Error("Call api unsuccess");
        let { status, product} = await res.json();

        if(status) {
            console.log(product);

            refProductName.current.value = product.name;
            refCategory.current.value = product.category;
            refShortDescription.current.value = product.short_desc;
            refLongDescription.current.value = product.long_desc;
            refProductPrice.current.value = product.price;
            refProductQuantity.current.value = product.quantity;
        }
    }

    callApi();

  }, []);

  const updateProductHandler = async() => {
    let payload = {
      id,
      name:  refProductName.current.value,
      category: refCategory.current.value,
      short_desc: refShortDescription.current.value,
      long_desc: refLongDescription.current.value,
      price: refProductPrice.current.value,
      quantity: refProductQuantity.current.value
    }

    let res = await fetch(urlUpdate, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": localState.logInReducer.user.token
      },
      body: JSON.stringify(payload)
    })

    if(!res.ok) throw new Error("Call api unsuccess");
    let { status } = await res.json();

    if(status) {
      navigate("/products");
    }
  };

  // waiting for save succeed, then navigation to /products
  // useEffect(() => {
  //   if (!succeed) return;
  //   dispatch({ type: "CLEAR_SUCCEED" });
  //   navigate("/products");
  // }, [succeed]);

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

        <div className={classes["price"]}>
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            placeholder="Enter product price"
            ref={refProductPrice}
            min={1}
            max={100000000}
          />
        </div>

        <div className={classes["quantity"]}>
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            id="quantity"
            placeholder="Enter product quantity"
            ref={refProductQuantity}
            min={1}
            max={1000}
          />
        </div>

        <button onClick={updateProductHandler}>Submit</button>
      </div>
    </div>
  );
};
export default ProductUpdate;
