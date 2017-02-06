import TooltipElement from 'ember-bootstrap/components/base/bs-tooltip/element';

export default TooltipElement.extend({
  classNameBindings: ['placement', 'showHelp:in']
});
