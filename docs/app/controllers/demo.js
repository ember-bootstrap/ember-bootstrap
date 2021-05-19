import { inject as service } from '@ember/service';
import { readOnly, notEmpty } from '@ember/object/computed';
import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  router: service(),
  component: service(),
  currentRouteName: readOnly('router.currentRouteName'),

  isDetailPage: notEmpty('currentComponent'),

  currentComponent: computed(
    'component.models',
    'currentRouteName',
    function () {
      let routeName = this.currentRouteName;
      let routeParts = routeName.split('.');
      if (routeParts.length > 2) {
        routeName = routeParts.slice(0, 2).join('.');
      }
      return this.get('component.models').findBy('demoRoute', routeName);
    }
  ),
});
