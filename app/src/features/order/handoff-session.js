export const HANDOFF_STORAGE_KEY = 'ss-external-handoff-v2';
export const LEGACY_ORDER_RETURN_KEY = 'ss-order-return';
export const HANDOFF_MAX_AGE = 2 * 60 * 60 * 1000;

const now = () => Date.now();

export function readHandoff() {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.sessionStorage.getItem(HANDOFF_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function writeHandoff(patch) {
  if (typeof window === 'undefined') return null;
  const current = readHandoff() || {};
  const next = { ...current, ...patch, updatedAt: now() };
  try {
    window.sessionStorage.setItem(HANDOFF_STORAGE_KEY, JSON.stringify(next));
  } catch {}
  return next;
}

export function clearHandoff() {
  if (typeof window === 'undefined') return;
  try {
    window.sessionStorage.removeItem(HANDOFF_STORAGE_KEY);
    window.sessionStorage.removeItem(LEGACY_ORDER_RETURN_KEY);
  } catch {}
}

export function readPreparedWhatsAppUrl() {
  if (typeof window === 'undefined') return '';
  try {
    const raw = window.sessionStorage.getItem(LEGACY_ORDER_RETURN_KEY);
    if (!raw) return '';
    const parsed = JSON.parse(raw);
    return typeof parsed?.url === 'string' ? parsed.url : '';
  } catch {
    return '';
  }
}

export function normalizeMethodLabel(text = '') {
  const value = text.toLocaleLowerCase('es-CL');
  if (value.includes('transfer')) return 'transfer';
  if (value.includes('retirar') || value.includes('retiro') || value.includes('local')) return 'local';
  return 'whatsapp';
}

export function isFreshHandoff(record) {
  if (!record?.launchedAt) return false;
  const age = now() - Number(record.launchedAt);
  return age >= 0 && age < HANDOFF_MAX_AGE;
}

export function getReturnCopy(method) {
  if (method === 'transfer') {
    return {
      eyebrow: 'TRANSFERENCIA · SOLICITUD PREPARADA',
      title: '¡Gracias por tu pedido!',
      body: 'Si ya enviaste el mensaje en WhatsApp, el local recibirá tu solicitud y te compartirá los datos de transferencia para confirmar el pago.',
      status: 'Esperando datos y confirmación del local',
    };
  }

  if (method === 'local') {
    return {
      eyebrow: 'RETIRO EN LOCAL · SOLICITUD PREPARADA',
      title: '¡Gracias por tu pedido!',
      body: 'Si ya enviaste el mensaje en WhatsApp, tu retiro quedó solicitado. Espera la confirmación del local antes de ir a buscarlo.',
      status: 'Esperando confirmación para retiro',
    };
  }

  return {
    eyebrow: 'WHATSAPP · PEDIDO PREPARADO',
    title: '¡Gracias por tu pedido!',
    body: 'Si ya presionaste Enviar en WhatsApp, el equipo de Sazón y Sabor recibirá el detalle y te responderá con disponibilidad y tiempo estimado.',
    status: 'Esperando confirmación por WhatsApp',
  };
}
