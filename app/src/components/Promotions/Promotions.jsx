import { promotions } from "../../data/products";
import "./Promotions.css";

export default function Promotions() {
  return (
    <section className="section promotions" id="promos">
      <div className="container">
        <div className="section-head">
          <span className="kicker">No te lo pierdas</span>
          <h2>
            Promociones <span>especiales</span>
          </h2>
          <p>Aprovecha nuestras ofertas y come rico pagando menos.</p>
        </div>

        <div className="promo-grid">
          {promotions.map((p) => (
            <article className={`promo-card promo-${p.color}`} key={p.id}>
              <div className="promo-emoji-wrap">
                <span className="promo-emoji">{p.emoji}</span>
              </div>
              <div className="promo-content">
                <span className="promo-badge">{p.badge}</span>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                {p.promoPrice && (
                  <div className="promo-prices">
                    <span className="promo-old">${p.originalPrice.toLocaleString("es-CO")}</span>
                    <span className="promo-new">${p.promoPrice.toLocaleString("es-CO")}</span>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
