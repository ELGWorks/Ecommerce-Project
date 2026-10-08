import { it, expect, describe, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HomePage } from "./HomePage";
import { MemoryRouter } from "react-router";
import { products } from "../../data/products";
import { cart } from "../../data/cart";

describe("HomePage component", () => {
  let loadCart;
  let user;

  beforeEach(() => {
    // The mock cart is module-level state, so reset it between tests.
    cart.length = 0;

    loadCart = vi.fn();
    user = userEvent.setup();
  });

  it("displays the products correctly", async () => {
    render(
      <MemoryRouter>
        <HomePage cart={[]} loadCart={loadCart} />
      </MemoryRouter>,
    );

    const productContainers = await screen.findAllByTestId("product-container");

    expect(productContainers.length).toBe(products.length);

    expect(
      within(productContainers[0]).getByText(products[0].name),
    ).toBeInTheDocument();

    expect(
      within(productContainers[1]).getByText(products[1].name),
    ).toBeInTheDocument();
  });

  it("tests if the add to cart buttons work", async () => {
    render(
      <MemoryRouter>
        <HomePage cart={[]} loadCart={loadCart} />
      </MemoryRouter>,
    );

    const productContainers = await screen.findAllByTestId("product-container");

    // First product
    const quantitySelector1 = within(productContainers[0]).getByTestId(
      "product-quantity-container",
    );

    await user.selectOptions(quantitySelector1, "2");

    const addToCartButton1 = within(productContainers[0]).getByTestId(
      "add-to-cart-button",
    );

    await user.click(addToCartButton1);

    // Second product
    const quantitySelector2 = within(productContainers[1]).getByTestId(
      "product-quantity-container",
    );

    await user.selectOptions(quantitySelector2, "3");

    const addToCartButton2 = within(productContainers[1]).getByTestId(
      "add-to-cart-button",
    );

    await user.click(addToCartButton2);

    expect(loadCart).toHaveBeenCalledTimes(2);

    expect(cart).toEqual([
      {
        productId: products[0].id,
        quantity: 2,
      },
      {
        productId: products[1].id,
        quantity: 3,
      },
    ]);
  });
});
