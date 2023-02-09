import Component from '@glimmer/component';

export interface BsCollapseSignature {
  Element: HTMLDivElement;
  Args: {
    collapsed?: boolean;
    collapseDimension?: 'height' | 'width';
    collapsedSize?: number;
    expandedSize?: number;
    transitionDuration?: number;

    onHidden?: (e?: Event) => void;
    onHide?: (e?: Event) => void;
    onShow?: (e?: Event) => void;
    onShown?: (e?: Event) => void;
  };
  Blocks: {
    default: [];
  };
}

// eslint-disable-next-line ember/no-empty-glimmer-component-classes
export declare class BsCollapse extends Component<BsCollapseSignature> {}

export default BsCollapse;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    BsCollapse: typeof BsCollapse;
    'bs-collapse': typeof BsCollapse;
  }
}
