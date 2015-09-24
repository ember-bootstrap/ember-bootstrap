import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
    this.route('dropdown');
    this.route('button');
    this.route('forms');
    this.route('alert');
    this.route('accordion');
    this.route('collapse');
});

export default Router;
