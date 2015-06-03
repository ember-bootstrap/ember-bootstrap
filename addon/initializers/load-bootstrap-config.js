import ENV from '../config/environment';
import Config from 'ember-bootstrap-components/config';

export function initialize(/* container, application */) {
    Config.load(ENV['ember-bootstrap-components'] || {});
}

export default {
  name: 'load-bootstrap-config',
  initialize: initialize
};
