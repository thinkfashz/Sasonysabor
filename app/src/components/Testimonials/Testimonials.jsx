import "./Testimonials.css";

const testimonials = [
  {
    name: "María Fernanda",
    role: "Cliente desde 2019",
    quote:
      "La bandeja paisa es la mejor que he probado. Se nota el cariño con el que preparan cada plato, y el sabor es exactamente como el de la casa de mi abuela.",
    initial: "MF",
    emoji: "👩‍🦰",
    rating: 5,
  },
  {
    name: "Carlos Andrés",
    role: "Vecino del barrio",
    quote:
      "Pedimos todos los domingos. El ajiaco llega caliente, bien servido y con la guasca justa. La atención es de diez y los precios muy razonables.",
    initial: "CA",
    emoji: "👨‍🍳",
    rating: 5,
  },
  {
    name: "Lucía Ramírez",
    role: "Comida para eventos",
    quote:
      "Contratamos a Sabor y Sazón para el cumpleaños de mi mamá y fue un éxito total. Empanadas, postres y bebidas: todos quedaron encantados.",
    initial: "LR",
    emoji: "👩‍💼",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="section testimonials" id="testimonios">
      <div className="container">
        <div className="section-head">
          <span className="kicker">Opiniones</span>
          <h2>
            Lo que dicen <span>nuestros clientes</span>
          </h2>
          <p>El mejor premio es ver a nuestras familias felices con cada bocado.</p>
        </div>

        <div className="testi-grid">
          {testimonials.map((t) => (
            <figure className="testi-card" key={t.name}>
              <div className="quote-mark" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M10 7H6a3 3 0 0 0-3 3v7h7v-7H7c0-1.7 1.3-3 3-3V7zm11 0h-4a3 3 0 0 0-3 3v7h7v-7h-3c0-1.7 1.3-3 3-3v-3z" />
                </svg>
              </div>
              <blockquote>{t.quote}</blockquote>
              <figcaption>
                <span className="avatar">
                  <span className="avatar-emoji">{t.emoji}</span>
                </span>
                <span>
                  <strong>{t.name}</strong>
                  <small>{t.role}</small>
                </span>
                <span className="stars" aria-label={`${t.rating} estrellas`}>
                  {[...Array(t.rating)].map((_, i) => (
                    <svg key={i} viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.2 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8L12 2z" />
                    </svg>
                  ))}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
