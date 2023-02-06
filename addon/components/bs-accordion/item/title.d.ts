import Component from '@glimmer/component';

interface BsAccordionItemTitleSignature<T> {
  Element: HTMLDivElement;
  Args: {
    collapsed?: boolean;
    onClick?: (e?: Event, value?: T) => void;
  };
  Blocks: {
    default: [];
  };
}

export declare class BsAccordionItemTitle<T> extends Component<BsAccordionItemTitleSignature<T>> {}

export default BsAccordionItemTitle;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'BsAccordion::Item::Title': typeof BsAccordionItemTitle;
    'bs-accordion/item/title': typeof BsAccordionItemTitle;
  }
}
