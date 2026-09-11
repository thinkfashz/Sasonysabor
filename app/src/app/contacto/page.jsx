import Link from 'next/link';
import { Instagram, MapPin, MessageCircle } from 'lucide-react';
import { brand } from '@/data/menu';

export const metadata = {
  title: 'Contacto',
  description: 'Contacta a Sazón y Sabor por WhatsApp o Instagram y revisa la ubicación informada por el local.',
  alternates: { canonical: '/contacto' },
  openGraph: {
    title: 'Contacto | Sazón y Sabor',
    description: 'WhatsApp, Instagram y ubicación de Sazón y Sabor.',
    images: ['/api/creative/hero'],
  },
};

export default function ContactPage() {
  return (
    <main className="ss-contact-page">
      <section className="ss-contact-wrap">
        <Link href="/"><img src={brand.logo} alt="Sazón y Sabor" /></Link>
        <span>CONTACTO DIRECTO</span>
        <h1>Habla con Sazón y Sabor</h1>
        <p>Elige el canal que prefieras para consultar disponibilidad, tiempos, promociones, despacho o retiro.</p>

        <div className="ss-contact-grid">
          <a className="ss-contact-card" href={brand.whatsappUrl} target="_blank" rel="noreferrer">
            <MessageCircle size={30} />
            <strong>WhatsApp</strong>
            <small>{brand.phone} · pedidos, consultas y envío de capturas del sorteo.</small>
          </a>
          <a className="ss-contact-card" href={brand.instagramUrl} target="_blank" rel="noreferrer">
            <Instagram size={30} />
            <strong>Instagram</strong>
            <small>{brand.instagram} · promociones, menciones y mensajes directos.</small>
          </a>
        </div>

        <div className="ss-contact-address">
          <MapPin size={22} />
          <p><strong>Ubicación informada por el local</strong><br />{brand.address}</p>
        </div>

        <nav className="ss-contact-links" aria-label="Accesos rápidos">
          <Link href="/menu">Ver catálogo</Link>
          <Link href="/promociones">Ver promociones</Link>
          <Link href="/pedido">Armar pedido</Link>
        </nav>
      </section>
    </main>
  );
}
