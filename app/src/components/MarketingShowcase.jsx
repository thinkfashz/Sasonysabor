import Link from 'next/link';
import { brand, products } from '@/data/menu';

const creatives = [
  {
    slug: 'completos-papas',
    title: '2 Completos Italianos + Papas Chicas',
    price: '$6.500',
    description: 'Una promoción rápida para compartir: completos italianos y una porción de papas chicas.'
  },
  {
    slug: 'churrascos-papas',
    title: '2 Churrascos Italianos + 2 Papas Fritas',
    price: '$11.500',
    description: 'Dos churrascos italianos acompañados de dos porciones de papas fritas.'
  },
  {
    slug: 'patacones',
    title: '2 Patacones con Mechada + Coca-Cola 1,5 L',
    price: '$15.000',
    description: 'Patacones con carne mechada y guacamole, acompañados por una Coca-Cola de 1,5 litros.'
  },
  {
    slug: 'papas-dos-carnes',
    title: 'Papas Dos Carnes + Bebida 1,5 L',
    price: '$12.000',
    description: 'Papas con longaniza, cebolla caramelizada, carne y dos huevos, más bebida de 1,5 litros.'
  }
];

const featured = products
  .filter((product) => product.popular && product.category !== 'Promociones')
  .slice(0, 6);

const money = (value) => new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  maximumFractionDigits: 0,
}).format(value);

const categoryAnchor = (category) => category.toLowerCase().replace(/\s+/g, '-');

export default function MarketingShowcase() {
  return (
    <main className="ss-marketing ss-home-market" aria-labelledby="promociones-destacadas">
      <section className="ss-marketing-hero">
        <img
          src="/api/creative/hero"
          alt="Sazón y Sabor: promociones, completos, churrascos, patacones y pedidos por WhatsApp"
          width="1200"
          height="630"
          loading="eager"
        />
        <div className="ss-marketing-hero-copy">
          <span>CHILE · COLOMBIA · EN LA CASA</span>
          <h1 id="promociones-destacadas">Sabor, promociones y pedido directo</h1>
          <p>Entra al catálogo completo, revisa las promociones vigentes o arma tu pedido desde una pantalla dedicada. Cada opción del menú principal ahora abre su propia página.</p>
          <div>
            <Link href="/menu">Ver catálogo</Link>
            <Link href="/pedido">Armar mi pedido</Link>
          </div>
        </div>
      </section>

      <section className="ss-home-block" aria-labelledby="productos-destacados">
        <div className="ss-home-block-head">
          <div>
            <span>FAVORITOS DE LA CASA</span>
            <h2 id="productos-destacados">Algunos productos del catálogo</h2>
          </div>
          <Link href="/menu">Ver catálogo completo →</Link>
        </div>
        <div className="ss-featured-menu-grid">
          {featured.map((product) => (
            <Link className="ss-featured-menu-card" href={`/menu#${categoryAnchor(product.category)}`} key={product.id}>
              <img src={product.image} alt={product.name} loading="lazy" />
              <div>
                <span>{product.category}</span>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <strong>{money(product.price)}</strong>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="ss-home-block" aria-labelledby="promos-home">
        <div className="ss-home-block-head">
          <div>
            <span>PROMOCIONES</span>
            <h2 id="promos-home">Portadas listas para elegir</h2>
          </div>
          <Link href="/promociones">Todas las promociones →</Link>
        </div>
        <div className="ss-marketing-grid">
          {creatives.map((item) => (
            <article key={item.slug}>
              <img
                src={`/api/creative/${item.slug}`}
                alt={`${item.title}, promoción de Sazón y Sabor por ${item.price}`}
                width="1080"
                height="1350"
                loading="lazy"
              />
              <div>
                <span>PROMOCIÓN</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <strong>{item.price}</strong>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="ss-giveaway-home" aria-labelledby="sorteo-home">
        <img src="/api/creative/sorteo-redes" alt="Sorteo Sazón y Sabor: 2 churrascos, 1 completo y bebida de 1,5 litros" width="1080" height="1350" loading="lazy" />
        <div className="ss-giveaway-copy">
          <span>SORTEO EN REDES</span>
          <h2 id="sorteo-home">Comparte, menciona y participa</h2>
          <p>Sigue nuestra cuenta, comparte la promoción en una publicación o historia mencionándonos y envía la captura para validar tu participación.</p>
          <div className="ss-giveaway-prize">
            <small>PREMIO</small>
            <strong>2 churrascos + 1 completo + bebida de 1,5 L</strong>
          </div>
          <ol>
            <li>Sigue a <b>{brand.instagram}</b> en Instagram.</li>
            <li>Publica o comparte la imagen de la promoción y menciona a <b>{brand.instagram}</b>.</li>
            <li>Envía la captura por WhatsApp o por mensaje directo en Instagram.</li>
          </ol>
          <p className="ss-giveaway-note">Si otras cuentas reales replican la promoción desde tu participación, pídeles que mencionen a {brand.instagram} y también tu cuenta. Cada cuenta distinta validada con captura suma una participación adicional a tu nombre.</p>
          <div className="ss-giveaway-actions">
            <Link href="/promociones#sorteo-redes">Ver cómo participar</Link>
            <a href={brand.instagramUrl} target="_blank" rel="noreferrer">Ir a Instagram</a>
          </div>
        </div>
      </section>

      <footer className="ss-site-footer">
        <img src={brand.logo} alt="Sazón y Sabor" />
        <p>{brand.tagline}. Consulta disponibilidad, tiempos de preparación y despacho al confirmar tu pedido.</p>
        <nav aria-label="Información legal y contacto">
          <Link href="/menu">Catálogo</Link>
          <Link href="/promociones">Promociones</Link>
          <Link href="/pedido">Pedido</Link>
          <Link href="/contacto">Contacto</Link>
          <Link href="/privacidad">Privacidad</Link>
          <Link href="/terminos">Términos</Link>
          <Link href="/reembolsos">Cambios y reembolsos</Link>
        </nav>
      </footer>
    </main>
  );
}
