import AccordionItem from 'ember-bootstrap/components/base/bs-accordion/item';

export default AccordionItem.extend({
  classNames: ['card'],

  /**
   * @property classTypePrefix
   * @type String
   * @default 'bg'
   * @protected
   */
  classTypePrefix: 'bg'
});
