//7b
//import axios from 'axios';
import { formatMoney } from "../../utils/money";
import { DeliveryOptions } from "./DeliveryOptions";
import { useState } from "react";

export function CartItemDetails({ cart, cartItem, deliveryOptions, loadCart }) {
  const [showInput, setShowInput] = useState(false);
  const [quantity, setQuantity] = useState(cartItem.quantity);

  // for real backend
  //8f
  // const updateQuantity = async () => {
  //   //8h
  //   if (showInput) {
  //     await axios.put(`/api/cart-items/${cartItem.productId}`, {
  //       quantity: Number(quantity)
  //     });

  //     await loadCart();
  //     setShowInput(false);
  //   } else {
  //     setShowInput(true);
  //   }
  // }

  // for mocked data
  const updateQuantity = () => {
    if (showInput) {
      const updatedCart = cart.map((item) => {
        if (item.productId === cartItem.productId) {
          return {
            ...item,
            quantity: Number(quantity),
          };
        }

        return item;
      });

      loadCart(updatedCart);
      setShowInput(false);
    } else {
      setShowInput(true);
    }
  };

  //8g
  function updateQuantityInput(event) {
    setQuantity(event.target.value);
  }

  //8i
  function handleOnKeyDown(event) {
    if (event.key === "Enter") {
      updateQuantity();
    } else if (event.key === "Escape") {
      setQuantity(cartItem.quantity);
      setShowInput(false);
    }
  }

  // for real backend
  // const deleteCartItem = async () => {
  //   await axios.delete(`/api/cart-items/${cartItem.productId}`);
  //   await loadCart();
  // };

  //for mocked data
  const deleteCartItem = () => {
    const updatedCart = cart.filter((item) => {
      return item.productId !== cartItem.productId;
    });

    loadCart(updatedCart);
  };

  return (
    <>
      <div className="cart-item-details-grid">
        <img className="product-image" src={cartItem.product.image} />

        <div className="cart-item-details">
          <div className="product-name">{cartItem.product.name}</div>
          <div className="product-price">
            {formatMoney(cartItem.product.priceCents)}
          </div>
          <div className="product-quantity">
            <span>
              Quantity:{" "}
              {showInput ? (
                <input
                  type="text"
                  className="input-quantity"
                  value={quantity}
                  onChange={updateQuantityInput}
                  onKeyDown={handleOnKeyDown}
                />
              ) : (
                <span className="quantity-label">{cartItem.quantity}</span>
              )}
            </span>
            <span
              className="update-quantity-link link-primary"
              onClick={updateQuantity}
            >
              Update
            </span>
            <span
              className="delete-quantity-link link-primary"
              onClick={deleteCartItem}
            >
              Delete
            </span>
          </div>
        </div>

        <DeliveryOptions
          cart={cart}
          deliveryOptions={deliveryOptions}
          cartItem={cartItem}
          loadCart={loadCart}
        />
      </div>
    </>
  );
}
