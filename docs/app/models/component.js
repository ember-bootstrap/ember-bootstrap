import { reads } from '@ember/object/computed';
import EmberObject, { computed } from '@ember/object';
import config from 'ember-bootstrap-docs/config/environment';

export default EmberObject.extend({
  id: null,
  title: null,
  description: null,

  className: reads('title'),
  nameSpace: 'Components',

  bsUrl: null,

  apiUrl: computed('nameSpace', 'className', function() {
    let { nameSpace, className } = this.getProperties('nameSpace', 'className');
    return `${config.rootURL}api/classes/${nameSpace}.${className}.html`;
  }),

  demoRoute: computed('id', function() {
    return `demo.${this.get('id')}`;
  }),

  templateName: computed('className', function() {
    return `Bs${this.className}`;
  })

});
