/* ═══════════════════════════════════════════════
   DESAFÍO UTU® — interacciones
   ═══════════════════════════════════════════════ */

/* ── CONFIG ─────────────────────────────────────
   Para la próxima edición, cambiá sólo esto: alimenta
   los tres días del cronograma y el link de inscripción.
   Las fechas 2027 son estimadas — la edición 2026 se corrió
   el 28, 29 y 30 de agosto y la próxima no está publicada.
------------------------------------------------- */
const UTU = {
  dias: ['27.08', '28.08', '29.08'],
  inscripcion: 'https://tyr.com.ar/utu2026'
};

const $  = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];

/* ── fechas del cronograma ─────────────────────── */
(() => {
  $$('[data-day]').forEach(el => {
    const d = UTU.dias[+el.dataset.day];
    if (d) el.textContent = d;
  });
  const yr = $('#year');
  if (yr) yr.textContent = new Date().getFullYear();
})();

/* ── nav móvil ─────────────────────────────────── */
(() => {
  const nav = $('#nav'), burger = $('#burger');
  if (!nav || !burger) return;

  const setH = () => nav.style.setProperty('--navH', nav.offsetHeight + 'px');
  setH();
  addEventListener('resize', setH, { passive: true });

  const close = () => {
    nav.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('no-scroll');
  };

  burger.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    document.body.classList.toggle('no-scroll', open);
  });

  $$('#navLinks a').forEach(a => a.addEventListener('click', close));
  addEventListener('keydown', e => e.key === 'Escape' && close());
})();

/* ── la foto de cada prueba sigue al cursor ────── */
(() => {
  const list = $('#dlist'), cur = $('#dcursor');
  if (!list || !cur || matchMedia('(hover:none)').matches) return;
  const img = $('img', cur);
  let raf = 0, x = 0, y = 0;

  const draw = () => {
    const s = cur.classList.contains('is-on') ? 1 : 0.88;
    cur.style.transform = `translate(${x}px, ${y}px) translate(-50%,-50%) scale(${s})`;
    raf = 0;
  };

  list.addEventListener('pointermove', e => {
    x = e.clientX; y = e.clientY;
    if (!raf) raf = requestAnimationFrame(draw);
  }, { passive: true });

  $$('.drow', list).forEach(row => {
    row.addEventListener('pointerenter', () => {
      const src = row.dataset.img;
      if (src && img.getAttribute('src') !== src) img.src = src;
      cur.classList.add('is-on');
    });
  });

  list.addEventListener('pointerleave', () => cur.classList.remove('is-on'));
})();

/* ── el video carga recién al hacer click ──────── */
(() => {
  const frame = $('#filmFrame');
  if (!frame) return;
  const btn = $('.film__play', frame);

  btn?.addEventListener('click', () => {
    const id = frame.dataset.yt;
    if (!id) return;
    const f = document.createElement('iframe');
    f.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`;
    f.title = 'Video del Desafío UTU Ultra Trail';
    f.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    f.allowFullscreen = true;
    frame.append(f);
    btn.remove();
  });
})();

/* ── aparecer al hacer scroll ──────────────────── */
(() => {
  const targets = $$([
    '.section__head', '.next__row', '.drow', '.day', '.via', '.faq details',
    '.kitcats', '.kitcard', '.rules > div', '.spon__block',
    '.creed__text', '.creed__sign', '.film__frame', '.end__title', '.end__copy'
  ].join(', '));
  if (!targets.length || matchMedia('(prefers-reduced-motion:reduce)').matches) return;

  targets.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${Math.min(i % 8, 5) * 55}ms`;
  });

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('is-in');
      io.unobserve(e.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });

  targets.forEach(el => io.observe(el));
})();

/* ── formulario (demo, sin backend) ────────────── */
(() => {
  const form = $('#newsletter');
  if (!form) return;
  const msg = $('#formMsg'), input = $('#mail', form);

  form.addEventListener('submit', e => {
    e.preventDefault();
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(input.value.trim());
    msg.classList.toggle('ok', ok);
    msg.textContent = ok
      ? 'Listo. Te escribimos apenas abran las inscripciones.'
      : 'Revisá el mail, no parece válido.';
    if (ok) form.reset();
  });
})();

/* ── el link de inscripción sale del config ────── */
$$('a[href*="tyr.com.ar"]').forEach(a => { a.href = UTU.inscripcion; });
