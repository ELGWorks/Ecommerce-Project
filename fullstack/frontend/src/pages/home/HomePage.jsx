import axios from "axios";
import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { ProductsGrid } from "./ProductsGrid";
import { useSearchParams } from "react-router";
import "./HomePage.css";

export function HomePage({ cart, loadCart }) {
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");

  // useEffect(() => {
  //   axios.get("/api/products").then((response) => {
  //     // response.json().then((data) => {
  //     //   console.log(data);
  //     // })
  //     // console.log(response.data);
  //     setProducts(response.data);
  //   });
  // }, []);
  useEffect(() => {
    const getHomeData = async () => {
      const urlPath = search
        ? `/api/products?search=${search}`
        : "/api/products";
      const response = await axios.get(urlPath);
      setProducts(response.data);
    };

    getHomeData();
  }, [search]);

  return (
    <>
      <Header cart={cart} />
      <link rel="icon" type="image/png" href="/home-favicon.png" />
      <title>Ecommerce Project</title>

      <div className="home-page">
        <ProductsGrid products={products} loadCart={loadCart} />
      </div>
    </>
  );
}
