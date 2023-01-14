import { useState, useEffect } from "react";
import Header from "./components/layout/header";
import Meals from "./components/meals/meals";
import Cart from "./components/cart/cart";
import CartProvider from "./store/cart-provider";
import { clientEvents } from "./components/emiter/client-events";

function App() {
  const [isCartShown, setIsCartShown] = useState(false);

  //might cause bugs, as each click on modal backdrop will call this func
  const toggleCartHandler = () => {
    setIsCartShown((prev) => !prev);
  };

  useEffect(() => {
    clientEvents.addListener("ECartClicked", toggleCartHandler);
    return () => {
      clientEvents.removeListener("ECartClicked", toggleCartHandler);
    };
  }, []);
  return (
    <CartProvider>
      {isCartShown && <Cart />}
      <Header />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
