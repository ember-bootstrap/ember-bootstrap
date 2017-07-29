import Route from '@ember/routing/route';
import Ember from 'ember';

const { inject } = Ember;

export default Route.extend({
  component: inject.service(),

  model() {
    return this.get('component').findAll();
  }
});
