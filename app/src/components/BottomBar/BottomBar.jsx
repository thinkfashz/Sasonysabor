import logo from "../../assets/logo.png";
import { useCart } from "../../context/useCart";
import "./BottomBar.css";

export default function BottomBar() {
  const { count, setCartOpen, setOrderOpen } = useCart();

  return (
    <nav className="bottom-bar" aria-label="Navegación móvil">
      <a href="#inicio" className="bb-item">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M4 11l8-7 8 7v9a1 1 0 0 1-1 1h-5v-6h-4v6H5a1 1 0 0 1-1-1v-9z" />
        </svg>
        <span>Inicio</span>
      </a>

      <a href="#menu" className="bb-item">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="13" r="8" />
          <path d="M4 13h16M12 5c2.5 2.2 2.5 4.6 0 6.8-2.5-2.2-2.5-4.6 0-6.8z" />
        </svg>
        <span>Menú</span>
      </a>

      <a href="#inicio" className="bb-logo" aria-label="Sabor y Sazón">
        <img src={logo} alt="Sabor y Sazón" />
      </a>

      <button className="bb-item" onClick={() => setCartOpen(true)}>
        <span className="bb-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <circle cx="9" cy="20" r="1.6" />
            <circle cx="17" cy="20" r="1.6" />
            <path d="M3 4h2l2.4 12.4A1.5 1.5 0 0 0 8.9 17h7.9a1.5 1.5 0 0 0 1.5-1.2L20 8H6" />
          </svg>
          {count > 0 && <span className="bb-badge">{count}</span>}
        </span>
        <span>Carrito</span>
      </button>

      <button className="bb-item bb-order" onClick={() => setOrderOpen(true)}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M8 4h8l3 6-6 11a1 1 0 0 1-1.8 0L5 10l3-6zM5 10h14M9.5 4l-1 6M14.5 4l1 6" />
        </svg>
        <span>Ordenar</span>
      </button>
    </nav>
  );
}
