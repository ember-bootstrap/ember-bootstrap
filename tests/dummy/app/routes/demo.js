import Ember from 'ember';

const { inject } = Ember;

export default Ember.Route.extend({
  component: inject.service(),

  model() {
    return this.get('component').findAll();
  }
});
