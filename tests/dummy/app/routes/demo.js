import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default Route.extend({
  component: service(),

  model() {
    return this.get('component').findAll();
  }
});
