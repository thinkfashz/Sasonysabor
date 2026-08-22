import { useState } from "react";
import { useCart } from "../../context/useCart";
import "./OrderModal.css";

export default function OrderModal() {
  const { items, orderOpen, setOrderOpen, total, clear } = useCart();
  const [sent, setSent] = useState(false);
  const [orderId, setOrderId] = useState("");

  if (!orderOpen) return null;

  const close = () => {
    setOrderOpen(false);
    setTimeout(() => setSent(false), 300);
  };

  const submit = (e) => {
    e.preventDefault();
    setOrderId("SS-" + Math.floor(1000 + Math.random() * 9000));
    setSent(true);
    clear();
  };

  return (
    <div className="order-overlay" onClick={close}>
      <div className="order-modal" onClick={(e) => e.stopPropagation()}>
        {sent ? (
          <div className="order-success">
            <span className="order-check" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M5 13l4 4L19 7" />
              </svg>
            </span>
            <h3>¡Pedido {orderId} creado!</h3>
            <p>
              Recibimos tu orden y te contactaremos pronto para confirmar la entrega.
              ¡Gracias por preferir <strong>Sabor y Sazón</strong>!
            </p>
            <button className="btn btn-red" onClick={close}>
              Volver al menú
            </button>
          </div>
        ) : (
          <>
            <header className="order-head">
              <h3>Crear pedido</h3>
              <button className="cart-close" aria-label="Cerrar" onClick={close}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </header>

            {items.length === 0 ? (
              <div className="order-empty">
                <p>Tu carrito está vacío. Agrega platos desde el menú para crear un pedido.</p>
                <button className="btn btn-yellow" onClick={close}>
                  Ver menú
                </button>
              </div>
            ) : (
              <form className="order-form" onSubmit={submit}>
                <div className="order-summary">
                  {items.map((i) => (
                    <span key={i.name}>
                      {i.qty} x {i.name}
                      <strong>${(i.qty * i.price).toLocaleString("es-CO")}</strong>
                    </span>
                  ))}
                  <span className="order-summary-total">
                    Total
                    <strong>${total.toLocaleString("es-CO")}</strong>
                  </span>
                </div>

                <label>
                  Nombre
                  <input type="text" placeholder="Tu nombre" required />
                </label>
                <label>
                  Teléfono
                  <input type="tel" placeholder="300 123 4567" required />
                </label>
                <label>
                  Dirección de entrega
                  <input type="text" placeholder="Calle, casa o apartamento" required />
                </label>
                <label>
                  Método de pago
                  <select defaultValue="efectivo">
                    <option value="efectivo">Efectivo al entregar</option>
                    <option value="tarjeta">Tarjeta débito o crédito</option>
                    <option value="transferencia">Transferencia</option>
                  </select>
                </label>

                <button type="submit" className="btn btn-red order-submit">
                  Confirmar pedido
                </button>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
}
