import BsAccordionItem from './bs-accordion/item';

import Component from '@glimmer/component';

export interface BsAccordionActions<T> {
  doChange: (newValue: T) => void;
}

interface BsAccordionSignature<T> {
  Element: HTMLDivElement;
  Args: {
    selected?: T;
    onChange?: (e?: Event, value?: T) => void;
  };
  Blocks: {
    default: [
      {
        item: typeof BsAccordionItem;
        actions: BsAccordionActions<T>;
      }
    ];
  };
}

export declare class BsAccordion<T> extends Component<BsAccordionSignature<T>> {}

export default BsAccordion;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    BsAccordion: typeof BsAccordion;
    'bs-accordion': typeof BsAccordion;
  }
}
