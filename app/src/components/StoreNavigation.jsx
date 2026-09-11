'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, Tag, ShoppingBag, MessageCircle } from 'lucide-react';

const items = [
  { href: '/', label: 'Inicio', icon: Home },
  { href: '/menu', label: 'Catálogo', icon: Search },
  { href: '/promociones', label: 'Promos', icon: Tag },
  { href: '/pedido', label: 'Pedido', icon: ShoppingBag },
  { href: '/contacto', label: 'Contacto', icon: MessageCircle },
];

function isActive(pathname, href) {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function StoreNavigation() {
  const pathname = usePathname();

  return (
    <nav className="ss-route-nav" aria-label="Navegación principal de Sazón y Sabor">
      {items.map(({ href, label, icon: Icon }) => {
        const active = isActive(pathname, href);
        return (
          <Link
            key={href}
            href={href}
            className={active ? 'active' : ''}
            aria-current={active ? 'page' : undefined}
            onClick={() => {
              if (active) window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <span><Icon size={21} /></span>
            <small>{label}</small>
          </Link>
        );
      })}
    </nav>
  );
}
