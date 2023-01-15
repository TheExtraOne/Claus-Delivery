import { useRef, useState } from "react";
import classes from "./cart-form.module.css";

const isEmpty = (value) => value.trim() === "";
const isEnoughtNum = (value) => value.trim().length >= 7;

const CartForm = ({ onSubmit, onCancel }) => {
  const name = useRef();
  const street = useRef();
  const phone = useRef();
  const house = useRef();

  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    phone: true,
    house: true,
  });

  const confirmHandler = (event) => {
    event.preventDefault();

    const inputName = name.current.value;
    const inputStreet = street.current.value;
    const inputPhone = phone.current.value;
    const inputHouse = house.current.value;

    setFormInputsValidity({
      name: !isEmpty(inputName),
      street: !isEmpty(inputStreet),
      phone: isEnoughtNum(inputPhone),
      house: !isEmpty(inputHouse),
    });

    const formIsValid =
      !isEmpty(inputName) &&
      !isEmpty(inputStreet) &&
      isEnoughtNum(inputPhone) &&
      !isEmpty(inputHouse);

    if (!formIsValid) {
      return;
    }

    onSubmit({
      name: inputName,
      street: inputStreet,
      house: inputHouse,
      phone: inputPhone,
    });
  };

  const nameControlClasses = `${classes.control} ${
    formInputsValidity.name ? "" : classes.invalid
  }`;
  const streetControlClasses = `${classes.control} ${
    formInputsValidity.street ? "" : classes.invalid
  }`;
  const phoneControlClasses = `${classes.control} ${
    formInputsValidity.phone ? "" : classes.invalid
  }`;
  const houseControlClasses = `${classes.control} ${
    formInputsValidity.house ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={name} />
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={street} />
      </div>
      <div className={houseControlClasses}>
        <label htmlFor="city">House</label>
        <input type="text" id="house" ref={house} />
      </div>
      <div className={phoneControlClasses}>
        <label htmlFor="postal">Mobile Phone</label>
        <input type="text" id="mobile" ref={phone} />
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default CartForm;
