import View from './View.js';

class rotatePictureView extends View {
  #parentElement = document.querySelector('.description__img');

  constructor() {
    super();
    this.#addRotating();
  }

  #addRotating() {
    const picBox = document.querySelector('.description');
    const pic = this.#parentElement;
    const height = document.querySelector('.horizontal-scrollbar').offsetHeight;
    const height2 = document.querySelector('.products').offsetHeight;
    const height3 = document.querySelector('.hero').offsetHeight;
    const height4 = document.querySelector('.header').offsetHeight;

    const heightAll = height + height2 + height3 + height4;

    const scrolling = () => {
      const scrolled = window.scrollY - heightAll;
      //half of box height minus image height - absolute 15rem position(*0.075 because of 15/200)
      const reverseHeight =
        picBox.offsetHeight / 2 -
        pic.offsetHeight / 2 -
        picBox.offsetHeight * 0.075;

      if (scrolled <= 0 || scrolled > reverseHeight * 2) return;

      const val = scrolled * 0.5;
      const revVal = (reverseHeight * 2 - scrolled) * 0.5;

      if (window.innerWidth > 1600) {
        pic.style.transform =
          scrolled < reverseHeight
            ? `translate(${0.8 * val}%, ${0.5 * val}%) rotate(${0.5 * val}deg)`
            : `translate(${0.8 * revVal}%, ${0.5 * val}%) rotate(${
                0.5 * revVal
              }deg)`;
      } else {
        pic.style.transform =
          scrolled < reverseHeight
            ? `translate(${0.7 * val}%, ${0.5 * val}%) rotate(${0.5 * val}deg)`
            : `translate(${0.7 * revVal}%, ${0.5 * val}%) rotate(${
                0.5 * revVal
              }deg)`;
      }
    };

    const rotatingPic = entries => {
      const [entry] = entries;

      if (entry.isIntersecting) {
        window.addEventListener('scroll', scrolling);
      } else {
        window.removeEventListener('scroll', scrolling);
      }
    };

    const picObserver = new IntersectionObserver(rotatingPic, {
      root: null,
      threshold: 0,
      rootMargin: '0%',
    });

    picObserver.observe(picBox);
  }
}

export default new rotatePictureView();
