import { classNames } from '@ember-decorators/component';
import BaseAccordionItem from 'ember-bootstrap/components/base/bs-accordion/item';
import typeClass from 'ember-bootstrap/utils/cp/type-class';

@classNames('card')
export default class AccordionItem extends BaseAccordionItem {
  @typeClass('bg', 'type')
  typeClass;
}
