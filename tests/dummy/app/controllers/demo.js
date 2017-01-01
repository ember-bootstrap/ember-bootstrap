import Ember from 'ember';

const { computed, inject } = Ember;

export default Ember.Controller.extend({
  application: inject.controller(),
  component: inject.service(),
  currentRouteName: computed.readOnly('application.currentRouteName'),

  currentComponent: computed('currentRouteName', function() {
    return this.get('component.models').findBy('demoRoute', this.get('currentRouteName'));
  })
});
