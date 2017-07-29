import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('demo', { path: '/components' }, function() {
    this.route('dropdown');
    this.route('button');
    this.route('button-group');
    this.route('forms');
    this.route('alert');
    this.route('accordion');
    this.route('collapse');
    this.route('modal');
    this.route('progress');
    this.route('navs');
    this.route('navbars');
    this.route('tooltip');
    this.route('popover');
    this.route('tabs', function() {
      this.route('other');
    });
  });
  this.route('getting-started', function() {
    this.route('setup');
    this.route('assets');
    this.route('migrating-to-1-0');
    this.route('bootstrap-4');
  });
  this.route('license');
  this.route('changelog');
  this.route('acceptance', function() {
    this.route('modal');
  });
});

export default Router;
