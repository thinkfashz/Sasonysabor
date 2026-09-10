import Link from 'next/link';
import { brand } from '@/data/menu';

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

export default function MarketingShowcase() {
  return (
    <section className="ss-marketing" aria-labelledby="promociones-destacadas">
      <div className="ss-marketing-hero">
        <img
          src="/api/creative/hero"
          alt="Sazón y Sabor: promociones, completos, churrascos, patacones y pedidos por WhatsApp"
          width="1200"
          height="630"
          loading="eager"
        />
        <div className="ss-marketing-hero-copy">
          <span>CHILE · COLOMBIA · EN LA CASA</span>
          <h2 id="promociones-destacadas">Promociones para pedir fácil</h2>
          <p>Revisa el catálogo, arma tu pedido y confirma por WhatsApp, transferencia o retiro en local.</p>
          <div>
            <Link href="/promociones">Ver promociones</Link>
            <a href={brand.whatsappUrl} target="_blank" rel="noreferrer">Pedir por WhatsApp</a>
          </div>
        </div>
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

      <footer className="ss-site-footer">
        <img src={brand.logo} alt="Sazón y Sabor" />
        <p>{brand.tagline}. Consulta disponibilidad, tiempos de preparación y despacho al confirmar tu pedido.</p>
        <nav aria-label="Información legal y contacto">
          <Link href="/promociones">Promociones</Link>
          <Link href="/privacidad">Privacidad</Link>
          <Link href="/terminos">Términos</Link>
          <Link href="/reembolsos">Cambios y reembolsos</Link>
          <a href={brand.instagramUrl} target="_blank" rel="noreferrer">Instagram</a>
          <a href={brand.whatsappUrl} target="_blank" rel="noreferrer">WhatsApp</a>
        </nav>
      </footer>
    </section>
  );
}
