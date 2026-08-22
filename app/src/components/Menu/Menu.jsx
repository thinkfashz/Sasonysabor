import { useState, useMemo } from "react";
import { useCart } from "../../context/useCart";
import { dishes, categories } from "../../data/products";
import ProductDetail from "../ProductDetail/ProductDetail";
import "./Menu.css";

const ITEMS_PER_PAGE = 6;

export default function Menu() {
  const { add } = useCart();
  const [added, setAdded] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("todos");
  const [sortBy, setSortBy] = useState("default");

  const handleAdd = (e, dish) => {
    e.stopPropagation();
    add(dish);
    setAdded((prev) => ({ ...prev, [dish.id]: true }));
    setTimeout(() => {
      setAdded((prev) => ({ ...prev, [dish.id]: false }));
    }, 1500);
  };

  const filteredDishes = useMemo(() => {
    let result = [...dishes];

    if (activeCategory !== "todos") {
      result = result.filter((d) => d.category === activeCategory);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.desc.toLowerCase().includes(q) ||
          d.tag.toLowerCase().includes(q)
      );
    }

    if (sortBy === "price-asc") result.sort((a, b) => a.price - b.price);
    else if (sortBy === "price-desc") result.sort((a, b) => b.price - a.price);
    else if (sortBy === "name") result.sort((a, b) => a.name.localeCompare(b.name));
    else if (sortBy === "popular") result.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));

    return result;
  }, [activeCategory, search, sortBy]);

  const visibleDishes = filteredDishes.slice(0, visibleCount);
  const hasMore = visibleCount < filteredDishes.length;

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

        <div className="menu-controls">
          <div className="menu-search">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Buscar plato..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setVisibleCount(ITEMS_PER_PAGE); }}
            />
            {search && (
              <button className="menu-search-clear" onClick={() => { setSearch(""); setVisibleCount(ITEMS_PER_PAGE); }}>
                &times;
              </button>
            )}
          </div>
          <select
            className="menu-sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="default">Ordenar por</option>
            <option value="popular">Más populares</option>
            <option value="price-asc">Menor precio</option>
            <option value="price-desc">Mayor precio</option>
            <option value="name">Nombre A-Z</option>
          </select>
        </div>

        <div className="menu-filters">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`menu-filter-btn ${activeCategory === cat.id ? "active" : ""}`}
              onClick={() => { setActiveCategory(cat.id); setVisibleCount(ITEMS_PER_PAGE); }}
            >
              <span className="menu-filter-emoji">{cat.emoji}</span>
              {cat.name}
            </button>
          ))}
        </div>

        {filteredDishes.length === 0 ? (
          <div className="menu-empty">
            <span className="menu-empty-emoji">🔍</span>
            <p>No encontramos platos con esos criterios</p>
            <button className="btn btn-outline" onClick={() => { setSearch(""); setActiveCategory("todos"); setVisibleCount(ITEMS_PER_PAGE); }}>
              Ver todos los platos
            </button>
          </div>
        ) : (
          <>
            <p className="menu-count">{filteredDishes.length} plato{filteredDishes.length !== 1 ? "s" : ""}</p>
            <div className="menu-grid">
              {visibleDishes.map((d, i) => (
                <article
                  className={`dish dish-${d.color}`}
                  key={d.id}
                  onClick={() => setSelectedProduct(d)}
                  style={{ cursor: "pointer", animationDelay: `${i * 60}ms` }}
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
          </>
        )}

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
