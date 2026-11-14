import Component from '@glimmer/component';
import { service } from '@ember/service';
import { isEmpty } from '@ember/utils';
import ApiReference from 'ember-bootstrap-docs/components/api-reference';
import BsNav from 'ember-bootstrap/components/bs-nav';

export default class DemoTemplate extends Component {
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

  <template>
    <div class="row">
      <div class="col-sm-4 col-md-3 order-last">
        <h3 class="sr-only">
          Components
        </h3>
        <BsNav @type="pills" @stacked={{true}} as |nav|>
          {{#each @model as |comp|}}
            <nav.item>
              <nav.link-to @route={{comp.demoRoute}}>
                {{comp.title}}
              </nav.link-to>
            </nav.item>
          {{/each}}
        </BsNav>
      </div>
      <div class="col-sm-8 col-sm-pull-4 col-md-9 col-md-pull-3">
        {{#if this.isDetailPage}}
          <h1>
            {{this.currentComponent.title}}
          </h1>
          <p class="lead">
            {{this.currentComponent.description}}
          </p>
          <ApiReference @component={{this.currentComponent}} />
        {{/if}}
        {{outlet}}
      </div>
    </div>
  </template>
}
