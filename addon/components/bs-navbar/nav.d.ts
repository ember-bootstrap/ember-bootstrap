import { BsNavSignature } from '../bs-nav';

import Component from '@glimmer/component';

type BsNavbarNavSignature = BsNavSignature;

export declare class BsNavbarNav extends Component<BsNavbarNavSignature> {}

export default BsNavbarNav;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'BsNavbar::Nav': typeof BsNavbarNav;
    'bs-navbar/nav': typeof BsNavbarNav;
  }
}
