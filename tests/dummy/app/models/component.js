import Ember from 'ember';
import config from 'dummy/config/environment';

const { computed } = Ember;

export default Ember.Object.extend({
  id: null,
  title: null,
  description: null,

  className: computed.reads('title'),
  nameSpace: 'Components',

  bsUrl: null,

  apiUrl: computed('nameSpace', 'className', function() {
    let { nameSpace, className } = this.getProperties('nameSpace', 'className');
    return `${config.rootURL}api/v1.0/classes/${nameSpace}.${className}.html`;
  }),

  apiUnstableUrl: computed('nameSpace', 'className', function() {
    let { nameSpace, className } = this.getProperties('nameSpace', 'className');
    return `${config.rootURL}api/classes/${nameSpace}.${className}.html`;
  }),

  demoRoute: computed('id', function() {
    return `demo.${this.get('id')}`;
  })

});
