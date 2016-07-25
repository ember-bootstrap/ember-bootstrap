import Ember from 'ember';
import config from './config/environment';

let Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('dropdown');
  this.route('button');
  this.route('forms');
  this.route('alert');
  this.route('accordion');
  this.route('collapse');
  this.route('modal');
  this.route('progress');
  this.route('navs');
  this.route('navbars');
  this.route('tabs', function() {
    this.route('other');
  });
});

export default Router;
