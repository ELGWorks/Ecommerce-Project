import axios from "axios";
import { useState, useEffect } from "react";
import "./OrdersPage.css";
import { OrdersGrid } from "./OrdersGrid";
import { Header } from "../../components/Header";


export function OrdersPage({ cart, loadCart }) {
  const [orders, setOrders] = useState([]);

  //7a
  useEffect(() => {
    const fetchOrdersData = async () => {
      const response = await axios.get("/api/orders?expand=products");
      setOrders(response.data);
    };
    fetchOrdersData();
  }, []);

  return (
    <>
      <Header cart={cart} />
      <link rel="icon" type="image/svg+xml" href="/orders-favicon.png" />
      <title>Orders</title>

      <div className="orders-page">
        <div className="page-title">Your Orders</div>
        <OrdersGrid orders={orders} loadCart={loadCart}/>
      </div>
    </>
  );
}
