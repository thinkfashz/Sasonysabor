import "./Hero.css";

const foodItems = [
  { emoji: "🍖", size: "3.2rem", delay: "0s", x: "10%", y: "15%" },
  { emoji: "🥘", size: "2.8rem", delay: "0.8s", x: "78%", y: "10%" },
  { emoji: "🫕", size: "2.4rem", delay: "1.6s", x: "85%", y: "55%" },
  { emoji: "🌮", size: "2rem", delay: "2.4s", x: "5%", y: "60%" },
  { emoji: "🍲", size: "2.6rem", delay: "0.4s", x: "15%", y: "80%" },
  { emoji: "🥑", size: "1.8rem", delay: "3s", x: "70%", y: "78%" },
];

export default function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="container hero-inner">
        <div className="hero-copy">
          <p className="hero-kicker">Restaurante de comida típica</p>
          <h1>
            El verdadero <span className="hero-red">sabor</span> de nuestra{" "}
            <span className="hero-blue">tierra</span>
          </h1>
          <p className="hero-sub">
            Recetas tradicionales con ingredientes frescos y el mejor sazón de la región.
            Un viaje de sabores que despierta todos tus sentidos.
          </p>
          <div className="hero-actions">
            <a href="#menu" className="btn btn-red">
              Ver menú
            </a>
            <a href="#contacto" className="btn btn-outline">
              Reserva tu mesa
            </a>
          </div>
          <div className="hero-stats">
            <div>
              <strong>15+</strong>
              <span>Años de tradición</span>
            </div>
            <div>
              <strong>40+</strong>
              <span>Platos típicos</span>
            </div>
            <div>
              <strong>20k</strong>
              <span>Clientes felices</span>
            </div>
          </div>
        </div>

        <div className="hero-art" aria-hidden="true">
          {foodItems.map((item, i) => (
            <div
              key={i}
              className="food-float"
              style={{
                fontSize: item.size,
                left: item.x,
                top: item.y,
                animationDelay: item.delay,
              }}
            >
              {item.emoji}
            </div>
          ))}

          <div className="plate-glow" />
          <div className="plate">
            <div className="plate-rim">
              <div className="plate-inner">
                <div className="steam s1" />
                <div className="steam s2" />
                <div className="steam s3" />
              </div>
            </div>
            <div className="plate-shine" />
          </div>

          <div className="drip drip-1" />
          <div className="drip drip-2" />
          <div className="drip drip-3" />

          <div className="badge badge-1">
            <strong>100%</strong>
            <span>Casero</span>
          </div>
          <div className="badge badge-2">
            <strong>4.9</strong>
            <span>Valoración</span>
          </div>
        </div>
      </div>

      <div className="hero-wave" aria-hidden="true" />
    </section>
  );
}
