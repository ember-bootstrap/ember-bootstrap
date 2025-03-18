import { module } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render, settled, waitFor } from '@ember/test-helpers';
import {
  closeButtonClass,
  test,
  testRequiringTransitions,
} from '../../helpers/bootstrap';
import setupNoDeprecations from '../../helpers/setup-no-deprecations';
import a11yAudit from 'ember-a11y-testing/test-support/audit';
import sinon from 'sinon';
import { tracked } from '@glimmer/tracking';
import BsAlert from 'ember-bootstrap/components/bs-alert';

module('Integration | Component | bs-alert', function (hooks) {
  setupRenderingTest(hooks);
  setupNoDeprecations(hooks);

  test('alert has correct CSS classes', async function (assert) {
    await render(
      <template>
        <BsAlert @type='success' @dismissible={{true}}>Test</BsAlert>
      </template>,
    );

    assert.dom('.alert').exists('alert has alert class');
    assert.dom('.alert').hasClass('alert-success', 'alert has type class');
    assert
      .dom('.alert')
      .hasClass('alert-dismissible', 'alert has dismissible class');
  });

  test('dismissible alert can be hidden by clicking close button with fade=false', async function (assert) {
    await render(
      <template>
        <BsAlert @type='success' @fade={{false}}>Test</BsAlert>
      </template>,
    );

    assert
      .dom(`button.${closeButtonClass()}`)
      .exists({ count: 1 }, 'alert has close button');
    await click(`button.${closeButtonClass()}`);

    assert.dom('.alert').doesNotExist('alert has no alert class');
    assert.dom('*').hasText('', 'alert has no content');
  });

  testRequiringTransitions(
    'dismissible alert can be hidden by clicking close button with fade=true',
    async function (assert) {
      await render(
        <template>
          <BsAlert @type='success' @fade={{true}}>Test</BsAlert>
        </template>,
      );

      assert
        .dom(`button.${closeButtonClass()}`)
        .exists({ count: 1 }, 'alert has close button');
      const promise = click(`button.${closeButtonClass()}`);
      await waitFor('.alert:not(.in)');

      assert.dom('.alert').exists('alert has alert class');
      assert.dom('.alert').hasNoClass('in', 'alert has no in class');

      await promise;
      assert.dom('.alert').doesNotExist('alert has no alert class');
      assert.dom('*').hasText('', 'alert has no content');
    },
  );

  test('alert can be hidden by setting visible property', async function (assert) {
    class State {
      @tracked visible = true;
    }
    const state = new State();
    await render(
      <template>
        <BsAlert
          @type='success'
          @fade={{false}}
          @visible={{state.visible}}
        >Test</BsAlert>
      </template>,
    );

    state.visible = false;
    await settled();

    assert.dom('.alert').doesNotExist('alert has no alert class');
    assert.dom('*').hasText('', 'alert has no content');
  });

  test('onDismiss is called when clicking the close button', async function (assert) {
    const dismissAction = sinon.spy();
    await render(
      <template>
        <BsAlert
          @type='success'
          @fade={{false}}
          @onDismiss={{dismissAction}}
        >Test</BsAlert>
      </template>,
    );
    await click(`button.${closeButtonClass()}`);
    assert.ok(dismissAction.calledOnce, 'onDismiss has been called.');
  });

  test('alert is not hidden after clicking the close button when onDismiss action return false', async function (assert) {
    const dismissAction = sinon.stub().returns(false);
    await render(
      <template>
        <BsAlert
          @type='success'
          @fade={{false}}
          @onDismiss={{dismissAction}}
        >Test</BsAlert>
      </template>,
    );
    await click(`button.${closeButtonClass()}`);
    assert.ok(dismissAction.calledOnce, 'onDismiss has been called.');

    assert.dom('.alert').exists('alert is still visible');
  });

  test('onDismissed is called after modal is closed', async function (assert) {
    const dismissedAction = sinon.spy();
    await render(
      <template>
        <BsAlert
          @type='success'
          @fade={{false}}
          @onDismissed={{dismissedAction}}
        >Test</BsAlert>
      </template>,
    );
    await click(`button.${closeButtonClass()}`);
    assert.ok(dismissedAction.calledOnce, 'onDismissed has been called.');
  });

  test('When fade is true, onDismissed is called once when visible changes from true to false', async function (assert) {
    const dismissedAction = sinon.spy();
    class State {
      @tracked isAlertShown = true;
    }
    const state = new State();

    await render(
      <template>
        <BsAlert
          @fade={{true}}
          @onDismissed={{dismissedAction}}
          @visible={{state.isAlertShown}}
        >Test</BsAlert>
      </template>,
    );

    state.isAlertShown = false;
    await settled();

    assert.ok(dismissedAction.calledOnce, 'onDismissed is called once.');
  });

  test('When fade is false, onDismissed is called once when visible changes from true to false', async function (assert) {
    const dismissedAction = sinon.spy();
    class State {
      @tracked isAlertShown = true;
    }
    const state = new State();

    await render(
      <template>
        <BsAlert
          @fade={{false}}
          @onDismissed={{dismissedAction}}
          @visible={{state.isAlertShown}}
        >Test</BsAlert>
      </template>,
    );

    state.isAlertShown = false;
    await settled();

    assert.ok(dismissedAction.calledOnce, 'onDismissed is called once.');
  });

  test('When fade is false, onDismissed is not called when visible changes from false to false', async function (assert) {
    const dismissedAction = sinon.spy();
    class State {
      @tracked isAlertShown = false;
    }
    const state = new State();

    await render(
      <template>
        <BsAlert
          @fade={{false}}
          @onDismissed={{dismissedAction}}
          @visible={{state.isAlertShown}}
        >Test</BsAlert>
      </template>,
    );

    state.isAlertShown = true;
    await settled();

    assert.ok(dismissedAction.notCalled, 'onDismissed is not called.');
  });

  test('alert is initially hidden when visible=false', async function (assert) {
    await render(
      <template>
        <BsAlert
          @type='success'
          @fade={{false}}
          @visible={{false}}
        >Test</BsAlert>
      </template>,
    );

    assert.dom('.alert').doesNotExist('alert has no alert class');
    assert.dom('*').hasText('', 'alert has no content');
  });

  test('alert can be made visible when setting visible=true', async function (assert) {
    class State {
      @tracked visible = false;
    }
    const state = new State();
    await render(
      <template>
        <BsAlert
          @type='success'
          @visible={{state.visible}}
          @fade={{false}}
        >Test</BsAlert>
      </template>,
    );
    state.visible = true;
    await settled();

    assert.dom('.alert').exists('alert has alert class');
    assert.dom('.alert').hasClass('alert-success', 'alert has type class');
  });

  test('alert can be made visible when setting visible=true after manually dismissing it', async function (assert) {
    class State {
      @tracked visible = true;
    }
    const state = new State();

    const handleOnDismissed = () => {
      state.visible = false;
    };

    await render(
      <template>
        <BsAlert
          @type='success'
          @fade={{false}}
          @visible={{state.visible}}
          @onDismissed={{handleOnDismissed}}
        >
          Test
        </BsAlert>
      </template>,
    );

    assert.dom('.alert').exists('alert has alert class');

    await click(`button.${closeButtonClass()}`);
    assert.dom('.alert').doesNotExist('alert has no alert class');
    assert.dom('*').hasText('', 'alert has no content');

    state.visible = true;
    await settled();

    assert.dom('.alert').exists('alert has alert class');
  });

  test('dismissing alert does not change public visible property (DDAU)', async function (assert) {
    class State {
      @tracked visible = true;
    }
    const state = new State();
    await render(
      <template>
        <BsAlert
          @type='success'
          @visible={{state.visible}}
          @fade={{false}}
        >Test</BsAlert>
      </template>,
    );

    await click(`button.${closeButtonClass()}`);

    assert.true(state.visible, 'Does not modify visible property');
  });

  test('it passes accessibility checks', async function (assert) {
    await render(
      <template>
        <BsAlert @type='success'>Test</BsAlert>
      </template>,
    );

    await a11yAudit();
    assert.ok(true, 'A11y audit passed');
  });

  test('it allows to set a header using named blocks', async function (assert) {
    await render(
      <template>
        <BsAlert>
          <:header>Warning</:header>
          <:body><p>Some content</p></:body>
        </BsAlert>
      </template>,
    );

    assert.dom('.alert .alert-heading').exists({ count: 1 }, 'header exists');
    assert
      .dom('.alert .alert-heading')
      .hasText('Warning', 'block content is rendered inside header');
    assert
      .dom('.alert .alert-heading')
      .hasTagName('h4', 'header uses a h4 tag');
    assert
      .dom('.alert .alert-heading + p')
      .exists({ count: 1 }, 'body is rendered a as silbing of header');
  });

  test('tagName used for header element can be customized with headerTag argument', async function (assert) {
    await render(
      <template>
        <BsAlert @headerTag='h1'>
          <:header>Warning</:header>
          <:body><p>Some content</p></:body>
        </BsAlert>
      </template>,
    );
    assert.dom('.alert .alert-heading').hasTagName('h1');
  });
});
