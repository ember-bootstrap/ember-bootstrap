import EmberRouter from '@ember/routing/router';
import config from 'dummy/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('acceptance', function () {
    this.route('modal');
    this.route('link', { path: '/link/:model' });
    this.route('linkto', { path: '/linkto/:model' });
  });

  this.route('fastboot', function () {
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
    this.route('tabs');
    this.route('tooltip');
  });
});
