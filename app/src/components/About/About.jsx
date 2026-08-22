import "./About.css";

const features = [
  "Ingredientes frescos de proveedores locales",
  "Recetas de familia con más de 15 años de historia",
  "Cocina abierta: todo se prepara al momento",
  "Ambiente familiar y precios justos",
];

const floatingFood = [
  { emoji: "🍖", className: "af-1" },
  { emoji: "🍲", className: "af-2" },
  { emoji: "🥑", className: "af-3" },
  { emoji: "🌶️", className: "af-4" },
  { emoji: "🫕", className: "af-5" },
  { emoji: "🍳", className: "af-6" },
];

export default function About() {
  return (
    <section className="section about" id="nosotros">
      <div className="container about-grid">
        <div className="about-visual" aria-hidden="true">
          {floatingFood.map((f, i) => (
            <span key={i} className={`about-food ${f.className}`}>
              {f.emoji}
            </span>
          ))}
          <div className="about-card card-a">
            <strong>15+</strong>
            <span>años de tradición</span>
          </div>
          <div className="about-card card-b">
            <strong>40+</strong>
            <span>recetas de la casa</span>
          </div>
          <div className="about-card card-c">
            <strong>100%</strong>
            <span>ingredientes frescos</span>
          </div>
        </div>

        <div className="about-copy">
          <span className="kicker">Nuestra historia</span>
          <h2>
            Más que un restaurante, <span>una tradición</span>
          </h2>
          <p>
            En <strong>Sabor y Sazón</strong> llevamos más de 15 años llevando a tu mesa el
            auténtico sabor de la cocina tradicional. Lo que empezó como un pequeño
            emprendimiento familiar hoy es el lugar preferido de quienes buscan platos
            caseros, generosos y llenos de historia.
          </p>
          <ul className="about-list">
            {features.map((f) => (
              <li key={f}>
                <span className="check" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                {f}
              </li>
            ))}
          </ul>
          <div className="about-sign">
            <span className="sign-stamp">S y S</span>
            <div>
              <strong>Familia Sabor y Sazón</strong>
              <span>Fundadores y cocineros</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
