import Component from '@glimmer/component';
import { later } from '@ember/runloop';
import { action } from '@ember/object';
import BsButton from 'ember-bootstrap/components/bs-button';
import CodeSnippet from 'ember-bootstrap-docs/components/code-snippet';

export default class ButtonTemplate extends Component {
  @action
  submit() {
    window.alert('You pressed the button!');
  }

  @action
  download() {
    return new Promise(function (resolve) {
      // eslint-disable-next-line ember/no-runloop
      later(resolve, 3000);
    });
  }

  <template>
    <h2>
      Simple example
    </h2>
    <div
      class="bs-example"
      data-test-fastboot-container
      data-test-example="button-demo"
    >
      <!-- BEGIN-SNIPPET button-demo -->
      <BsButton @onClick={{this.submit}}>Button</BsButton>
      <!-- END-SNIPPET -->
    </div>
    <div class="highlight">
      <CodeSnippet @name="button-demo.gjs" />
    </div>
    <h2>
      Options
    </h2>
    <div class="bs-example">
      <!-- BEGIN-SNIPPET button-options -->
      <p>Solid buttons</p>
      <p>
        <BsButton @type="primary" @onClick={{this.submit}}>Primary</BsButton>
        <BsButton
          @type="secondary"
          @onClick={{this.submit}}
        >Secondary</BsButton>
        <BsButton @type="success" @onClick={{this.submit}}>Success</BsButton>
        <BsButton @type="danger" @onClick={{this.submit}}>Danger</BsButton>
        <BsButton @type="warning" @onClick={{this.submit}}>Warning</BsButton>
        <BsButton @type="info" @onClick={{this.submit}}>Info</BsButton>
        <BsButton @type="light" @onClick={{this.submit}}>Light</BsButton>
        <BsButton @type="dark" @onClick={{this.submit}}>Dark</BsButton>
        <BsButton disabled={{true}} @onClick={{this.submit}}>Disabled</BsButton>
      </p>
      <p>Outlined buttons</p>
      <p>
        <BsButton
          @type="primary"
          @outline={{true}}
          @onClick={{this.submit}}
        >Primary</BsButton>
        <BsButton
          @type="secondary"
          @outline={{true}}
          @onClick={{this.submit}}
        >Secondary</BsButton>
        <BsButton
          @type="success"
          @outline={{true}}
          @onClick={{this.submit}}
        >Success</BsButton>
        <BsButton
          @type="danger"
          @outline={{true}}
          @onClick={{this.submit}}
        >Danger</BsButton>
        <BsButton
          @type="warning"
          @outline={{true}}
          @onClick={{this.submit}}
        >Warning</BsButton>
        <BsButton
          @type="info"
          @outline={{true}}
          @onClick={{this.submit}}
        >Info</BsButton>
        <BsButton
          @type="light"
          @outline={{true}}
          @onClick={{this.submit}}
        >Light</BsButton>
        <BsButton
          @type="dark"
          @outline={{true}}
          @onClick={{this.submit}}
        >Dark</BsButton>
        <BsButton
          disabled={{true}}
          @outline={{true}}
          @onClick={{this.submit}}
        >Disabled</BsButton>
      </p>
      <!-- END-SNIPPET -->
    </div>
    <div class="highlight">
      <CodeSnippet @name="button-options.gjs" />
    </div>
    <h2>
      Promise support
    </h2>
    <p>
      Return a Promise from the
      <code>
        onClick
      </code>
      action for custom text based on the Promise state.
    </p>
    <div class="bs-example">
      <!-- BEGIN-SNIPPET button-promise -->
      <BsButton
        @defaultText="Start download"
        @pendingText="Downloading..."
        @fulfilledText="Download complete!"
        @onClick={{this.download}}
      />

      <!-- END-SNIPPET -->
    </div>
    <div class="highlight">
      <CodeSnippet @name="button-promise.gjs" />
    </div>
  </template>
}
