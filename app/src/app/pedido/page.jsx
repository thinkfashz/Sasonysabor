import SazonExperience from '@/features/order/SazonExperience';
import OrderConsentNotice from '@/components/OrderConsentNotice';

export const metadata = {
  title: 'Arma tu pedido',
  description: 'Arma tu pedido de Sazón y Sabor, revisa productos, extras, retiro o despacho y confirma por WhatsApp.',
  alternates: { canonical: '/pedido' },
  openGraph: {
    title: 'Arma tu pedido | Sazón y Sabor',
    description: 'Selecciona productos y confirma tu pedido directamente con Sazón y Sabor.',
    images: ['/api/creative/hero'],
  },
};

export default function OrderPage() {
  return (
    <>
      <SazonExperience />
      <OrderConsentNotice />
    </>
  );
}
