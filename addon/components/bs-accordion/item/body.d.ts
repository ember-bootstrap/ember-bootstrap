import Component from '@glimmer/component';

interface BsAccordionItemBodySignature {
  Element: HTMLDivElement;
  Args: {
    collapsed?: boolean;
  };
  Blocks: {
    default: [];
  };
}

export declare class BsAccordionItemBody extends Component<BsAccordionItemBodySignature> {}

export default BsAccordionItemBody;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    BsAccordionItemBody: typeof BsAccordionItemBody;
    'bs-accordion/item/body': typeof BsAccordionItemBody;
  }
}
