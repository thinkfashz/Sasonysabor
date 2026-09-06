const ASSET_BASE = 'https://res.cloudinary.com/disghf6xc/image/upload/Sans%C3%B3n%20y%20sabor';

export const brand = {
  name: 'Sazón y Sabor',
  tagline: 'Chile Colombia en la Casa',
  phone: '+56984151461',
  instagram: '@sazon_y_saboor',
  address: 'Avenida Las Vegas, esquina Inés de Suárez',
  freeDeliveryMin: 7990,
  logo: `${ASSET_BASE}/logo-sazon-y-sabor.png`
};

const img = {
  completo: `${ASSET_BASE}/completo-italiano.png`,
  arepa: `${ASSET_BASE}/arepa-mayo.png`,
  churrasco: `${ASSET_BASE}/churrasco-italiano.png`,
  papas: `${ASSET_BASE}/papas-fritas.png`,
  bebida: `${ASSET_BASE}/bebida-cola.png`,
  combo: `${ASSET_BASE}/combo-estrella.png`
};

const p = (id, name, category, price, description, image, extras = {}) => ({ id, name, category, price, description, image, ...extras });

export const products = [
  p('completo', 'Completo', 'Completos', 2200, 'Salsa americana, palta, tomate y mayo.', img.completo, { popular: true }),
  p('italiano', 'Italiano', 'Completos', 2000, 'Palta, tomate y mayo.', img.completo, { popular: true }),
  p('dinamico', 'Dinámico', 'Completos', 2200, 'Salsa americana, chucrut, palta, tomate y mayo.', img.completo),
  p('especial', 'Especial', 'Completos', 1800, 'Palta y mayo.', img.completo),
  p('ass', 'ASS', 'Completos', 2800, 'Carne, palta, tomate y mayo.', img.completo),
  p('mechada-pleto', 'Mechada Pleto', 'Completos', 2800, 'Carne mechada, palta, tomate y mayo.', img.completo),

  p('churrasca', 'Churrasca', 'Churrascas', 700, 'Churrasca tradicional.', img.churrasco),
  p('churrasca-palta', 'Churrasca Palta', 'Churrascas', 1200, 'Churrasca con palta.', img.churrasco),
  p('churrasca-jamon', 'Churrasca Jamón', 'Churrascas', 1000, 'Churrasca con jamón.', img.churrasco),
  p('churrasca-queso', 'Churrasca Queso', 'Churrascas', 1000, 'Churrasca con queso.', img.churrasco),
  p('churrasca-queso-jamon', 'Churrasca Queso Jamón', 'Churrascas', 1600, 'Queso y jamón.', img.churrasco),
  p('churrasca-pernil', 'Churrasca Pernil', 'Churrascas', 2500, 'Pernil en churrasca.', img.churrasco),
  p('churrasca-queso-cabeza', 'Churrasca Queso Cabeza', 'Churrascas', 1500, 'Queso de cabeza.', img.churrasco),
  p('churrasca-ave-mayo', 'Churrasca Ave Mayo', 'Churrascas', 2500, 'Ave y mayonesa.', img.churrasco),
  p('churrasca-mechada', 'Churrasca Mechada', 'Churrascas', 3000, 'Carne mechada.', img.churrasco),
  p('churrasca-palta-huevo', 'Churrasca Palta de Huevo', 'Churrascas', 2000, 'Palta y huevo.', img.churrasco),

  p('churrasco-italiano', 'Churrasco Italiano', 'Churrascos', 4500, 'Carne, palta, tomate y mayonesa.', img.churrasco, { popular: true }),
  p('chacarero', 'Chacarero', 'Churrascos', 5500, 'Carne, porotos verdes, tomate y ají verde.', img.churrasco),
  p('luco', 'Luco', 'Churrascos', 4800, 'Carne y queso.', img.churrasco),
  p('el-niche', 'El Niche', 'Churrascos', 7000, 'Carne, tocino, cebolla caramelizada, huevo y papas de hilo.', img.churrasco, { popular: true }),

  p('sopaipilla-sola', 'Sopaipilla Sola', 'Sopaipillas', 700, 'Sopaipilla crujiente y caliente.', img.arepa),
  p('sopaipilla-ave-mayo', 'Sopaipilla Ave Mayo', 'Sopaipillas', 2500, 'Ave y mayo.', img.arepa),
  p('sopaipilla-ave-palta', 'Sopaipilla Ave Palta', 'Sopaipillas', 1800, 'Ave y palta.', img.arepa),
  p('sopaipilla-mechada', 'Sopaipilla Mechada', 'Sopaipillas', 2500, 'Carne mechada.', img.arepa),
  p('sopaipilla-queso', 'Sopaipilla Queso', 'Sopaipillas', 1000, 'Queso.', img.arepa),
  p('sopaipilla-palta', 'Sopaipilla Palta', 'Sopaipillas', 1300, 'Palta.', img.arepa),
  p('sopaipilla-huevo', 'Sopaipilla Huevo', 'Sopaipillas', 2000, 'Huevo.', img.arepa),

  p('chorrillana-tradicional', 'Chorrillana Tradicional', 'Chorrillanas', 9990, 'Papas fritas, carne, cebolla y huevos.', img.papas, { popular: true }),
  p('chorrillana-dos-carnes', 'Chorrillana 2 Carnes', 'Chorrillanas', 10990, 'Papas fritas, carne, longaniza, cebolla y huevos.', img.papas),
  p('chorrillana-americana', 'Chorrillana Americana', 'Chorrillanas', 9990, 'Papas fritas, salchicha, carne y tocino.', img.papas),
  p('chorrillana-galactica', 'Chorrillana Galáctica', 'Chorrillanas', 12990, 'Papas fritas, carne, cebolla, tocino, guacamole y aros de cebolla.', img.papas, { popular: true }),
  p('papas-mechadas-tradicional', 'Papas Mechadas Tradicional', 'Papas Mechadas', 7000, 'Papas fritas, carne mechada y salsa de la casa.', img.papas),
  p('papas-mechadas-americana', 'Papas Mechadas Americana', 'Papas Mechadas', 8500, 'Papas fritas, carne mechada, aros de cebolla y salsa de queso.', img.papas),
  p('papas-mechadas-vaquera', 'Papas Mechadas Vaquera', 'Papas Mechadas', 9900, 'Papas fritas, carne mechada, tocino, aros de cebolla y salsa BBQ.', img.papas),

  p('arepa-ave-mayo', 'Arepa Ave Mayo', 'Arepas', 3000, 'Arepa con ave y mayonesa.', img.arepa, { popular: true }),
  p('arepa-ave-palta', 'Arepa Ave Palta', 'Arepas', 3300, 'Arepa con ave y palta.', img.arepa),
  p('arepa-mechada', 'Arepa Mechada', 'Arepas', 4000, 'Arepa con carne mechada.', img.arepa),
  p('trutitos-krispis', '3 Trutitos Krispis', 'Pollo', 5500, '3 trutitos krispis con papas fritas (150 g).', img.combo),
  p('salchipapa-caribena', 'Salchipapa Caribeña', 'Salchipapas', 9990, 'Papas, tocino, queso gratinado, salsa de la casa y vienesas.', img.papas),

  p('papas-chica', 'Papas Fritas Chica', 'Papas Fritas', 4000, 'Porción chica.', img.papas),
  p('papas-mediana', 'Papas Fritas Mediana', 'Papas Fritas', 5200, 'Porción mediana.', img.papas),
  p('papas-grande', 'Papas Fritas Grande', 'Papas Fritas', 6500, 'Porción grande.', img.papas),
  p('salchipapa-chica', 'Salchipapa Chica', 'Salchipapas', 4500, 'Papas fritas con vienesas.', img.papas),
  p('salchipapa-mediana', 'Salchipapa Mediana', 'Salchipapas', 6000, 'Papas fritas con vienesas.', img.papas),
  p('salchipapa-grande', 'Salchipapa Grande', 'Salchipapas', 7000, 'Papas fritas con vienesas.', img.papas),

  p('chocolate', 'Chocolate', 'Bebidas', 1000, 'Bebestible caliente.', img.bebida),
  p('bebida', 'Bebida', 'Bebidas', 500, 'Bebida individual.', img.bebida),
  p('cafe', 'Café', 'Bebidas', 700, 'Café caliente.', img.bebida),
  p('milo', 'Milo', 'Bebidas', 1000, 'Milo.', img.bebida),
  p('te', 'Té', 'Bebidas', 500, 'Té caliente.', img.bebida),
  p('menu-kids', 'Menú Kids', 'Kids', 4000, 'Papas fritas 150 g, 5 nuggets y 3 empanadas de queso.', img.combo)
];

export const extras = [
  { id: 'pebre', name: 'Pebre', price: 500 },
  { id: 'guacamole', name: 'Guacamole', price: 1000 },
  { id: 'mechaqueso', name: 'Mechaqueso', price: 2800 }
];

export const promotions = [
  { id: 'promo-completos', title: '2 completos + papas chicas', price: 6500, image: img.completo },
  { id: 'promo-patacones', title: '2 patacones con carne mechada + guacamole + Coca-Cola 1.5 L', price: 15000, image: img.combo },
  { id: 'promo-churrascos-papas', title: '2 churrascos italianos + 2 porciones de papas fritas', price: 11500, image: img.churrasco },
  { id: 'promo-papas-dos-carnes', title: 'Papas dos carnes + bebida 1.5 L', price: 12000, image: img.papas },
  { id: 'promo-chacareros', title: '3 churrascos chacareros + bebida 2 L', price: 15000, image: img.churrasco },
  { id: 'promo-lucos', title: '3 barros lucos', price: 12000, image: img.churrasco },
  { id: 'promo-italianos-litro', title: '3 churrascos italianos + bebida 1 L', price: 12000, image: img.churrasco },
  { id: 'promo-perros', title: '2 perros calientes + 2 bebidas mini', price: 5700, image: img.completo },
  { id: 'promo-sopaipillas', title: '5 sopaipillas', price: 2000, image: img.arepa },
  { id: 'promo-arepa-ave', title: '2 arepas ave mayo + Coca-Cola 1 L', price: 8500, image: img.arepa },
  { id: 'promo-arepa-mechada', title: '2 arepas mechadas + 2 bebidas en lata', price: 9900, image: img.arepa },
  { id: 'promo-3-italianos', title: '3 completos italianos', price: 4500, image: img.completo },
  { id: 'promo-italianos-salchipapa', title: '2 completos italianos + salchipapa chica', price: 7500, image: img.completo }
];

export const categories = ['Todos', ...new Set(products.map((item) => item.category))];
