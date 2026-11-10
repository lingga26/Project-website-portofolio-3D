/**
 * Universal Smooth Scroll Helper
 * Integrates directly with Lenis smooth inertia scroll engine and GSAP ScrollTrigger
 */

export function smoothScrollTo(target, options = {}) {
  const lenis = window.__lenis;

  let targetPos;
  if (typeof target === 'number') {
    targetPos = target;
  } else if (typeof target === 'string') {
    const cleanId = target.replace(/^#/, '');
    if (cleanId === 'hero-section' || cleanId === 'top') {
      targetPos = 0;
    } else {
      const el = document.getElementById(cleanId) || document.querySelector(target);
      if (el) {
        const rect = el.getBoundingClientRect();
        targetPos = rect.top + window.scrollY;
      }
    }
  } else if (target instanceof HTMLElement) {
    const rect = target.getBoundingClientRect();
    targetPos = rect.top + window.scrollY;
  }

  if (targetPos !== undefined) {
    if (lenis) {
      lenis.scrollTo(targetPos, {
        duration: options.duration ?? 1.8,
        offset: options.offset ?? 0,
        easing: options.easing ?? ((t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))),
        immediate: false,
        lock: false,
        force: true,
        ...options,
      });
      return;
    }

    // Native fallback if Lenis is not active
    window.scrollTo({
      top: targetPos,
      behavior: 'smooth'
    });
  }
}
