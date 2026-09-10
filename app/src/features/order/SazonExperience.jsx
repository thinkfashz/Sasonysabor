'use client';

import { useEffect, useState } from 'react';
import {
  Check,
  Clock3,
  Instagram,
  Landmark,
  LoaderCircle,
  MessageCircle,
  Store,
  X,
} from 'lucide-react';
import { brand } from '@/data/menu';
import MobileOrderingApp from './MobileOrderingApp';
import {
  clearHandoff,
  getReturnCopy,
  isFreshHandoff,
  normalizeMethodLabel,
  readHandoff,
  readPreparedWhatsAppUrl,
  writeHandoff,
} from './handoff-session';

function HandoffIcon({ method }) {
  if (method === 'transfer') return <Landmark size={29} />;
  if (method === 'local') return <Store size={29} />;
  return <MessageCircle size={29} />;
}

export default function SazonExperience() {
  const [contactOpen, setContactOpen] = useState(false);
  const [promoActive, setPromoActive] = useState(false);
  const [handoff, setHandoff] = useState(null);
  const [showHandoffFallback, setShowHandoffFallback] = useState(false);
  const [paymentNotice, setPaymentNotice] = useState(false);

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

  useEffect(() => {
    const stored = readHandoff();

    if (stored && !isFreshHandoff(stored)) {
      clearHandoff();
      setHandoff(null);
    } else if (stored?.phase === 'away') {
      const returned = writeHandoff({
        phase: 'returned',
        returnedAt: Date.now(),
        url: stored.url || readPreparedWhatsAppUrl(),
      });
      setHandoff(returned);
    } else if (stored?.phase === 'launching' || stored?.phase === 'returned') {
      setHandoff(stored);
    }

    const markAway = () => {
      const current = readHandoff();
      if (!current || current.phase !== 'launching' || !isFreshHandoff(current)) return;
      const next = writeHandoff({
        phase: 'away',
        leftAt: Date.now(),
        url: current.url || readPreparedWhatsAppUrl(),
      });
      setHandoff(next);
    };

    const markReturned = () => {
      if (document.visibilityState === 'hidden') return;
      const current = readHandoff();
      if (!current || current.phase !== 'away' || !isFreshHandoff(current)) return;
      if (!current.leftAt || Date.now() - Number(current.leftAt) < 450) return;

      const next = writeHandoff({
        phase: 'returned',
        returnedAt: Date.now(),
        url: current.url || readPreparedWhatsAppUrl(),
      });
      setHandoff(next);
    };

    const onVisibility = () => {
      if (document.visibilityState === 'hidden') markAway();
      else markReturned();
    };

    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('pagehide', markAway);
    window.addEventListener('pageshow', markReturned);
    window.addEventListener('focus', markReturned);

    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pagehide', markAway);
      window.removeEventListener('pageshow', markReturned);
      window.removeEventListener('focus', markReturned);
    };
  }, []);

  useEffect(() => {
    if (handoff?.phase !== 'launching') {
      setShowHandoffFallback(false);
      return undefined;
    }

    const syncUrl = setTimeout(() => {
      const url = readPreparedWhatsAppUrl();
      if (!url) return;
      const next = writeHandoff({ url });
      setHandoff(next);
    }, 70);

    const fallback = setTimeout(() => setShowHandoffFallback(true), 1800);
    return () => {
      clearTimeout(syncUrl);
      clearTimeout(fallback);
    };
  }, [handoff?.phase]);

  const beginExternalHandoff = (reviewScreen) => {
    const confirmationRow = [...reviewScreen.querySelectorAll('.ss-review-data > span')]
      .find((row) => row.textContent?.includes('Confirmación'));
    const method = normalizeMethodLabel(confirmationRow?.textContent || 'WhatsApp');

    const next = writeHandoff({
      phase: 'launching',
      method,
      launchedAt: Date.now(),
      leftAt: null,
      returnedAt: null,
      url: '',
    });

    setHandoff(next);
    setShowHandoffFallback(false);
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

    const primaryButton = target.closest('.ss-checkout-screen > .ss-primary-button');
    const checkoutScreen = primaryButton?.closest('.ss-checkout-screen');

    if (primaryButton && checkoutScreen?.querySelector('.ss-payment-options')) {
      const visibleSelection = checkoutScreen.querySelector('.ss-payment-options > button.selected');
      if (!visibleSelection) {
        event.preventDefault();
        event.stopPropagation();
        setPaymentNotice(true);
        checkoutScreen.querySelector('.ss-payment-options > button')?.focus();
        setTimeout(() => setPaymentNotice(false), 2800);
        return;
      }
    }

    if (primaryButton && checkoutScreen?.querySelector('.ss-review-list')) {
      beginExternalHandoff(checkoutScreen);
      return;
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

  const openPreparedWhatsApp = () => {
    const url = handoff?.url || readPreparedWhatsAppUrl();
    if (url) window.location.href = url;
  };

  const finishReturn = () => {
    clearHandoff();
    window.location.reload();
  };

  const instagramUrl = brand.instagramUrl || `https://www.instagram.com/${brand.instagram.replace('@', '')}/`;
  const whatsappUrl = brand.whatsappUrl || `https://wa.me/${brand.phone.replace(/\D/g, '')}`;
  const returnCopy = getReturnCopy(handoff?.method);

  return (
    <div className={`ss-experience ${promoActive ? 'ss-promotions-active' : ''}`} onClickCapture={onExperienceClickCapture}>
      <MobileOrderingApp />

      {paymentNotice ? (
        <div className="ss-flow-toast" role="status">
          <MessageCircle size={18} />
          <span><strong>Elige una opción para continuar</strong><small>WhatsApp o transferencia están disponibles para despacho.</small></span>
        </div>
      ) : null}

      {handoff?.phase === 'launching' ? (
        <div className="ss-handoff-layer" role="status" aria-live="polite">
          <section className="ss-handoff-card ss-handoff-loading">
            <img src={brand.logo} alt="Sazón y Sabor" />
            <div className="ss-handoff-spinner"><LoaderCircle size={38} /></div>
            <span>CONFIRMANDO TU PEDIDO</span>
            <h2>Abriendo WhatsApp…</h2>
            <p>Estamos preparando el resumen con tus productos, datos y forma de confirmación.</p>

            <div className="ss-handoff-progress">
              <div className="done"><Check size={15} /><span><strong>Pedido revisado</strong><small>Productos y total listos</small></span></div>
              <div className="active"><MessageCircle size={15} /><span><strong>WhatsApp</strong><small>Abriendo conversación con Sazón y Sabor</small></span></div>
              <div><Clock3 size={15} /><span><strong>Regresa a esta pantalla</strong><small>El agradecimiento aparecerá cuando vuelvas</small></span></div>
            </div>

            {showHandoffFallback ? (
              <button className="ss-primary-button ss-whatsapp-button" type="button" onClick={openPreparedWhatsApp}>
                <MessageCircle size={19} /> Abrir WhatsApp nuevamente
              </button>
            ) : null}
            <small className="ss-handoff-note">No marcamos el pedido como finalizado antes de que salgas a WhatsApp.</small>
          </section>
        </div>
      ) : null}

      {handoff?.phase === 'returned' ? (
        <div className="ss-handoff-layer ss-return-layer" role="dialog" aria-modal="true" aria-label="Pedido enviado">
          <section className="ss-handoff-card ss-return-card">
            <img src={brand.logo} alt="Sazón y Sabor" />
            <div className="ss-return-check"><Check size={38} /></div>
            <span>{returnCopy.eyebrow}</span>
            <h2>{returnCopy.title}</h2>
            <p>{returnCopy.body}</p>

            <div className="ss-return-status">
              <HandoffIcon method={handoff?.method} />
              <span><small>Estado</small><strong>{returnCopy.status}</strong></span>
            </div>

            <button className="ss-primary-button" type="button" onClick={finishReturn}>
              Seguir comprando
            </button>
            {(handoff?.url || readPreparedWhatsAppUrl()) ? (
              <button className="ss-secondary-button" type="button" onClick={openPreparedWhatsApp}>
                <MessageCircle size={18} /> Volver a WhatsApp
              </button>
            ) : null}
            <small className="ss-handoff-note">La web no puede comprobar si presionaste “Enviar” dentro de WhatsApp; esta confirmación aparece al detectar tu regreso a la sesión.</small>
          </section>
        </div>
      ) : null}

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
