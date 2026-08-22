import { useState } from "react";
import { useCart } from "../../context/useCart";
import { WHATSAPP_NUMBER } from "../../data/products";
import "./ProductDetail.css";

export default function ProductDetail({ product, onClose }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const total = product.price * qty;

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) {
      add(product);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleWhatsApp = () => {
    const msg = encodeURIComponent(
      `Hola! Quiero pedir:\n\n🍽️ *${product.name}*\nCantidad: ${qty}\nPrecio unitario: $${product.price.toLocaleString("es-CO")}\nTotal: $${total.toLocaleString("es-CO")}\n\n¡Gracias!`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
  };

  return (
    <div className="pd-overlay" onClick={onClose}>
      <div className="pd-modal" onClick={(e) => e.stopPropagation()}>
        <button className="pd-close" onClick={onClose} aria-label="Cerrar">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <div className={`pd-hero pd-hero-${product.color}`}>
          <span className="pd-emoji">{product.emoji}</span>
          {product.tag && <span className="pd-tag">{product.tag}</span>}
          {product.promotion && (
            <span className="pd-promo-badge">{product.promotion.discount}</span>
          )}
        </div>

        <div className="pd-content">
          <div className="pd-header">
            <h2>{product.name}</h2>
            <div className="pd-price-row">
              <span className="pd-price">${total.toLocaleString("es-CO")}</span>
              {qty > 1 && (
                <span className="pd-unit">${product.price.toLocaleString("es-CO")} c/u</span>
              )}
              {product.originalPrice && (
                <span className="pd-original">
                  ${product.originalPrice.toLocaleString("es-CO")}
                </span>
              )}
            </div>
          </div>

          <p className="pd-desc">{product.desc}</p>

          <div className="pd-meta">
            <div className="pd-meta-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
              <span>{product.preparation}</span>
            </div>
            <div className="pd-meta-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              <span>{product.servings}</span>
            </div>
            {product.spicy && (
              <div className="pd-meta-item pd-spicy">
                <span>🌶️</span>
                <span>Picante</span>
              </div>
            )}
          </div>

          {product.promotion && (
            <div className="pd-promo-card">
              <span className="pd-promo-icon">🎉</span>
              <div>
                <strong>Promoción activa</strong>
                <p>{product.promotion.text}</p>
              </div>
            </div>
          )}

          <div className="pd-section">
            <h3>Ingredientes</h3>
            <div className="pd-ingredients">
              {product.ingredients.map((ing, i) => (
                <span className="pd-ing" key={i}>{ing}</span>
              ))}
            </div>
          </div>

          <div className="pd-section">
            <h3>¿Qué incluye?</h3>
            <ul className="pd-includes">
              {product.includes.map((inc, i) => (
                <li key={i}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  {inc}
                </li>
              ))}
            </ul>
          </div>

          <div className="pd-qty-section">
            <h3>Cantidad</h3>
            <div className="pd-qty-controls">
              <button
                className="pd-qty-btn"
                onClick={() => setQty(Math.max(1, qty - 1))}
                disabled={qty <= 1}
              >
                −
              </button>
              <span className="pd-qty-value">{qty}</span>
              <button
                className="pd-qty-btn"
                onClick={() => setQty(qty + 1)}
              >
                +
              </button>
            </div>
          </div>

          <div className="pd-actions">
            <button
              className={`btn ${added ? "btn-gold" : "btn-red"} pd-btn-cart`}
              onClick={handleAdd}
            >
              {added ? "¡Agregado!" : `Agregar al carrito — $${total.toLocaleString("es-CO")}`}
            </button>
            <button className="btn btn-whatsapp pd-btn-wa" onClick={handleWhatsApp}>
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Pedir por WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
