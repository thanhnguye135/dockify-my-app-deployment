// Seed initial product into myapp database if not present
const database = db.getSiblingDB('myapp');

// Ensure collection exists
if (!database.getCollectionNames().includes('products')) {
  database.createCollection('products');
}

// Upsert example product
database.products.updateOne(
  { _id: ObjectId('688acde24a4a69389d79163b') },
  {
    $setOnInsert: {
      name: 'MacBook Air M1',
      price: 12,
      image: 'https://cdn2.cellphones.com.vn/x/media/catalog/product/v/n/vn0d33_1.jpg',
      createdAt: new Date(1753927138447),
      updatedAt: new Date(1753927138447),
      __v: 0,
    },
  },
  { upsert: true }
);

// Upsert: Laptop HP 245 G10 B8PF8AT
database.products.updateOne(
  { name: 'Laptop HP 245 G10 B8PF8AT' },
  {
    $setOnInsert: {
      name: 'Laptop HP 245 G10 B8PF8AT',
      price: 13,
      image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/t/e/text_ng_n_2__9_107.png',
      createdAt: new Date(1753927138447),
      updatedAt: new Date(1753927138447),
      __v: 0,
    },
  },
  { upsert: true }
);

// Upsert: Laptop Gaming Acer Nitro V 15 ProPanel ANV15-41-R7AP
database.products.updateOne(
  { name: 'Laptop Gaming Acer Nitro V 15 ProPanel ANV15-41-R7AP' },
  {
    $setOnInsert: {
      name: 'Laptop Gaming Acer Nitro V 15 ProPanel ANV15-41-R7AP',
      price: 15,
      image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/t/e/text_ng_n_1__6_108.png',
      createdAt: new Date(1753927138447),
      updatedAt: new Date(1753927138447),
      __v: 0,
    },
  },
  { upsert: true }
);

// Upsert: Laptop Lenovo LOQ 15IRX9 83DV012LVN
database.products.updateOne(
  { name: 'Laptop Lenovo LOQ 15IRX9 83DV012LVN' },
  {
    $setOnInsert: {
      name: 'Laptop Lenovo LOQ 15IRX9 83DV012LVN',
      price: 14,
      image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/t/e/text_ng_n_6__2_228.png',
      createdAt: new Date(1753927138447),
      updatedAt: new Date(1753927138447),
      __v: 0,
    },
  },
  { upsert: true }
); 