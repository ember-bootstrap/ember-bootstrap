import Ember from 'ember';
import TooltipElement from 'ember-bootstrap/components/base/bs-tooltip/element';

export default TooltipElement.extend({
  classNameBindings: ['placementClass', 'showHelp:show'],

  placementClass: Ember.computed('placement', function() {
    let placement = this.get('placement');

    return `tooltip-${placement}`;
  })
});
