import logo from "../../assets/logo.png";
import "./Footer.css";

const quickLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Menú", href: "#menu" },
  { label: "Categorías", href: "#categorias" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Testimonios", href: "#testimonios" },
  { label: "Contacto", href: "#contacto" },
];

const schedules = ["Lunes a viernes: 8:00 a. m. - 9:00 p. m.", "Sábados: 8:00 a. m. - 10:00 p. m.", "Domingos: 9:00 a. m. - 8:00 p. m."];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <img src={logo} alt="Sabor y Sazón" />
          <p>
            El auténtico sabor de la cocina tradicional, preparado con amor y los mejores
            ingredientes frescos.
          </p>
        </div>

        <div className="footer-col">
          <h4>Enlaces</h4>
          <ul>
            {quickLinks.map((l) => (
              <li key={l.label}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h4>Horarios</h4>
          <ul>
            {schedules.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h4>Contacto</h4>
          <ul>
            <li>Calle 15 # 24-10, Centro</li>
            <li>+57 300 123 4567</li>
            <li>pedidos@saborysazon.com</li>
          </ul>
        </div>
      </div>

      <div className="footer-bar">
        <div className="container footer-bar-inner">
          <span>© {new Date().getFullYear()} Sabor y Sazón. Todos los derechos reservados.</span>
          <span className="footer-palette" aria-hidden="true">
            <i className="dot-red" />
            <i className="dot-yellow" />
            <i className="dot-blue" />
          </span>
        </div>
      </div>
    </footer>
  );
}
