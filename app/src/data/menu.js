const ASSET_BASE = 'https://res.cloudinary.com/disghf6xc/image/upload/Sans%C3%B3n%20y%20sabor';

export const brand = {
  name: 'Sazón y Sabor',
  tagline: 'Chile Colombia en la Casa',
  phone: '+56984151461',
  instagram: '@sazon_y_saboor',
  address: 'Avenida Las Vegas, esquina Inés de Suárez',
  freeDeliveryMin: 7990,
  logo: 'https://res.cloudinary.com/disghf6xc/image/upload/v1788683300/Sans%C3%B3n%20y%20sabor/logo-sazon-y-sabor.png'
};

export const visuals = {
  completo: `${ASSET_BASE}/completo-italiano.png`,
  arepa: `${ASSET_BASE}/arepa-mayo.png`,
  churrasco: `${ASSET_BASE}/churrasco-italiano.png`,
  chorrillana: `${ASSET_BASE}/papas-fritas.png`,
  papas: `${ASSET_BASE}/papas-fritas.png`,
  bebida: `${ASSET_BASE}/bebida-cola.png`,
  kids: `${ASSET_BASE}/combo-estrella.png`,
  combo: `${ASSET_BASE}/combo-estrella.png`,
  completosCombo: `${ASSET_BASE}/combo-estrella.png`,
  seleccion: `${ASSET_BASE}/combo-estrella.png`
};

const p = (id, name, category, price, description, image, extras = {}) => ({ id, name, category, price, description, image, ...extras });

export const products = [
  p('completo','Completo','Completos',2200,'Salsa americana, palta, tomate y mayo.',visuals.completo,{popular:true}),
  p('italiano','Italiano','Completos',2000,'Palta, tomate y mayo.',visuals.completo,{popular:true}),
  p('dinamico','Dinámico','Completos',2200,'Salsa americana, chucrut, palta, tomate y mayo.',visuals.completo),
  p('especial','Especial','Completos',1800,'Palta y mayo.',visuals.completo),
  p('ass','ASS','Completos',2800,'Carne, palta, tomate y mayo.',visuals.completo),
  p('mechada-pleto','Mechada Pleto','Completos',2800,'Carne mechada, palta, tomate y mayo.',visuals.completo),
  p('churrasca','Churrasca','Churrascas',700,'Churrasca tradicional.',visuals.churrasco),
  p('churrasca-palta','Churrasca Palta','Churrascas',1200,'Churrasca con palta.',visuals.churrasco),
  p('churrasca-jamon','Churrasca Jamón','Churrascas',1000,'Churrasca con jamón.',visuals.churrasco),
  p('churrasca-queso','Churrasca Queso','Churrascas',1000,'Churrasca con queso.',visuals.churrasco),
  p('churrasca-queso-jamon','Churrasca Queso Jamón','Churrascas',1600,'Queso y jamón.',visuals.churrasco),
  p('churrasca-pernil','Churrasca Pernil','Churrascas',2500,'Pernil en churrasca.',visuals.churrasco),
  p('churrasca-queso-cabeza','Churrasca Queso Cabeza','Churrascas',1500,'Queso de cabeza.',visuals.churrasco),
  p('churrasca-ave-mayo','Churrasca Ave Mayo','Churrascas',2500,'Ave y mayonesa.',visuals.arepa),
  p('churrasca-mechada','Churrasca Mechada','Churrascas',3000,'Carne mechada.',visuals.churrasco),
  p('churrasca-palta-huevo','Churrasca Palta de Huevo','Churrascas',2000,'Palta y huevo.',visuals.churrasco),
  p('churrasco-italiano','Churrasco Italiano','Churrascos',4500,'Carne, palta, tomate y mayonesa.',visuals.churrasco,{popular:true}),
  p('chacarero','Chacarero','Churrascos',5500,'Carne, porotos verdes, tomate y ají verde.',visuals.churrasco),
  p('luco','Luco','Churrascos',4800,'Carne y queso.',visuals.churrasco),
  p('el-niche','El Niche','Churrascos',7000,'Carne, tocino, cebolla caramelizada, huevo y papas de hilo.',visuals.churrasco,{popular:true}),
  p('sopaipilla-sola','Sopaipilla Sola','Sopaipillas',700,'Sopaipilla crujiente y caliente.',visuals.arepa),
  p('sopaipilla-ave-mayo','Sopaipilla Ave Mayo','Sopaipillas',2500,'Ave y mayo.',visuals.arepa),
  p('sopaipilla-ave-palta','Sopaipilla Ave Palta','Sopaipillas',1800,'Ave y palta.',visuals.arepa),
  p('sopaipilla-mechada','Sopaipilla Mechada','Sopaipillas',2500,'Carne mechada.',visuals.arepa),
  p('sopaipilla-queso','Sopaipilla Queso','Sopaipillas',1000,'Queso.',visuals.arepa),
  p('sopaipilla-palta','Sopaipilla Palta','Sopaipillas',1300,'Palta.',visuals.arepa),
  p('sopaipilla-huevo','Sopaipilla Huevo','Sopaipillas',2000,'Huevo.',visuals.arepa),
  p('chorrillana-tradicional','Chorrillana Tradicional','Chorrillanas',9990,'Papas fritas, carne, cebolla y huevos.',visuals.chorrillana,{popular:true}),
  p('chorrillana-dos-carnes','Chorrillana 2 Carnes','Chorrillanas',10990,'Papas fritas, carne, longaniza, cebolla y huevos.',visuals.chorrillana),
  p('chorrillana-americana','Chorrillana Americana','Chorrillanas',9990,'Papas fritas, salchicha, carne y tocino.',visuals.chorrillana),
  p('chorrillana-galactica','Chorrillana Galáctica','Chorrillanas',12990,'Papas fritas, carne, cebolla, tocino, guacamole y aros de cebolla.',visuals.chorrillana,{popular:true}),
  p('papas-mechadas-tradicional','Papas Mechadas Tradicional','Papas Mechadas',7000,'Papas fritas, carne mechada y salsa de la casa.',visuals.chorrillana),
  p('papas-mechadas-americana','Papas Mechadas Americana','Papas Mechadas',8500,'Papas fritas, carne mechada, aros de cebolla y salsa de queso.',visuals.chorrillana),
  p('papas-mechadas-vaquera','Papas Mechadas Vaquera','Papas Mechadas',9900,'Papas fritas, carne mechada, tocino, aros de cebolla y salsa BBQ.',visuals.chorrillana),
  p('arepa-ave-mayo','Arepa Ave Mayo','Arepas',3000,'Arepa con ave y mayonesa.',visuals.arepa,{popular:true}),
  p('arepa-ave-palta','Arepa Ave Palta','Arepas',3300,'Arepa con ave y palta.',visuals.arepa),
  p('arepa-mechada','Arepa Mechada','Arepas',4000,'Arepa con carne mechada.',visuals.arepa),
  p('trutitos-krispis','3 Trutitos Krispis','Pollo',5500,'3 trutitos krispis con papas fritas (150 g).',visuals.kids),
  p('salchipapa-caribena','Salchipapa Caribeña','Salchipapas',9990,'Papas, tocino, queso gratinado, salsa de la casa y vienesas.',visuals.papas),
  p('papas-chica','Papas Fritas Chica','Papas Fritas',4000,'Porción chica.',visuals.papas),
  p('papas-mediana','Papas Fritas Mediana','Papas Fritas',5200,'Porción mediana.',visuals.papas),
  p('papas-grande','Papas Fritas Grande','Papas Fritas',6500,'Porción grande.',visuals.papas),
  p('salchipapa-chica','Salchipapa Chica','Salchipapas',4500,'Papas fritas con vienesas.',visuals.papas),
  p('salchipapa-mediana','Salchipapa Mediana','Salchipapas',6000,'Papas fritas con vienesas.',visuals.papas),
  p('salchipapa-grande','Salchipapa Grande','Salchipapas',7000,'Papas fritas con vienesas.',visuals.papas),
  p('chocolate','Chocolate','Bebidas',1000,'Bebestible caliente.',visuals.bebida),
  p('bebida','Bebida','Bebidas',500,'Bebida individual.',visuals.bebida),
  p('cafe','Café','Bebidas',700,'Café caliente.',visuals.bebida),
  p('milo','Milo','Bebidas',1000,'Milo.',visuals.bebida),
  p('te','Té','Bebidas',500,'Té caliente.',visuals.bebida),
  p('menu-kids','Menú Kids','Kids',4000,'Papas fritas 150 g, 5 nuggets y 3 empanadas de queso.',visuals.kids)
];

export const extras = [
  { id:'pebre', name:'Pebre', price:500 },
  { id:'guacamole', name:'Guacamole', price:1000 },
  { id:'mechaqueso', name:'Mechaqueso', price:2800 }
];

export const promotions = [
  { id:'promo-completos', title:'2 completos + papas chicas', price:6500, image:visuals.completosCombo },
  { id:'promo-patacones', title:'2 patacones con carne mechada + guacamole + Coca-Cola 1.5 L', price:15000, image:visuals.seleccion },
  { id:'promo-churrascos-papas', title:'2 churrascos italianos + 2 porciones de papas fritas', price:11500, image:visuals.combo },
  { id:'promo-papas-dos-carnes', title:'Papas dos carnes + bebida 1.5 L', price:12000, image:visuals.chorrillana },
  { id:'promo-chacareros', title:'3 churrascos chacareros + bebida 2 L', price:15000, image:visuals.churrasco },
  { id:'promo-lucos', title:'3 barros lucos', price:12000, image:visuals.churrasco },
  { id:'promo-italianos-litro', title:'3 churrascos italianos + bebida 1 L', price:12000, image:visuals.seleccion },
  { id:'promo-perros', title:'2 perros calientes + 2 bebidas mini', price:5700, image:visuals.completosCombo },
  { id:'promo-sopaipillas', title:'5 sopaipillas', price:2000, image:visuals.arepa },
  { id:'promo-arepa-ave', title:'2 arepas ave mayo + Coca-Cola 1 L', price:8500, image:visuals.seleccion },
  { id:'promo-arepa-mechada', title:'2 arepas mechadas + 2 bebidas en lata', price:9900, image:visuals.seleccion },
  { id:'promo-3-italianos', title:'3 completos italianos', price:4500, image:visuals.completo },
  { id:'promo-italianos-salchipapa', title:'2 completos italianos + salchipapa chica', price:7500, image:visuals.completosCombo }
];

export const categories = ['Todos', ...new Set(products.map((item)=>item.category))];
