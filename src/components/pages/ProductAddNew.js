import classes from "./ProductAddNew.module.css";
import BannerShop from "../banner/BannerShop";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { addNewProductAPI } from "../lib/api-product";
import CommonUtils from "../util/CommonUtils";

const ProductAddNew = () => {
  const { user } = useSelector((state) => state.logInReducer);
  const { succeed } = useSelector((state) => state.productReducer);
  const [images, setImages] = useState([]); // get URL & Base64 of select files
  const [imageFiles, setImageFiles] = useState({});
  const refProductName = useRef();
  const refCategory = useRef();
  const refShortDescription = useRef();
  const refLongDescription = useRef();
  const refProductPrice = useRef();
  const refProductQuantity = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // check input
  const isValidInput = () => {
    if (refProductName.current.value.trim() === "") {
      alert("Please enter the name of product");
      refProductName.current.focus();
      return false;
    }
    if (refCategory.current.value.trim() === "") {
      alert("Please enter the category of product");
      refCategory.current.focus();
      return false;
    }
    if (refShortDescription.current.value.trim() === "") {
      alert("Please enter the short desc of product");
      refShortDescription.current.focus();
      return false;
    }
    if (refLongDescription.current.value.trim() === "") {
      alert("Please enter the long desc of product");
      refLongDescription.current.focus();
      return false;
    }
    if (refProductPrice.current.value.trim() === "") {
      alert("Please enter the price of product");
      refProductPrice.current.focus();
      return false;
    }
    if (refProductQuantity.current.value.trim() === "") {
      alert("Please enter the quantity of product");
      refProductQuantity.current.focus();
      return false;
    }
    if (images.length === 0 || images.length > 4) {
      alert("Please choose the images of product from 1 to 4 images");
      return false;
    }
    return true;
  };
  // add new product
  const addNewProductHandler = (e) => {
    e.preventDefault();
    if (!isValidInput()) return;
    const productAddNew = {
      name: refProductName.current.value,
      category: refCategory.current.value,
      short_desc: refShortDescription.current.value,
      long_desc: refLongDescription.current.value,
      price: refProductPrice.current.value,
      quantity: refProductQuantity.current.value,
      images: [...imageFiles],
    };
    // console.log("CHECK imageFiles: ", productAddNew);
    dispatch(addNewProductAPI({ userId: user.userId, product: productAddNew }));
  };

  // waiting for save succeed, then navigation to /products
  useEffect(() => {
    if (!succeed) return;
    dispatch({ type: "CLEAR_SUCCEED" });
    navigate("/products");
  }, [succeed]);
  // get file image when select
  const filesSelectedHandler = async (e) => {
    const data = e.target.files;
    const selectedFile = [];
    if (data.length === 0) {
      setImages([]);
      return;
    }

    for (let i = 0; i < data.length; i++) {
      selectedFile.push({
        // create URL from selected file
        previewImageURL: URL.createObjectURL(data[i]),
        // convert image file to base64 in order to save into DB
        // imageBase64: await CommonUtils.getBase64(data[i]),
      });
    }
    setImages(selectedFile);
    setImageFiles(data);
  };

  // upload images
  const imagesTag =
    images &&
    images.length > 0 &&
    images.map((file, index) => {
      // console.log("CHECK BASE64: ", file.imageBase64);
      return <img src={file.previewImageURL} alt="product pic" key={index} />;
    });

  return (
    <div className={classes["product-container"]}>
      <BannerShop text={{ left: "ADMIN", right: "ADD NEW" }} />
      <form
        onSubmit={addNewProductHandler}
        className={classes["product-content"]}
      >
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
        <div className={classes["upload-image"]}>
          <p htmlFor="upload-image">Upload image (4 images)</p>
          <input
            id="upload-image"
            type="file"
            accept=".jpg,.jpeg,.png,.gif"
            name="multiple_images"
            multiple
            onChange={filesSelectedHandler}
          />
          {/* list of image that is choosen */}
          {imagesTag}
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
};
export default ProductAddNew;
