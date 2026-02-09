// animations.js

const lenis = new Lenis();

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Cascading Text Animation - top to bottom (paragraphs cascade down)
document.addEventListener('DOMContentLoaded', () => {
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
});
