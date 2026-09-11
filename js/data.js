// Local data layer for ЕЛЕКТРОНИКА СЕРВИЗ — demo persistence via localStorage.
// Swap this file for real API calls once a backend is connected; the rest of the
// site only talks to the functions below (getProducts/saveProducts/etc).

const DB_KEY = 'es_products_v2';
const ADMIN_KEY = 'es_admin_auth_v1';
const ADMIN_PASSWORD = 'mezdra2026'; // demo-only password, replace with real auth later

const SEED_PRODUCTS = [
  {
    id: 'p1', brand: 'Apple', model: 'iPhone 14 Pro 128GB', condition: 'used',
    price: 1699, oldPrice: 1899, status: 'available', color: 'Тъмно лилав', storage: '128GB',
    description: 'iPhone 14 Pro в отлично състояние, закупен от нас, с 6 месеца гаранция. Пълен комплект оригинални аксесоари, батерия 91% капацитет.',
    specs: [['Дисплей','6.1" Super Retina XDR'],['Батерия','91% капацитет'],['Камера','48MP Pro система'],['RAM / Памет','6GB / 128GB'],['Гаранция','6 месеца'],['Комплект','Кутия, кабел']],
    images: ['assets/products/p1-iphone14pro.jpg'], createdAt: Date.now() - 86400000 * 2
  },
  {
    id: 'p2', brand: 'Samsung', model: 'Galaxy S23 256GB', condition: 'new',
    price: 1799, oldPrice: null, status: 'available', color: 'Черен', storage: '256GB',
    description: 'Чисто нов Samsung Galaxy S23, запечатан, с пълна фирмена и производителска гаранция.',
    specs: [['Дисплей','6.1" Dynamic AMOLED 2X'],['Батерия','3900 mAh'],['Камера','50MP тройна система'],['RAM / Памет','8GB / 256GB'],['Гаранция','24 месеца'],['Комплект','Пълен, запечатан']],
    images: ['assets/products/p2-galaxys23.png'], createdAt: Date.now() - 86400000 * 5
  },
  {
    id: 'p3', brand: 'Xiaomi', model: 'Redmi Note 12 Pro 128GB', condition: 'new',
    price: 599, oldPrice: 699, status: 'available', color: 'Синьо', storage: '128GB',
    description: 'Отличен баланс между цена и качество. Идеален за ежедневна употреба, с бърза 67W зарядка в комплекта.',
    specs: [['Дисплей','6.67" AMOLED 120Hz'],['Батерия','5000 mAh'],['Камера','50MP OIS'],['RAM / Памет','8GB / 128GB'],['Гаранция','24 месеца'],['Комплект','Пълен, запечатан']],
    images: ['assets/products/p3-redminote12.jpg'], createdAt: Date.now() - 86400000 * 1
  },
  {
    id: 'p4', brand: 'Apple', model: 'iPhone 12 64GB', condition: 'used',
    price: 899, oldPrice: null, status: 'reserved', color: 'Бял', storage: '64GB',
    description: 'Iphone 12 в добро козметично състояние, малки следи от употреба по корпуса. Напълно функционален, с нова батерия.',
    specs: [['Дисплей','6.1" Super Retina XDR'],['Батерия','нова, 100%'],['Камера','12MP двойна система'],['RAM / Памет','4GB / 64GB'],['Гаранция','3 месеца'],['Комплект','Само устройство']],
    images: ['assets/products/p4-iphone12.jpg'], createdAt: Date.now() - 86400000 * 9
  },
  {
    id: 'p5', brand: 'Samsung', model: 'Galaxy A54 128GB', condition: 'new',
    price: 749, oldPrice: null, status: 'available', color: 'Виолетов', storage: '128GB',
    description: 'Надежден среден клас с отлична камера и голяма батерия. Топ избор за качество на разумна цена.',
    specs: [['Дисплей','6.4" Super AMOLED 120Hz'],['Батерия','5000 mAh'],['Камера','50MP OIS'],['RAM / Памет','8GB / 128GB'],['Гаранция','24 месеца'],['Комплект','Пълен, запечатан']],
    images: ['assets/products/p5-galaxya54.jpg'], createdAt: Date.now() - 86400000 * 12
  },
  {
    id: 'p6', brand: 'Apple', model: 'iPhone 13 128GB', condition: 'used',
    price: 1299, oldPrice: 1450, status: 'available', color: 'Полунощно син', storage: '128GB',
    description: 'iPhone 13 без забележки по екрана, батерия 87%. Продава се с 6 месеца гаранция от нашия сервиз.',
    specs: [['Дисплей','6.1" Super Retina XDR'],['Батерия','87% капацитет'],['Камера','12MP двойна система'],['RAM / Памет','4GB / 128GB'],['Гаранция','6 месеца'],['Комплект','Кутия, кабел']],
    images: ['assets/products/p6-iphone13.jpg'], createdAt: Date.now() - 86400000 * 3
  },
  {
    id: 'p7', brand: 'Xiaomi', model: 'Poco X5 Pro 256GB', condition: 'new',
    price: 649, oldPrice: null, status: 'available', color: 'Черен', storage: '256GB',
    description: 'Мощен процесор Snapdragon и голям обем памет — чудесен избор за игри и мултитаскинг.',
    specs: [['Дисплей','6.67" AMOLED 120Hz'],['Батерия','5000 mAh'],['Камера','108MP'],['RAM / Памет','8GB / 256GB'],['Гаранция','24 месеца'],['Комплект','Пълен, запечатан']],
    images: ['assets/products/p7-pocox5pro.jpg'], createdAt: Date.now() - 86400000 * 7
  },
  {
    id: 'p8', brand: 'Samsung', model: 'Galaxy Z Flip5 256GB', condition: 'used',
    price: 2199, oldPrice: 2450, status: 'sold', color: 'Лавандула', storage: '256GB',
    description: 'Сгъваем флагман в перфектно състояние, закупен и сервизиран изцяло от нас.',
    specs: [['Дисплей','6.7" Dynamic AMOLED 2X'],['Батерия','3700 mAh'],['Камера','12MP двойна система'],['RAM / Памет','8GB / 256GB'],['Гаранция','6 месеца'],['Комплект','Пълен']],
    images: ['assets/products/p8-zflip5.jpg'], createdAt: Date.now() - 86400000 * 15
  }
];

function getProducts() {
  try {
    const raw = localStorage.getItem(DB_KEY);
    if (!raw) {
      localStorage.setItem(DB_KEY, JSON.stringify(SEED_PRODUCTS));
      return [...SEED_PRODUCTS];
    }
    return JSON.parse(raw);
  } catch (e) {
    return [...SEED_PRODUCTS];
  }
}

function saveProducts(list) {
  localStorage.setItem(DB_KEY, JSON.stringify(list));
}

function getProduct(id) {
  return getProducts().find(p => p.id === id) || null;
}

function upsertProduct(product) {
  const list = getProducts();
  const idx = list.findIndex(p => p.id === product.id);
  if (idx >= 0) list[idx] = product;
  else list.unshift(product);
  saveProducts(list);
}

function deleteProduct(id) {
  saveProducts(getProducts().filter(p => p.id !== id));
}

function resetDemoData() {
  localStorage.setItem(DB_KEY, JSON.stringify(SEED_PRODUCTS));
}

function formatPrice(n) {
  return new Intl.NumberFormat('bg-BG', { maximumFractionDigits: 0 }).format(n) + ' лв.';
}

function uid() {
  return 'p' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function isAdminAuthed() {
  return sessionStorage.getItem(ADMIN_KEY) === '1';
}
function adminLogin(password) {
  if (password === ADMIN_PASSWORD) {
    sessionStorage.setItem(ADMIN_KEY, '1');
    return true;
  }
  return false;
}
function adminLogout() {
  sessionStorage.removeItem(ADMIN_KEY);
}
