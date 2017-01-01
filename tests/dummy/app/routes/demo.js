import Ember from 'ember';

const { inject, set } = Ember;

export default Ember.Route.extend({
  component: inject.service(),

  model() {
    return this.get('component').findAll();
  },
  //
  // setupController(controller, model) {
  //   this._super(...arguments);
  //
  //   set(controller, 'currentComponent', this.modelFor('demo.component'));
  // }
});
