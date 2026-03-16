// animations.js

const lenis = new Lenis();

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Low-power devices: disable atmospheric layers to prevent GPU stalling
document.addEventListener('DOMContentLoaded', () => {
  const atmosEl = document.querySelector('.atmospheric-layers');
  if (atmosEl && navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
    atmosEl.style.display = 'none';
  }
});

// Pause atmospheric layers when tab is hidden (Page Visibility API — saves GPU)
document.addEventListener('DOMContentLoaded', () => {
  const atmosEl = document.querySelector('.atmospheric-layers');
  if (!atmosEl) return;
  const layers = atmosEl.querySelectorAll('.atmos-layer');
  const setPlayState = (playing) => {
    layers.forEach((layer) => {
      layer.style.animationPlayState = playing ? 'running' : 'paused';
    });
  };
  document.addEventListener('visibilitychange', () => {
    setPlayState(document.visibilityState === 'visible');
  });
});

// Debug overlay: FPS + mix-blend elements (toggle with ?debug=1 or localStorage)
document.addEventListener('DOMContentLoaded', () => {
  const showDebug = () => window.location.search.includes('debug=1') || localStorage.getItem('anthology-debug') === '1';
  if (!showDebug()) return;
  const overlay = document.createElement('div');
  overlay.id = 'anthology-debug-overlay';
  overlay.style.cssText = 'position:fixed;bottom:10px;left:10px;background:rgba(0,0,0,0.85);color:#0f0;font:11px monospace;padding:8px;z-index:99999;border:1px solid #0f0;max-height:150px;overflow:auto;';
  let lastTime = performance.now();
  let frames = 0;
  let fps = 0;
  function tick() {
    frames++;
    const now = performance.now();
    if (now - lastTime >= 500) {
      fps = Math.round(frames * 1000 / (now - lastTime));
      frames = 0;
      lastTime = now;
      const blendEls = document.querySelectorAll('[style*="mix-blend-mode"], .btn-watch-trailer, .watch-trailer-btn, .btn-primary, .btn-pricing-primary, .btn-download');
      overlay.innerHTML = `<b>FPS: ${fps}</b><br>mix-blend elements: ${blendEls.length}`;
    }
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
  document.body.appendChild(overlay);
});

document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('ink-bleed-loaded');

    // Cinematic Aperture Reveal — .film-image enters viewport
    const wrappers = document.querySelectorAll('.film-image-wrapper');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });
    wrappers.forEach((el) => observer.observe(el));

    // Quiet Authority — .pedagogy-oversight quote reveal on scroll
    const pedagogySection = document.querySelector('.pedagogy-oversight');
    if (pedagogySection) {
        const pedagogyObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('pedagogy-revealed');
                }
            });
        }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });
        pedagogyObserver.observe(pedagogySection);
    }

    // Architectural header — frosted glass after 50px scroll
    const header = document.querySelector('.header');
    if (header) {
        const onScroll = () => {
            header.classList.toggle('header-scrolled', window.scrollY > 50);
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
    }

    // Magnetic buttons — .btn-primary, .btn-pricing-primary
    const magneticSelector = '.btn-primary, .btn-pricing-primary';
    const magneticButtons = document.querySelectorAll(magneticSelector);
    const MAGNET_RADIUS = 80;
    const MAGNET_MAX = 8;

    function setMagneticTransform(btn, x, y) {
        const rect = btn.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = x - cx;
        const dy = y - cy;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance >= MAGNET_RADIUS) {
            btn.style.transform = '';
            return;
        }
        const strength = ((MAGNET_RADIUS - distance) / MAGNET_RADIUS) * MAGNET_MAX;
        const ux = distance ? dx / distance : 0;
        const uy = distance ? dy / distance : 0;
        const tx = ux * strength;
        const ty = uy * strength;
        btn.style.transform = `translate(${tx}px, ${ty}px)`;
    }

    magneticButtons.forEach((btn) => {
        btn.addEventListener('mouseenter', () => {
            document.addEventListener('mousemove', btn._magneticMove);
        });
        btn._magneticMove = (e) => {
            setMagneticTransform(btn, e.clientX, e.clientY);
        };
        btn.addEventListener('mouseleave', () => {
            document.removeEventListener('mousemove', btn._magneticMove);
            btn.style.transform = '';
        });
    });
});
