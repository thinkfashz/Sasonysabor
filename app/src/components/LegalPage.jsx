import Link from 'next/link';
import { brand } from '@/data/menu';

export default function LegalPage({ eyebrow, title, intro, children }) {
  return (
    <main className="ss-legal-page">
      <header className="ss-legal-header">
        <Link href="/" aria-label="Volver al inicio"><img src={brand.logo} alt="Sazón y Sabor" /></Link>
        <nav aria-label="Navegación legal">
          <Link href="/">Inicio</Link>
          <Link href="/promociones">Promociones</Link>
          <Link href="/privacidad">Privacidad</Link>
          <Link href="/terminos">Términos</Link>
          <Link href="/reembolsos">Reembolsos</Link>
        </nav>
      </header>

      <article className="ss-legal-card">
        <span className="ss-legal-eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p className="ss-legal-intro">{intro}</p>
        <div className="ss-legal-content">{children}</div>
        <footer>
          <p>Última actualización: 10 de septiembre de 2026.</p>
          <p>Contacto: <a href={brand.whatsappUrl} target="_blank" rel="noreferrer">WhatsApp {brand.phone}</a> · <a href={brand.instagramUrl} target="_blank" rel="noreferrer">{brand.instagram}</a></p>
        </footer>
      </article>
    </main>
  );
}
