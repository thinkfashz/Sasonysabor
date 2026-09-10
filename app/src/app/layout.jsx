import './globals.css';
import '@/features/order/mobile-ordering.css';
import '@/features/order/mobile-ordering-responsive.css';
import '@/features/order/mobile-ordering-enhancements.css';

export const metadata = {
  title: 'Sazón y Sabor | Chile Colombia en la Casa',
  description: 'Completos, churrascos, arepas, sopaipillas, chorrillanas, papas y promociones de Sazón y Sabor.'
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#080706'
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
