import { classNames } from '@ember-decorators/component';
import BaseAccordionItem from 'ember-bootstrap/components/base/bs-accordion/item';
import typeClass from 'ember-bootstrap/utils/cp/type-class';

@classNames('panel')
export default class AccordionItem extends BaseAccordionItem {
  @typeClass('panel', 'type')
  typeClass;
}
