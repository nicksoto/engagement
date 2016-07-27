class Scroll {

  constructor(element) {
    if (typeof window.pageYOffset !== 'undefined') {
      this.scrollCalc = function scrollCal() {
        return [window.pageXOffset, window.pageYOffset];
      };
    } else if (typeof document.documentElement.scrollTop !== 'undefined' &&
    document.documentElement.scrollTop > 0) {
      this.scrollCalc = function scrollCalc() {
        return [document.documentElement.scrollLeft, document.documentElement.scrollTop];
      };
    } else if (typeof document.body.scrollTop !== 'undefined') {
      this.scrollCalc = function scrollCalc() {
        return [document.body.scrollLeft, document.body.scrollTop];
      };
    } else {
      throw new Error('Not Supported');
    }

    this.setContentElements().then(() => {
      this.update();
    }).catch((error) =>
      throw new Error(error);
    });
  }

  setContentElements() {
    return new Promise(function(resolve, reject) {
      this.elements = document.getElementsByClassName(element);
      if (this.elements.length === 0) {
        reject('No Elements Found');
      } else {
        this.upperContentBound = this.elements[0];
        this.lowerContentBound = this.elements[this.elements.length - 1];
        resolve();
      }
    });
  }

  update() {
    [this.xPos, this.yPos] = this.scrollCalc();
    this.elementInViewport = this.elementsInViewport();
  }

  elementsInViewport() {
    const viewportChecks = Array.from(this.elements, (el) => {
      const rect = el.getBoundingClientRect();
      return (
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <= (window.innerHeight || document.documentElement
              .clientHeight) &&
          rect.right <= (window.innerWidth || document.documentElement
              .clientWidth)
      );
    });
    return viewportChecks.some(x => x === true);
  }
}

module.exports = Scroll;
