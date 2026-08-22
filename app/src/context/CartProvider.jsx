import { useMemo, useState } from "react";
import { CartContext } from "./CartContext";

export default function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);

  const add = (dish) => {
    setItems((prev) => {
      const found = prev.find((i) => i.name === dish.name);
      if (found) {
        return prev.map((i) =>
          i.name === dish.name ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...dish, qty: 1 }];
    });
  };

  const changeQty = (name, delta) => {
    setItems((prev) =>
      prev
        .map((i) => (i.name === name ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0)
    );
  };

  const remove = (name) => {
    setItems((prev) => prev.filter((i) => i.name !== name));
  };

  const clear = () => setItems([]);

  const count = items.reduce((s, i) => s + i.qty, 0);
  const total = items.reduce((s, i) => s + i.qty * i.price, 0);

  const value = useMemo(
    () => ({
      items,
      add,
      changeQty,
      remove,
      clear,
      count,
      total,
      cartOpen,
      setCartOpen,
      orderOpen,
      setOrderOpen,
    }),
    [items, cartOpen, orderOpen, count, total]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
