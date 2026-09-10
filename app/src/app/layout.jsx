import './globals.css';
import '@/features/order/mobile-ordering.css';
import '@/features/order/mobile-ordering-responsive.css';
import '@/features/order/mobile-ordering-enhancements.css';
import '@/features/order/checkout-flow-enhancements.css';
import '@/features/order/cart-commerce-ux.css';
import '@/features/order/marketing-legal.css';

const SITE_URL = 'https://sazon-y-sabor-phi.vercel.app';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: 'Sazón y Sabor',
  title: {
    default: 'Sazón y Sabor | Completos, churrascos, patacones y promociones',
    template: '%s | Sazón y Sabor',
  },
  description: 'Sazón y Sabor: comida chilena y colombiana, completos, churrascos, arepas, sopaipillas, chorrillanas, patacones, papas y promociones. Revisa el catálogo y confirma tu pedido por WhatsApp, transferencia o retiro en local.',
  keywords: [
    'Sazón y Sabor',
    'completos italianos',
    'churrascos italianos',
    'chacarero',
    'barros luco',
    'patacones',
    'arepas',
    'sopaipillas',
    'chorrillanas',
    'salchipapas',
    'papas fritas',
    'comida chilena',
    'comida colombiana',
    'pedidos por WhatsApp',
    'promociones comida',
  ],
  authors: [{ name: 'Sazón y Sabor' }],
  creator: 'Sazón y Sabor',
  publisher: 'Sazón y Sabor',
  category: 'food',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    url: SITE_URL,
    siteName: 'Sazón y Sabor',
    title: 'Sazón y Sabor | Chile Colombia en la Casa',
    description: 'Promociones, completos, churrascos, patacones, arepas y más. Arma tu pedido y confirma por WhatsApp.',
    images: [
      {
        url: '/api/creative/hero',
        width: 1200,
        height: 630,
        alt: 'Sazón y Sabor: catálogo y promociones de comida chilena y colombiana',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sazón y Sabor | Chile Colombia en la Casa',
    description: 'Promociones, completos, churrascos, patacones, arepas y más.',
    images: ['/api/creative/hero'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#080706',
  colorScheme: 'dark',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es-CL">
      <body>{children}</body>
    </html>
  );
}
