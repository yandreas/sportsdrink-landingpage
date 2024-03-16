import View from './View.js';

class HorizontalBannerView extends View {
  #parentElement = document.querySelectorAll('.horizontal-scrollbar');
  constructor() {
    super();
    this.#addScrolling();
  }

  #addScrolling() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    this.#parentElement.forEach(scroller => {
      scroller.setAttribute('data-animated', true);

      const scrollerInner = scroller.querySelector(
        '.horizontal-scrollbar-inner'
      );
      const scrollerContent = Array.from(scrollerInner.children);

      scrollerContent.forEach(item => {
        const duplicatedItem = item.cloneNode(true);
        duplicatedItem.setAttribute('aria-hidden', true);
        scrollerInner.appendChild(duplicatedItem);
      });
    });
  }
}

export default new HorizontalBannerView();
