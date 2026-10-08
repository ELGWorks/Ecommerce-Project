import { products } from "./products";

export const orders = [
  {
    id: "order-1",
    orderTimeMs: Date.now() - 60 * 60 * 1000,
    totalCostCents: 2398,
    products: [
      {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2,
        estimatedDeliveryTimeMs: Date.now() + 2 * 24 * 60 * 60 * 1000
      }
    ]
  }
];

// The real backend returned orders with `?expand=products`.
// This does the same thing using the mock product list.
export function expandOrders(orderList) {
  return orderList.map((order) => {
    return {
      ...order,
      products: order.products.map((orderProduct) => {
        return {
          ...orderProduct,
          product: products.find((product) => {
            return product.id === orderProduct.productId;
          }),
        };
      }),
    };
  });
}