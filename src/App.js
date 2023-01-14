import Header from "./components/layout/header";
import Meals from "./components/meals/meals";
import Cart from "./components/cart/cart";

function App() {
  return (
    <>
      <Cart />
      <Header />
      <main>
        <Meals />
      </main>
    </>
  );
}

export default App;
