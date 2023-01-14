import { useContext } from "react";
import CartIcon from "../cart/cart-icon";
import classes from "./header-cart-button.module.css";
import { clientEvents } from "../emiter/client-events";
import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {
  const openCart = () => {
    clientEvents.emit("ECartClicked");
  };

  const ctx = useContext(CartContext);

  const numberOfCartItems = ctx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  return (
    <button className={classes.button} onClick={openCart}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
