import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
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
  this.route('tooltip');
  this.route('tabs', function() {
    this.route('other');
  });
});

export default Router;
