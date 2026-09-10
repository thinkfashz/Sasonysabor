import { ImageResponse } from 'next/og';
import { brand, visuals } from '@/data/menu';

export const runtime = 'edge';

const creatives = {
  hero: {
    title: 'Sazón y Sabor',
    subtitle: 'PROMOCIONES · COMPLETOS · CHURRASCOS · PATACONES Y MÁS',
    price: 'Pide fácil desde nuestra app',
    image: visuals.seleccion,
    note: 'WhatsApp · Retiro en local · Transferencia',
    wide: true,
  },
  'completos-papas': {
    title: '2 COMPLETOS ITALIANOS',
    subtitle: '+ PAPAS CHICAS',
    price: '$6.500',
    image: visuals.completosCombo,
    note: 'Promo especial · pide por WhatsApp',
  },
  'churrascos-papas': {
    title: '2 CHURRASCOS ITALIANOS',
    subtitle: '+ 2 PORCIONES DE PAPAS FRITAS',
    price: '$11.500',
    image: visuals.seleccion,
    note: 'Ideal para compartir',
  },
  patacones: {
    title: '2 PATACONES',
    subtitle: 'CARNE MECHADA + GUACAMOLE + COCA-COLA 1,5 L',
    price: '$15.000',
    image: visuals.combo,
    note: 'Crujiente, jugoso y lleno de sabor',
  },
  'papas-dos-carnes': {
    title: 'PAPAS DOS CARNES',
    subtitle: 'LONGANIZA · CARNE · CEBOLLA · 2 HUEVOS + BEBIDA 1,5 L',
    price: '$12.000',
    image: visuals.chorrillana,
    note: 'Promo del día',
  },
};

export async function GET(_request, context) {
  const { slug } = await context.params;
  const item = creatives[slug] || creatives.hero;
  const wide = Boolean(item.wide);
  const width = wide ? 1200 : 1080;
  const height = wide ? 630 : 1350;

  return new ImageResponse(
    (
      <div style={{
        width: '100%', height: '100%', display: 'flex', flexDirection: wide ? 'row' : 'column',
        alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden',
        background: 'radial-gradient(circle at 50% 36%, #6d0e0e 0%, #1a0707 37%, #050505 76%)',
        color: '#fff', fontFamily: 'Arial, sans-serif', padding: wide ? '54px' : '70px 64px'
      }}>
        <div style={{ position:'absolute', inset:0, display:'flex', opacity:.24, background:'linear-gradient(135deg,#000 0%,transparent 45%,#9e120d 100%)' }} />
        <div style={{ position:'absolute', top:0, left:0, right:0, height:'18px', display:'flex', background:'#d9a62e' }} />
        <div style={{ display:'flex', flexDirection:'column', alignItems: wide ? 'flex-start' : 'center', justifyContent:'center', width: wide ? '52%' : '100%', zIndex:2 }}>
          <img src={brand.logo} width={wide ? 390 : 520} height={wide ? 220 : 290} style={{ objectFit:'contain', marginBottom: wide ? 10 : 28 }} />
          <div style={{ display:'flex', color:'#f5bd3a', fontSize: wide ? 22 : 29, fontWeight:800, letterSpacing:3, marginBottom:12 }}>{item.note}</div>
          <div style={{ display:'flex', fontSize: wide ? 54 : 72, fontWeight:900, lineHeight:1.02, textAlign: wide ? 'left' : 'center', maxWidth: wide ? 620 : 920 }}>{item.title}</div>
          <div style={{ display:'flex', fontSize: wide ? 25 : 34, fontWeight:800, color:'#f5bd3a', textAlign: wide ? 'left' : 'center', marginTop:16, maxWidth: wide ? 610 : 880 }}>{item.subtitle}</div>
          <div style={{ display:'flex', marginTop:24, padding:'14px 30px', borderRadius:24, background:'#c91818', border:'3px solid #f5bd3a', fontSize: wide ? 29 : 56, fontWeight:900, boxShadow:'0 18px 60px rgba(0,0,0,.45)' }}>{item.price}</div>
        </div>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', width: wide ? '48%' : '100%', height: wide ? '100%' : '48%', zIndex:2, marginTop: wide ? 0 : 24 }}>
          <div style={{ display:'flex', width: wide ? 520 : 820, height: wide ? 480 : 520, borderRadius:48, background:'radial-gradient(circle,#f5bd3a33 0%,transparent 65%)', alignItems:'center', justifyContent:'center' }}>
            <img src={item.image} width={wide ? 500 : 760} height={wide ? 470 : 500} style={{ objectFit:'contain', filter:'drop-shadow(0 28px 26px rgba(0,0,0,.58))' }} />
          </div>
        </div>
        <div style={{ position:'absolute', bottom:wide ? 22 : 34, left:wide ? 54 : 64, right:wide ? 54 : 64, display:'flex', justifyContent:'space-between', fontSize:wide ? 18 : 24, color:'#eee', zIndex:3 }}>
          <span>@sazon_y_saboor</span><span>WhatsApp +56 9 8415 1461</span>
        </div>
      </div>
    ),
    { width, height, headers: { 'Cache-Control': 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400' } }
  );
}
