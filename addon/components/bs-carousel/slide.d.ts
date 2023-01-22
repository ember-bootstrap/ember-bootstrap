import Component from '@glimmer/component';

interface BsCarouselSlideSignature {
  Element: HTMLDivElement;
  Args: {};
  Blocks: {
    default: [];
  };
}

export declare class BsCarouselSlide extends Component<BsCarouselSlideSignature> {}

export default BsCarouselSlide;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'bs-carousel/slide': typeof BsCarouselSlide;
  }
}
