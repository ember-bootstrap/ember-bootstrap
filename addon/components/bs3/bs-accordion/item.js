import classic from 'ember-classic-decorator';
import { classNames } from '@ember-decorators/component';
import AccordionItem from 'ember-bootstrap/components/base/bs-accordion/item';
import typeClass from 'ember-bootstrap/utils/cp/type-class';

@classic
@classNames('panel')
export default class Item extends AccordionItem {
  @typeClass('panel', 'type')
  typeClass;
}
