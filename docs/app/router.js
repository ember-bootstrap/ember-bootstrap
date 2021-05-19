import EmberRouter from '@ember/routing/router';
import config from 'ember-bootstrap-docs/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('demo', { path: '/components' }, function () {
    this.route('accordion');
    this.route('alert');
    this.route('button');
    this.route('button-group');
    this.route('carousel');
    this.route('collapse');
    this.route('dropdown');
    this.route('forms');
    this.route('modal');
    this.route('navbars');
    this.route('navs');
    this.route('popover');
    this.route('progress');
    this.route('tabs', function () {
      this.route('other');
    });
    this.route('tooltip');
  });
  this.route('getting-started', function () {
    this.route('setup');
    this.route('assets');
    this.route('bootstrap-4');
  });
  this.route('addons');
  this.route('license');
  this.route('changelog');
});
