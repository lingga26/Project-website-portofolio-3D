import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let activeScrollTween = null;

/**
 * Universal Smooth Scroll Helper
 * Uses GSAP's high-precision tween engine synchronized with Lenis and ScrollTrigger
 */
export function smoothScrollTo(target, options = {}) {
  const lenis = window.__lenis;
  const duration = options.duration ?? 2.2;
  const ease = options.ease ?? "power2.inOut";

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
        const currentY = window.pageYOffset || document.documentElement.scrollTop || 0;
        targetPos = el.getBoundingClientRect().top + currentY;
      }
    }
  } else if (target instanceof HTMLElement) {
    const currentY = window.pageYOffset || document.documentElement.scrollTop || 0;
    targetPos = target.getBoundingClientRect().top + currentY;
  }

  if (targetPos === undefined || isNaN(targetPos)) {
    console.warn('[ScrollHelper] Invalid target:', target);
    return;
  }

  // Cancel any existing scroll tween
  if (activeScrollTween) {
    activeScrollTween.kill();
  }

  const startY = window.pageYOffset || document.documentElement.scrollTop || 0;
  const proxy = { y: startY };

  activeScrollTween = gsap.to(proxy, {
    y: targetPos,
    duration: duration,
    ease: ease,
    onUpdate: () => {
      if (lenis && typeof lenis.scrollTo === 'function') {
        lenis.scrollTo(proxy.y, { immediate: true, force: true });
      } else {
        window.scrollTo(0, proxy.y);
      }
    },
    onComplete: () => {
      activeScrollTween = null;
      if (options.onComplete) options.onComplete();
      ScrollTrigger.update();
    }
  });
}
