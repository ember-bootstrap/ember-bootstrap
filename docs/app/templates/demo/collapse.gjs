import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { hash } from '@ember/helper';
import BsButton from 'ember-bootstrap/components/bs-button';
import BsCollapse from 'ember-bootstrap/components/bs-collapse';
import CodeSnippet from 'ember-bootstrap-docs/components/code-snippet';

export default class CollapseTemplate extends Component {
  @tracked
  collapsed = true;

  get notCollapsed() {
    return !this.collapsed;
  }

  @action
  toggle() {
    this.collapsed = !this.collapsed;
  }

  <template>
    <div class="bs-example" data-test-fastboot-container>
      <BsButton @active={{this.notCollapsed}} @onClick={{this.toggle}}>
        {{#if this.collapsed}}
          Show
        {{else}}
          Hide
        {{/if}}
      </BsButton>

      <!-- BEGIN-SNIPPET collapse-demo -->
      <BsCollapse @collapsed={{this.collapsed}}>
        <p class="bg-light p-4 my-4">This is collapsible content</p>
      </BsCollapse>
      <!-- END-SNIPPET -->
    </div>
    <div class="highlight">
      <CodeSnippet
        @name="collapse-demo.gjs"
        @dynamicProperties={{hash collapsed=this.collapsed}}
      />
    </div>
  </template>
}
