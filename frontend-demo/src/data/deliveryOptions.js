const DAY_MS = 24 * 60 * 60 * 1000;

const now = Date.now();

export const deliveryOptions = [
  {
    id: "1",
    deliveryDays: 7,
    priceCents: 0,
    estimatedDeliveryTimeMs: now + 7 * DAY_MS,
  },
  {
    id: "2",
    deliveryDays: 3,
    priceCents: 499,
    estimatedDeliveryTimeMs: now + 3 * DAY_MS,
  },
  {
    id: "3",
    deliveryDays: 1,
    priceCents: 999,
    estimatedDeliveryTimeMs: now + 1 * DAY_MS,
  },
];