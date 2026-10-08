import { formatMoney } from "../../utils/money";
//import axios from "axios";
import dayjs from "dayjs";

export function DeliveryOptions({ cart, deliveryOptions, cartItem, loadCart }) {
  return (
    <div className="delivery-options">
      <div className="delivery-options-title">Choose a delivery option:</div>

      {deliveryOptions.map((deliveryOption) => {
        let priceString = "FREE Shipping";

        if (deliveryOption.priceCents > 0) {
          priceString = `${formatMoney(deliveryOption.priceCents)}`;
        }

        // for real backend
        // const updateDeliveryOption = async () => {
        //   await axios.put(`/api/cart-items/${cartItem.productId}`, {
        //     deliveryOptionId: deliveryOption.id
        //   });
        //   await loadCart();
        // };

        // for mocked data
        const updateDeliveryOption = () => {
          const updatedCart = cart.map((item) => {
            if (item.productId === cartItem.productId) {
              return {
                ...item,
                deliveryOptionId: deliveryOption.id,
              };
            }

            return item;
          });

          loadCart(updatedCart);
        };

        return (
          <div
            key={deliveryOption.id}
            className="delivery-option"
            onClick={updateDeliveryOption}
          >
            <input
              type="radio"
              checked={deliveryOption.id === cartItem.deliveryOptionId}
              onChange={() => {}}
              className="delivery-option-input"
              name={`delivery-option-${cartItem.product.id}`}
              readOnly
            />

            <div>
              <div className="delivery-option-date">
                {dayjs(deliveryOption.estimatedDeliveryTimeMs).format(
                  "dddd, MMMM D",
                )}
              </div>

              <div className="delivery-option-price">{priceString}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
