const ASSET_BASE = 'https://res.cloudinary.com/disghf6xc/image/upload/f_auto,q_auto';

export const brand = {
  name: 'Sazón y Sabor',
  tagline: 'Chile Colombia en la Casa',
  phone: '+56984151461',
  whatsappUrl: 'https://wa.me/56984151461',
  instagram: '@sazon_y_saboor',
  instagramUrl: 'https://www.instagram.com/sazon_y_saboor/',
  address: 'Avenida Las Vegas, esquina Inés de Suárez',
  freeDeliveryMin: 7990,
  logo: 'https://res.cloudinary.com/disghf6xc/image/upload/f_auto,q_auto/v1788683300/Sans%C3%B3n%20y%20sabor/logo-sazon-y-sabor.png'
};

export const visuals = {
  completo: `${ASSET_BASE}/completo-italiano-3d.png`,
  arepa: `${ASSET_BASE}/arepa-ave-mayo-3d.png`,
  churrasco: `${ASSET_BASE}/churrasco-italiano-3d.png`,
  chorrillana: `${ASSET_BASE}/chorrillana-clasica-3d.png`,
  papas: `${ASSET_BASE}/papas-fritas-3d.png`,
  bebida: `${ASSET_BASE}/bebida-cola-3d.png`,
  kids: `${ASSET_BASE}/menu-kids-3d.png`,
  combo: `${ASSET_BASE}/combo-estrella-3d.png`,
  completosCombo: `${ASSET_BASE}/completos-papas-combo-3d.png`,
  seleccion: `${ASSET_BASE}/seleccion-sazon-3d.png`
};

const NO_DETAIL = 'La carta base no detalla ingredientes adicionales para esta opción.';
const p = (id, name, category, price, description, image, extras = {}) => ({
  id,
  name,
  category,
  price,
  description,
  image,
  ...extras
});

// Fuente maestra: Menú Maestro Sazón y Sabor, capturado el 10-Sep-2026.
// No se agregan ingredientes que no estén respaldados por la carta entregada.
export const products = [
  p('completo','Completo','Completos',2200,'Salsa americana, palta, tomate, mayo.',visuals.completo,{popular:true}),
  p('italiano','Italiano','Completos',2000,'Palta, tomate, mayo.',visuals.completo,{popular:true}),
  p('dinamico','Dinámico','Completos',2200,'Salsa americana, chucrut, palta, tomate, mayo.',visuals.completo),
  p('especial','Especial','Completos',1800,'Palta, mayo.',visuals.completo),
  p('ass','ASS','Completos',2800,'Carne, palta, tomate, mayo.',visuals.completo),
  p('mechada-pleto','Mechada Pleto','Completos',2800,'Carne, palta, tomate, mayo.',visuals.completo),

  p('sopaipilla-sola','Sopaipilla Sola','Sopaipillas',700,NO_DETAIL,visuals.arepa),
  p('sopaipilla-ave-mayo','Sopaipilla Ave Mayo','Sopaipillas',2500,NO_DETAIL,visuals.arepa),
  p('sopaipilla-ave-palta','Sopaipilla Ave Palta','Sopaipillas',1800,NO_DETAIL,visuals.arepa),
  p('sopaipilla-mechada','Sopaipilla Mechada','Sopaipillas',2500,NO_DETAIL,visuals.arepa),
  p('sopaipilla-queso','Sopaipilla Queso','Sopaipillas',1000,NO_DETAIL,visuals.arepa),
  p('sopaipilla-palta','Sopaipilla Palta','Sopaipillas',1300,NO_DETAIL,visuals.arepa),
  p('sopaipilla-huevo','Sopaipilla Huevo','Sopaipillas',2000,NO_DETAIL,visuals.arepa),

  p('papas-chica','Papas Fritas Chica','Papas Fritas',4000,NO_DETAIL,visuals.papas),
  p('papas-mediana','Papas Fritas Mediana','Papas Fritas',5200,NO_DETAIL,visuals.papas),
  p('papas-grande','Papas Fritas Grande','Papas Fritas',6500,NO_DETAIL,visuals.papas),

  p('salchipapa-chica','Salchipapa Chica','Salchipapas',4500,NO_DETAIL,visuals.papas),
  p('salchipapa-mediana','Salchipapa Mediana','Salchipapas',6000,NO_DETAIL,visuals.papas),
  p('salchipapa-grande','Salchipapa Grande','Salchipapas',7000,NO_DETAIL,visuals.papas),
  p('salchipapa-caribena','Salchipapa Caribeña','Salchipapas',9990,'450 g papas, tocino, queso gratinado, salsa de la casa, 3 vienesas.',visuals.papas,{popular:true}),

  p('arepa-ave-mayo','Arepa Ave Mayo','Arepas',3000,NO_DETAIL,visuals.arepa,{popular:true}),
  p('arepa-ave-palta','Arepa Ave Palta','Arepas',3300,NO_DETAIL,visuals.arepa),
  p('arepa-mechada','Arepa Mechada','Arepas',4000,NO_DETAIL,visuals.arepa),

  p('trutitos-krispis','3 Trutitos de Pollo Krispis','Pollo',5500,'3 trutitos Krispis + papas fritas 150 g.',visuals.kids),

  p('chorrillana-tradicional','Chorrillana Tradicional','Chorrillanas',9990,'Papas fritas 350 g, carne 150 g, cebolla 100 g, 2 huevos.',visuals.chorrillana,{popular:true}),
  p('chorrillana-dos-carnes','Chorrillana 2 Carnes','Chorrillanas',10990,'Papas fritas 350 g, carne 100 g, longaniza 50 g, cebolla 50 g, 2 huevos.',visuals.chorrillana),
  p('chorrillana-americana','Chorrillana Americana','Chorrillanas',9990,'Papas fritas 350 g, salsa cheddar, carne 100 g, tocino.',visuals.chorrillana),
  p('chorrillana-galactica','Chorrillana Galáctica','Chorrillanas',12990,'Papas fritas 300 g, carne 100 g, cebolla 50 g, tocino, guacamole 100 g, aros de cebolla.',visuals.chorrillana,{popular:true}),

  p('papas-mechadas-tradicional','Papas Mechadas Tradicional','Papas Mechadas',7000,'Papas fritas 250 g, carne 150 g, salsa de la casa.',visuals.chorrillana),
  p('papas-mechadas-americana','Papas Mechadas Americana','Papas Mechadas',8500,'Papas fritas 250 g, carne 150 g, 3 aros de cebolla, salsa de queso.',visuals.chorrillana),
  p('papas-mechadas-vaquera','Papas Mechadas Vaquera','Papas Mechadas',9900,'Papas fritas 250 g, carne 150 g, tocino, 3 aros de cebolla, salsa BBQ.',visuals.chorrillana),

  p('churrasca','Churrasca','Churrascas',700,NO_DETAIL,visuals.churrasco),
  p('churrasca-palta','Churrasca Palta','Churrascas',1200,NO_DETAIL,visuals.churrasco),
  p('churrasca-jamon','Churrasca Jamón','Churrascas',1000,NO_DETAIL,visuals.churrasco),
  p('churrasca-queso','Churrasca Queso','Churrascas',1000,NO_DETAIL,visuals.churrasco),
  p('churrasca-queso-jamon','Churrasca Queso Jamón','Churrascas',1600,NO_DETAIL,visuals.churrasco),
  p('churrasca-pernil','Churrasca Pernil','Churrascas',2500,NO_DETAIL,visuals.churrasco),
  p('churrasca-queso-cabeza','Churrasca Queso Cabeza','Churrascas',1500,NO_DETAIL,visuals.churrasco),
  p('churrasca-ave-mayo','Churrasca Ave Mayo','Churrascas',2500,NO_DETAIL,visuals.arepa),
  p('churrasca-mechada','Churrasca Mechada','Churrascas',3000,NO_DETAIL,visuals.churrasco),
  p('paila-huevo','Paila de Huevo','Churrascas',2000,NO_DETAIL,visuals.churrasco),

  p('churrasco-italiano','Churrasco Italiano','Churrascos',4500,'Carne, palta, tomate, mayonesa.',visuals.churrasco,{popular:true}),
  p('chacarero','Chacarero','Churrascos',5500,'Carne, porotos verdes, tomate, ají verde.',visuals.churrasco),
  p('luco','Luco','Churrascos',4800,'Carne, queso.',visuals.churrasco),
  p('el-niche','El Niche','Churrascos',7000,'Carne, tocino, cebolla caramelizada, huevo, papas de hilo.',visuals.churrasco,{popular:true}),

  p('chocolate','Chocolate','Bebidas',1000,NO_DETAIL,visuals.bebida),
  p('bebida','Bebida','Bebidas',500,NO_DETAIL,visuals.bebida),
  p('cafe','Café','Bebidas',700,NO_DETAIL,visuals.bebida),
  p('milo','Milo','Bebidas',1000,NO_DETAIL,visuals.bebida),
  p('te','Té','Bebidas',500,NO_DETAIL,visuals.bebida),

  p('menu-kids','Menú Kids','Kids',4000,'Papas fritas 150 g + 5 nuggets + 3 empanadas de queso.',visuals.kids,{popular:true})
];

export const extras = [
  { id:'pebre', name:'Pebre', price:500 },
  { id:'guacamole', name:'Guacamole', price:1000 },
  { id:'mechaqueso', name:'Mechaqueso', price:2800 }
];

export const promotions = [
  { id:'promo-3-italianos', title:'3 completos italianos', price:4500, image:visuals.completo },
  { id:'promo-3-churrascos-litro', title:'3 churrascos italianos + 1 bebida de 1 litro', price:12000, image:visuals.seleccion }
];

export const categories = ['Todos', ...new Set(products.map((item)=>item.category))];
