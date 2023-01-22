import BsFormElementLabel from './label';

export declare class BsFormElementLegend extends BsFormElementLabel {}

export default BsFormElementLegend;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'BsForm::Element::Legend': typeof BsFormElementLegend;
    'bs-form/element/legend': typeof BsFormElementLegend;
  }
}
