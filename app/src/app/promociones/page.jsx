import Link from 'next/link';
import { brand } from '@/data/menu';

export const metadata = {
  title: 'Promociones de completos, churrascos y patacones | Sazón y Sabor',
  description: 'Promociones de Sazón y Sabor: completos italianos, churrascos italianos, patacones, papas dos carnes y pedidos por WhatsApp o retiro en local.',
  alternates: { canonical: '/promociones' },
  openGraph: {
    title: 'Promociones Sazón y Sabor',
    description: 'Completos, churrascos, patacones y papas en promociones para pedir por WhatsApp.',
    images: ['/api/creative/hero'],
  },
};

const promos = [
  { slug:'completos-papas', title:'2 Completos Italianos + Papas Chicas', price:'$6.500', copy:'Dos completos italianos más una porción de papas chicas.' },
  { slug:'churrascos-papas', title:'2 Churrascos Italianos + 2 Papas Fritas', price:'$11.500', copy:'Dos churrascos italianos acompañados de dos porciones de papas fritas.' },
  { slug:'patacones', title:'2 Patacones con Carne Mechada y Guacamole + Coca-Cola 1,5 L', price:'$15.000', copy:'Dos patacones con carne mechada y guacamole, más Coca-Cola de 1,5 litros.' },
  { slug:'papas-dos-carnes', title:'Papas Dos Carnes + Bebida 1,5 L', price:'$12.000', copy:'Longaniza, cebolla caramelizada, carne, dos huevos y bebida de 1,5 litros.' },
];

export default function PromotionsPage() {
  return (
    <main className="ss-promos-page">
      <header className="ss-promos-head">
        <Link href="/"><img src={brand.logo} alt="Sazón y Sabor" /></Link>
        <div>
          <span>PROMOCIONES SÁZON Y SABOR</span>
          <h1>Promos para compartir y pedir fácil</h1>
          <p>Elige una promoción y confirma disponibilidad directamente por WhatsApp. Los precios corresponden a las piezas promocionales vigentes cargadas en esta versión de la carta.</p>
        </div>
        <nav><Link href="/">Volver al catálogo</Link><a href={brand.whatsappUrl} target="_blank" rel="noreferrer">Pedir por WhatsApp</a></nav>
      </header>

      <section className="ss-promos-grid" aria-label="Promociones destacadas">
        {promos.map((promo) => (
          <article key={promo.slug}>
            <img src={`/api/creative/${promo.slug}`} alt={`${promo.title} por ${promo.price}`} width="1080" height="1350" />
            <div>
              <span>OFERTA DESTACADA</span>
              <h2>{promo.title}</h2>
              <p>{promo.copy}</p>
              <strong>{promo.price}</strong>
              <a href={`${brand.whatsappUrl}?text=${encodeURIComponent(`Hola Sazón y Sabor, quiero consultar por la promoción: ${promo.title} ${promo.price}.`)}`} target="_blank" rel="noreferrer">Consultar esta promo</a>
            </div>
          </article>
        ))}
      </section>

      <section className="ss-promos-note">
        <h2>Antes de confirmar</h2>
        <p>La disponibilidad, tiempo de preparación, retiro o despacho se confirma con el local. Revisa también nuestros <Link href="/terminos">términos de compra</Link> y la <Link href="/reembolsos">política para alimentos preparados</Link>.</p>
      </section>
    </main>
  );
}
