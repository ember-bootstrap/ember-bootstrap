import Component from '@glimmer/component';

interface BsModalHeaderTitleSignature {
  Element: HTMLHeadingElement;
  Args: {};
  Blocks: {
    default: [];
  };
}

export declare class BsModalHeaderTitle extends Component<BsModalHeaderTitleSignature> {}

export default BsModalHeaderTitle;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'bs-modal/header/title': typeof BsModalHeaderTitle;
  }
}
