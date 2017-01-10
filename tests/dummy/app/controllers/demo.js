import Ember from 'ember';

const { computed, inject } = Ember;

export default Ember.Controller.extend({
  application: inject.controller(),
  component: inject.service(),
  currentRouteName: computed.readOnly('application.currentRouteName'),

  isDetailPage: computed.notEmpty('currentComponent'),

  currentComponent: computed('currentRouteName', function() {
    let routeName = this.get('currentRouteName');
    let routeParts = routeName.split('.');
    if (routeParts.length > 2) {
      routeName = routeParts.slice(0, 2).join('.');
    }
    return this.get('component.models').findBy('demoRoute', routeName);
  })
});
