import { useState } from "react";
import logo from "../../assets/logo.png";
import "./Header.css";

const links = [
  { href: "#inicio", label: "Inicio" },
  { href: "#menu", label: "Menú" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#testimonios", label: "Testimonios" },
  { href: "#contacto", label: "Contacto" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="header">
      <div className="container header-inner">
        <a href="#inicio" className="brand" onClick={() => setOpen(false)}>
          <img src={logo} alt="Sabor y Sazón" className="brand-logo" />
          <span className="brand-name">
            Sabor <span>y Sazón</span>
          </span>
        </a>

        <nav className={`nav ${open ? "nav-open" : ""}`}>
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <a href="#contacto" className="btn btn-red nav-cta" onClick={() => setOpen(false)}>
            Ordenar ahora
          </a>
        </nav>

        <button
          className={`burger ${open ? "burger-open" : ""}`}
          aria-label="Abrir menú"
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
