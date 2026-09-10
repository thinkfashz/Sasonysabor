import { extras, products } from '@/data/menu';

export const FLOW_SCREENS = {
  HOME: 'home',
  CATALOG: 'catalog',
  PRODUCT: 'product',
  CART: 'cart',
  DETAILS: 'details',
  PAYMENT: 'payment',
  REVIEW: 'review',
  SUCCESS: 'success',
};

export const PRIMARY_CATEGORIES = [
  'Completos',
  'Arepas',
  'Churrascos',
  'Salchipapas',
  'Papas Fritas',
  'Chorrillanas',
  'Sopaipillas',
  'Kids',
  'Bebidas',
];

export const CHECKOUT_STEPS = [
  { id: FLOW_SCREENS.CART, label: 'Pedido' },
  { id: FLOW_SCREENS.DETAILS, label: 'Tus datos' },
  { id: FLOW_SCREENS.PAYMENT, label: 'Pago' },
  { id: FLOW_SCREENS.REVIEW, label: 'Confirmación' },
];

export const formatMoney = (value) =>
  `$${Number(value || 0).toLocaleString('es-CL')}`;

const extrasByCategory = {
  Arepas: ['pebre', 'guacamole'],
  Sopaipillas: ['pebre', 'guacamole', 'mechaqueso'],
};

export function getExtrasForProduct(product) {
  const ids = extrasByCategory[product?.category] || [];
  return extras.filter((extra) => ids.includes(extra.id));
}

export function getRelatedProducts(product, limit = 4) {
  if (!product) return [];
  const sameCategory = products.filter(
    (item) => item.category === product.category && item.id !== product.id,
  );
  const drinks = products.filter((item) => item.category === 'Bebidas');
  const complementary = products.filter(
    (item) =>
      item.id !== product.id &&
      item.category !== product.category &&
      item.category !== 'Bebidas',
  );

  return [...sameCategory, ...drinks, ...complementary]
    .filter((item, index, all) => all.findIndex((x) => x.id === item.id) === index)
    .slice(0, limit);
}

export function buildCartLine(product, selectedExtras = [], quantity = 1, notes = '') {
  const extraIds = selectedExtras.map((extra) => extra.id).sort();
  const normalizedNote = notes.trim().toLowerCase().replace(/[^a-z0-9áéíóúüñ]+/gi, '-').slice(0, 32) || 'standard';
  const lineId = [product.id, ...extraIds, normalizedNote].join('__');
  const extrasTotal = selectedExtras.reduce((sum, extra) => sum + extra.price, 0);

  return {
    lineId,
    product,
    extras: selectedExtras,
    notes,
    quantity,
    unitPrice: product.price + extrasTotal,
  };
}

export function getLineTotal(line) {
  return line.unitPrice * line.quantity;
}

export function getCartTotal(cart) {
  return cart.reduce((sum, line) => sum + getLineTotal(line), 0);
}
