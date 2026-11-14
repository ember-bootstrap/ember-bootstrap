import { hash } from '@ember/helper';
import getCodeSnippet from 'ember-code-snippet/helpers/get-code-snippet';
import BsButtonGroup from 'ember-bootstrap/components/bs-button-group';
import BsForm from 'ember-bootstrap/components/bs-form';
import BsTab from 'ember-bootstrap/components/bs-tab';
import CodeBlock from 'ember-prism/components/code-block';
import CodeSnippet from 'ember-bootstrap-docs/components/code-snippet';

// The snippet below ends before the template. Close the class again when
// displaying it.
const withTemplatePlaceholder = (source) =>
  `${source}\n\n  <template>\n    ...\n  </template>\n}`;

// BEGIN-SNIPPET form-component
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { getOwner } from '@ember/application';
import Login from '../../models/login';

export default class FormsTemplate extends Component {
  @tracked formLayout = 'vertical';
  @tracked email = 'foo@example.com';
  @tracked password = null;
  @tracked checkbox = false;
  @tracked switched = false;
  @tracked radio = null;
  @tracked textarea = null;
  radioOptions = [
    {
      label: 'foo',
    },
    {
      label: 'bar',
    },
  ];

  get login() {
    return Login.create(getOwner(this).ownerInjection());
  }

  @action
  submit() {
    window.alert('Successfully submitted form data!');
  }
  // END-SNIPPET

  <template>
    <h2>Simple form</h2>

    <p>The forms component lets you easily create forms with automatic markup
      generation based on the chosen form layout:</p>

    <div class="bs-example" data-test-fastboot-container>
      <BsForm @formLayout="horizontal" @model={{this}} as |form|>
        <form.element @label="Layout" @property="formLayout" as |el|>
          <BsButtonGroup
            @value={{el.value}}
            @type="radio"
            @onChange={{el.setValue}}
            as |bg|
          >
            <bg.button @value="vertical">Vertical</bg.button>
            <bg.button @value="horizontal">Horizontal</bg.button>
            <bg.button @value="inline">Inline</bg.button>
          </BsButtonGroup>
        </form.element>
      </BsForm>
      <hr />
      <!-- BEGIN-SNIPPET form-demo -->
      <BsForm
        @formLayout={{this.formLayout}}
        @model={{this}}
        @onSubmit={{this.submit}}
        as |form|
      >
        <form.element
          @controlType="email"
          @label="Email"
          @property="email"
          as |el|
        >
          <el.control placeholder="Email" required />
        </form.element>
        <form.element
          @controlType="password"
          @label="Password"
          @property="password"
          @helpText="Minimum 6 characters"
          as |el|
        >
          <el.control placeholder="Password" required />
        </form.element>
        <form.element
          @controlType="radio"
          @label="Radio"
          @property="radio"
          @options={{this.radioOptions}}
          @optionLabelPath="label"
        />
        <form.element
          @controlType="checkbox"
          @label="Checkbox"
          @property="checkbox"
        />
        <form.element
          @controlType="switch"
          @label="Switch"
          @property="switched"
        />
        <form.element
          @controlType="textarea"
          @label="Textarea"
          @property="textarea"
        />
        <form.submitButton>Submit</form.submitButton>
      </BsForm>
      <!-- END-SNIPPET -->
    </div>
    <div class="highlight">
      <CodeSnippet
        @name="form-demo.gjs"
        @dynamicProperties={{hash formLayout=this.formLayout}}
      />
    </div>
    <p>The component below shows the default states for the form properties
      above.</p>
    <div class="highlight">
      {{#let (getCodeSnippet "form-component.gjs") as |snippet|}}
        <CodeBlock
          @code={{withTemplatePlaceholder snippet.source}}
          @language="javascript"
          class="line-numbers"
        />
      {{/let}}
    </div>

    <h2>Validation</h2>

    <p>Add support for forms validation by using one of the available additional
      addons depending on your favourite form validation library:</p>

    <ul>
      <li>
        <a
          href="https://github.com/offirgolan/ember-bootstrap-cp-validations"
          target="_blank"
          rel="noopener noreferrer"
        >ember-bootstrap-cp-validations</a>
        for
        <a
          href="https://github.com/offirgolan/ember-cp-validations"
          target="_blank"
          rel="noopener noreferrer"
        >ember-cp-validations</a>
        support
      </li>
      <li>
        <a
          href="https://github.com/kaliber5/ember-bootstrap-changeset-validations"
          target="_blank"
          rel="noopener noreferrer"
        >ember-bootstrap-changeset-validations</a>
        for
        <a
          href="https://github.com/DockYard/ember-changeset-validations"
          target="_blank"
          rel="noopener noreferrer"
        >ember-changeset</a>
        support
      </li>
      <li>
        <a
          href="https://github.com/kaliber5/ember-bootstrap-validations"
          target="_blank"
          rel="noopener noreferrer"
        >ember-bootstrap-validations</a>
        for
        <a
          href="https://github.com/DockYard/ember-validations"
          target="_blank"
          rel="noopener noreferrer"
        >ember-validations</a>
        support
      </li>
    </ul>

    <p>
      Just add validations to your model assigned to your form. It will then
      force validation on submit and show the eventual validation errors. The
      following example uses ember-cp-validations:
    </p>

    <div class="bs-example">
      <!-- BEGIN-SNIPPET form-validation -->
      <BsForm @model={{this.login}} @onSubmit={{this.submit}} as |form|>
        <form.element @controlType="email" @label="Email" @property="email" />
        <form.element
          @controlType="password"
          @label="Password"
          @property="password"
          @helpText="Minimum 6 characters"
        />
        <form.submitButton>Submit</form.submitButton>
      </BsForm>
      <!-- END-SNIPPET -->
    </div>
    <BsTab as |tab|>
      <tab.pane @title="template.hbs">
        <div class="highlight">
          <CodeSnippet @name="form-validation.gjs" />
        </div>
      </tab.pane>
      <tab.pane @title="models/login.js">
        <div class="highlight">
          <CodeSnippet @name="login-model.js" />
        </div>
      </tab.pane>
    </BsTab>

    <h2>Custom controls</h2>

    <p>Use the form element in block form to add your custom controls:</p>

    <div class="bs-example">
      <!-- BEGIN-SNIPPET form-custom -->
      <BsForm @model={{this.login}} @onSubmit={{this.submit}} as |form|>
        <form.element @label="Email" @property="email" as |el|>
          <div class="input-group">
            <el.control placeholder="Email" />
            <div class="input-group-append">
              <span class="input-group-text">@example.com</span>
            </div>
          </div>
        </form.element>
        <form.element
          @size="lg"
          @controlType="password"
          @label="Password"
          @property="password"
          @helpText="Minimum 6 characters"
          as |el|
        >
          <el.control placeholder="Password" />
        </form.element>
        <form.submitButton>Submit</form.submitButton>
      </BsForm>
      <!-- END-SNIPPET -->
    </div>
    <div class="highlight">
      <CodeSnippet @name="form-custom.gjs" />
    </div>

    <p>You can also just customize the existing control component:</p>

    <div class="bs-example">
      <!-- BEGIN-SNIPPET form-customized -->
      <BsForm @model={{this}} @onSubmit={{this.submit}} as |form|>
        <form.element @label="Email" @property="email" as |el|>
          <el.control placeholder="Email" class="border-info" />
        </form.element>
        <form.submitButton>Submit</form.submitButton>
      </BsForm>
      <!-- END-SNIPPET -->
    </div>
    <div class="highlight">
      <CodeSnippet @name="form-customized.gjs" />
    </div>

    <h3>Custom control addons</h3>

    <p>Support for popular control components can be added through additional
      addons:</p>

    <ul>
      <li>
        <a
          href="https://github.com/kaliber5/ember-bootstrap-power-select"
          target="_blank"
          rel="noopener noreferrer"
        >ember-bootstrap-power-select</a>
        adds support for
        <a
          href="http://www.ember-power-select.com"
          target="_blank"
          rel="noopener noreferrer"
        >ember-power-select</a>
      </li>
    </ul>
  </template>
}
