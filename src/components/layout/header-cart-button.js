import { useContext, useEffect, useState } from "react";
import CartIcon from "../cart/cart-icon";
import classes from "./header-cart-button.module.css";
import { clientEvents } from "../emiter/client-events";
import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const ctx = useContext(CartContext);

  const openCart = () => {
    clientEvents.emit("ECartClicked");
  };

  const numberOfCartItems = ctx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${
    btnIsHighlighted ? classes.bump : ""
  }`;

  useEffect(() => {
    if (ctx.items.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 800);

    return () => {
      clearTimeout(timer);
    };
  }, [ctx.items]);

  return (
    <button className={btnClasses} onClick={openCart}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
