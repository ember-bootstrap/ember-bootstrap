import BsCarouselSlide from './bs-carousel/slide';

import Component from '@glimmer/component';

interface BsCarouselSignature {
  Element: HTMLDivElement;
  Args: {
    autoPlay?: boolean;
    index?: number;
    interval?: number;
    keyboard?: boolean;
    ltr?: boolean;
    nextControlIcon?: string;
    nextControlLabel?: string;
    pauseOnMouseEnter?: boolean;
    prevControlIcon?: string;
    prevControlLabel?: string;
    showControls?: boolean;
    showIndicators?: boolean;
    transition?: 'fade' | 'slide';
    transitionDuration?: number;
    wrap?: boolean;
    onSlideChanged?: (e?: Event, toIndex?: unknown) => void;
  };
  Blocks: {
    default: [
      {
        slide: typeof BsCarouselSlide;
        actions: BsCarouselActions;
      }
    ];
  };
}

export interface BsCarouselActions {
  toSlide: (toIndex: number) => void;
  toNextSlide: () => void;
  toPrevSlide: () => void;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
  handleKeyDown: () => void;
}

export declare class BsCarousel extends Component<BsCarouselSignature> {}

export default BsCarousel;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    BsCarousel: typeof BsCarousel;
    'bs-carousel': typeof BsCarousel;
  }
}
