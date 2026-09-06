'use client';

import { useEffect, useMemo, useState } from 'react';
import { brand, categories, products, promotions } from '@/data/menu';

const money = (value) => `$${Number(value).toLocaleString('es-CL')}`;

function Icon({ name }) {
  const icons = {
    search: '⌕', cart: '🛒', user: '○', menu: '☰', back: '←', plus: '+', minus: '−', close: '×', truck: '🚚', card: '▣', cash: '▤', check: '✓', warning: '!', phone: '☎', pin: '⌖'
  };
  return <span aria-hidden>{icons[name] || '•'}</span>;
}

function Loader({ onDone }) {
  const [progress, setProgress] = useState(7);
  useEffect(() => {
    const timer = setInterval(() => setProgress((p) => Math.min(100, p + Math.ceil(Math.random() * 12))), 120);
    const done = setTimeout(onDone, 1450);
    return () => { clearInterval(timer); clearTimeout(done); };
  }, [onDone]);
  return (
    <div className="loader-screen">
      <div className="loader-glow" />
      <img className="loader-logo" src={brand.logo} alt="Sazón y Sabor" />
      <div className="loader-copy">
        <span className="eyebrow">CHILE · COLOMBIA · EN LA CASA</span>
        <h1>Preparando tu sabor</h1>
        <p>Ingredientes listos. Experiencia cargando.</p>
      </div>
      <div className="loader-track"><span style={{ width: `${progress}%` }} /></div>
      <strong>{progress}%</strong>
    </div>
  );
}

function ProductCard({ item, onOpen, onAdd }) {
  return (
    <article className="product-card">
      <button className="product-image" onClick={() => onOpen(item)} aria-label={`Ver ${item.name}`}>
        <img src={item.image} alt={item.name} loading="lazy" />
        {item.popular && <span className="badge">Favorito</span>}
      </button>
      <div className="product-info">
        <div><span className="category-kicker">{item.category}</span><h3>{item.name}</h3></div>
        <p>{item.description}</p>
        <div className="product-foot"><strong>{money(item.price)}</strong><button className="add-mini" onClick={() => onAdd(item)}><Icon name="plus" /> Añadir</button></div>
      </div>
    </article>
  );
}

function ProductModal({ item, onClose, onAdd }) {
  const [qty, setQty] = useState(1);
  if (!item) return null;
  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <section className="product-modal" onMouseDown={(e) => e.stopPropagation()}>
        <button className="circle-btn modal-close" onClick={onClose}><Icon name="close" /></button>
        <div className="modal-media"><img src={item.image} alt={item.name} /></div>
        <div className="modal-body">
          <span className="eyebrow">{item.category}</span>
          <div className="modal-title"><h2>{item.name}</h2><strong>{money(item.price)}</strong></div>
          <p>{item.description}</p>
          <div className="quality-row"><span>✦ Ingredientes frescos</span><span>✦ Preparado al momento</span><span>✦ Sabor de casa</span></div>
          <div className="qty-row"><span>Cantidad</span><div className="qty"><button onClick={() => setQty(Math.max(1, qty - 1))}><Icon name="minus" /></button><strong>{qty}</strong><button onClick={() => setQty(qty + 1)}><Icon name="plus" /></button></div></div>
          <div className="delivery-note"><Icon name="truck" /><div><strong>Domicilio gratis desde {money(brand.freeDeliveryMin)}</strong><small>Aplica al superar el mínimo de compra.</small></div></div>
          <button className="primary" onClick={() => { onAdd(item, qty); onClose(); }}>Añadir {qty} · {money(item.price * qty)}</button>
        </div>
      </section>
    </div>
  );
}

function CartDrawer({ cart, onClose, onQty, onCheckout }) {
  const total = cart.reduce((sum, row) => sum + row.product.price * row.qty, 0);
  return (
    <div className="modal-backdrop drawer-backdrop" onMouseDown={onClose}>
      <aside className="cart-drawer" onMouseDown={(e) => e.stopPropagation()}>
        <header><div><span className="eyebrow">TU PEDIDO</span><h2>Carrito</h2></div><button className="circle-btn" onClick={onClose}><Icon name="close" /></button></header>
        <div className="cart-list">
          {cart.length === 0 && <div className="empty"><span>🍽️</span><h3>Aún no agregas nada</h3><p>Elige algo del catálogo y vuelve por aquí.</p></div>}
          {cart.map((row) => <div className="cart-row" key={row.product.id}><img src={row.product.image} alt=""/><div className="cart-row-copy"><strong>{row.product.name}</strong><span>{money(row.product.price)}</span></div><div className="qty small"><button onClick={() => onQty(row.product.id, -1)}>−</button><b>{row.qty}</b><button onClick={() => onQty(row.product.id, 1)}>+</button></div></div>)}
        </div>
        <footer>
          <div className="shipping-line"><span>Subtotal</span><strong>{money(total)}</strong></div>
          <div className="shipping-line"><span>Domicilio</span><strong className={total >= brand.freeDeliveryMin ? 'free' : ''}>{total >= brand.freeDeliveryMin ? 'Gratis' : 'Por calcular'}</strong></div>
          <button className="primary" disabled={!cart.length} onClick={onCheckout}>Continuar · {money(total)}</button>
        </footer>
      </aside>
    </div>
  );
}

function Checkout({ cart, onClose, onFinish }) {
  const [step, setStep] = useState('form');
  const [method, setMethod] = useState('debit');
  const total = cart.reduce((sum, row) => sum + row.product.price * row.qty, 0);
  const [status, setStatus] = useState(null);
  const [orderId] = useState(() => `#SS-${Math.floor(4000 + Math.random() * 5000)}`);

  const process = () => {
    setStep('processing');
    setTimeout(() => { setStatus('accepted'); setStep('status'); }, 1800);
  };

  if (step === 'status') {
    const accepted = status === 'accepted';
    return <div className="checkout-page"><div className={`status-icon ${accepted ? 'ok' : 'bad'}`}>{accepted ? '✓' : '×'}</div><span className="eyebrow">SAZÓN Y SABOR</span><h2>{accepted ? 'Pago aceptado' : 'Pago rechazado'}</h2><p>{accepted ? 'Tu pedido ya está siendo preparado.' : 'No pudimos procesar tu pago. Puedes intentar nuevamente.'}</p><div className="status-order"><span>Pedido {orderId}</span><strong>{money(total)}</strong></div><button className="primary" onClick={onFinish}>Volver al catálogo</button>{accepted && <button className="secondary" onClick={() => { setStatus('rejected'); setStep('status'); }}>Ver demo de pago rechazado</button>}</div>;
  }

  if (step === 'processing') return <div className="checkout-page processing"><div className="spinner"><span>▣</span></div><span className="eyebrow">NO CIERRES ESTA VENTANA</span><h2>Pago en proceso</h2><p>Estamos validando tu pago con {method === 'debit' ? 'tarjeta' : 'efectivo'}.</p><div className="status-order"><span>Total del pedido</span><strong>{money(total)}</strong></div></div>;

  return (
    <div className="checkout-shell">
      <header className="checkout-head"><img src={brand.logo} alt="Sazón y Sabor"/><button className="circle-btn" onClick={onClose}>×</button></header>
      <div className="stepper"><span className={step === 'form' ? 'active' : 'done'}>1<small>Dirección</small></span><i/><span className={step === 'payment' ? 'active' : ''}>2<small>Pago</small></span><i/><span>3<small>Confirmación</small></span></div>
      {step === 'form' ? <div className="checkout-content"><span className="eyebrow">COMPLETA TU PEDIDO</span><h2>Datos de entrega</h2><form onSubmit={(e) => { e.preventDefault(); setStep('payment'); }} className="delivery-form"><label><span>Nombre completo</span><input required placeholder="Tu nombre" /></label><label><span>Teléfono</span><input required type="tel" placeholder="+56 9 ..." /></label><label><span>Dirección de entrega</span><input required placeholder="Calle, número, comuna" /></label><label><span>Referencia</span><input placeholder="Casa, depto, portón..." /></label><label><span>Comentarios</span><textarea placeholder="Sin tomate, más mayo..." /></label><div className="delivery-note"><Icon name="truck"/><div><strong>Domicilio gratis desde {money(brand.freeDeliveryMin)}</strong><small>{total >= brand.freeDeliveryMin ? 'Tu pedido ya califica.' : `Te faltan ${money(Math.max(0, brand.freeDeliveryMin-total))} para obtenerlo.`}</small></div></div><button className="primary">Continuar al pago →</button></form></div> : <div className="checkout-content"><span className="eyebrow">PASO 2 DE 3</span><h2>Método de pago</h2><button className={`payment-card ${method==='debit'?'selected':''}`} onClick={() => setMethod('debit')}><span className="pay-icon">▣</span><div><strong>Tarjeta débito/crédito</strong><small>Pago online seguro</small></div><i/></button><button className={`payment-card ${method==='cash'?'selected':''}`} onClick={() => setMethod('cash')}><span className="pay-icon">▤</span><div><strong>Efectivo</strong><small>Paga al recibir en tu domicilio</small></div><i/></button><div className="order-mini"><div><span>Subtotal</span><b>{money(total)}</b></div><div><span>Domicilio</span><b className="free">{total >= brand.freeDeliveryMin ? 'Gratis' : 'Por calcular'}</b></div><div className="total"><span>Total</span><strong>{money(total)}</strong></div></div><button className="primary" onClick={process}>{method === 'cash' ? 'Confirmar pedido' : 'Pagar ahora'} →</button><button className="secondary" onClick={() => { setStatus('rejected'); setStep('status'); }}>Simular rechazo</button></div>}
    </div>
  );
}

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [active, setActive] = useState('Todos');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const [promoIndex, setPromoIndex] = useState(0);

  const visible = useMemo(() => products.filter((item) => (active === 'Todos' || item.category === active) && `${item.name} ${item.description}`.toLowerCase().includes(query.toLowerCase())), [active, query]);
  const count = cart.reduce((sum, row) => sum + row.qty, 0);

  const add = (product, qty = 1) => setCart((rows) => {
    const hit = rows.find((row) => row.product.id === product.id);
    return hit ? rows.map((row) => row.product.id === product.id ? { ...row, qty: row.qty + qty } : row) : [...rows, { product, qty }];
  });
  const changeQty = (id, delta) => setCart((rows) => rows.map((row) => row.product.id === id ? { ...row, qty: row.qty + delta } : row).filter((row) => row.qty > 0));

  if (!loaded) return <Loader onDone={() => setLoaded(true)} />;
  if (checkout) return <Checkout cart={cart} onClose={() => setCheckout(false)} onFinish={() => { setCheckout(false); setCart([]); }} />;

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="#inicio"><img src={brand.logo} alt="Sazón y Sabor"/></a>
        <nav><a href="#promos">Promos</a><a href="#catalogo">Menú</a><a href="#catalogo">Bebidas</a><a href="#contacto">Contacto</a></nav>
        <div className="top-actions"><button className="circle-btn search-mobile" onClick={() => document.querySelector('#search')?.focus()}><Icon name="search"/></button><button className="cart-trigger" onClick={() => setCartOpen(true)}><Icon name="cart"/><b>{count}</b></button></div>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-copy"><span className="eyebrow">CHILE · COLOMBIA · EN LA CASA</span><h1>Sabor <em>que une.</em></h1><p>Completos, churrascos, arepas, sopaipillas y papas con ese sabor de casa que se reconoce al primer bocado.</p><div className="hero-actions"><a className="primary link" href="#catalogo">Ver catálogo →</a><a className="secondary link" href={`https://wa.me/${brand.phone.replace(/\D/g,'')}`} target="_blank" rel="noreferrer">Pedir por WhatsApp</a></div><div className="free-delivery"><Icon name="truck"/><span><strong>Domicilio gratis desde {money(brand.freeDeliveryMin)}</strong><small>{brand.address}</small></span></div></div>
        <div className="hero-food"><div className="orbit orbit-1"/><div className="orbit orbit-2"/><img src={products.find(p=>p.id==='churrasco-italiano').image} alt="Churrasco Italiano"/><div className="hero-price"><span>Desde</span><strong>{money(2000)}</strong></div><span className="script">Aquí se come mejor</span></div>
      </section>

      <section className="promos-section" id="promos"><div className="section-head"><div><span className="eyebrow">PROMOCIONES DEL PDF</span><h2>Combos para compartir</h2></div><div className="promo-arrows"><button onClick={() => setPromoIndex((promoIndex-1+promotions.length)%promotions.length)}>←</button><button onClick={() => setPromoIndex((promoIndex+1)%promotions.length)}>→</button></div></div><div className="promo-stage"><img src={promotions[promoIndex].image} alt=""/><div><span className="promo-counter">0{promoIndex+1} / {promotions.length}</span><h3>{promotions[promoIndex].title}</h3><strong>{money(promotions[promoIndex].price)}</strong><p>Promo basada en el material vigente entregado para Sazón y Sabor.</p></div></div></section>

      <section className="catalog" id="catalogo"><div className="section-head catalog-head"><div><span className="eyebrow">MENÚ COMPLETO</span><h2>Catálogo</h2></div><label className="searchbox"><Icon name="search"/><input id="search" value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Buscar completo, arepa, churrasco..." /></label></div><div className="filters">{categories.map((c)=><button key={c} className={active===c?'active':''} onClick={()=>setActive(c)}>{c}</button>)}</div><div className="product-grid">{visible.map((item)=><ProductCard key={item.id} item={item} onOpen={setSelected} onAdd={add}/>)}</div>{!visible.length && <div className="no-results">No encontramos productos con esa búsqueda.</div>}</section>

      <section className="story"><div><span className="eyebrow">SAZÓN Y SABOR</span><h2>Más que comida,<br/>es sazón.</h2></div><p>Una carta que mezcla preparaciones chilenas y colombianas con precios y promociones actualizados desde el menú entregado. Diseño mobile-first, rápido y pensado para pedir sin fricción.</p><div className="story-stats"><span><strong>{products.length}</strong> productos</span><span><strong>{promotions.length}</strong> promociones</span><span><strong>{money(brand.freeDeliveryMin)}</strong> mínimo delivery gratis</span></div></section>

      <footer id="contacto"><img src={brand.logo} alt="Sazón y Sabor"/><div><strong>{brand.address}</strong><a href={`tel:${brand.phone}`}>{brand.phone}</a><a href={`https://instagram.com/${brand.instagram.replace('@','')}`} target="_blank" rel="noreferrer">{brand.instagram}</a></div><span>Chile Colombia en la Casa</span></footer>

      <button className="floating-cart" onClick={()=>setCartOpen(true)}><Icon name="cart"/><span>{count}</span></button>
      {selected && <ProductModal item={selected} onClose={()=>setSelected(null)} onAdd={add}/>} 
      {cartOpen && <CartDrawer cart={cart} onClose={()=>setCartOpen(false)} onQty={changeQty} onCheckout={()=>{setCartOpen(false);setCheckout(true)}}/>}
    </main>
  );
}
