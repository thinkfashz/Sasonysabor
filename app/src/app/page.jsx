import SazonExperience from '@/features/order/SazonExperience';
import MarketingShowcase from '@/components/MarketingShowcase';
import OrderConsentNotice from '@/components/OrderConsentNotice';
import { brand } from '@/data/menu';

const SITE_URL = 'https://sazon-y-sabor-phi.vercel.app';

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'Sazón y Sabor',
      alternateName: brand.tagline,
      inLanguage: 'es-CL',
    },
    {
      '@type': 'Restaurant',
      '@id': `${SITE_URL}/#restaurant`,
      name: 'Sazón y Sabor',
      url: SITE_URL,
      image: `${SITE_URL}/api/creative/hero`,
      logo: brand.logo,
      telephone: brand.phone,
      description: 'Comida chilena y colombiana: completos, churrascos, arepas, sopaipillas, chorrillanas, patacones, papas y promociones.',
      servesCuisine: ['Chilena', 'Colombiana'],
      address: {
        '@type': 'PostalAddress',
        streetAddress: brand.address,
        addressCountry: 'CL',
      },
      sameAs: [brand.instagramUrl],
      hasMenu: `${SITE_URL}/menu`,
      potentialAction: {
        '@type': 'OrderAction',
        target: SITE_URL,
      },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <SazonExperience />
      <MarketingShowcase />
      <OrderConsentNotice />
    </>
  );
}
