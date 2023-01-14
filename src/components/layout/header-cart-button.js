import CartIcon from "../cart/cart-icon";
import classes from "./header-cart-button.module.css";
import { clientEvents } from "../emitter/client-events";

const HeaderCartButton = (props) => {
  const openCart = () => {
    clientEvents.emit("ECartClicked");
  };
  return (
    <button className={classes.button} onClick={openCart}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>3</span>
    </button>
  );
};

export default HeaderCartButton;
