import cheeseburger from '@/assets/cheeseburger.jpg.asset.json';
import veggie from '@/assets/veggie.jpg.asset.json';
import chicken from '@/assets/chicken.jpg.asset.json';
import crispy from '@/assets/crispy.jpg.asset.json';

export interface MenuItem {
  id: string; name: string; subtitle: string; description: string; price: number;
  rating: string; category: string; image: string; vegetarian?: boolean;
}
export const menu: MenuItem[] = [
  { id: 'cheese', name: 'Cheeseburger', subtitle: "Wendy’s Burger", description: 'Dois hambúrgueres, queijo cheddar, alface, tomate e cebola roxa.', price: 2990, rating: '4.9', category: 'classic', image: cheeseburger.url },
  { id: 'veggie', name: 'Veggie Burger', subtitle: 'Leve e cheio de sabor', description: 'Hambúrguer vegetal, alface, tomate e cebola no pão com gergelim.', price: 2690, rating: '4.8', category: 'classic', image: veggie.url, vegetarian: true },
  { id: 'chicken', name: 'Chicken Burger', subtitle: 'Frango grelhado', description: 'Frango grelhado, queijo, salada fresca e molho da casa.', price: 2790, rating: '4.6', category: 'classic', image: chicken.url },
  { id: 'crispy', name: 'Crispy Chicken', subtitle: 'Crocante por fora', description: 'Frango empanado crocante, queijo, alface e tomate.', price: 2890, rating: '4.5', category: 'classic', image: crispy.url },
  { id: 'combo', name: 'Combo Cheeseburger', subtitle: 'Burger + batata + bebida', description: 'Cheeseburger acompanhado de batata frita e refrigerante de 350 ml.', price: 3990, rating: '4.9', category: 'combos', image: cheeseburger.url },
  { id: 'sliders', name: 'Mini Burgers', subtitle: 'Uma dupla de sabor', description: 'Dois mini cheeseburgers com queijo, alface e molho da casa.', price: 2490, rating: '4.7', category: 'sliders', image: cheeseburger.url },
];
export type Cart = Record<string, number>;
export const money = (value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value / 100);
export function changeQuantity(cart: Cart, id: string, delta: number): Cart {
  if (!menu.some(item => item.id === id)) return cart;
  const next = { ...cart };
  const quantity = Math.max(0, (next[id] || 0) + delta);
  if (quantity === 0) delete next[id];
  else next[id] = quantity;
  return next;
}
export const cartItems = (cart: Cart) => menu.filter(item => (cart[item.id] || 0) > 0).map(item => ({ ...item, quantity: cart[item.id] }));
export const cartTotal = (cart: Cart) => cartItems(cart).reduce((sum, item) => sum + item.price * item.quantity, 0);
export const cartCount = (cart: Cart) => cartItems(cart).reduce((sum, item) => sum + item.quantity, 0);