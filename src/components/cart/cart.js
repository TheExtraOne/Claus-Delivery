import { useContext, useState } from "react";
import { clientEvents } from "../emiter/client-events";
import CartContext from "../../store/cart-context";
import Modal from "../UI/modal";
import classes from "./cart.module.css";
import CartItem from "./cart-item";
import CartForm from "./cart-form";

const Cart = (props) => {
  const [showCartForm, setshowCartForm] = useState(false);
  const [errorSubmit, setErrorSubmit] = useState(null);
  const [submitSuccess, setsubmitSuccess] = useState(false);
  const ctx = useContext(CartContext);

  const totalAmount = `$${ctx.totalAmount.toFixed(2)}`;
  const hasItems = ctx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    ctx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    ctx.addItem({ ...item, amount: 1 });
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {ctx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const closeCart = () => {
    clientEvents.emit("ECartClicked");
  };

  const orderHandler = () => {
    setshowCartForm(true);
  };

  const submitOrderHandler = async (userData) => {
    const response = await fetch(
      "https://claus--delivery-default-rtdb.europe-west1.firebasedatabase.app/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: ctx.items,
        }),
      }
    );

    if (!response.ok) {
      setErrorSubmit("Something went wrong...");
      return;
    }

    setsubmitSuccess(true);

    ctx.clearCart();
  };

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={closeCart}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  let innerCart = (
    <>
      {" "}
      {!showCartForm && cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {showCartForm && (
        <CartForm onCancel={closeCart} onSubmit={submitOrderHandler} />
      )}
      {!showCartForm && modalActions}
    </>
  );

  if (submitSuccess) {
    innerCart = (
      <>
        {" "}
        <p>Successfully sent the order!</p>
        <div className={classes.actions}>
          <button className={classes.button} onClick={closeCart}>
            Close
          </button>
        </div>
      </>
    );
  }

  if (errorSubmit) {
    innerCart = (
      <>
        {" "}
        <p>{errorSubmit}</p>
        <div className={classes.actions}>
          <button className={classes.button} onClick={closeCart}>
            Close
          </button>
        </div>
      </>
    );
  }

  return <Modal onClose={closeCart}>{innerCart}</Modal>;
};

export default Cart;
