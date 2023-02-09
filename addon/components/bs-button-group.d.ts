import Component from '@glimmer/component';
import BsButtonGroupButton from './bs-button-group/button';

interface BsButtonGroupSignature<T> {
  Element: HTMLDivElement;
  Args: {
    justified?: boolean;
    size?: 'lg' | 'sm' | 'xs' | null;
    type?: null | 'radio' | 'checkbox';
    value?: Array<T>;
    vertical?: boolean;
    onChange?: (e?: Event, value?: T) => void;
  };
  Blocks: {
    default: [
      {
        button: typeof BsButtonGroupButton;
      }
    ];
  };
}

export declare class BsButtonGroup<T> extends Component<BsButtonGroupSignature<T>> {}

export default BsButtonGroup;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    BsButtonGroup: typeof BsButtonGroup;
    'bs-button-group': typeof BsButtonGroup;
  }
}
