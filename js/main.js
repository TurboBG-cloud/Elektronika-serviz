document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', nav.classList.contains('open'));
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
  }

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => io.observe(el));
  }

  const tiles = document.querySelectorAll('.device-tile');
  const root = document.documentElement;

  function updateOnScroll() {
    const y = window.scrollY;
    tiles.forEach((tile, i) => {
      const speed = 0.06 + (i % 4) * 0.03;
      tile.style.transform = `translateY(${y * speed * -0.3}px)`;
    });
    const docHeight = Math.max(document.body.scrollHeight - window.innerHeight, 1);
    const progress = Math.min(y / docHeight, 1);
    // Sweep orange -> red -> magenta -> purple -> blue, skipping the muddy yellow/green band.
    const hue = (18 - progress * 160 + 360) % 360;
    root.style.setProperty('--scroll-hue', hue);
    // Tint only the light background surfaces (text/icon colors are separate vars, untouched).
    root.style.setProperty('--bg', `hsl(${hue} 65% 93%)`);
    root.style.setProperty('--bg-tint', `hsl(${hue} 55% 89%)`);
    root.style.setProperty('--paper', `hsl(${hue} 45% 98%)`);
  }

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      updateOnScroll();
      ticking = false;
    });
  }, { passive: true });

  updateOnScroll();
});
