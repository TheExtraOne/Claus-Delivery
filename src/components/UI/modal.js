import ReactDOM from "react-dom";
import classes from "./modal.module.css";
import { clientEvents } from "../emiter/client-events";

const Backdrop = (props) => {
  const closeCart = () => {
    clientEvents.emit("ECartClicked");
  };

  return <div className={classes.backdrop} onClick={closeCart} />;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
};

export default Modal;
