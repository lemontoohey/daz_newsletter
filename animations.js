// animations.js

const lenis = new Lenis();

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Cascading Text Animation - top to bottom (paragraphs cascade down)
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('ink-bleed-loaded');
    const container = document.getElementById('hero-paragraph-1');
    if (container) {
        const text = container.textContent.trim();
        const paragraphs = text.split(/\n\s*\n/).map(p => p.trim()).filter(Boolean);

        container.textContent = '';

        paragraphs.forEach((paraText, index) => {
            const p = document.createElement('p');
            p.textContent = paraText;
            p.className = 'cascading-paragraph';
            p.style.animationDelay = `${1.5 + index * 0.4}s`;
            container.appendChild(p);
        });
    }

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
