import "./Categories.css";

const categories = [
  {
    name: "Platos típicos",
    desc: "Bandeja paisa, ajiaco y sancochos tradicionales",
    emoji: "🍲",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="13" r="8" />
        <path d="M4 13h16M12 5c2.5 2.2 2.5 4.6 0 6.8-2.5-2.2-2.5-4.6 0-6.8z" />
      </svg>
    ),
  },
  {
    name: "Comidas rápidas",
    desc: "Hamburguesas, perros y salchipapas con sazón",
    emoji: "🍔",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 10h18M5 10l1.2 9h11.6L19 10M8.5 14h7M7 10c0-3 2-5 5-5s5 2 5 5" />
      </svg>
    ),
  },
  {
    name: "Postres",
    desc: "Tres leches, flanes y dulces de la casa",
    emoji: "🍮",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M5 8h14v4a7 7 0 0 1-14 0V8zM4 8l1.5-3h13L20 8M12 15v3M9 18h6" />
      </svg>
    ),
  },
  {
    name: "Bebidas",
    desc: "Jugos naturales, limonadas y gaseosas",
    emoji: "🥤",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M9 3h6l-1 4H10L9 3zM7 7h10l-1.2 6H8.2L7 7zM9.5 19h5M12 13v6M8 19h8" />
      </svg>
    ),
  },
];

export default function Categories() {
  return (
    <section className="section categories" id="categorias">
      <div className="container">
        <div className="section-head">
          <span className="kicker">Nuestras especialidades</span>
          <h2>
            Categorías llenas de <span>sabor</span>
          </h2>
          <p>Elige entre nuestras categorías y disfruta lo mejor de la cocina tradicional.</p>
        </div>

        <div className="cat-grid">
          {categories.map((c) => (
            <article className="cat-card" key={c.name}>
              <span className="cat-icon">{c.icon}</span>
              <span className="cat-emoji" aria-hidden="true">{c.emoji}</span>
              <h3>{c.name}</h3>
              <p>{c.desc}</p>
              <a href="#menu" className="cat-link">
                Explorar
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
