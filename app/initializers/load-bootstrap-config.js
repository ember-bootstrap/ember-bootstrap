import ENV from '../config/environment';
import Config from 'ember-bootstrap/config';

export function initialize(/* container, application */) {
    Config.load(ENV['ember-bootstrap'] || {});
}

export default {
  name: 'load-bootstrap-config',
  initialize: initialize
};
