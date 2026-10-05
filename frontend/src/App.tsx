import { Routes, Route } from "react-router";
import axios from "axios";
import { useEffect, useState } from "react";
import { HomePage } from "./pages/home/HomePage";
import { CheckOutPage } from "./pages/checkout/CheckoutPage";
import { OrdersPage } from "./pages/orders/OrdersPage";
import { TrackingPage } from "./pages/TrackingPage";
import { Error404Page } from "./pages/Error404Page";
import "./App.css";

function App() {
  const [cart, setCart] = useState([]);

  // useEffect(() => {
  //   axios.get("/api/cart-items?expand=product").then((response) => {
  //     setCart(response.data);
  //   });
  // }, []);

  const loadCart = async () => {
    const response = await axios.get("/api/cart-items?expand=product");
    setCart(response.data);
  };

  useEffect(() => {
    loadCart();
  }, []);

  return (
    <>
      <Routes>
        <Route index element={<HomePage cart={cart} loadCart={loadCart}/>} />
        <Route path="/checkout" element={<CheckOutPage cart={cart} loadCart={loadCart} />} />
        <Route path="/orders" element={<OrdersPage cart={cart} loadCart={loadCart}/>} />
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
