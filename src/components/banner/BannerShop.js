import classes from "./BannerShop.module.css";

const BannerShop = (props) => {
  return (
    <div className={classes.banner}>
      <h2>{props.text.left}</h2>
      <p>
        <span>{props.text.path ? props.text.path : ""}</span> {props.text.right}
      </p>
    </div>
  );
};
export default BannerShop;
