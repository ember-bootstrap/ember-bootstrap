import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import { isEmpty } from '@ember/utils';

export default class DemoController extends Controller {
  @service
  router;

  @service
  component;

  get currentRouteName() {
    return this.router.currentRouteName;
  }

  get isDetailPage() {
    return !isEmpty(this.currentComponent);
  }

  get currentComponent() {
    let routeName = this.currentRouteName;
    let routeParts = routeName.split('.');
    if (routeParts.length > 2) {
      routeName = routeParts.slice(0, 2).join('.');
    }
    return this.component.models.find((model) => model.demoRoute === routeName);
  }
}
