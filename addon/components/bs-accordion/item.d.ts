import { BsButtonType } from '../bs-button';

import Component from '@glimmer/component';
import BsAccordionItemBody from './item/body';
import BsAccordionItemTitle from './item/title';

interface BsAccordionItemSignature<T> {
  Element: HTMLDivElement;
  Args: {
    title?: string;
    type?: 'default' | 'light' | 'dark' | BsButtonType | string;
    value?: T;
    onClick?: (e?: Event, value?: T) => void;
  };
  Blocks: {
    default: [
      {
        body: typeof BsAccordionItemBody;
        title: typeof BsAccordionItemTitle;
      }
    ];
  };
}

export declare class BsAccordionItem<T> extends Component<BsAccordionItemSignature<T>> {}

export default BsAccordionItem;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    BsAccordionItem: typeof BsAccordionItem;
    'bs-accordion/item': typeof BsAccordionItem;
  }
}
