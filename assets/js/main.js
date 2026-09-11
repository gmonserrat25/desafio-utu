/* ═══════════════════════════════════════════════
   DESAFÍO UTU® — interacciones
   ═══════════════════════════════════════════════ */

/* ── CONFIG ─────────────────────────────────────
   Para la próxima edición, cambiá solo esto.
   `start` = arranque del evento (viernes, acreditación).
   `confirmada` = false muestra la aclaración "fecha a confirmar".
------------------------------------------------- */
const UTU = {
  edicion: 2027,
  start: new Date('2027-08-27T14:00:00-03:00'),
  dias: ['27.08', '28.08', '29.08'],
  confirmada: false,
  inscripcion: 'https://tyr.com.ar/utu2026'
};

const $  = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const MESES = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];

/* ── fechas en el DOM ──────────────────────────── */
(() => {
  const y = $('#edicionYear');
  if (y) y.textContent = UTU.edicion;

  const f = $('#fechaTexto');
  if (f) {
    const d = UTU.dias.map(s => parseInt(s, 10));
    const mes = MESES[UTU.start.getMonth()];
    f.textContent = `${d[0]}, ${d[1]} y ${d[2]} de ${mes} ${UTU.edicion}` + (UTU.confirmada ? '' : ' *');
    if (!UTU.confirmada) f.title = 'Fecha estimada — a confirmar por la organización';
  }

  $$('[data-day]').forEach(el => {
    const i = +el.dataset.day;
    if (UTU.dias[i]) el.textContent = UTU.dias[i];
  });

  const yr = $('#year');
  if (yr) yr.textContent = new Date().getFullYear();
})();

/* ── cuenta regresiva ──────────────────────────── */
(() => {
  const box = $('#countdown');
  if (!box) return;
  const out = {
    d: $('[data-cd="d"]', box), h: $('[data-cd="h"]', box),
    m: $('[data-cd="m"]', box), s: $('[data-cd="s"]', box)
  };
  const pad = n => String(n).padStart(2, '0');

  const tick = () => {
    const diff = UTU.start - Date.now();
    if (diff <= 0) {
      box.classList.add('is-past');
      box.innerHTML = '<span>Nos vemos en la sierra</span>';
      return clearInterval(timer);
    }
    const s = Math.floor(diff / 1000);
    out.d.textContent = pad(Math.floor(s / 86400));
    out.h.textContent = pad(Math.floor(s / 3600) % 24);
    out.m.textContent = pad(Math.floor(s / 60) % 60);
    out.s.textContent = pad(s % 60);
  };
  tick();
  const timer = setInterval(tick, 1000);
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

/* ── imagen que sigue al cursor en las distancias ─ */
(() => {
  const list = $('#dlist'), cur = $('#dcursor');
  if (!list || !cur || matchMedia('(hover:none)').matches) return;
  const img = $('img', cur);
  let raf = 0, x = 0, y = 0;

  const draw = () => {
    cur.style.transform = `translate(${x}px, ${y}px) translate(-50%,-50%) scale(${cur.classList.contains('is-on') ? 1 : .88})`;
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

/* ── aftermovie: carga el iframe recién al click ── */
(() => {
  const frame = $('#filmFrame');
  if (!frame) return;
  const btn = $('.film__play', frame);

  btn?.addEventListener('click', () => {
    const id = frame.dataset.yt;
    if (!id) return;
    const f = document.createElement('iframe');
    f.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`;
    f.title = 'Aftermovie Desafío UTU Ultra Trail';
    f.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    f.allowFullscreen = true;
    frame.append(f);
    btn.remove();
  });
})();

/* ── reveal al hacer scroll ────────────────────── */
(() => {
  const targets = $$([
    '.section__head', '.feature__card', '.drow', '.day', '.sierra__body', '.spon__block',
    '.cta__title', '.cta__copy', '.legend__quote', '.legend__foot', '.film__frame',
    '.stat', '.kitcard', '.past__grid li', '.via', '.stay', '.faq details'
  ].join(', '));
  if (!targets.length || matchMedia('(prefers-reduced-motion:reduce)').matches) return;

  targets.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${Math.min(i % 8, 5) * 55}ms`;
  });

  const io = new IntersectionObserver((entries) => {
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
      ? '¡Listo! Te escribimos apenas abran las inscripciones.'
      : 'Revisá el mail, no parece válido.';
    if (ok) form.reset();
  });
})();

/* ── enlaces de inscripción desde el config ────── */
$$('a[href="#inscripcion"]').length && (() => {
  const ext = $$('a[href*="tyr.com.ar"]');
  ext.forEach(a => { a.href = UTU.inscripcion; });
})();
