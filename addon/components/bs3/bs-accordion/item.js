import AccordionItem from 'ember-bootstrap/components/base/bs-accordion/item';
import typeClass from 'ember-bootstrap/utils/cp/type-class';

export default AccordionItem.extend({
  classNames: ['panel'],
  typeClass: typeClass('panel', 'type')
});
