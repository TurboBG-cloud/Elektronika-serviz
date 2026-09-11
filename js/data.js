// Data layer for ЕЛЕКТРОНИКА СЕРВИЗ — backed by a real Supabase table so products
// sync across every device instead of staying local to one browser.

const SUPABASE_URL = 'https://vbrykymzztspdbkwzkyo.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZicnlreW16enRzcGRia3d6a3lvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODkxMTkyOTAsImV4cCI6MjEwNDY5NTI5MH0.90f0sPEKngkG8_D7yQkPKAUOhcF_0AsKxxfobbiM2X4';
const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function rowToProduct(row) {
  return {
    id: row.id,
    brand: row.brand,
    model: row.model,
    condition: row.condition,
    price: Number(row.price),
    oldPrice: row.old_price != null ? Number(row.old_price) : null,
    status: row.status,
    color: row.color,
    storage: row.storage,
    description: row.description,
    specs: row.specs || [],
    images: row.images || [],
    createdAt: Number(row.created_at)
  };
}

function productToRow(p) {
  return {
    id: p.id,
    brand: p.brand,
    model: p.model,
    condition: p.condition,
    price: p.price,
    old_price: p.oldPrice,
    status: p.status,
    color: p.color,
    storage: p.storage,
    description: p.description,
    specs: p.specs || [],
    images: p.images || [],
    created_at: p.createdAt
  };
}

async function getProducts() {
  const { data, error } = await sb.from('products').select('*').order('created_at', { ascending: false });
  if (error) {
    console.error('getProducts failed', error);
    return [];
  }
  return data.map(rowToProduct);
}

async function getProduct(id) {
  const { data, error } = await sb.from('products').select('*').eq('id', id).maybeSingle();
  if (error || !data) return null;
  return rowToProduct(data);
}

async function upsertProduct(product) {
  const { error } = await sb.from('products').upsert(productToRow(product));
  if (error) console.error('upsertProduct failed', error);
}

async function deleteProduct(id) {
  const { error } = await sb.from('products').delete().eq('id', id);
  if (error) console.error('deleteProduct failed', error);
}

function formatPrice(n) {
  return new Intl.NumberFormat('bg-BG', { maximumFractionDigits: 0 }).format(n) + ' €';
}

function uid() {
  return 'p' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

async function isAdminAuthed() {
  const { data } = await sb.auth.getSession();
  return !!data.session;
}
async function adminLogin(email, password) {
  const { error } = await sb.auth.signInWithPassword({ email, password });
  return error ? error.message : null;
}
async function adminLogout() {
  await sb.auth.signOut();
}
