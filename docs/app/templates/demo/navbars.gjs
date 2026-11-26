import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { hash } from '@ember/helper';
import { LinkTo } from '@ember/routing';
import BsForm from 'ember-bootstrap/components/bs-form';
import BsNavbar from 'ember-bootstrap/components/bs-navbar';
import CodeSnippet from 'ember-bootstrap-docs/components/code-snippet';

export default class NavbarsTemplate extends Component {
  @tracked
  type = 'light';

  @tracked
  bg = 'light';

  typeChoices = ['light', 'dark'];
  bgChoices = [
    'light',
    'dark',
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'info',
  ];

  <template>
    <div
      class="bs-example"
      data-test-fastboot-container
      data-test-example="navbar-demo"
    >
      <BsForm @formLayout="horizontal" @model={{this}} as |form|>
        <form.element
          @controlType="power-select"
          @options={{this.typeChoices}}
          @label="Type"
          @property="type"
          data-test-option="type"
          as |el|
        >
          <el.control @searchEnabled={{true}} />
        </form.element>
        <form.element
          @controlType="power-select"
          @options={{this.bgChoices}}
          @label="Background"
          @property="bg"
          data-test-option="bg"
          as |el|
        >
          <el.control @searchEnabled={{true}} />
        </form.element>
      </BsForm>
      <hr />
      <!-- BEGIN-SNIPPET navbar-demo -->
      <BsNavbar @type={{this.type}} @backgroundColor={{this.bg}} as |navbar|>
        <LinkTo @route="index" class="navbar-brand">Brand</LinkTo>
        <navbar.toggle />
        <navbar.content>
          <navbar.nav as |nav|>
            <nav.item>
              <nav.link-to @route="index">Home</nav.link-to>
            </nav.item>
            <nav.item>
              <nav.link-to @route="demo.navbars">Navbars</nav.link-to>
            </nav.item>
            <nav.dropdown as |dd|>
              <dd.toggle>Dropdown <span class="caret"></span></dd.toggle>
              <dd.menu as |ddm|>
                <ddm.item>
                  <ddm.link-to @route="index">Home</ddm.link-to>
                </ddm.item>
                <ddm.item>
                  <ddm.link-to @route="demo.navbars">Navbars</ddm.link-to>
                </ddm.item>
              </dd.menu>
            </nav.dropdown>
          </navbar.nav>
        </navbar.content>
      </BsNavbar>
      <!-- END-SNIPPET -->
    </div>
    <div class="highlight">
      <CodeSnippet
        @name="navbar-demo.gjs"
        @dynamicProperties={{hash
          type=this.type
          bg=this.bg
          collapsed=this.collapsed
        }}
      />
    </div>
  </template>
}
