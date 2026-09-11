function tileClassFor(id) {
  let sum = 0;
  for (let i = 0; i < id.length; i++) sum += id.charCodeAt(i);
  return ['t1', 't2', 't3', 't4'][sum % 4];
}

function productCardHTML(p) {
  const tile = tileClassFor(p.id);
  const img = p.images && p.images[0]
    ? `<img src="${p.images[0]}" alt="${p.brand} ${p.model}">`
    : `<span class="ph-icon">${ICONS.smartphone}</span>`;
  let badge = p.condition === 'new'
    ? `<span class="badge badge-new">Ново</span>`
    : `<span class="badge badge-used">Употребявано</span>`;
  if (p.status === 'sold') badge = `<span class="badge badge-sold">Продадено</span>`;
  const oldPrice = p.oldPrice ? `<small style="text-decoration:line-through;display:block;">${formatPrice(p.oldPrice)}</small>` : '';
  return `
  <a class="product-card reveal in" href="product.html?id=${p.id}">
    <div class="product-media${p.images && p.images[0] ? '' : ' ' + tile}">
      ${img}
      ${badge}
    </div>
    <div class="product-body">
      <span class="product-brand">${p.brand}</span>
      <h3 class="product-name">${p.model}</h3>
      <span class="product-spec">${p.storage || ''}${p.color ? ' · ' + p.color : ''}</span>
      <div class="product-foot">
        <div>
          ${oldPrice}
          <span class="product-price">${p.status === 'sold' ? 'Продадено' : formatPrice(p.price)}</span>
        </div>
        <span class="product-link">Детайли →</span>
      </div>
    </div>
  </a>`;
}
