import { it, expect, describe, vi, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router';
import userEvent from '@testing-library/user-event';
import { PaymentSummary } from './PaymentSummary';
import { orders } from '../../data/orders';

describe('PaymentSummary component', () => {
  let cart;
  let loadCart;
  let user;

  beforeEach(() => {
    // Expanded cart items, exactly like App.tsx hands to the component.
    cart = [
      {
        productId: 'product-a',
        quantity: 2,
        deliveryOptionId: '1',
        product: {
          id: 'product-a',
          name: 'Product A',
          image: 'images/products/product-a.jpg',
          priceCents: 1000,
          rating: { stars: 5, count: 10 },
        },
      },
      {
        productId: 'product-b',
        quantity: 1,
        deliveryOptionId: '2',
        product: {
          id: 'product-b',
          name: 'Product B',
          image: 'images/products/product-b.jpg',
          priceCents: 1275,
          rating: { stars: 4, count: 5 },
        },
      },
    ];

    loadCart = vi.fn();
    user = userEvent.setup();
  });

  it('displays the correct details', async () => {
    render(
      <MemoryRouter>
        <PaymentSummary cart={cart} loadCart={loadCart} />
      </MemoryRouter>
    );

    expect(
      screen.getByText('Items (3):')
    ).toBeInTheDocument();

    expect(
      within(screen.getByTestId('payment-summary-product-cost'))
        .getByText('$32.75')
    ).toBeInTheDocument();

    expect(
      screen.getByTestId('payment-summary-shipping-cost')
    ).toHaveTextContent('$4.99');

    expect(
      screen.getByTestId('payment-summary-total-before-tax')
    ).toHaveTextContent('$37.74');

    expect(
      screen.getByTestId('payment-summary-tax')
    ).toHaveTextContent('$3.77');

    expect(
      screen.getByTestId('payment-summary-total')
    ).toHaveTextContent('$41.51');
  });

  it('places an order', async () => {
    function Location() {
      const location = useLocation();
      return <div data-testid="url-path">{location.pathname}</div>;
    }

    const orderCountBefore = orders.length;

    render(
      <MemoryRouter>
        <PaymentSummary cart={cart} loadCart={loadCart} />
        <Location />
      </MemoryRouter>
    );
    const placeOrderButton = screen.getByTestId('place-order-button');
    await user.click(placeOrderButton);

    expect(loadCart).toHaveBeenCalledWith([]);
    expect(screen.getByTestId('url-path')).toHaveTextContent('/orders');

    expect(orders.length).toBe(orderCountBefore + 1);

    const newOrder = orders[orders.length - 1];
    expect(newOrder.totalCostCents).toBe(4151);
    expect(newOrder.products).toHaveLength(2);
    expect(newOrder.products[0].productId).toBe('product-a');
  });

  it('does not place an order when the cart is empty', () => {
    render(
      <MemoryRouter>
        <PaymentSummary cart={[]} loadCart={loadCart} />
      </MemoryRouter>
    );

    expect(screen.getByTestId('place-order-button')).toBeDisabled();
  });
});
