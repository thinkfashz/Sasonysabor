import Link from 'next/link';
import { brand } from '@/data/menu';

export const metadata = {
  title: 'Promociones y sorteo en redes',
  description: 'Promociones de Sazón y Sabor: completos, churrascos, patacones y sorteo en redes por 2 churrascos, 1 completo y bebida de 1,5 L.',
  alternates: { canonical: '/promociones' },
  openGraph: {
    title: 'Promociones y sorteo | Sazón y Sabor',
    description: 'Revisa promociones y participa en el sorteo de redes de Sazón y Sabor.',
    images: ['/api/creative/sorteo-redes'],
  },
};

const promos = [
  { slug:'completos-papas', title:'2 Completos Italianos + Papas Chicas', price:'$6.500', copy:'Dos completos italianos más una porción de papas chicas.' },
  { slug:'churrascos-papas', title:'2 Churrascos Italianos + 2 Papas Fritas', price:'$11.500', copy:'Dos churrascos italianos acompañados de dos porciones de papas fritas.' },
  { slug:'patacones', title:'2 Patacones con Carne Mechada y Guacamole + Coca-Cola 1,5 L', price:'$15.000', copy:'Dos patacones con carne mechada y guacamole, más Coca-Cola de 1,5 litros.' },
  { slug:'papas-dos-carnes', title:'Papas Dos Carnes + Bebida 1,5 L', price:'$12.000', copy:'Longaniza, cebolla caramelizada, carne, dos huevos y bebida de 1,5 litros.' },
];

const giveawayMessage = encodeURIComponent(
  `Hola Sazón y Sabor 👋\nQuiero validar mi participación en el sorteo de redes. Ya sigo a ${brand.instagram}, compartí la promoción mencionándolos y quiero enviar mi captura.`,
);

export default function PromotionsPage() {
  return (
    <main className="ss-promos-page">
      <header className="ss-promos-head">
        <Link href="/"><img src={brand.logo} alt="Sazón y Sabor" /></Link>
        <div>
          <span>PROMOCIONES SÁZON Y SABOR</span>
          <h1>Promos para compartir y pedir fácil</h1>
          <p>Revisa las ofertas vigentes, arma tu pedido o participa en nuestro sorteo de redes.</p>
        </div>
        <nav><Link href="/menu">Ver catálogo</Link><Link href="/pedido">Armar pedido</Link></nav>
      </header>

      <section className="ss-giveaway-card" id="sorteo-redes" aria-labelledby="sorteo-titulo">
        <img src="/api/creative/sorteo-redes" alt="Sorteo Sazón y Sabor: 2 churrascos, 1 completo y bebida de 1,5 litros" width="1080" height="1350" />
        <div className="ss-giveaway-copy">
          <span>SORTEO EN REDES</span>
          <h2 id="sorteo-titulo">Participa por un premio para compartir</h2>
          <div className="ss-giveaway-prize">
            <small>PREMIO</small>
            <strong>2 churrascos + 1 completo + bebida de 1,5 L</strong>
          </div>
          <ol>
            <li><b>Sigue</b> a {brand.instagram} en Instagram.</li>
            <li><b>Publica o comparte</b> la imagen de la aplicación o de esta promoción en una publicación o historia y menciona a {brand.instagram}.</li>
            <li><b>Envía la captura</b> por WhatsApp o por mensaje directo de Instagram para validar la participación.</li>
          </ol>
          <p className="ss-giveaway-note">Si otras cuentas reales replican la promoción desde tu participación, pídeles que mencionen a {brand.instagram} y también tu cuenta. Cada cuenta distinta validada con captura suma una participación adicional a tu nombre. La misma cuenta o captura no se contabiliza dos veces.</p>
          <p className="ss-giveaway-note">No necesitas comprar para participar. La fecha de cierre, validación y forma de selección de la persona ganadora se comunicarán por los canales oficiales de Sazón y Sabor.</p>
          <div className="ss-giveaway-actions">
            <a href={`${brand.whatsappUrl}?text=${giveawayMessage}`} target="_blank" rel="noreferrer">Enviar captura por WhatsApp</a>
            <a href={brand.instagramUrl} target="_blank" rel="noreferrer">Enviar por Instagram</a>
          </div>
        </div>
      </section>

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
