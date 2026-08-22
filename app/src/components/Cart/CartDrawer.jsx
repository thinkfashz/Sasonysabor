import { useCart } from "../../context/useCart";
import { WHATSAPP_NUMBER } from "../../data/products";
import "./CartDrawer.css";

export default function CartDrawer() {
  const { items, cartOpen, setCartOpen, setOrderOpen, changeQty, remove, total } =
    useCart();

  if (!cartOpen) return null;

  const handleWhatsApp = () => {
    const lines = items.map(
      (i) => `• ${i.name} x${i.qty} — $${(i.qty * i.price).toLocaleString("es-CO")}`
    );
    const msg = encodeURIComponent(
      `Hola! Quiero hacer el siguiente pedido:\n\n${lines.join("\n")}\n\n💰 *Total: $${total.toLocaleString("es-CO")}*\n\n¡Gracias!`
    );
    setCartOpen(false);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
  };

  return (
    <div className="cart-overlay" onClick={() => setCartOpen(false)}>
      <aside className="cart-panel" onClick={(e) => e.stopPropagation()}>
        <header className="cart-head">
          <h3>Tu carrito</h3>
          <button className="cart-close" aria-label="Cerrar carrito" onClick={() => setCartOpen(false)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </header>

        {items.length === 0 ? (
          <div className="cart-empty">
            <span className="cart-empty-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <circle cx="9" cy="20" r="1.6" />
                <circle cx="17" cy="20" r="1.6" />
                <path d="M3 4h2l2.4 12.4A1.5 1.5 0 0 0 8.9 17h7.9a1.5 1.5 0 0 0 1.5-1.2L20 8H6" />
              </svg>
            </span>
            <p>Tu carrito está vacío.</p>
            <a href="#menu" className="btn btn-red" onClick={() => setCartOpen(false)}>
              Ver menú
            </a>
          </div>
        ) : (
          <>
            <ul className="cart-list">
              {items.map((i) => (
                <li className="cart-item" key={i.name}>
                  <div className="cart-item-info">
                    <strong>{i.name}</strong>
                    <span>
                      ${i.price.toLocaleString("es-CO")} c/u
                    </span>
                  </div>
                  <div className="cart-item-actions">
                    <button onClick={() => changeQty(i.name, -1)} aria-label="Quitar uno">
                      −
                    </button>
                    <span>{i.qty}</span>
                    <button onClick={() => changeQty(i.name, 1)} aria-label="Añadir uno">
                      +
                    </button>
                    <button
                      className="cart-remove"
                      onClick={() => remove(i.name)}
                      aria-label="Eliminar plato"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" />
                      </svg>
                    </button>
                  </div>
                  <strong className="cart-item-total">
                    ${(i.qty * i.price).toLocaleString("es-CO")}
                  </strong>
                </li>
              ))}
            </ul>

            <footer className="cart-foot">
              <div className="cart-total">
                <span>Total a pagar</span>
                <strong>${total.toLocaleString("es-CO")}</strong>
              </div>
              <button className="btn btn-whatsapp cart-checkout" onClick={handleWhatsApp}>
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Pedir por WhatsApp
              </button>
              <button
                className="btn btn-outline cart-alt-btn"
                onClick={() => {
                  setCartOpen(false);
                  setOrderOpen(true);
                }}
              >
                Crear pedido local
              </button>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
