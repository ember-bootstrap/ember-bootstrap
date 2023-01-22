import Component from '@glimmer/component';

export interface BsLinkToSignature {
  Element: HTMLDivElement;
  Args: {
    route?: string;
    model?: unknown;
    models?: unknown[];
    query?: string;
    disabled?: boolean;
  };
  Blocks: {
    default: [];
  };
}

export declare class BsLinkTo extends Component<BsLinkToSignature> {}

export default BsLinkTo;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    BsLinkTo: typeof BsLinkTo;
    'bs-link-to': typeof BsLinkTo;
  }
}
