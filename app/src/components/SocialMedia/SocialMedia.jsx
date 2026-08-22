import "./SocialMedia.css";

const socials = [
  {
    name: "Instagram",
    handle: "@saborysazon",
    url: "https://instagram.com/saborysazon",
    emoji: "📸",
    color: "ig",
    desc: "Síguenos para ver fotos de nuestros platos y recetas",
  },
  {
    name: "Facebook",
    handle: "Sabor y Sazón",
    url: "https://facebook.com/saborysazon",
    emoji: "👍",
    color: "fb",
    desc: "Página oficial con promociones y eventos",
  },
  {
    name: "TikTok",
    handle: "@saborysazon",
    url: "https://tiktok.com/@saborysazon",
    emoji: "🎵",
    color: "tt",
    desc: "Videos cortos de preparación y momentos épicos",
  },
];

export default function SocialMedia() {
  return (
    <section className="section social" id="redes">
      <div className="container">
        <div className="section-head">
          <span className="kicker">Síguenos</span>
          <h2>
            Estamos en <span>redes sociales</span>
          </h2>
          <p>Únete a nuestra comunidad y no te pierdas ninguna novedad.</p>
        </div>

        <div className="social-grid">
          {socials.map((s) => (
            <a
              className="social-card"
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="social-emoji">{s.emoji}</span>
              <div className="social-info">
                <h3>{s.name}</h3>
                <span className="social-handle">{s.handle}</span>
                <p>{s.desc}</p>
              </div>
              <svg className="social-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </a>
          ))}
        </div>

        <div className="social-cta">
          <div className="social-cta-content">
            <span className="social-cta-emoji">🎉</span>
            <div>
              <h3>¿Ya nos sigues?</h3>
              <p>Etiquétanos en tus fotos con <strong>#SaborYSazón</strong> y gana platos gratis cada semana.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
