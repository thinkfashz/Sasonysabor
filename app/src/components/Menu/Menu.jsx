import { useState } from "react";
import { useCart } from "../../context/useCart";
import { dishes } from "../../data/products";
import ProductDetail from "../ProductDetail/ProductDetail";
import "./Menu.css";

const ITEMS_PER_PAGE = 6;

export default function Menu() {
  const { add } = useCart();
  const [added, setAdded] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const handleAdd = (e, dish) => {
    e.stopPropagation();
    add(dish);
    setAdded((prev) => ({ ...prev, [dish.id]: true }));
    setTimeout(() => {
      setAdded((prev) => ({ ...prev, [dish.id]: false }));
    }, 1500);
  };

  const visibleDishes = dishes.slice(0, visibleCount);
  const hasMore = visibleCount < dishes.length;

  return (
    <section className="section menu" id="menu">
      <div className="container">
        <div className="section-head">
          <span className="kicker">Delicioso y casero</span>
          <h2>
            Platos <span>destacados</span>
          </h2>
          <p>Una selección de nuestros platos favoritos, preparados cada día con amor.</p>
        </div>

        <div className="menu-grid">
          {visibleDishes.map((d) => (
            <article
              className={`dish dish-${d.color}`}
              key={d.id}
              onClick={() => setSelectedProduct(d)}
              style={{ cursor: "pointer" }}
            >
              <div className="dish-visual" aria-hidden="true">
                <div className="dish-dots">
                  <span className="dish-emoji" role="img" aria-label={d.name}>
                    {d.emoji}
                  </span>
                </div>
                {d.originalPrice && (
                  <span className="dish-discount">
                    -{Math.round((1 - d.price / d.originalPrice) * 100)}%
                  </span>
                )}
              </div>
              <div className="dish-body">
                <div className="dish-top">
                  <h3>{d.name}</h3>
                  <span className="dish-tag">{d.tag}</span>
                </div>
                <p>{d.desc}</p>
                <div className="dish-bottom">
                  <div className="dish-price-group">
                    <strong className="dish-price">
                      ${d.price.toLocaleString("es-CO")}
                    </strong>
                    {d.originalPrice && (
                      <span className="dish-original-price">
                        ${d.originalPrice.toLocaleString("es-CO")}
                      </span>
                    )}
                  </div>
                  <button
                    className={`btn ${added[d.id] ? "btn-gold" : "btn-red"} dish-btn`}
                    onClick={(e) => handleAdd(e, d)}
                  >
                    {added[d.id] ? "¡Agregado!" : "Agregar"}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {hasMore && (
          <div className="menu-more">
            <button
              className="btn btn-outline"
              onClick={() => setVisibleCount((prev) => prev + ITEMS_PER_PAGE)}
            >
              Ver más platos
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </section>
  );
}
