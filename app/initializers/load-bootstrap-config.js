import ENV from '../config/environment';
import Config from 'ember-bootstrap/config';
import { registerLibrary } from 'ember-bootstrap/version';

export function initialize(/* container, application */) {
  Config.load(ENV['ember-bootstrap'] || {});
  registerLibrary();
}

export default {
  name: 'load-bootstrap-config',
  initialize,
};
