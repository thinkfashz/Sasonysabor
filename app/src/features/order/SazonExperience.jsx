'use client';

import { useState } from 'react';
import { Instagram, MessageCircle, X } from 'lucide-react';
import { brand } from '@/data/menu';
import MobileOrderingApp from './MobileOrderingApp';

export default function SazonExperience() {
  const [contactOpen, setContactOpen] = useState(false);
  const [promoActive, setPromoActive] = useState(false);

  const selectPromotions = () => {
    const findAndSelect = () => {
      const filters = [...document.querySelectorAll('.ss-filter-row button')];
      const promoFilter = filters.find((button) => button.textContent?.trim() === 'Promociones');
      promoFilter?.click();
    };

    const catalogButton = document.querySelector('.ss-bottom-nav button:nth-child(2)');
    catalogButton?.click();
    requestAnimationFrame(() => requestAnimationFrame(findAndSelect));
    setTimeout(findAndSelect, 80);
  };

  const onExperienceClickCapture = (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    const bottomButton = target.closest('.ss-bottom-nav button');

    if (bottomButton?.matches(':nth-child(3)')) {
      event.preventDefault();
      event.stopPropagation();
      setPromoActive(true);
      selectPromotions();
      return;
    }

    if (bottomButton?.matches(':last-child')) {
      event.preventDefault();
      event.stopPropagation();
      setContactOpen(true);
      return;
    }

    if (bottomButton && !bottomButton.matches(':nth-child(3)')) {
      setPromoActive(false);
    }

    const tile = target.closest('.ss-product-tile');
    if (!tile) return;

    const isMediaButton = Boolean(target.closest('.ss-product-media'));
    const isAddButton = Boolean(target.closest('.ss-product-copy > div > button'));
    if (isMediaButton || isAddButton) return;

    event.preventDefault();
    event.stopPropagation();
    tile.querySelector('.ss-product-media')?.click();
  };

  const instagramUrl = brand.instagramUrl || `https://www.instagram.com/${brand.instagram.replace('@', '')}/`;
  const whatsappUrl = brand.whatsappUrl || `https://wa.me/${brand.phone.replace(/\D/g, '')}`;

  return (
    <div className={`ss-experience ${promoActive ? 'ss-promotions-active' : ''}`} onClickCapture={onExperienceClickCapture}>
      <MobileOrderingApp />

      {contactOpen ? (
        <div className="ss-contact-backdrop" role="presentation" onClick={() => setContactOpen(false)}>
          <section className="ss-contact-sheet" role="dialog" aria-modal="true" aria-label="Contacto Sazón y Sabor" onClick={(event) => event.stopPropagation()}>
            <button className="ss-contact-close" type="button" onClick={() => setContactOpen(false)} aria-label="Cerrar contacto">
              <X size={22} />
            </button>
            <img src={brand.logo} alt="Sazón y Sabor" />
            <span>CONTACTO DIRECTO</span>
            <h2>¿Cómo quieres hablar con nosotros?</h2>
            <p>Elige el canal que prefieras. Ambos accesos te llevan directamente a la cuenta oficial indicada en la carta.</p>

            <a className="ss-contact-action whatsapp" href={whatsappUrl} target="_blank" rel="noreferrer">
              <MessageCircle size={26} />
              <span><strong>WhatsApp</strong><small>{brand.phone}</small></span>
            </a>

            <a className="ss-contact-action instagram" href={instagramUrl} target="_blank" rel="noreferrer">
              <Instagram size={26} />
              <span><strong>Instagram</strong><small>{brand.instagram}</small></span>
            </a>
          </section>
        </div>
      ) : null}
    </div>
  );
}
