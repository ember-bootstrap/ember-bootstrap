import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
    this.route('dropdown');
    this.route('button');
    this.route('forms');
   this.route('listgroup');
});

export default Router;
