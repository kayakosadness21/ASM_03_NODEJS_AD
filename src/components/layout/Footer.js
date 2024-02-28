import classes from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={classes["footer-container"]}>
      <div className={classes.left}>
        <div className={classes.header}>CUSTOMER SERVICE</div>
        <ul>
          <li>
            <a href="#">Help & Contact Us</a>
          </li>
          <li>
            <a href="#">Return & Refunds</a>
          </li>
          <li>
            <a href="#">Online & Stores</a>
          </li>
          <li>
            <a href="#">Term & Conditions</a>
          </li>
        </ul>
      </div>
      <div className={classes.center}>
        <div className={classes.header}>COMPANY</div>
        <ul>
          <li>
            <a href="#">What We Do</a>
          </li>
          <li>
            <a href="#">Aviable Services</a>
          </li>
          <li>
            <a href="#">Latest Posts</a>
          </li>
          <li>
            <a href="#">FAQs</a>
          </li>
        </ul>
      </div>
      <div className={classes.right}>
        <div className={classes.header}>SOCIAL MEDIA</div>
        <ul>
          <li>
            <a href="#">Twitter</a>
          </li>
          <li>
            <a href="#">Instagram</a>
          </li>
          <li>
            <a href="#">Facebook</a>
          </li>
          <li>
            <a href="#">Pinterest</a>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Footer;
