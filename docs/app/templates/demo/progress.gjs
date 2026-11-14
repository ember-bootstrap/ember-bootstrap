import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { hash } from '@ember/helper';
import BsForm from 'ember-bootstrap/components/bs-form';
import BsProgress from 'ember-bootstrap/components/bs-progress';
import CodeSnippet from 'ember-bootstrap-docs/components/code-snippet';

export default class ProgressTemplate extends Component {
  @tracked value = 50;
  @tracked minValue = 0;
  @tracked maxValue = 100;
  @tracked showLabel = false;
  @tracked type = 'default';
  @tracked striped = false;
  @tracked animate = false;
  @tracked roundDigits = 0;
  typeChoices = ['default', 'success', 'info', 'warning', 'danger'];

  <template>
    <div class="bs-example" data-test-fastboot-container>
      <!-- BEGIN-SNIPPET progress-demo -->
      <BsProgress as |pg|>
        <pg.bar @value={{50}} />
      </BsProgress>
      <!-- END-SNIPPET -->
    </div>
    <div class="highlight">
      <CodeSnippet @name="progress-demo.gjs" />
    </div>
    <h2>
      Options
    </h2>
    <div class="bs-example">
      <BsForm @formLayout="horizontal" @model={{this}} as |form|>
        <form.element @controlType="number" @label="Value" @property="value" />
        <form.element @controlType="number" @label="Min" @property="minValue" />
        <form.element @controlType="number" @label="Max" @property="maxValue" />
        <form.element
          @controlType="power-select"
          @options={{this.typeChoices}}
          @label="Type"
          @property="type"
          as |el|
        >
          <el.control @searchEnabled={{true}} />
        </form.element>
        <form.element
          @controlType="checkbox"
          @label="Show label"
          @property="showLabel"
        />
        <form.element
          @controlType="number"
          @label="Round to digits"
          @property="roundDigits"
        />
        <form.element
          @controlType="checkbox"
          @label="Striped"
          @property="striped"
        />
        <form.element
          @controlType="checkbox"
          @label="Animate"
          @property="animate"
          as |el|
        >
          <el.control disabled={{if this.striped false true}} />
        </form.element>
      </BsForm>
      <hr />
      <!-- BEGIN-SNIPPET progress-options -->
      <BsProgress as |pg|>
        <pg.bar
          @value={{this.value}}
          @minValue={{this.minValue}}
          @maxValue={{this.maxValue}}
          @showLabel={{this.showLabel}}
          @roundDigits={{this.roundDigits}}
          @type={{this.type}}
          @striped={{this.striped}}
          @animate={{this.animate}}
        />
      </BsProgress>
      <!-- END-SNIPPET -->
    </div>
    <div class="highlight">
      <CodeSnippet
        @name="progress-options.gjs"
        @dynamicProperties={{hash
          value=this.value
          minValue=this.minValue
          maxValue=this.maxValue
          showLabel=this.showLabel
          roundDigits=this.roundDigits
          striped=this.striped
          animate=this.animate
          type=this.type
        }}
      />
    </div>
    <h2>
      Stacked
    </h2>
    <div class="bs-example">
      <!-- BEGIN-SNIPPET progress-stacked -->
      <BsProgress as |pg|>
        <pg.bar
          @value={{this.value}}
          @minValue={{this.minValue}}
          @maxValue={{this.maxValue}}
          @showLabel={{this.showLabel}}
          @roundDigits={{this.roundDigits}}
          @type={{this.type}}
          @striped={{this.striped}}
          @animate={{this.animate}}
        />
        <pg.bar
          @value={{20}}
          @minValue={{this.minValue}}
          @maxValue={{this.maxValue}}
          @showLabel={{this.showLabel}}
          @roundDigits={{this.roundDigits}}
          @type="warning"
          @striped={{this.striped}}
          @animate={{this.animate}}
        />
        <pg.bar
          @value={{5}}
          @minValue={{this.minValue}}
          @maxValue={{this.maxValue}}
          @showLabel={{this.showLabel}}
          @roundDigits={{this.roundDigits}}
          @type="danger"
          @striped={{this.striped}}
          @animate={{this.animate}}
        />
      </BsProgress>
      <!-- END-SNIPPET -->
    </div>
    <div class="highlight">
      <CodeSnippet
        @name="progress-stacked.gjs"
        @dynamicProperties={{hash
          value=this.value
          minValue=this.minValue
          maxValue=this.maxValue
          showLabel=this.showLabel
          roundDigits=this.roundDigits
          striped=this.striped
          animate=this.animate
          type=this.type
        }}
      />
    </div>
  </template>
}
