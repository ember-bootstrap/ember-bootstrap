import { inject as service } from '@ember/service';
import { readOnly, notEmpty } from '@ember/object/computed';
import Controller, { inject as controller } from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  application: controller(),
  component: service(),
  currentRouteName: readOnly('application.currentRouteName'),

  isDetailPage: notEmpty('currentComponent'),

  currentComponent: computed('currentRouteName', function() {
    let routeName = this.get('currentRouteName');
    let routeParts = routeName.split('.');
    if (routeParts.length > 2) {
      routeName = routeParts.slice(0, 2).join('.');
    }
    return this.get('component.models').findBy('demoRoute', routeName);
  })
});
