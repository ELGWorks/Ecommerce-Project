import { products } from "./products";

export const cart = [
  {
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2,
  },
];

// The real backend returned cart items with `?expand=product`.
// This does the same thing using the mock product list.
export function expandCartItem(cartItem) {
  const product = products.find((item) => {
    return item.id === cartItem.productId;
  });

  return {
    ...cartItem,
    deliveryOptionId: cartItem.deliveryOptionId || "1",
    product,
  };
}

// Adds a product to the mock cart (or increases its quantity) and
// returns a new array so React re-renders.
export function addProductToCart(productId, quantity) {
  const existingItem = cart.find((item) => {
    return item.productId === productId;
  });

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ productId, quantity });
  }

  return [...cart];
}

// The mock cart is a plain array, so every cart change has to be written
// back to it. This keeps the module array and React state in sync.
export function saveCart(updatedCart) {
  cart.length = 0;

  updatedCart.forEach((cartItem) => {
    cart.push({
      productId: cartItem.productId,
      quantity: cartItem.quantity,
      deliveryOptionId: cartItem.deliveryOptionId,
    });
  });

  return cart.map(expandCartItem);
}