'use client';

import { useEffect, useMemo, useState } from 'react';
import { brand, categories, products, promotions, visuals } from '@/data/menu';

const money = (value) => `$${Number(value).toLocaleString('es-CL')}`;
const SCENES = {
  inicio: { tone: 'ember', dir: 'down' },
  promos: { tone: 'gold', dir: 'right' },
  catalogo: { tone: 'wine', dir: 'left' },
  historia: { tone: 'forest', dir: 'diag' },
  contacto: { tone: 'midnight', dir: 'up' }
};

function Icon({ name }) {
  const icons = { search:'⌕', cart:'🛒', plus:'+', minus:'−', close:'×', truck:'🚚', card:'▣', cash:'▤', check:'✓', phone:'☎', pin:'⌖', arrow:'→', whatsapp:'◉', back:'←' };
  return <span aria-hidden>{icons[name] || '•'}</span>;
}

function SceneBackground({ scene }) {
  return <div key={`${scene.tone}-${scene.dir}`} className={`scene-bg scene-${scene.tone} wipe-${scene.dir}`} aria-hidden><span/><i/></div>;
}

function Loader({ onDone }) {
  const [progress, setProgress] = useState(6);
  const [leaving, setLeaving] = useState(false);
  useEffect(() => {
    const timer = setInterval(() => setProgress((p) => Math.min(100, p + Math.max(3, Math.ceil(Math.random() * 11)))), 90);
    return () => clearInterval(timer);
  }, []);
  useEffect(() => {
    if (progress < 100) return;
    const exit = setTimeout(() => setLeaving(true), 180);
    const done = setTimeout(onDone, 650);
    return () => { clearTimeout(exit); clearTimeout(done); };
  }, [progress, onDone]);
  return (
    <div className={`loader-screen ${leaving ? 'leaving' : ''}`}>
      <div className="loader-sweep"/>
      <div className="loader-stage">
        <span className="loader-orbit orbit-a"><img src={visuals.completo} alt=""/></span>
        <span className="loader-orbit orbit-b"><img src={visuals.arepa} alt=""/></span>
        <span className="loader-orbit orbit-c"><img src={visuals.papas} alt=""/></span>
        <img className="loader-logo" src={brand.logo} alt="Sazón y Sabor" />
      </div>
      <div className="loader-copy"><span className="eyebrow">CHILE · COLOMBIA · EN LA CASA</span><h1>Preparando<br/>tu sabor</h1><p>La experiencia se sirve en segundos.</p></div>
      <div className="loader-progress"><div className="loader-track"><span style={{width:`${progress}%`}}/></div><strong>{progress}%</strong></div>
    </div>
  );
}

function ProductCard({ item, onOpen, onAdd }) {
  const move = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5;
    const y = (e.clientY - r.top) / r.height - .5;
    e.currentTarget.style.setProperty('--ry', `${x * 8}deg`);
    e.currentTarget.style.setProperty('--rx', `${y * -7}deg`);
  };
  const reset = (e) => { e.currentTarget.style.setProperty('--ry','0deg'); e.currentTarget.style.setProperty('--rx','0deg'); };
  return (
    <article className="product-card" onPointerMove={move} onPointerLeave={reset}>
      <button className="product-image" onClick={() => onOpen(item)} aria-label={`Ver ${item.name}`}>
        <span className="food-glow"/><img src={item.image} alt={item.name} loading="lazy" />
        {item.popular && <span className="badge">Favorito</span>}
      </button>
      <div className="product-info">
        <div><span className="category-kicker">{item.category}</span><h3>{item.name}</h3></div>
        <p>{item.description}</p>
        <div className="product-foot"><strong>{money(item.price)}</strong><button className="add-mini" onClick={() => onAdd(item)}><Icon name="plus"/> Añadir</button></div>
      </div>
    </article>
  );
}

function ProductModal({ item, onClose, onAdd }) {
  const [qty, setQty] = useState(1);
  if (!item) return null;
  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <section className="product-modal" onMouseDown={(e)=>e.stopPropagation()}>
        <button className="circle-btn modal-close" onClick={onClose}><Icon name="close"/></button>
        <div className="modal-media"><div className="modal-halo"/><img src={item.image} alt={item.name}/></div>
        <div className="modal-body"><span className="eyebrow">{item.category}</span><div className="modal-title"><h2>{item.name}</h2><strong>{money(item.price)}</strong></div><p>{item.description}</p><div className="quality-row"><span>✦ Preparado al momento</span><span>✦ Ingredientes frescos</span><span>✦ Sabor de casa</span></div><div className="qty-row"><span>Cantidad</span><div className="qty"><button onClick={()=>setQty(Math.max(1,qty-1))}>−</button><strong>{qty}</strong><button onClick={()=>setQty(qty+1)}>+</button></div></div><div className="delivery-note"><Icon name="truck"/><div><strong>Domicilio gratis desde {money(brand.freeDeliveryMin)}</strong><small>El carrito te avisa cuánto falta para activarlo.</small></div></div><button className="primary" onClick={()=>{onAdd(item,qty);onClose();}}>Añadir {qty} · {money(item.price*qty)}</button></div>
      </section>
    </div>
  );
}

function CartDrawer({ cart, onClose, onQty, onCheckout }) {
  const total = cart.reduce((sum,row)=>sum+row.product.price*row.qty,0);
  const missing = Math.max(0, brand.freeDeliveryMin-total);
  const progress = Math.min(100, (total/brand.freeDeliveryMin)*100);
  return (
    <div className="modal-backdrop drawer-backdrop" onMouseDown={onClose}>
      <aside className="cart-drawer" onMouseDown={(e)=>e.stopPropagation()}>
        <header><div><span className="eyebrow">PASO 1 · TU PEDIDO</span><h2>Carrito</h2></div><button className="circle-btn" onClick={onClose}>×</button></header>
        <div className="delivery-meter"><div><Icon name="truck"/><span>{missing === 0 ? <><strong>Domicilio gratis activado</strong><small>Tu pedido ya supera el mínimo.</small></> : <><strong>Te faltan {money(missing)}</strong><small>para domicilio gratis desde {money(brand.freeDeliveryMin)}.</small></>}</span></div><i><b style={{width:`${progress}%`}}/></i></div>
        <div className="cart-list">{cart.length===0 && <div className="empty"><span>🍽️</span><h3>Tu carrito está esperando</h3><p>Agrega tus favoritos y te guiamos hasta WhatsApp.</p></div>}{cart.map((row)=><div className="cart-row" key={row.product.id}><img src={row.product.image} alt=""/><div className="cart-row-copy"><strong>{row.product.name}</strong><span>{money(row.product.price*row.qty)}</span></div><div className="qty small"><button onClick={()=>onQty(row.product.id,-1)}>−</button><b>{row.qty}</b><button onClick={()=>onQty(row.product.id,1)}>+</button></div></div>)}</div>
        <footer><div className="shipping-line"><span>Subtotal</span><strong>{money(total)}</strong></div><div className="shipping-line"><span>Domicilio</span><strong className={total>=brand.freeDeliveryMin?'free':''}>{total>=brand.freeDeliveryMin?'Gratis':'Se confirma por WhatsApp'}</strong></div><button className="primary" disabled={!cart.length} onClick={onCheckout}>Revisar pedido <Icon name="arrow"/></button><small className="safe-note">Sin registro obligatorio · confirmación directa por WhatsApp</small></footer>
      </aside>
    </div>
  );
}

function Checkout({ cart, onClose, onFinish }) {
  const [step,setStep] = useState('review');
  const [method,setMethod] = useState('cash');
  const [form,setForm] = useState({name:'',phone:'',address:'',reference:'',notes:''});
  const [orderId] = useState(()=>`SS-${Math.floor(4000+Math.random()*5000)}`);
  const total = cart.reduce((sum,row)=>sum+row.product.price*row.qty,0);
  const free = total >= brand.freeDeliveryMin;
  const steps = ['review','form','payment','ready'];
  const current = steps.indexOf(step);
  const update = (key,value)=>setForm((old)=>({...old,[key]:value}));
  const waUrl = () => {
    const lines = cart.map((row)=>`• ${row.qty} x ${row.product.name} — ${money(row.product.price*row.qty)}`).join('\n');
    const methodText = method==='cash'?'Efectivo al recibir':method==='transfer'?'Transferencia':'Solicitar link de pago con tarjeta';
    const message = `Hola Sazón y Sabor 👋\nQuiero confirmar el pedido *${orderId}*:\n\n${lines}\n\n*Subtotal:* ${money(total)}\n*Domicilio:* ${free?'GRATIS':'por confirmar'}\n*Método de pago:* ${methodText}\n\n*Datos de entrega*\nNombre: ${form.name}\nTeléfono: ${form.phone}\nDirección: ${form.address}\nReferencia: ${form.reference||'-'}\nComentarios: ${form.notes||'-'}\n\n¿Me confirman disponibilidad y tiempo de entrega?`;
    return `https://wa.me/${brand.phone.replace(/\D/g,'')}?text=${encodeURIComponent(message)}`;
  };
  const sendWhatsApp = () => { const url=waUrl(); window.open(url,'_blank','noopener,noreferrer'); setStep('ready'); };

  if (step==='ready') return <div className="checkout-page ready-page"><div className="status-icon ok">✓</div><span className="eyebrow">PEDIDO {orderId}</span><h2>Listo para<br/>confirmar</h2><p>El pedido quedó preparado con productos, dirección y método de pago. WhatsApp es el último paso para confirmar disponibilidad y tiempo de entrega.</p><div className="status-order"><span>Total</span><strong>{money(total)}</strong></div><button className="primary" onClick={()=>window.open(waUrl(),'_blank','noopener,noreferrer')}><Icon name="whatsapp"/> Abrir WhatsApp otra vez</button><button className="secondary" onClick={onFinish}>Seguir comprando</button></div>;

  return (
    <div className="checkout-shell">
      <header className="checkout-head"><button className="checkout-back" onClick={()=> current>0 ? setStep(steps[current-1]) : onClose()}><Icon name="back"/> Volver</button><img src={brand.logo} alt="Sazón y Sabor"/><button className="circle-btn" onClick={onClose}>×</button></header>
      <div className="stepper">{steps.map((s,i)=><span key={s} className={i===current?'active':i<current?'done':''}>{i<current?'✓':i+1}<small>{['Pedido','Entrega','Pago','WhatsApp'][i]}</small>{i<steps.length-1 && <i/>}</span>)}</div>

      {step==='review' && <div className="checkout-content"><span className="eyebrow">REVISA ANTES DE CONTINUAR</span><h2>Tu pedido</h2><div className="review-list">{cart.map((row)=><div className="review-row" key={row.product.id}><img src={row.product.image} alt=""/><div><strong>{row.product.name}</strong><small>{row.qty} unidad{row.qty>1?'es':''}</small></div><b>{money(row.product.price*row.qty)}</b></div>)}</div><div className="order-mini"><div><span>Subtotal</span><b>{money(total)}</b></div><div><span>Domicilio</span><b className={free?'free':''}>{free?'Gratis':'Por confirmar'}</b></div><div className="total"><span>Total de productos</span><strong>{money(total)}</strong></div></div><div className="delivery-note"><Icon name="truck"/><div><strong>{free?'Ya tienes domicilio gratis':`Domicilio gratis desde ${money(brand.freeDeliveryMin)}`}</strong><small>{free?'Puedes continuar con tus datos de entrega.':`Te faltan ${money(Math.max(0,brand.freeDeliveryMin-total))} para activarlo.`}</small></div></div><button className="primary" onClick={()=>setStep('form')}>Continuar con entrega <Icon name="arrow"/></button></div>}

      {step==='form' && <div className="checkout-content"><span className="eyebrow">PASO 2 · ENTREGA</span><h2>¿Dónde lo llevamos?</h2><p className="step-copy">Solo pedimos lo necesario para preparar el mensaje de confirmación.</p><form className="delivery-form" onSubmit={(e)=>{e.preventDefault();setStep('payment');}}><label><span>Nombre completo</span><input required value={form.name} onChange={(e)=>update('name',e.target.value)} placeholder="Tu nombre" autoComplete="name"/></label><label><span>Teléfono</span><input required type="tel" value={form.phone} onChange={(e)=>update('phone',e.target.value)} placeholder="+56 9 ..." autoComplete="tel"/></label><label><span>Dirección de entrega</span><input required value={form.address} onChange={(e)=>update('address',e.target.value)} placeholder="Calle, número, comuna" autoComplete="street-address"/></label><label><span>Referencia</span><input value={form.reference} onChange={(e)=>update('reference',e.target.value)} placeholder="Casa, depto, portón..."/></label><label><span>Comentarios del pedido</span><textarea value={form.notes} onChange={(e)=>update('notes',e.target.value)} placeholder="Sin tomate, más mayo, tocar timbre..."/></label><button className="primary">Elegir método de pago <Icon name="arrow"/></button></form></div>}

      {step==='payment' && <div className="checkout-content"><span className="eyebrow">PASO 3 · PAGO</span><h2>¿Cómo pagarás?</h2><p className="step-copy">No simulamos cobros. Si eliges tarjeta, Sazón y Sabor coordina el enlace de pago contigo por WhatsApp.</p><button className={`payment-card ${method==='cash'?'selected':''}`} onClick={()=>setMethod('cash')}><span className="pay-icon">▤</span><div><strong>Efectivo al recibir</strong><small>Confirma tu pedido y paga en la entrega.</small></div><i/></button><button className={`payment-card ${method==='transfer'?'selected':''}`} onClick={()=>setMethod('transfer')}><span className="pay-icon">↗</span><div><strong>Transferencia</strong><small>Solicita los datos de transferencia por WhatsApp.</small></div><i/></button><button className={`payment-card ${method==='card'?'selected':''}`} onClick={()=>setMethod('card')}><span className="pay-icon">▣</span><div><strong>Tarjeta</strong><small>Solicita un link de pago seguro por WhatsApp.</small></div><i/></button><div className="order-mini compact"><div className="total"><span>Total productos</span><strong>{money(total)}</strong></div></div><button className="primary whatsapp-cta" onClick={sendWhatsApp}><Icon name="whatsapp"/> Preparar pedido en WhatsApp</button><small className="safe-note center">Se abrirá WhatsApp con tu pedido listo para enviar. Tú decides cuándo enviarlo.</small></div>}
    </div>
  );
}

export default function Home(){
  const [loaded,setLoaded]=useState(false);
  const [active,setActive]=useState('Todos');
  const [query,setQuery]=useState('');
  const [selected,setSelected]=useState(null);
  const [cart,setCart]=useState([]);
  const [cartOpen,setCartOpen]=useState(false);
  const [checkout,setCheckout]=useState(false);
  const [promoIndex,setPromoIndex]=useState(0);
  const [scene,setScene]=useState(SCENES.inicio);

  useEffect(()=>{
    const nodes=[...document.querySelectorAll('[data-scene]')];
    const observer=new IntersectionObserver((entries)=>{const visible=entries.filter((e)=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];if(visible){const next=SCENES[visible.target.dataset.scene];if(next)setScene(next);}}, {threshold:[.2,.42,.62],rootMargin:'-10% 0px -25%'});
    nodes.forEach((n)=>observer.observe(n));
    return ()=>observer.disconnect();
  },[loaded]);

  const visible=useMemo(()=>products.filter((item)=>(active==='Todos'||item.category===active)&&`${item.name} ${item.description}`.toLowerCase().includes(query.toLowerCase())),[active,query]);
  const count=cart.reduce((sum,row)=>sum+row.qty,0);
  const add=(product,qty=1)=>setCart((rows)=>{const hit=rows.find((r)=>r.product.id===product.id);return hit?rows.map((r)=>r.product.id===product.id?{...r,qty:r.qty+qty}:r):[...rows,{product,qty}]});
  const changeQty=(id,delta)=>setCart((rows)=>rows.map((r)=>r.product.id===id?{...r,qty:r.qty+delta}:r).filter((r)=>r.qty>0));

  if(!loaded) return <Loader onDone={()=>setLoaded(true)}/>;
  if(checkout) return <Checkout cart={cart} onClose={()=>setCheckout(false)} onFinish={()=>{setCheckout(false);setCart([])}}/>;

  return <main className="app-shell app-reveal"><SceneBackground scene={scene}/>
    <header className="topbar"><a className="brand" href="#inicio"><img src={brand.logo} alt="Sazón y Sabor"/></a><nav><a href="#promos">Promos</a><a href="#catalogo">Menú</a><a href="#historia">Nosotros</a><a href="#contacto">Contacto</a></nav><div className="top-actions"><button className="circle-btn search-mobile" onClick={()=>document.querySelector('#search')?.focus()}><Icon name="search"/></button><button className="cart-trigger" onClick={()=>setCartOpen(true)}><Icon name="cart"/><b>{count}</b></button></div></header>

    <section className="hero scene-section" id="inicio" data-scene="inicio"><div className="hero-copy"><span className="eyebrow">CHILE · COLOMBIA · EN LA CASA</span><h1>Sabor <em>que se mueve.</em></h1><p>Completos, churrascos, arepas, chorrillanas y papas presentados como protagonistas: comida real, fondo translúcido y una experiencia que te guía hasta confirmar el pedido.</p><div className="hero-actions"><a className="primary link" href="#catalogo">Explorar menú <Icon name="arrow"/></a><button className="secondary" onClick={()=>setCartOpen(true)}>Ver mi pedido</button></div><div className="free-delivery"><Icon name="truck"/><span><strong>Domicilio gratis desde {money(brand.freeDeliveryMin)}</strong><small>{brand.address}</small></span></div></div><div className="hero-food"><div className="orbit orbit-1"/><div className="orbit orbit-2"/><img src={visuals.seleccion} alt="Selección Sazón y Sabor"/><span className="script">Más que comida, un buen momento</span></div></section>

    <section className="promos-section scene-section" id="promos" data-scene="promos"><div className="section-head"><div><span className="eyebrow">PROMOCIONES</span><h2>Combos que<br/>entran por los ojos</h2></div><div className="promo-arrows"><button onClick={()=>setPromoIndex((promoIndex-1+promotions.length)%promotions.length)}>←</button><button onClick={()=>setPromoIndex((promoIndex+1)%promotions.length)}>→</button></div></div><div className="promo-stage"><div className="promo-media"><span className="promo-halo"/><img src={promotions[promoIndex].image} alt={promotions[promoIndex].title}/></div><div><span className="promo-counter">{String(promoIndex+1).padStart(2,'0')} / {promotions.length}</span><h3>{promotions[promoIndex].title}</h3><strong>{money(promotions[promoIndex].price)}</strong><p>Visual 3D sin fondo, integrado sobre vidrio translúcido para que cada promoción respire dentro de la marca.</p><button className="secondary promo-add" onClick={()=>{const fallback=products.find((p)=>p.popular)||products[0];add(fallback);setCartOpen(true)}}>Agregar un favorito al pedido</button></div></div></section>

    <section className="catalog scene-section" id="catalogo" data-scene="catalogo"><div className="section-head catalog-head"><div><span className="eyebrow">MENÚ COMPLETO</span><h2>Elige. Mira.<br/>Añade.</h2></div><label className="searchbox"><Icon name="search"/><input id="search" value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Buscar completo, arepa, churrasco..."/></label></div><div className="filters">{categories.map((c)=><button key={c} className={active===c?'active':''} onClick={()=>setActive(c)}>{c}</button>)}</div><div className="product-grid">{visible.map((item)=><ProductCard key={item.id} item={item} onOpen={setSelected} onAdd={add}/>)}</div>{!visible.length&&<div className="no-results">No encontramos productos con esa búsqueda.</div>}</section>

    <section className="story scene-section" id="historia" data-scene="historia"><div><span className="eyebrow">UNA COMPRA SIN FRICCIÓN</span><h2>Del antojo<br/>a WhatsApp.</h2></div><p>Ahora el recorrido tiene un orden claro: eliges el producto, revisas tu carrito, confirmas la entrega, seleccionas cómo pagar y recibes el pedido armado en WhatsApp. Sin pantallas falsas de cobro y sin perder el contexto.</p><div className="journey"><span><b>01</b>Explora</span><span><b>02</b>Carrito</span><span><b>03</b>Entrega</span><span><b>04</b>Pago</span><span><b>05</b>WhatsApp</span></div></section>

    <footer className="scene-section" id="contacto" data-scene="contacto"><img src={brand.logo} alt="Sazón y Sabor"/><div><strong>{brand.address}</strong><a href={`tel:${brand.phone}`}>{brand.phone}</a><a href={`https://instagram.com/${brand.instagram.replace('@','')}`} target="_blank" rel="noreferrer">{brand.instagram}</a></div><span>Chile Colombia en la Casa</span></footer>

    <button className={`floating-cart ${count?'has-items':''}`} onClick={()=>setCartOpen(true)}><Icon name="cart"/><span>{count}</span><b>{count?'Revisar pedido':'Carrito'}</b></button>
    {selected&&<ProductModal item={selected} onClose={()=>setSelected(null)} onAdd={add}/>} 
    {cartOpen&&<CartDrawer cart={cart} onClose={()=>setCartOpen(false)} onQty={changeQty} onCheckout={()=>{setCartOpen(false);setCheckout(true)}}/>}
  </main>;
}
