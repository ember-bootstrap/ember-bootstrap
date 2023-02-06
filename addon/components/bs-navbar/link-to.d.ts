import { BsLinkToSignature } from '../bs-link-to';

import Component from '@glimmer/component';

interface BsNavbarLinkToSignature {
  Args: {
    collapseNavbar?: boolean;
    onCollapse?: (e?: Event) => void;
  };
}

export declare class BsNavbarLinkTo extends Component<BsLinkToSignature & BsNavbarLinkToSignature> {}

export default BsNavbarLinkTo;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'BsNavbar::LinkTo': typeof BsNavbarLinkTo;
    'bs-navbar/link-to': typeof BsNavbarLinkTo;
  }
}
