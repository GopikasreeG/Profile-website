(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Mobile hamburger menu
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');
  toggle.addEventListener('click', function () {
    var open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  links.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Typewriter role rotator
  var roles = ['Software Graduate Trainee', 'AI & Data Science Graduate'];
  var typed = document.getElementById('typed');
  var ri = 0, ci = 0, deleting = false;
  function type() {
    var word = roles[ri];
    ci += deleting ? -1 : 1;
    typed.textContent = word.slice(0, ci);
    var delay = deleting ? 40 : 85;
    if (!deleting && ci === word.length) { deleting = true; delay = 1500; }
    else if (deleting && ci === 0) { deleting = false; ri = (ri + 1) % roles.length; delay = 400; }
    setTimeout(type, delay);
  }
  if (reduce) { typed.textContent = roles[0]; } else { type(); }

  // Falling petals in the hero, rising hearts in the family banner
  function sprinkle(parent, symbol, count, cls) {
    if (reduce) { return; }
    for (var i = 0; i < count; i++) {
      var s = document.createElement('span');
      s.className = cls;
      s.textContent = symbol[i % symbol.length];
      s.setAttribute('aria-hidden', 'true');
      s.style.left = Math.random() * 100 + '%';
      s.style.fontSize = 0.8 + Math.random() * 1.1 + 'rem';
      s.style.animationDuration = 8 + Math.random() * 10 + 's';
      s.style.animationDelay = -Math.random() * 12 + 's';
      parent.appendChild(s);
    }
  }
  sprinkle(document.querySelector('.frame'), ['\uD83C\uDF38', '\uD83C\uDF3F', '\uD83C\uDF3C'], 12, 'petal');
  sprinkle(document.getElementById('familyBanner'), ['\u2764\uFE0F', '\uD83D\uDC9B', '\uD83E\uDD0D'], 10, 'heart');

  // Scroll-triggered reveal with stagger, plus count-up numbers
  function countUp(el) {
    var target = Number(el.dataset.count);
    var n = 0;
    var timer = setInterval(function () {
      n += 1;
      el.textContent = n;
      if (n >= target) { clearInterval(timer); }
    }, 350);
  }
  var items = document.querySelectorAll('.reveal');
  items.forEach(function (el) {
    var idx = Array.prototype.indexOf.call(el.parentNode.children, el);
    el.style.transitionDelay = (idx % 4) * 0.1 + 's';
  });
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('visible');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });

    var stats = document.querySelector('.stats');
    var so = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) {
        stats.querySelectorAll('[data-count]').forEach(countUp);
        so.disconnect();
      }
    }, { threshold: 0.5 });
    so.observe(stats);

    // Highlight the nav link of the section in view
    var navLinks = document.querySelectorAll('.nav-links a:not(.btn)');
    var no = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          navLinks.forEach(function (a) {
            a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id);
          });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    document.querySelectorAll('main section').forEach(function (s) { no.observe(s); });
  } else {
    items.forEach(function (el) { el.classList.add('visible'); });
    document.querySelectorAll('[data-count]').forEach(function (el) { el.textContent = el.dataset.count; });
  }

  // 3D tilt on cards that follow the mouse
  if (!reduce && window.matchMedia('(hover: hover)').matches) {
    document.querySelectorAll('.tilt').forEach(function (el) {
      el.addEventListener('mousemove', function (e) {
        var r = el.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5;
        var y = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = 'perspective(800px) rotateX(' + (-y * 8) + 'deg) rotateY(' + (x * 8) + 'deg) translateY(-6px)';
      });
      el.addEventListener('mouseleave', function () { el.style.transform = ''; });
    });
  }

  // Show more / less on timeline
  document.querySelectorAll('.toggle-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var more = btn.previousElementSibling;
      var open = more.classList.toggle('open');
      btn.textContent = open ? 'Show less' : 'Show more';
    });
  });

  // Family flip cards (tap support for touch devices)
  document.querySelectorAll('.flip').forEach(function (card) {
    card.addEventListener('click', function () { card.classList.toggle('flipped'); });
  });

  // Hobby lightbox
  var box = document.getElementById('lightbox');
  var lastFocus = null;
  function openBox(card) {
    lastFocus = card;
    var img = document.getElementById('lbImg');
    img.src = card.dataset.img;
    img.alt = card.dataset.alt;
    document.getElementById('lbTitle').textContent = card.dataset.title;
    document.getElementById('lbText').textContent = card.dataset.text;
    box.classList.add('open');
    document.getElementById('lbClose').focus();
  }
  function closeBox() {
    if (!box.classList.contains('open')) { return; }
    box.classList.remove('open');
    if (lastFocus) { lastFocus.focus(); }
  }
  document.querySelectorAll('.hobby').forEach(function (card) {
    card.addEventListener('click', function () { openBox(card); });
  });
  document.getElementById('lbClose').addEventListener('click', closeBox);
  box.addEventListener('click', function (e) { if (e.target === box) { closeBox(); } });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { closeBox(); } });

  // Footer year, scroll progress bar, back-to-top
  document.getElementById('year').textContent = new Date().getFullYear();
  var bar = document.getElementById('progress');
  var topBtn = document.getElementById('toTop');
  window.addEventListener('scroll', function () {
    var max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + '%';
    topBtn.classList.toggle('show', window.scrollY > 500);
  });
  topBtn.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
})();
