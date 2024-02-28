import classes from "./layout-login-form.module.css";

const LayoutLoginForm = (props) => {
  return <div className={classes["layout-form-login"]}>{props.children}</div>;
};
export default LayoutLoginForm;
