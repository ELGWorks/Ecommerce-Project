import dayjs from "dayjs";
import BuyAgainIcon from "../../assets/images/icons/buy-again.png";
import { addProductToCart } from "../../data/cart";
import { Fragment } from "react";
import { useNavigate } from "react-router";

//7i
export function OrderDetailsGrid({ order, loadCart }) {
  const navigate = useNavigate();

  return (
    <>
      <div className="order-details-grid">
        {order.products.map((orderProduct) => {
          // for mocked data
          const orderAddToCart = () => {
            loadCart(addProductToCart(orderProduct.productId, 1));
            navigate("/checkout");
          };
          return (
            <Fragment key={orderProduct.product.id}>
              <div className="product-image-container">
                <img src={orderProduct.product.image} />
              </div>

              <div className="product-details">
                <div className="product-name">{orderProduct.product.name}</div>
                <div className="product-delivery-date">
                  Arriving on:{" "}
                  {dayjs(orderProduct.estimatedDeliveryTimeMs).format("MMMM D")}
                </div>
                <div className="product-quantity">
                  Quantity: {orderProduct.quantity}
                </div>
                <button className="buy-again-button button-primary">
                  <img className="buy-again-icon" src={BuyAgainIcon} />
                  <span className="buy-again-message" onClick={orderAddToCart}>
                    Add to Cart
                  </span>
                </button>
              </div>

              <div className="product-actions">
                <a href={`/tracking/${order.id}/${orderProduct.product.id}`}>
                  <button className="track-package-button button-secondary">
                    Track package
                  </button>
                </a>
              </div>
            </Fragment>
          );
        })}
      </div>
    </>
  );
}
