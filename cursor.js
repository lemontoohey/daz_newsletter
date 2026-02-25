/**
 * Intelligent Reticle — custom cursor for Midnight Archive
 * Default: 8px circle (Vintage Vermilion, mix-blend-mode: difference)
 * Trailer hover: ring "PLAY" | Pricing card hover: ring "UNLOCK"
 * Disabled on touch/mobile.
 */
(function () {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    var isTouch = false;
    try {
        isTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
    } catch (e) {}
    if (isTouch) return;

    var style = document.createElement('style');
    style.textContent = [
        '.reticle-cursor { pointer-events: none; position: fixed; top: 0; left: 0; z-index: 99999; mix-blend-mode: difference; transition: transform 0.15s ease-out, opacity 0.2s ease; }',
        '.reticle-dot { width: 8px; height: 8px; border-radius: 50%; background: #D64045; position: absolute; transform: translate(-50%, -50%); left: 0; top: 0; }',
        '.reticle-ring { width: 56px; height: 56px; border-radius: 50%; border: 2px solid #D64045; position: absolute; left: 0; top: 0; transform: translate(-50%, -50%) scale(0.8); opacity: 0; transition: transform 0.25s ease, opacity 0.2s ease; display: flex; align-items: center; justify-content: center; }',
        '.reticle-ring.reticle-active { transform: translate(-50%, -50%) scale(1); opacity: 1; }',
        '.reticle-ring span { font-family: "Montserrat", sans-serif; font-weight: 700; font-size: 8px; letter-spacing: 0.2em; color: #D64045; text-transform: uppercase; }',
        '.reticle-cursor.reticle-hide .reticle-dot { opacity: 0; }',
        '.reticle-cursor.reticle-hide .reticle-ring { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }'
    ].join('\n');
    document.head.appendChild(style);

    var cursor = document.createElement('div');
    cursor.className = 'reticle-cursor';
    cursor.setAttribute('aria-hidden', 'true');
    cursor.innerHTML = '<div class="reticle-dot"></div><div class="reticle-ring" id="reticle-ring"><span></span></div>';
    document.body.appendChild(cursor);

    var dot = cursor.querySelector('.reticle-dot');
    var ring = cursor.querySelector('.reticle-ring');
    var ringLabel = ring.querySelector('span');

    var x = 0, y = 0;

    function updatePosition(e) {
        x = e.clientX;
        y = e.clientY;
        cursor.style.left = x + 'px';
        cursor.style.top = y + 'px';
    }

    function setState(label) {
        if (label) {
            ringLabel.textContent = label;
            ring.classList.add('reticle-active');
            dot.style.opacity = '0';
        } else {
            ring.classList.remove('reticle-active');
            ringLabel.textContent = '';
            dot.style.opacity = '1';
        }
    }

    function handleOver(e) {
        var el = e.target.closest('.watch-trailer-btn');
        if (el) {
            currentTarget = 'play';
            setState('PLAY');
            return;
        }
        el = e.target.closest('.pricing-card');
        if (el) {
            currentTarget = 'unlock';
            setState('UNLOCK');
            return;
        }
        if (currentTarget) {
            currentTarget = null;
            setState(null);
        }
    }

    function handleLeave() {
        currentTarget = null;
        setState(null);
    }

    document.addEventListener('mousemove', updatePosition, { passive: true });
    document.addEventListener('mouseover', handleOver, { passive: true });
    document.addEventListener('mouseout', function (e) {
        if (!e.relatedTarget || !e.target.contains(e.relatedTarget)) handleLeave();
    });

    document.body.style.cursor = 'none';
    document.body.classList.add('reticle-cursor-active');
})();
