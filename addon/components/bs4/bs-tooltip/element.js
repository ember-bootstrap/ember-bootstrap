import Ember from 'ember';
import TooltipElement from 'ember-bootstrap/components/base/bs-tooltip/element';

const { computed } = Ember;

export default TooltipElement.extend({
  classNameBindings: ['placementClass', 'showHelp:show'],

  placementClass: computed('placement', function() {
    let placement = this.get('placement');

    return `tooltip-${placement}`;
  }).readOnly()
});
