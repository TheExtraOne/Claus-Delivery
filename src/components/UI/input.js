import React from "react";
import classes from "./input.module.css";

//React.forwardRef is needed here beacuse we pass ref via props from MealItemFormComponent
const Input = React.forwardRef((props, ref) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input ref={ref} {...props.input} />
    </div>
  );
});

export default Input;
