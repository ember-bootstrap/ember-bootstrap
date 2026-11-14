import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import bsEq from 'ember-bootstrap/helpers/bs-eq';
import { hash } from '@ember/helper';
import BsForm from 'ember-bootstrap/components/bs-form';
import BsNav from 'ember-bootstrap/components/bs-nav';
import CodeSnippet from 'ember-bootstrap-docs/components/code-snippet';

export default class NavsTemplate extends Component {
  @tracked
  type = 'pills';
  @tracked
  stacked = false;
  @tracked
  justified = false;
  @tracked
  fill = false;

  typeChoices = ['pills', 'tabs'];

  @action
  updateType(type) {
    this.type = type;
    if (type === 'tabs') {
      this.stacked = false;
    }
  }

  @action
  updateStacked(stacked) {
    this.stacked = stacked;
    if (stacked) {
      this.justified = false;
    }
  }

  <template>
    <div class="bs-example" data-test-fastboot-container>
      <BsForm @formLayout="inline" @model={{this}} as |form|>
        <form.element
          @controlType="power-select"
          @options={{this.typeChoices}}
          @label="Type"
          @property="type"
          @onChange={{this.updateType}}
          as |el|
        >
          <el.control @searchEnabled={{true}} @class="ml-sm-1" />
        </form.element>
        <form.element
          @controlType="checkbox"
          @label="Stacked"
          @property="stacked"
          @onChange={{this.updateStacked}}
          class="ml-sm-2"
          as |el|
        >
          <el.control disabled={{bsEq this.type "tabs"}} />
        </form.element>
        <form.element
          @controlType="checkbox"
          @label="Justified"
          @property="justified"
          class="ml-sm-2"
          as |el|
        >
          <el.control disabled={{this.stacked}} />
        </form.element>
        <form.element
          @controlType="checkbox"
          @label="Fill"
          @property="fill"
          class="ml-sm-2"
          as |el|
        >
          <el.control disabled={{this.stacked}} />
        </form.element>
      </BsForm>
      <hr />
      <!-- BEGIN-SNIPPET nav-demo -->
      <BsNav
        @type={{this.type}}
        @justified={{this.justified}}
        @stacked={{this.stacked}}
        @fill={{this.fill}}
        as |nav|
      >
        <nav.item>
          <nav.link-to @route="index">Home</nav.link-to>
        </nav.item>
        <nav.item>
          <nav.link-to @route="demo.navs">Nav</nav.link-to>
        </nav.item>
        <nav.dropdown as |dd|>
          <dd.toggle>
            Dropdown
            <span class="caret"></span>
          </dd.toggle>
          <dd.menu as |ddm|>
            <ddm.item>
              <ddm.link-to @route="index">Home</ddm.link-to>
            </ddm.item>
            <ddm.item>
              <ddm.link-to @route="demo.navs">Nav</ddm.link-to>
            </ddm.item>
          </dd.menu>
        </nav.dropdown>
      </BsNav>
      <!-- END-SNIPPET -->
    </div>
    <div class="highlight">
      <CodeSnippet
        @name="nav-demo.gjs"
        @dynamicProperties={{hash
          type=this.type
          stacked=this.stacked
          justified=this.justified
          fill=this.fill
        }}
      />
    </div>
  </template>
}
