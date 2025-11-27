import { createSignal } from "solid-js";

export class RandomStringinator {
  allOpts
  currentIndex = 0;
  getCurrentString;
  setCurrentString;

  constructor(opts: string[]) {
    this.allOpts = opts;
    [ this.getCurrentString, this.setCurrentString ] = createSignal<string>(``);
    this.refresh();
  }

  refresh() {
    let randomIndex = Math.floor(Math.random() * this.allOpts.length);

    // ensure we don't pick the same string again
    if (randomIndex === this.currentIndex) {
      // flip a coin
      if (Math.random() >= 0.5) {
        randomIndex += 1;
        if (randomIndex === this.allOpts.length) {
          // wrap to start
          randomIndex = 0;
        }
      } else {
        randomIndex -= 1;
        if (randomIndex < 0) {
          // wrap to end
          randomIndex = (this.allOpts.length - 1);
        }
      }
    }

    const output = this.allOpts[randomIndex];

    this.currentIndex = randomIndex;
    this.setCurrentString(output);
    return output;
  }
}