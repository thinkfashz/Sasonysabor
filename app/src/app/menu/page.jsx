import Link from 'next/link';
import { brand, products } from '@/data/menu';

export const metadata = {
  title: 'Menú y precios',
  description: 'Consulta el menú de Sazón y Sabor con completos, churrascos, arepas, sopaipillas, papas, salchipapas, chorrillanas, bebidas, extras y promociones.',
  alternates: { canonical: '/menu' },
  openGraph: {
    title: 'Menú y precios | Sazón y Sabor',
    description: 'Comida chilena y colombiana, productos, precios y promociones para pedir por WhatsApp.',
    images: ['/api/creative/hero'],
  },
};

const money = (value) => new Intl.NumberFormat('es-CL', {
  style: 'currency', currency: 'CLP', maximumFractionDigits: 0,
}).format(value);

export default function MenuPage() {
  const groups = products.reduce((acc, product) => {
    (acc[product.category] ||= []).push(product);
    return acc;
  }, {});

  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Menú Sazón y Sabor',
    itemListElement: products.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'MenuItem',
        name: product.name,
        description: product.description,
        image: product.image,
        offers: {
          '@type': 'Offer',
          priceCurrency: 'CLP',
          price: product.price,
          url: 'https://sazon-y-sabor-phi.vercel.app/',
        },
      },
    })),
  };

  return (
    <main className="ss-menu-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList).replace(/</g, '\\u003c') }} />
      <header className="ss-menu-head">
        <Link href="/"><img src={brand.logo} alt="Sazón y Sabor" /></Link>
        <span>MENÚ COMPLETO · PRECIOS EN CLP</span>
        <h1>Elige tu próximo antojo</h1>
        <p>Consulta productos, ingredientes y precios. Para comprar, vuelve a la experiencia de pedido y confirma disponibilidad con el local.</p>
        <nav>
          <Link href="/">Abrir catálogo interactivo</Link>
          <Link href="/promociones">Ver promociones</Link>
          <a href={brand.whatsappUrl} target="_blank" rel="noreferrer">WhatsApp</a>
        </nav>
      </header>

      <div className="ss-menu-groups">
        {Object.entries(groups).map(([category, items]) => (
          <section key={category} id={category.toLowerCase().replace(/\s+/g, '-')}>
            <header><span>CATEGORÍA</span><h2>{category}</h2><small>{items.length} opciones</small></header>
            <div>
              {items.map((product) => (
                <article key={product.id}>
                  <img src={product.image} alt={product.name} loading="lazy" />
                  <div><h3>{product.name}</h3><p>{product.description}</p></div>
                  <strong>{money(product.price)}</strong>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>

      <footer className="ss-menu-footer">
        <p>Precios y disponibilidad sujetos a confirmación. Para coordinar retiro, despacho o transferencia usa los canales oficiales.</p>
        <nav><Link href="/terminos">Términos</Link><Link href="/privacidad">Privacidad</Link><Link href="/reembolsos">Cambios y reembolsos</Link></nav>
      </footer>
    </main>
  );
}
