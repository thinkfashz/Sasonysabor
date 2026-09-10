'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  Check,
  ChevronRight,
  Clock3,
  Heart,
  Home,
  Landmark,
  MapPin,
  Menu,
  MessageCircle,
  Minus,
  Phone,
  Plus,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Store,
  Tag,
  Trash2,
  Truck,
  UserRound,
  UtensilsCrossed,
} from 'lucide-react';
import { brand, categories, products, promotions, visuals } from '@/data/menu';
import {
  CHECKOUT_STEPS,
  FLOW_SCREENS,
  PRIMARY_CATEGORIES,
  buildCartLine,
  formatMoney,
  getCartTotal,
  getExtrasForProduct,
  getLineTotal,
  getRelatedProducts,
} from './order-config';

const CATEGORY_ART = {
  Completos: visuals.completo,
  Arepas: visuals.arepa,
  Churrascos: visuals.churrasco,
  Salchipapas: visuals.papas,
  'Papas Fritas': visuals.papas,
  Chorrillanas: visuals.chorrillana,
  Sopaipillas: visuals.arepa,
  Kids: visuals.kids,
  Bebidas: visuals.bebida,
};

const INGREDIENT_ICON = <UtensilsCrossed size={14} />;

function splitIngredients(description = '') {
  return description
    .replace(/\.$/, '')
    .split(/,| y /)
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 6);
}

function BottomNav({ screen, onNavigate, cartCount }) {
  const items = [
    [FLOW_SCREENS.HOME, Home, 'Inicio'],
    [FLOW_SCREENS.CATALOG, Search, 'Categorías'],
    ['promos', Tag, 'Promos'],
    ['favorites', Heart, 'Favoritos'],
    ['account', UserRound, 'Mi cuenta'],
  ];

  return (
    <nav className="ss-bottom-nav" aria-label="Navegación principal">
      {items.map(([id, Icon, label]) => (
        <button
          key={id}
          className={screen === id ? 'active' : ''}
          onClick={() => onNavigate(id)}
          type="button"
        >
          <span className="ss-nav-icon">
            <Icon size={19} />
            {id === FLOW_SCREENS.CATALOG && cartCount > 0 ? (
              <i>{cartCount}</i>
            ) : null}
          </span>
          <small>{label}</small>
        </button>
      ))}
    </nav>
  );
}

function AppHeader({ cartCount, onCart, onMenu }) {
  return (
    <header className="ss-app-header">
      <button className="ss-icon-button" type="button" onClick={onMenu} aria-label="Abrir menú">
        <Menu size={20} />
      </button>
      <img className="ss-header-logo" src={brand.logo} alt="Sazón y Sabor" />
      <button className="ss-cart-button" type="button" onClick={onCart} aria-label="Ver pedido">
        <ShoppingBag size={21} />
        {cartCount > 0 ? <b>{cartCount}</b> : null}
      </button>
    </header>
  );
}

function ProductTile({ product, onOpen, onAdd, compact = false }) {
  return (
    <article className={`ss-product-tile ${compact ? 'compact' : ''}`}>
      <button className="ss-product-media" type="button" onClick={() => onOpen(product)}>
        <span className="ss-food-glow" />
        <img src={product.image} alt={product.name} loading="lazy" />
      </button>
      <div className="ss-product-copy">
        <span>{product.category}</span>
        <h3>{product.name}</h3>
        {!compact ? <p>{product.description}</p> : null}
        <div>
          <strong>{formatMoney(product.price)}</strong>
          <button type="button" onClick={() => onAdd(product)} aria-label={`Añadir ${product.name}`}>
            <Plus size={17} />
          </button>
        </div>
      </div>
    </article>
  );
}

function HomeScreen({ onBrowse, onCategory, onProduct, onAdd, onCart, cartCount }) {
  const featured = products.filter((item) => item.popular).slice(0, 5);
  const promo = promotions[0];

  return (
    <section className="ss-screen ss-home-screen">
      <AppHeader cartCount={cartCount} onCart={onCart} onMenu={() => {}} />

      <div className="ss-home-hero">
        <div className="ss-logo-stage">
          <span className="ss-logo-flare" />
          <img src={brand.logo} alt="Sazón y Sabor" />
        </div>
        <span className="ss-kicker"><Sparkles size={13} /> CHILE · COLOMBIA · EN LA CASA</span>
        <h1>¡Bienvenido!</h1>
        <p>El auténtico sabor de Chile y Colombia, directo a tu mesa.</p>
        <button className="ss-search-launcher" type="button" onClick={onBrowse}>
          <Search size={18} />
          <span>¿Qué se te antoja hoy?</span>
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="ss-category-grid">
        {PRIMARY_CATEGORIES.slice(0, 8).map((category) => (
          <button type="button" key={category} onClick={() => onCategory(category)}>
            <span><img src={CATEGORY_ART[category]} alt="" /></span>
            <strong>{category}</strong>
          </button>
        ))}
      </div>

      <div className="ss-section-heading">
        <div>
          <span>Favoritos de la casa</span>
          <h2>Productos destacados</h2>
        </div>
        <button type="button" onClick={onBrowse}>Ver todos <ChevronRight size={16} /></button>
      </div>

      <div className="ss-featured-row">
        {featured.map((product) => (
          <ProductTile key={product.id} product={product} onOpen={onProduct} onAdd={onAdd} compact />
        ))}
      </div>

      {promo ? (
        <button className="ss-promo-strip" type="button" onClick={onBrowse}>
          <img src={promo.image} alt="" />
          <span><small>PROMO DESTACADA</small><strong>{promo.title}</strong></span>
          <b>{formatMoney(promo.price)}</b>
          <ChevronRight size={20} />
        </button>
      ) : null}

      <div className="ss-trust-strip">
        <span><Truck size={18} /><b>Fácil y rápido</b></span>
        <span><ShieldCheck size={18} /><b>Pedido seguro</b></span>
        <span><Heart size={18} /><b>El mismo gran sabor</b></span>
      </div>
    </section>
  );
}

function CatalogScreen({ initialCategory, onBack, onProduct, onAdd, onCart, cartCount }) {
  const [active, setActive] = useState(initialCategory || 'Todos');
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (initialCategory) setActive(initialCategory);
  }, [initialCategory]);

  const visible = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return products.filter((item) => {
      const categoryMatch = active === 'Todos' || item.category === active;
      const queryMatch = !normalized || `${item.name} ${item.description}`.toLowerCase().includes(normalized);
      return categoryMatch && queryMatch;
    });
  }, [active, query]);

  return (
    <section className="ss-screen ss-catalog-screen">
      <div className="ss-subpage-head">
        <button className="ss-icon-button" type="button" onClick={onBack}><ArrowLeft size={20} /></button>
        <div><small>EXPLORAR CATÁLOGO</small><strong>Elige tu antojo</strong></div>
        <button className="ss-cart-button" type="button" onClick={onCart}>
          <ShoppingBag size={21} />{cartCount > 0 ? <b>{cartCount}</b> : null}
        </button>
      </div>

      <label className="ss-search-box">
        <Search size={18} />
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar completo, arepa, churrasco..." />
        <kbd>{visible.length}</kbd>
      </label>

      <div className="ss-filter-row">
        {categories.map((category) => (
          <button key={category} type="button" className={active === category ? 'active' : ''} onClick={() => setActive(category)}>
            {category}
          </button>
        ))}
      </div>

      <div className="ss-catalog-grid">
        {visible.map((product) => (
          <ProductTile key={product.id} product={product} onOpen={onProduct} onAdd={onAdd} />
        ))}
      </div>

      {!visible.length ? (
        <div className="ss-empty-state"><Search size={30} /><strong>No encontramos ese producto</strong><span>Prueba con otra búsqueda.</span></div>
      ) : null}
    </section>
  );
}

function ProductScreen({ product, onBack, onAdd, onOpenRelated }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [notes, setNotes] = useState('');
  const availableExtras = getExtrasForProduct(product);
  const related = getRelatedProducts(product, 4);
  const extrasValue = selectedExtras.reduce((sum, extra) => sum + extra.price, 0);
  const unitPrice = product.price + extrasValue;

  useEffect(() => {
    setQuantity(1);
    setSelectedExtras([]);
    setNotes('');
  }, [product?.id]);

  const toggleExtra = (extra) => {
    setSelectedExtras((current) =>
      current.some((item) => item.id === extra.id)
        ? current.filter((item) => item.id !== extra.id)
        : [...current, extra],
    );
  };

  return (
    <section className="ss-screen ss-product-screen">
      <div className="ss-product-hero">
        <button className="ss-floating-back" type="button" onClick={onBack}><ArrowLeft size={20} /></button>
        <span className="ss-product-hero-glow" />
        <img src={product.image} alt={product.name} />
      </div>

      <div className="ss-product-panel">
        <span className="ss-kicker">{product.category}</span>
        <div className="ss-product-title-row">
          <h1>{product.name}</h1>
          <strong>{formatMoney(product.price)}</strong>
        </div>
        <p>{product.description}</p>

        <div className="ss-ingredient-row">
          {splitIngredients(product.description).map((ingredient) => (
            <span key={ingredient}>{INGREDIENT_ICON}<small>{ingredient}</small></span>
          ))}
        </div>

        <div className="ss-option-grid">
          <div className="ss-quantity-card">
            <small>Cantidad</small>
            <div>
              <button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))}><Minus size={17} /></button>
              <strong>{quantity}</strong>
              <button type="button" onClick={() => setQuantity((value) => value + 1)}><Plus size={17} /></button>
            </div>
          </div>

          {availableExtras.length ? (
            <div className="ss-extras-card">
              <small>Extras disponibles</small>
              {availableExtras.map((extra) => (
                <button
                  key={extra.id}
                  type="button"
                  className={selectedExtras.some((item) => item.id === extra.id) ? 'selected' : ''}
                  onClick={() => toggleExtra(extra)}
                >
                  <i>{selectedExtras.some((item) => item.id === extra.id) ? <Check size={12} /> : null}</i>
                  <span>{extra.name}</span>
                  <b>+{formatMoney(extra.price)}</b>
                </button>
              ))}
            </div>
          ) : (
            <div className="ss-extras-card ss-no-extras">
              <small>Personalización</small>
              <span>Este producto no tiene extras confirmados en la carta actual.</span>
            </div>
          )}
        </div>

        <label className="ss-notes-field">
          <span>Notas especiales <small>(opcional)</small></span>
          <input value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="Ej: sin mayo, bien cocido..." />
        </label>

        <button
          className="ss-primary-button"
          type="button"
          onClick={() => onAdd(product, selectedExtras, quantity, notes)}
        >
          <ShoppingBag size={18} />
          Agregar al pedido · {formatMoney(unitPrice * quantity)}
        </button>

        <div className="ss-section-heading related-heading">
          <div><span>También te puede gustar</span><h2>Combina tu pedido</h2></div>
        </div>
        <div className="ss-related-row">
          {related.map((item) => (
            <ProductTile key={item.id} product={item} onOpen={onOpenRelated} onAdd={(candidate) => onAdd(candidate, [], 1, '')} compact />
          ))}
        </div>
      </div>
    </section>
  );
}

function CheckoutStepper({ screen }) {
  const activeIndex = CHECKOUT_STEPS.findIndex((step) => step.id === screen);
  return (
    <div className="ss-stepper">
      {CHECKOUT_STEPS.map((step, index) => (
        <span key={step.id} className={index === activeIndex ? 'active' : index < activeIndex ? 'done' : ''}>
          <i>{index < activeIndex ? <Check size={12} /> : index + 1}</i>
          <small>{step.label}</small>
        </span>
      ))}
    </div>
  );
}

function CartScreen({ cart, onBack, onQuantity, onRemove, onContinue }) {
  const total = getCartTotal(cart);
  const promo = promotions.find((item) => item.id === 'promo-3-italianos') || promotions[0];

  return (
    <section className="ss-screen ss-checkout-screen">
      <div className="ss-subpage-head">
        <button className="ss-icon-button" type="button" onClick={onBack}><ArrowLeft size={20} /></button>
        <div><small>PASO 1</small><strong>Tu pedido</strong></div>
        <span className="ss-head-spacer" />
      </div>
      <CheckoutStepper screen={FLOW_SCREENS.CART} />

      <div className="ss-checkout-copy">
        <span className="ss-kicker">REVISA TU SELECCIÓN</span>
        <h1>Tu pedido</h1>
        <p>Todo claro antes de continuar.</p>
      </div>

      <div className="ss-cart-lines">
        {cart.map((line) => (
          <article key={line.lineId}>
            <img src={line.product.image} alt="" />
            <div className="ss-cart-line-copy">
              <strong>{line.product.name}</strong>
              {line.extras.length ? <small>+ {line.extras.map((extra) => extra.name).join(', ')}</small> : null}
              {line.notes ? <small>Nota: {line.notes}</small> : null}
              <b>{formatMoney(line.unitPrice)} c/u</b>
            </div>
            <div className="ss-cart-line-controls">
              <button type="button" onClick={() => onQuantity(line.lineId, -1)}><Minus size={14} /></button>
              <strong>{line.quantity}</strong>
              <button type="button" onClick={() => onQuantity(line.lineId, 1)}><Plus size={14} /></button>
            </div>
            <strong className="ss-line-total">{formatMoney(getLineTotal(line))}</strong>
            <button className="ss-trash-button" type="button" onClick={() => onRemove(line.lineId)}><Trash2 size={15} /></button>
          </article>
        ))}
      </div>

      {promo ? (
        <div className="ss-mini-promo">
          <img src={promo.image} alt="" />
          <div><small>PROMO DESTACADA</small><strong>{promo.title}</strong></div>
          <b>{formatMoney(promo.price)}</b>
        </div>
      ) : null}

      <div className="ss-total-card">
        <span><small>Subtotal</small><b>{formatMoney(total)}</b></span>
        <span><small>Entrega</small><b>Se define en el siguiente paso</b></span>
        <span className="total"><strong>Total productos</strong><b>{formatMoney(total)}</b></span>
      </div>

      <button className="ss-primary-button" type="button" disabled={!cart.length} onClick={onContinue}>
        Continuar pedido <ChevronRight size={18} />
      </button>
    </section>
  );
}

function DetailsScreen({ form, deliveryMode, onChange, onDeliveryMode, onBack, onContinue }) {
  const delivery = deliveryMode === 'delivery';
  const submit = (event) => {
    event.preventDefault();
    onContinue();
  };

  return (
    <section className="ss-screen ss-checkout-screen">
      <div className="ss-subpage-head">
        <button className="ss-icon-button" type="button" onClick={onBack}><ArrowLeft size={20} /></button>
        <div><small>PASO 2</small><strong>Tus datos</strong></div>
        <span className="ss-head-spacer" />
      </div>
      <CheckoutStepper screen={FLOW_SCREENS.DETAILS} />

      <div className="ss-checkout-copy">
        <span className="ss-kicker">DATOS DEL PEDIDO</span>
        <h1>Tus datos</h1>
        <p>Completa solo lo necesario para preparar y coordinar tu pedido.</p>
      </div>

      <div className="ss-delivery-toggle">
        <button type="button" className={!delivery ? 'selected' : ''} onClick={() => onDeliveryMode('pickup')}>
          <Store size={22} /><span><strong>Retiro en local</strong><small>Pasas a buscar tu pedido</small></span><i>{!delivery ? <Check size={13} /> : null}</i>
        </button>
        <button type="button" className={delivery ? 'selected' : ''} onClick={() => onDeliveryMode('delivery')}>
          <Truck size={22} /><span><strong>Despacho a domicilio</strong><small>Coordinamos la entrega</small></span><i>{delivery ? <Check size={13} /> : null}</i>
        </button>
      </div>

      <form className="ss-order-form" onSubmit={submit}>
        <label><Phone size={18} /><span><small>Nombre completo *</small><input required value={form.name} onChange={(event) => onChange('name', event.target.value)} placeholder="Tu nombre" /></span></label>
        <label><Phone size={18} /><span><small>Teléfono *</small><input required type="tel" value={form.phone} onChange={(event) => onChange('phone', event.target.value)} placeholder="+56 9 ..." /></span></label>
        {delivery ? (
          <>
            <label><MapPin size={18} /><span><small>Dirección *</small><input required value={form.address} onChange={(event) => onChange('address', event.target.value)} placeholder="Calle, número" /></span></label>
            <label><MapPin size={18} /><span><small>Comuna *</small><input required value={form.commune} onChange={(event) => onChange('commune', event.target.value)} placeholder="Tu comuna" /></span></label>
            <label><Truck size={18} /><span><small>Referencia</small><input value={form.reference} onChange={(event) => onChange('reference', event.target.value)} placeholder="Casa, portón, depto..." /></span></label>
          </>
        ) : (
          <div className="ss-local-note"><Store size={19} /><span><strong>Retiro coordinado en el local</strong><small>{brand.address}</small></span></div>
        )}
        <label><MessageCircle size={18} /><span><small>Notas del pedido</small><textarea value={form.notes} onChange={(event) => onChange('notes', event.target.value)} placeholder="Ej: sin ají, timbre rojo, etc." /></span></label>
        <button className="ss-primary-button" type="submit">Siguiente <ChevronRight size={18} /></button>
      </form>
    </section>
  );
}

function PaymentScreen({ method, deliveryMode, onMethod, onBack, onContinue }) {
  const options = [
    {
      id: 'whatsapp',
      icon: MessageCircle,
      title: 'Confirmar por WhatsApp',
      copy: 'Tu pedido queda escrito y listo para enviar.',
      badge: 'RECOMENDADO',
    },
    {
      id: 'transfer',
      icon: Landmark,
      title: 'Pagar por transferencia',
      copy: 'Solicita los datos bancarios y confirma con comprobante por WhatsApp.',
    },
    ...(deliveryMode === 'pickup'
      ? [{ id: 'local', icon: Store, title: 'Pagar al retirar', copy: 'Confirmas el pedido y pagas cuando lo retires.' }]
      : []),
  ];

  return (
    <section className="ss-screen ss-checkout-screen">
      <div className="ss-subpage-head">
        <button className="ss-icon-button" type="button" onClick={onBack}><ArrowLeft size={20} /></button>
        <div><small>PASO 3</small><strong>Pago y confirmación</strong></div>
        <span className="ss-head-spacer" />
      </div>
      <CheckoutStepper screen={FLOW_SCREENS.PAYMENT} />

      <div className="ss-checkout-copy">
        <span className="ss-kicker">ELIGE CÓMO CONTINUAR</span>
        <h1>¿Cómo deseas confirmar?</h1>
        <p>No inventamos datos bancarios: la transferencia se coordina directamente con Sazón y Sabor.</p>
      </div>

      <div className="ss-payment-options">
        {options.map(({ id, icon: Icon, title, copy, badge }) => (
          <button key={id} type="button" className={`${method === id ? 'selected' : ''} ${id === 'whatsapp' ? 'whatsapp' : ''}`} onClick={() => onMethod(id)}>
            <span className="ss-payment-icon"><Icon size={25} /></span>
            <span><strong>{title}</strong>{badge ? <b>{badge}</b> : null}<small>{copy}</small></span>
            <i>{method === id ? <Check size={14} /> : <ChevronRight size={16} />}</i>
          </button>
        ))}
      </div>

      <div className="ss-security-row">
        <span><ShieldCheck size={18} /><small>Pedido acompañado</small></span>
        <span><Clock3 size={18} /><small>Confirmación rápida</small></span>
        <span><Heart size={18} /><small>Atención directa</small></span>
      </div>

      <button className="ss-primary-button" type="button" onClick={onContinue}>Revisar pedido <ChevronRight size={18} /></button>
    </section>
  );
}

function ReviewScreen({ cart, form, deliveryMode, method, onBack, onConfirm }) {
  const total = getCartTotal(cart);
  const methodLabel = method === 'transfer' ? 'Transferencia' : method === 'local' ? 'Pago al retirar' : 'WhatsApp';

  return (
    <section className="ss-screen ss-checkout-screen">
      <div className="ss-subpage-head">
        <button className="ss-icon-button" type="button" onClick={onBack}><ArrowLeft size={20} /></button>
        <div><small>PASO 4</small><strong>Revisa y confirma</strong></div>
        <span className="ss-head-spacer" />
      </div>
      <CheckoutStepper screen={FLOW_SCREENS.REVIEW} />

      <div className="ss-checkout-copy">
        <span className="ss-kicker">ÚLTIMO PASO</span>
        <h1>Revisa tu pedido</h1>
        <p>Productos, entrega y método de confirmación en una sola vista.</p>
      </div>

      <div className="ss-review-list">
        {cart.map((line) => (
          <article key={line.lineId}>
            <img src={line.product.image} alt="" />
            <div><strong>{line.quantity} × {line.product.name}</strong><small>{line.extras.map((extra) => extra.name).join(', ') || line.product.description}</small></div>
            <b>{formatMoney(getLineTotal(line))}</b>
          </article>
        ))}
      </div>

      <div className="ss-review-data">
        <span><MapPin size={17} /><div><small>Entrega</small><strong>{deliveryMode === 'pickup' ? 'Retiro en local' : `${form.address}, ${form.commune}`}</strong></div></span>
        <span><MessageCircle size={17} /><div><small>Confirmación</small><strong>{methodLabel}</strong></div></span>
        <span><Phone size={17} /><div><small>Contacto</small><strong>{form.name} · {form.phone}</strong></div></span>
      </div>

      <div className="ss-total-card review-total">
        <span className="total"><strong>Total productos</strong><b>{formatMoney(total)}</b></span>
        <small>El costo de despacho, si corresponde, se confirma directamente por WhatsApp.</small>
      </div>

      <button className={`ss-primary-button ${method === 'whatsapp' ? 'ss-whatsapp-button' : ''}`} type="button" onClick={onConfirm}>
        {method === 'transfer' ? <><Landmark size={18} /> Solicitar datos de transferencia</> : method === 'local' ? <><Store size={18} /> Confirmar retiro</> : <><MessageCircle size={18} /> Enviar por WhatsApp</>}
      </button>
      <div className="ss-safe-copy"><ShieldCheck size={14} /> Tú decides cuándo enviar el mensaje.</div>
    </section>
  );
}

function SuccessScreen({ orderId, method, onContinue, onOpenWhatsApp }) {
  return (
    <section className="ss-screen ss-success-screen">
      <div className="ss-success-brand"><img src={brand.logo} alt="Sazón y Sabor" /></div>
      <div className="ss-success-check"><Check size={42} /></div>
      <span className="ss-kicker">PEDIDO {orderId}</span>
      <h1>¡Gracias por tu compra!</h1>
      <p>
        {method === 'transfer'
          ? 'Tu solicitud de transferencia quedó preparada. En WhatsApp te confirmarán los datos y el comprobante.'
          : method === 'local'
            ? 'Tu retiro quedó preparado para confirmar. Te esperamos en el local una vez que el equipo confirme el pedido.'
            : 'Tu pedido quedó preparado para enviar. Al confirmar en WhatsApp, el equipo te responderá con el tiempo estimado.'}
      </p>
      <div className="ss-success-card">
        <span><Clock3 size={20} /><div><small>Estado</small><strong>Esperando confirmación del local</strong></div></span>
        <span><MessageCircle size={20} /><div><small>Canal</small><strong>WhatsApp directo</strong></div></span>
      </div>
      <button className="ss-primary-button ss-whatsapp-button" type="button" onClick={onOpenWhatsApp}><MessageCircle size={18} /> Volver a WhatsApp</button>
      <button className="ss-secondary-button" type="button" onClick={onContinue}>Seguir comprando</button>
      <small className="ss-success-note">Chile · Colombia · en la casa</small>
    </section>
  );
}

export default function MobileOrderingApp() {
  const [screen, setScreen] = useState(FLOW_SCREENS.HOME);
  const [catalogCategory, setCatalogCategory] = useState('Todos');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [deliveryMode, setDeliveryMode] = useState('pickup');
  const [method, setMethod] = useState('whatsapp');
  const [form, setForm] = useState({ name: '', phone: '', address: '', commune: '', reference: '', notes: '' });
  const [orderId] = useState(() => `SS-${Math.floor(1000 + Math.random() * 9000)}`);
  const [lastWhatsAppUrl, setLastWhatsAppUrl] = useState('');

  const cartCount = cart.reduce((sum, line) => sum + line.quantity, 0);

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem('ss-order-return');
      if (!saved) return;
      const parsed = JSON.parse(saved);
      if (Date.now() - parsed.timestamp < 2 * 60 * 60 * 1000) {
        setMethod(parsed.method || 'whatsapp');
        setLastWhatsAppUrl(parsed.url || '');
        setScreen(FLOW_SCREENS.SUCCESS);
      } else {
        sessionStorage.removeItem('ss-order-return');
      }
    } catch {
      sessionStorage.removeItem('ss-order-return');
    }
  }, []);

  const addToCart = (product, selectedExtras = [], quantity = 1, notes = '') => {
    const next = buildCartLine(product, selectedExtras, quantity);
    next.notes = notes;
    setCart((current) => {
      const match = current.find((line) => line.lineId === next.lineId && line.notes === notes);
      if (!match) return [...current, next];
      return current.map((line) =>
        line.lineId === next.lineId && line.notes === notes
          ? { ...line, quantity: line.quantity + quantity }
          : line,
      );
    });
    setScreen(FLOW_SCREENS.CART);
  };

  const changeQuantity = (lineId, delta) => {
    setCart((current) =>
      current
        .map((line) => line.lineId === lineId ? { ...line, quantity: line.quantity + delta } : line)
        .filter((line) => line.quantity > 0),
    );
  };

  const openProduct = (product) => {
    setSelectedProduct(product);
    setScreen(FLOW_SCREENS.PRODUCT);
  };

  const openCategory = (category) => {
    setCatalogCategory(category);
    setScreen(FLOW_SCREENS.CATALOG);
  };

  const buildWhatsAppUrl = () => {
    const total = getCartTotal(cart);
    const lines = cart.map((line) => {
      const extrasCopy = line.extras.length ? ` + ${line.extras.map((extra) => extra.name).join(', ')}` : '';
      const noteCopy = line.notes ? ` (${line.notes})` : '';
      return `• ${line.quantity} x ${line.product.name}${extrasCopy}${noteCopy} — ${formatMoney(getLineTotal(line))}`;
    }).join('\n');
    const deliveryCopy = deliveryMode === 'pickup'
      ? `Retiro en local: ${brand.address}`
      : `Despacho: ${form.address}, ${form.commune}${form.reference ? ` · Ref: ${form.reference}` : ''}`;
    const methodCopy = method === 'transfer'
      ? 'Transferencia — necesito los datos bancarios para realizarla'
      : method === 'local'
        ? 'Pago al retirar'
        : 'Confirmación por WhatsApp';
    const message = [
      `Hola Sazón y Sabor 👋`,
      `Quiero confirmar el pedido *${orderId}*:`,
      '',
      lines,
      '',
      `*Total productos:* ${formatMoney(total)}`,
      `*Entrega:* ${deliveryCopy}`,
      `*Método:* ${methodCopy}`,
      '',
      `*Cliente:* ${form.name}`,
      `*Teléfono:* ${form.phone}`,
      form.notes ? `*Notas generales:* ${form.notes}` : '',
      '',
      '¿Me confirman disponibilidad y tiempo estimado? Gracias ❤️',
    ].filter(Boolean).join('\n');

    return `https://wa.me/${brand.phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
  };

  const handoffToWhatsApp = () => {
    const url = buildWhatsAppUrl();
    setLastWhatsAppUrl(url);
    try {
      sessionStorage.setItem('ss-order-return', JSON.stringify({ timestamp: Date.now(), orderId, method, url }));
    } catch {}
    setScreen(FLOW_SCREENS.SUCCESS);
    setTimeout(() => {
      window.location.href = url;
    }, 120);
  };

  const resetOrder = () => {
    setCart([]);
    setForm({ name: '', phone: '', address: '', commune: '', reference: '', notes: '' });
    setDeliveryMode('pickup');
    setMethod('whatsapp');
    setSelectedProduct(null);
    setCatalogCategory('Todos');
    setScreen(FLOW_SCREENS.HOME);
    try { sessionStorage.removeItem('ss-order-return'); } catch {}
  };

  const navigateBottom = (destination) => {
    if (destination === FLOW_SCREENS.HOME) setScreen(FLOW_SCREENS.HOME);
    if (destination === FLOW_SCREENS.CATALOG) setScreen(FLOW_SCREENS.CATALOG);
    if (destination === 'promos') {
      setCatalogCategory('Todos');
      setScreen(FLOW_SCREENS.CATALOG);
    }
  };

  return (
    <main className="ss-stage">
      <div className="ss-ambient ss-ambient-left" />
      <div className="ss-ambient ss-ambient-right" />
      <div className="ss-desktop-brand">
        <span>Más que comida,</span>
        <strong>es tradición en tu mesa.</strong>
      </div>

      <div className="ss-phone-shell">
        <div className="ss-phone-glow" />
        <div className="ss-screen-transition" key={screen}>
          {screen === FLOW_SCREENS.HOME ? (
            <HomeScreen
              onBrowse={() => setScreen(FLOW_SCREENS.CATALOG)}
              onCategory={openCategory}
              onProduct={openProduct}
              onAdd={(product) => addToCart(product)}
              onCart={() => setScreen(FLOW_SCREENS.CART)}
              cartCount={cartCount}
            />
          ) : null}

          {screen === FLOW_SCREENS.CATALOG ? (
            <CatalogScreen
              initialCategory={catalogCategory}
              onBack={() => setScreen(FLOW_SCREENS.HOME)}
              onProduct={openProduct}
              onAdd={(product) => addToCart(product)}
              onCart={() => setScreen(FLOW_SCREENS.CART)}
              cartCount={cartCount}
            />
          ) : null}

          {screen === FLOW_SCREENS.PRODUCT && selectedProduct ? (
            <ProductScreen
              product={selectedProduct}
              onBack={() => setScreen(FLOW_SCREENS.CATALOG)}
              onAdd={addToCart}
              onOpenRelated={openProduct}
            />
          ) : null}

          {screen === FLOW_SCREENS.CART ? (
            <CartScreen
              cart={cart}
              onBack={() => setScreen(FLOW_SCREENS.CATALOG)}
              onQuantity={changeQuantity}
              onRemove={(lineId) => setCart((current) => current.filter((line) => line.lineId !== lineId))}
              onContinue={() => setScreen(FLOW_SCREENS.DETAILS)}
            />
          ) : null}

          {screen === FLOW_SCREENS.DETAILS ? (
            <DetailsScreen
              form={form}
              deliveryMode={deliveryMode}
              onChange={(key, value) => setForm((current) => ({ ...current, [key]: value }))}
              onDeliveryMode={setDeliveryMode}
              onBack={() => setScreen(FLOW_SCREENS.CART)}
              onContinue={() => setScreen(FLOW_SCREENS.PAYMENT)}
            />
          ) : null}

          {screen === FLOW_SCREENS.PAYMENT ? (
            <PaymentScreen
              method={method}
              deliveryMode={deliveryMode}
              onMethod={setMethod}
              onBack={() => setScreen(FLOW_SCREENS.DETAILS)}
              onContinue={() => setScreen(FLOW_SCREENS.REVIEW)}
            />
          ) : null}

          {screen === FLOW_SCREENS.REVIEW ? (
            <ReviewScreen
              cart={cart}
              form={form}
              deliveryMode={deliveryMode}
              method={method}
              onBack={() => setScreen(FLOW_SCREENS.PAYMENT)}
              onConfirm={handoffToWhatsApp}
            />
          ) : null}

          {screen === FLOW_SCREENS.SUCCESS ? (
            <SuccessScreen
              orderId={orderId}
              method={method}
              onContinue={resetOrder}
              onOpenWhatsApp={() => {
                if (lastWhatsAppUrl) window.location.href = lastWhatsAppUrl;
              }}
            />
          ) : null}
        </div>

        {[FLOW_SCREENS.HOME, FLOW_SCREENS.CATALOG].includes(screen) ? (
          <BottomNav screen={screen} onNavigate={navigateBottom} cartCount={cartCount} />
        ) : null}
      </div>

      <div className="ss-desktop-side-copy">
        <span>Buenos momentos.</span>
        <strong>Gran sabor.</strong>
      </div>
    </main>
  );
}
