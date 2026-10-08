import { formatMoney } from "../../utils/money";
//import axios from "axios";
import { useNavigate } from "react-router";
import { orders } from "../../data/orders";
import { deliveryOptions } from "../../data/deliveryOptions";

export function PaymentSummary({ cart, loadCart }) {
  const navigate = useNavigate();

  // for real backend
  // const createOrder = async () => {
  //   await axios.post("/api/orders");
  //   await loadCart();
  //   navigate("/orders");
  // };

  // for mocked data
  const createOrder = () => {
    if (cart.length === 0) {
      return;
    }

    const newOrder = {
      id: `order-${orders.length + 1}`,
      orderTimeMs: Date.now(),
      totalCostCents: totalCostCents,
      products: cart.map((item) => {
        const selectedDeliveryOption = deliveryOptions.find(
          (deliveryOption) => {
            return deliveryOption.id === item.deliveryOptionId;
          },
        );

        return {
          productId: item.productId,
          quantity: item.quantity,
          estimatedDeliveryTimeMs:
            selectedDeliveryOption.estimatedDeliveryTimeMs,
        };
      }),
    };

    orders.push(newOrder);

    loadCart([]);
    navigate("/orders");
  };

  // for mocked data
  const totalItems = cart.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  const productCostCents = cart.reduce((total, item) => {
    return total + item.product.priceCents * item.quantity;
  }, 0);

  const shippingCostCents = cart.reduce((total, item) => {
    const selectedDeliveryOption = deliveryOptions.find(
      (deliveryOption) => {
        return deliveryOption.id === item.deliveryOptionId;
      },
    );

    return total + (selectedDeliveryOption?.priceCents || 0);
  }, 0);

  const totalCostBeforeTaxCents =
    productCostCents + shippingCostCents;

  const taxCents = Math.round(totalCostBeforeTaxCents * 0.1);

  const totalCostCents =
    totalCostBeforeTaxCents + taxCents;

  // for real backend
  // export function PaymentSummary({ paymentSummary, loadCart }) {
  //   const navigate = useNavigate();

  return (
    <>
      <div className="payment-summary">
        <div className="payment-summary-title">Payment Summary</div>

        {/* for real backend */}
        {/* 
        {paymentSummary && (
          <>
            ...
          </>
        )}
        */}

        {/* for mocked data */}
        <div
          className="payment-summary-row"
          data-testid="payment-summary-product-cost"
        >
          <div>Items ({totalItems}):</div>
          <div className="payment-summary-money">
            {formatMoney(productCostCents)}
          </div>
        </div>

        <div
          className="payment-summary-row"
          data-testid="payment-summary-shipping-cost"
        >
          <div>Shipping &amp; handling:</div>
          <div className="payment-summary-money">
            {formatMoney(shippingCostCents)}
          </div>
        </div>

        <div
          className="payment-summary-row subtotal-row"
          data-testid="payment-summary-total-before-tax"
        >
          <div>Total before tax:</div>
          <div className="payment-summary-money">
            {formatMoney(totalCostBeforeTaxCents)}
          </div>
        </div>

        <div
          className="payment-summary-row"
          data-testid="payment-summary-tax"
        >
          <div>Estimated tax (10%):
          </div>
          <div className="payment-summary-money">
            {formatMoney(taxCents)}
          </div>
        </div>

        <div
          className="payment-summary-row total-row"
          data-testid="payment-summary-total"
        >
          <div>Order total:</div>
          <div className="payment-summary-money">
            {formatMoney(totalCostCents)}
          </div>
        </div>

        <button
          className="place-order-button button-primary"
          data-testid="place-order-button"
          disabled={cart.length === 0}
          onClick={createOrder}
        >
          Place your order
        </button>
      </div>
    </>
  );
}