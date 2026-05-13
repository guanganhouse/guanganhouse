(function () {
  var navToggle = document.querySelector('[data-nav-toggle]');
  var nav = document.querySelector('[data-nav]');
  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(open));
    });
  }

  var progress = document.querySelector('[data-progress]');
  var parallax = document.querySelector('[data-parallax]');

  function handleScroll() {
    var doc = document.documentElement;
    var top = doc.scrollTop || document.body.scrollTop;
    var max = doc.scrollHeight - doc.clientHeight;
    if (progress && max > 0) {
      progress.style.width = (top / max) * 100 + '%';
    }
    if (parallax) {
      parallax.style.transform = 'translateY(' + top * 0.08 + 'px) scale(1.06)';
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  var counters = document.querySelectorAll('[data-count]');
  function animateCounter(el) {
    var end = Number(el.getAttribute('data-count'));
    var suffix = el.getAttribute('data-suffix') || '';
    var duration = 1400;
    var start = null;
    function tick(t) {
      if (!start) start = t;
      var p = Math.min((t - start) / duration, 1);
      el.textContent = Math.floor(end * p).toLocaleString('en-US') + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  if (counters.length && 'IntersectionObserver' in window) {
    var ci = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          ci.unobserve(entry.target);
        }
      });
    }, { threshold: 0.7 });
    counters.forEach(function (el) { ci.observe(el); });
  } else {
    counters.forEach(function (el) { animateCounter(el); });
  }
})();
