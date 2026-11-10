import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let activeScrollTween = null;

/**
 * Universal Smooth Scroll Helper
 * Uses GSAP's high-precision tween engine synchronized with Lenis and ScrollTrigger.
 * Includes user-wheel interrupt so user can resume manual scroll at any moment.
 */
export function smoothScrollTo(target, options = {}) {
  const lenis = window.__lenis;
  const duration = options.duration ?? 2.2;
  const ease = options.ease ?? "power1.inOut";

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
    activeScrollTween = null;
  }

  const startY = window.pageYOffset || document.documentElement.scrollTop || 0;
  const proxy = { y: startY };

  // Allow user to break out of auto-scroll immediately on manual input
  const interruptHandler = () => {
    if (activeScrollTween) {
      activeScrollTween.kill();
      activeScrollTween = null;
    }
    window.removeEventListener('wheel', interruptHandler);
    window.removeEventListener('touchstart', interruptHandler);
  };

  window.addEventListener('wheel', interruptHandler, { passive: true, once: true });
  window.addEventListener('touchstart', interruptHandler, { passive: true, once: true });

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
      window.removeEventListener('wheel', interruptHandler);
      window.removeEventListener('touchstart', interruptHandler);
      if (options.onComplete) options.onComplete();
      ScrollTrigger.update();
    }
  });
}
