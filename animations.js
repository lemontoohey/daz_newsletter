// animations.js

const lenis = new Lenis();

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Cascading Text Animation
document.addEventListener('DOMContentLoaded', () => {
    const paragraph = document.getElementById('hero-paragraph-1');
    if (paragraph) {
        const text = paragraph.textContent.trim();
        const words = text.split(' ');

        // Clear the original paragraph
        paragraph.textContent = '';

        words.forEach((word, index) => {
            const wordSpan = document.createElement('span');
            wordSpan.textContent = word;
            wordSpan.className = 'cascading-word';
            // The animation starts 1.5s in, and each word is delayed by 0.1s
            wordSpan.style.animationDelay = `${1.5 + index * 0.1}s`;
            paragraph.appendChild(wordSpan);
        });
    }
});
