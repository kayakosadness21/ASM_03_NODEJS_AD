import classes from "./Banner.module.css";
import image from "../../asset/banner1.jpg";
import Button from "../UI/Button";
import { useNavigate } from "react-router-dom";
const Banner = () => {
  const navigate = useNavigate();
  const handleOnClick = () => {
    navigate("/shop");
  };

  return (
    <div className={classes["banner-container"]}>
      <img src={image} alt="banner" />
      <div className={classes.content}>
        <div className={classes.inspiration}>NEW INSPIRATION 2022</div>
        <div className={classes.sale}>20% OFF ON NEW</div>
        <div className={classes.season}>SEASON</div>
        <Button text={"Browse collections"} onClick={handleOnClick} />
      </div>
    </div>
  );
};
export default Banner;
