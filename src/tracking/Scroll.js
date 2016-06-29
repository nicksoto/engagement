class Scroll {

  constructor() {
    this.created_at = Date.now();
    this.seriesXStart = window.performance.now();
    this.scrollSeriesX = [];
    this.scrollSeriesY = [];

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
    this.update();
  }

  position() {
    return this.position;
  }

  update() {
    this.position = this.scrollCalc();
    this.scrollSeriesY.push(this.position);
    this.scrollSeriesX.push(window.performance.now());
  }

}

export default Scroll;
