import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('accordion');
  this.route('alert');
  this.route('button');
  this.route('buttonGroup');
  this.route('carousel');
  this.route('collapse');
  this.route('dropdown');
  this.route('form');
  this.route('modal');
  this.route('progress');
  this.route('nav');
  this.route('navBar');
  this.route('tabs');
  this.route('tooltip');
  this.route('popover');
});

export default Router;
