import { BsCollapseSignature } from '../bs-collapse';

import Component from '@glimmer/component';

interface BsNavbarContentSignature {
  Element: HTMLDivElement;
}

export declare class BsNavbarContent extends Component<BsCollapseSignature & BsNavbarContentSignature> {}

export default BsNavbarContent;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'bs-navbar/content': typeof BsNavbarContent;
  }
}
