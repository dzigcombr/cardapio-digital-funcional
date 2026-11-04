import { describe, expect, test } from 'bun:test';
import { changeQuantity, cartTotal, cartCount, cartItems } from './food-menu';

describe('cart', () => {
  test('adding the same burger increments quantity', () => {
    const cart = changeQuantity(changeQuantity({}, 'cheese', 1), 'cheese', 1);
    expect(cart.cheese).toBe(2);
    expect(cartCount(cart)).toBe(2);
  });
  test('removing the last unit removes the item and cannot create negative quantity', () => {
    const cart = changeQuantity({ cheese: 1 }, 'cheese', -1);
    expect(cartItems(cart)).toHaveLength(0);
    expect(changeQuantity(cart, 'cheese', -1)).toEqual({});
  });
  test('total sums unit prices multiplied by quantities in cents', () => {
    expect(cartTotal({ cheese: 2, veggie: 1 })).toBe(2990 * 2 + 2690);
  });
  test('unknown products cannot enter the cart', () => {
    expect(changeQuantity({}, 'missing', 1)).toEqual({});
  });
});