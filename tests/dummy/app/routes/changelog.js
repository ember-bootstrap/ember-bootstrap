import Ember from 'ember';
import fetch from 'fetch';

export default Ember.Route.extend({
  async model() {
    let response = await fetch('/CHANGELOG.md');
    return response.text();
  }
});
