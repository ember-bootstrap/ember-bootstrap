import EmberRouter from '@ember/routing/router';
import config from 'test-app/config/environment';

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
});
