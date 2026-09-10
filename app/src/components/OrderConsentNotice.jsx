'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, X } from 'lucide-react';

const CONSENT_KEY = 'sazon-order-consent-v1';

export default function OrderConsentNotice() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      setOpen(window.localStorage.getItem(CONSENT_KEY) !== 'accepted');
    } catch {
      setOpen(true);
    }
  }, []);

  const accept = () => {
    try {
      window.localStorage.setItem(CONSENT_KEY, 'accepted');
    } catch {}
    setOpen(false);
  };

  if (!open) return null;

  return (
    <aside className="ss-consent" role="dialog" aria-live="polite" aria-label="Consentimiento para datos del pedido">
      <div className="ss-consent-icon"><ShieldCheck size={24} /></div>
      <div className="ss-consent-copy">
        <strong>Tu pedido y tus datos, con claridad</strong>
        <p>
          Para gestionar un pedido podemos solicitar nombre, teléfono y, si eliges despacho, dirección y referencias. Se usan para preparar, coordinar y confirmar tu compra. Al continuar aceptas este uso y declaras haber leído nuestros términos.
        </p>
        <nav aria-label="Documentos legales">
          <Link href="/privacidad">Privacidad</Link>
          <Link href="/terminos">Términos de compra</Link>
          <Link href="/reembolsos">Cambios y reembolsos</Link>
        </nav>
      </div>
      <div className="ss-consent-actions">
        <button type="button" onClick={accept}>Aceptar y continuar</button>
        <button className="ss-consent-close" type="button" onClick={() => setOpen(false)} aria-label="Cerrar aviso"><X size={18} /></button>
      </div>
    </aside>
  );
}
