import { Routes, Route } from "react-router";
//import axios from "axios";
import { useState } from "react";
import { HomePage } from "./pages/home/HomePage";
import { CheckOutPage } from "./pages/checkout/CheckoutPage";
import { OrdersPage } from "./pages/orders/OrdersPage";
import { TrackingPage } from "./pages/TrackingPage";
import { Error404Page } from "./pages/Error404Page";
import { cart as initialCart, saveCart, expandCartItem } from "./data/cart";
import "./App.css";

function App() {
  // for mocked data
  const [cart, setCart] = useState(() => initialCart.map(expandCartItem));

  // for real backend
  // const [cart, setCart] = useState([]);

  // useEffect(() => {
  //   axios.get("/api/cart-items?expand=product").then((response) => {
  //     setCart(response.data);
  //   });
  // }, []);

  //for real backend
  // const loadCart = async () => {
  //   const response = await axios.get("/api/cart-items?expand=product");
  //   setCart(response.data);
  // };

  // useEffect(() => {
  //   loadCart();
  // }, []);

  //for mocked data
  const loadCart = (updatedCart: typeof initialCart) => {
    setCart(saveCart(updatedCart));
  };

  return (
    <>
      <Routes>
        <Route index element={<HomePage cart={cart} loadCart={loadCart} />} />
        <Route
          path="/checkout"
          element={<CheckOutPage cart={cart} loadCart={loadCart} />}
        />
        <Route
          path="/orders"
          element={<OrdersPage cart={cart} loadCart={loadCart} />}
        />
        <Route
          path="/tracking/:orderId/:productId"
          element={<TrackingPage cart={cart} />}
        />
        <Route path="*" element={<Error404Page cart={cart} />} />
      </Routes>
    </>
  );
}

export default App;