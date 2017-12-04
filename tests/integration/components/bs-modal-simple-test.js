import {
  find,
  click,
  keyEvent,
  waitUntil
} from 'ember-native-dom-helpers';
import { module } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled } from '@ember/test-helpers';
import {
  test,
  testRequiringFocus,
  defaultButtonClass,
  visibilityClass,
  testRequiringTransitions
} from '../../helpers/bootstrap-test';
import hbs from 'htmlbars-inline-precompile';

const transitionTimeout = 600;

module('Integration | Component | bs-modal-simple', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.actions = {};
    this.send = (actionName, ...args) => this.actions[actionName].apply(this, args);
  });

  test('Simple modal has header, footer and body', async function(assert) {
    await render(hbs`{{#bs-modal-simple fade=false title="Simple Dialog"}}Hello world!{{/bs-modal-simple}}`);
    await settled();

    assert.dom('.modal').exists({ count: 1 }, 'Modal exists.');
    assert.dom('.modal .modal-header').exists({ count: 1 }, 'Modal has header.');
    assert.dom('.modal .modal-header .modal-title').hasText('Simple Dialog', 'Modal header has correct title.');
    assert.dom('.modal .modal-footer').exists({ count: 1 }, 'Modal has footer.');
    assert.dom('.modal .modal-footer button').exists({ count: 1 }, 'Modal has button in footer.');
    assert.dom('.modal .modal-footer button').hasText('Ok', 'Modal button has default title.');
    assert.dom('.modal .modal-body').exists({ count: 1 }, 'Modal has body.');
    assert.dom('.modal .modal-body').hasText('Hello world!', 'Modal body has correct content.');
  });

  test('Hidden modal does not render', async function(assert) {
    await render(hbs`{{#bs-modal-simple open=false title="Simple Dialog"}}Hello world!{{/bs-modal-simple}}`);

    assert.dom('.modal *').doesNotExist('Modal does not exist.');
  });

  test('Simple modal has default CSS classes', async function(assert) {
    await render(hbs`{{#bs-modal-simple title="Simple Dialog"}}Hello world!{{/bs-modal-simple}}`);

    assert.dom('.modal').hasClass('fade', 'Modal has fade class');

    let done = assert.async();
    // wait for fade animation
    setTimeout(() => {
      assert.dom('.modal').hasClass(visibilityClass(), 'Modal has visibility class');
      done();
    }, transitionTimeout);
  });

  test('Simple modal supports custom buttons', async function(assert) {
    await render(
      hbs`{{#bs-modal-simple title="Simple Dialog" closeTitle="Cancel" submitTitle="Ok"}}Hello world!{{/bs-modal-simple}}`
    );
    await settled();

    assert.dom(`.modal .modal-footer button.${defaultButtonClass()}`).exists({ count: 1 }, 'Modal has close button.');
    assert.dom(`.modal .modal-footer button.${defaultButtonClass()}`).hasText('Cancel', 'Close button has correct title.');
    assert.dom('.modal .modal-footer button.btn-primary').exists({ count: 1 }, 'Modal has submit button.');
    assert.dom('.modal .modal-footer button.btn-primary').hasText('Ok', 'Submit button has correct title.');

  });

  test('Simple modal supports a custom submit button type', async function(assert) {
    await render(
      hbs`{{#bs-modal-simple closeTitle="Cancel" submitTitle="Ok" submitButtonType="danger"}}Hello world!{{/bs-modal-simple}}`
    );
    await settled();

    assert.dom('.modal .modal-footer button.btn-danger').exists({ count: 1 }, 'Modal has submit button with btn-danger class.');
  });

  test('open modal is immediately shown', async function(assert) {
    await render(hbs`{{#bs-modal-simple title="Simple Dialog" fade=false}}Hello world!{{/bs-modal-simple}}`);

    assert.dom('.modal').hasClass(visibilityClass(), 'Modal is visible');
    assert.equal(find('.modal').style.display, 'block', 'Modal is visible');
  });

  testRequiringTransitions('open modal is immediately shown [fade]', async function(assert) {
    let done = assert.async();
    await render(hbs`{{#bs-modal-simple title="Simple Dialog"}}Hello world!{{/bs-modal-simple}}`);

    assert.dom('.modal').hasNoClass(visibilityClass(), 'Modal is hidden');
    // assert.notEqual(find('.modal').style.display, 'block', 'Modal is visible');

    // wait for fade animation
    setTimeout(() => {
      assert.dom('.modal').hasClass(visibilityClass(), 'Modal is visible');
      assert.equal(find('.modal').style.display, 'block', 'Modal is visible');
      done();
    }, transitionTimeout);
  });

  test('open property shows modal', async function(assert) {
    this.set('open', false);
    await render(hbs`{{#bs-modal-simple title="Simple Dialog" fade=false open=open}}Hello world!{{/bs-modal-simple}}`);

    assert.dom('.modal').doesNotExist('Modal is hidden');
    this.set('open', true);
    assert.dom('.modal').hasClass(visibilityClass(), 'Modal is visible');
    assert.equal(find('.modal').style.display, 'block', 'Modal is visible');
    this.set('open', false);
    assert.dom('.modal').doesNotExist('Modal is hidden');
  });

  testRequiringTransitions('open property shows modal [fade]', async function(assert) {
    let done = assert.async();
    this.set('open', false);
    await render(hbs`{{#bs-modal-simple title="Simple Dialog" open=open}}Hello world!{{/bs-modal-simple}}`);

    assert.dom('.modal').doesNotExist('Modal is hidden');
    this.set('open', true);
    // wait for fade animation
    setTimeout(() => {
      assert.dom('.modal').hasClass(visibilityClass(), 'Modal is visible');
      assert.equal(find('.modal').style.display, 'block', 'Modal is visible');
      this.set('open', false);
      setTimeout(() => {
        assert.dom('.modal').doesNotExist('Modal is hidden');
        done();
      }, transitionTimeout);
    }, transitionTimeout);
  });

  test('closeButton property shows close button', async function(assert) {
    this.set('closeButton', false);
    await render(
      hbs`{{#bs-modal-simple title="Simple Dialog" closeButton=closeButton}}Hello world!{{/bs-modal-simple}}`
    );
    await settled();

    assert.dom('.modal .modal-header .close').doesNotExist('Modal has no close button');
    this.set('closeButton', true);
    assert.dom('.modal .modal-header .close').exists({ count: 1 }, 'Modal has close button');
  });

  test('fade property toggles fade effect', async function(assert) {
    this.set('fade', false);
    await render(hbs`{{#bs-modal-simple title="Simple Dialog" fade=fade}}Hello world!{{/bs-modal-simple}}`);
    assert.dom('.modal').hasNoClass('fade', 'Modal has no fade class');
    this.set('fade', true);
    assert.dom('.modal').hasClass('fade', 'Modal has fade class');
  });

  test('backdrop=true adds backdrop element', async function(assert) {
    await render(hbs`{{#bs-modal-simple title="Simple Dialog" backdrop=true}}Hello world!{{/bs-modal-simple}}`);
    let done = assert.async();
    // wait for fade animation
    setTimeout(() => {
      assert.dom('.modal-backdrop').exists({ count: 1 }, 'Modal has backdrop element');
      assert.dom('.modal-backdrop').hasClass(visibilityClass(), 'Modal backdrop has visibility class');
      done();
    }, transitionTimeout);
  });

  test('backdrop=false removes backdrop element', async function(assert) {
    await render(hbs`{{#bs-modal-simple title="Simple Dialog" backdrop=false}}Hello world!{{/bs-modal-simple}}`);
    let done = assert.async();
    // wait for fade animation
    setTimeout(() => {
      assert.dom('.modal-backdrop').doesNotExist('Modal has no backdrop element');
      done();
    }, transitionTimeout);
  });

  test('clicking close button closes modal', async function(assert) {
    await render(hbs`{{#bs-modal-simple title="Simple Dialog"}}Hello world!{{/bs-modal-simple}}`);
    let done = assert.async();

    // wait for fade animation
    setTimeout(async() => {
      assert.dom('.modal').exists({ count: 1 }, 'Modal is visible');
      assert.dom('.modal').hasClass(visibilityClass(), 'Modal is visible');
      await click('.modal .modal-header .close');

      // wait for fade animation
      setTimeout(() => {
        assert.dom('.modal').doesNotExist('Modal is hidden');
        done();
      }, transitionTimeout);
    }, transitionTimeout);
  });

  test('clicking ok button closes modal', async function(assert) {
    await render(hbs`{{#bs-modal-simple title="Simple Dialog"}}Hello world!{{/bs-modal-simple}}`);
    let done = assert.async();

    // wait for fade animation
    setTimeout(async() => {
      assert.dom('.modal').exists({ count: 1 }, 'Modal is visible');
      assert.dom('.modal').hasClass(visibilityClass(), 'Modal is visible');
      await click('.modal .modal-footer button');

      // wait for fade animation
      setTimeout(() => {
        assert.dom('.modal').doesNotExist('Modal is hidden');
        done();
      }, transitionTimeout);
    }, transitionTimeout);
  });

  test('clicking close button leaves modal open when onHide action returns false', async function(assert) {
    let hideAction = this.stub();
    hideAction.returns(false);
    this.actions.hide = hideAction;

    await render(
      hbs`{{#bs-modal-simple title="Simple Dialog" onHide=(action "hide")}}Hello world!{{/bs-modal-simple}}`
    );
    let done = assert.async();

    // wait for fade animation
    setTimeout(async() => {
      assert.dom('.modal').exists({ count: 1 }, 'Modal is visible');
      assert.dom('.modal').hasClass(visibilityClass(), 'Modal is visible');
      await click('.modal .modal-header .close');

      // wait for fade animation
      setTimeout(() => {
        assert.dom('.modal').hasClass(visibilityClass(), 'Modal is still visible');
        done();
      }, transitionTimeout);
    }, transitionTimeout);
  });

  test('can implement custom close buttons', async function(assert) {
    await render(hbs`
      {{#bs-modal-simple title="Simple Dialog" as |modal|}}
        Hello world! <a href="#" class="close-link" onclick={{modal.close}}>close</a>
      {{/bs-modal-simple}}
    `);

    let done = assert.async();

    // wait for fade animation
    setTimeout(async() => {
      assert.dom('.modal').exists({ count: 1 }, 'Modal is visible');
      assert.dom('.modal').hasClass(visibilityClass(), 'Modal is visible');
      await click('.modal .close-link');

      // wait for fade animation
      setTimeout(() => {
        assert.dom('.modal').doesNotExist('Modal is hidden');
        done();
      }, transitionTimeout);
    }, transitionTimeout);
  });

  test('size property adds size class', async function(assert) {
    await render(hbs`{{#bs-modal-simple title="Simple Dialog" size="lg" fade=false}}Hello world!{{/bs-modal-simple}}`);
    assert.dom('.modal-dialog').hasClass('modal-lg', 'Modal has size class.');
  });

  test('onShow/onShown actions fire correctly with fade=false', async function(assert) {
    this.set('open', false);
    let showSpy = this.spy();
    let shownSpy = this.spy();
    this.actions.openAction = showSpy;
    this.actions.openedAction = shownSpy;
    await render(
      hbs`{{#bs-modal-simple title="Simple Dialog" onShow=(action "openAction") onShown=(action "openedAction") open=open fade=false}}Hello world!{{/bs-modal-simple}}`
    );

    this.set('open', true);

    assert.ok(showSpy.calledOnce, 'onShow action fired after setting open=true');
    assert.ok(shownSpy.calledOnce, 'onShown action fired after setting open=true');
  });

  testRequiringTransitions('onShow/onShown fire correctly with fade=true', async function(assert) {
    this.set('open', false);
    let showSpy = this.spy();
    let shownSpy = this.spy();
    this.actions.openAction = showSpy;
    this.actions.openedAction = shownSpy;
    await render(
      hbs`{{#bs-modal-simple title="Simple Dialog" onShow=(action "openAction") onShown=(action "openedAction") open=open}}Hello world!{{/bs-modal-simple}}`
    );

    this.set('open', true);
    assert.notOk(showSpy.called, 'onShow action did not fire immediately');
    assert.notOk(shownSpy.called, 'onShown action did not fire immediately');

    // wait for fade animation
    let done = assert.async();
    setTimeout(() => {
      assert.ok(showSpy.calledOnce, 'onShow action did fire');
      assert.ok(shownSpy.calledOnce, 'onShown action did fire');

      done();
    }, transitionTimeout);
  });

  test('onHide is called when clicking close button', async function(assert) {
    let hideSpy = this.spy();
    this.actions.testAction = hideSpy;
    await render(
      hbs`{{#bs-modal-simple title="Simple Dialog" fade=false onHide=(action "testAction")}}Hello world!{{/bs-modal-simple}}`
    );
    await click('.modal .modal-header .close');
    assert.ok(hideSpy.calledOnce);
  });

  test('onHidden is called after modal is closed', async function(assert) {
    this.set('open', true);
    let hiddenSpy = this.spy();
    this.actions.testAction = hiddenSpy;
    await render(
      hbs`{{#bs-modal-simple title="Simple Dialog" onHidden=(action "testAction") open=open}}Hello world!{{/bs-modal-simple}}`
    );

    this.set('open', false);
    let done = assert.async();
    // wait for fade animation
    setTimeout(() => {
      assert.ok(hiddenSpy.calledOnce);
      done();
    }, transitionTimeout);

  });

  test('onSubmit is called when clicking submit button', async function(assert) {
    let submitSpy = this.spy();
    this.actions.testAction = submitSpy;
    await render(
      hbs`{{#bs-modal-simple title="Simple Dialog" closeTitle="Cancel" submitTitle="Ok" onSubmit=(action "testAction") as |modal|}}Hello world!{{/bs-modal-simple}}`
    );
    await settled();
    await click('.modal .modal-footer button.btn-primary');
    assert.ok(submitSpy.calledOnce);
  });

  test('when modal has a form and the submit button is clicked, the form is submitted', async function(assert) {
    let modalSpy = this.spy();
    let formSpy = this.spy();
    this.actions.modalSubmit = modalSpy;
    this.actions.formSubmit = formSpy;
    await render(
      hbs`{{#bs-modal-simple title="Simple Dialog" closeTitle="Cancel" submitTitle="Ok" onSubmit=(action "modalSubmit") as |modal|}}{{#bs-form onSubmit=(action "formSubmit")}}{{/bs-form}}{{/bs-modal-simple}}`
    );
    await settled();
    await click('.modal .modal-footer button.btn-primary');
    assert.ok(formSpy.calledOnce);
    assert.notOk(modalSpy.called);
  });

  test('when modal has several forms and the submit button is clicked, those forms are submitted', async function(assert) {
    let modalSpy = this.spy();
    let formOneSpy = this.spy();
    let formTwoSpy = this.spy();
    this.actions.modalSubmit = modalSpy;
    this.actions.formOneSubmit = formOneSpy;
    this.actions.formTwoSubmit = formTwoSpy;
    await render(
      hbs`{{#bs-modal-simple title="Simple Dialog" closeTitle="Cancel" submitTitle="Ok" onSubmit=(action "modalSubmit") as |modal|}}{{#bs-form onSubmit=(action "formOneSubmit")}}{{/bs-form}}{{#bs-form onSubmit=(action "formTwoSubmit")}}{{/bs-form}}{{/bs-modal-simple}}`
    );
    await settled();
    await click('.modal .modal-footer button.btn-primary');
    assert.ok(formOneSpy.calledOnce);
    assert.ok(formTwoSpy.calledOnce);
    assert.notOk(modalSpy.called);
  });

  testRequiringFocus('autofocus element is focused when present and fade=false', async function(assert) {
    let action = this.spy();
    this.actions.focusAction = action;

    this.set('open', false);
    await render(hbs`
      {{#bs-modal-simple title="Simple Dialog" fade=false open=open}}
        <input class="my-input" autofocus="autofocus" onfocus={{action "focusAction"}}> blahblahblah
      {{/bs-modal-simple}}
    `);
    await settled();

    this.set('open', true);
    await settled();
    assert.ok(action.calledOnce, 'focus was triggered on the autofocus element');
  });

  testRequiringFocus('Pressing escape key will close the modal if keyboard=true', async function(assert) {
    let action = this.spy();
    this.actions.testAction = action;
    await render(
      hbs`{{#bs-modal-simple title="Simple Dialog" onHide=(action "testAction") keyboard=true}}Hello world!{{/bs-modal-simple}}`
    );
    await settled();

    // wait for fade animation
    await waitUntil(() => find('.modal').classList.contains(visibilityClass()));

    // trigger escape key event
    await keyEvent('.modal', 'keydown', 27);

    // wait for fade animation
    await waitUntil(() => !find('.modal'));

    assert.ok(action.calledOnce, 'Action has been called.');
  });

  testRequiringFocus('Pressing escape key will close the modal if keyboard=true and element is autofocused', async function(assert) {
    let action = this.spy();
    this.actions.testAction = action;
    await render(hbs`
      {{#bs-modal-simple title="Simple Dialog" onHide=(action "testAction") keyboard=true}}
        <input autofocus="autofocus"/>
      {{/bs-modal-simple}}

    `);
    await settled();

    // wait for fade animation
    await waitUntil(() => find('.modal').classList.contains(visibilityClass()));

    // trigger escape key event
    await keyEvent('.modal', 'keydown', 27);

    // wait for fade animation
    await waitUntil(() => !find('.modal'));

    assert.ok(action.calledOnce, 'Action has been called.');
  });

  testRequiringFocus('Pressing escape key is ignored if keyboard=false', async function(assert) {
    let hideSpy = this.spy();
    this.actions.testAction = hideSpy;
    await render(
      hbs`{{#bs-modal-simple title="Simple Dialog" onHide=(action "testAction") keyboard=false}}Hello world!{{/bs-modal-simple}}`
    );
    await settled();

    // wait for fade animation
    await waitUntil(() => find('.modal').classList.contains(visibilityClass()));

    // trigger escape key event
    await keyEvent('.modal', 'keydown', 27);

    assert.notOk(hideSpy.called);
  });

  test('Clicking on the backdrop will close the modal', async function(assert) {
    let hideSpy = this.spy();
    this.actions.testAction = hideSpy;
    await render(
      hbs`{{#bs-modal-simple title="Simple Dialog" onHide=(action "testAction")}}Hello world!{{/bs-modal-simple}}`
    );
    await settled();

    // wait for fade animation
    await waitUntil(() => find('.modal').classList.contains(visibilityClass()));

    await click('.modal');

    // wait for fade animation
    await waitUntil(() => !find('.modal'));
    assert.ok(hideSpy.calledOnce);
  });

  test('Clicking on the backdrop is ignored when backdropClose=false', async function(assert) {
    let hideSpy = this.spy();
    this.actions.testAction = hideSpy;
    await render(
      hbs`{{#bs-modal-simple title="Simple Dialog" onHide=(action "testAction") backdropClose=false}}Hello world!{{/bs-modal-simple}}`
    );
    let done = assert.async();

    // wait for fade animation
    await waitUntil(() => find('.modal').classList.contains(visibilityClass()));

    await click('.modal');

    // wait for fade animation
    setTimeout(() => {
      assert.dom('.modal').hasClass(visibilityClass(), 'Modal is still visible');
      assert.notOk(hideSpy.called);
      done();
    }, transitionTimeout);
  });

  test('Renders in wormhole if renderInPlace is not set', async function(assert) {
    this.set('show', false);
    await render(
      hbs`<div id="ember-bootstrap-wormhole"></div>{{#if show}}{{#bs-modal-simple title="Simple Dialog"}}Hello world!{{/bs-modal-simple}}{{/if}}`
    );
    this.set('show', true);

    assert.dom('.modal').exists({ count: 1 }, 'Modal exists.');
    assert.dom('#ember-bootstrap-wormhole .modal').exists({ count: 1 }, 'Modal exists in wormhole');
  });

  test('Renders in place (no wormhole) if renderInPlace is set', async function(assert) {
    this.set('show', false);
    await render(
      hbs`<div id="ember-bootstrap-wormhole"></div>{{#if show}}{{#bs-modal-simple title="Simple Dialog" renderInPlace=true}}Hello world!{{/bs-modal-simple}}{{/if}}`
    );
    this.set('show', true);

    assert.dom('.modal').exists({ count: 1 }, 'Modal exists.');
    assert.dom('#ember-bootstrap-wormhole .modal').doesNotExist('Modal exists outside wormhole');
  });

  test('Removes "modal-open" class when component is removed from view', async function(assert) {
    this.set('renderComponent', true);
    await render(
      hbs`{{#if renderComponent}}{{#bs-modal-simple title="Simple Dialog"}}Hello world!{{/bs-modal-simple}}{{/if}}`
    );

    // wait for fade animation
    await waitUntil(() => find('.modal').classList.contains(visibilityClass()));
    assert.dom(document.body).hasClass('modal-open', 'body element has "modal-open" class.');

    this.set('renderComponent', false);

    assert.ok(!document.body.classList.contains('modal-open'), 'body element does not have "modal-open" class.');
  });

  test('Resets scroll bar when component is removed from view', async function(assert) {
    document.body.style.paddingRight = '50px';
    this.set('renderComponent', true);
    await render(
      hbs`{{#if renderComponent}}{{#bs-modal-simple title="Simple Dialog"}}Hello world!{{/bs-modal-simple}}{{/if}}`
    );

    await waitUntil(() => find('.modal').classList.contains(visibilityClass()));

    document.body.style.paddingRight = '0px';
    this.set('renderComponent', false);

    assert.equal(document.body.style.paddingRight, '50px', 'paddingRight restored to 50px');
    document.body.style.paddingRight = '0px';
  });

  test('Modal yields close action', async function(assert) {
    let closeAction = this.spy();
    this.actions.close = closeAction;

    await render(hbs`{{#bs-modal-simple onHide=(action "close") as |modal|}}
        <button id="close" {{action modal.close}}>Close</button>
    {{/bs-modal-simple}}`);
    await settled();

    await click('#close');
    assert.ok(closeAction.calledOnce, 'close action has been called.');
  });

  test('Modal yields submit action', async function(assert) {
    let submitAction = this.spy();
    this.actions.submit = submitAction;

    await render(hbs`{{#bs-modal-simple onSubmit=(action "submit") as |modal|}}
        <button id="submit" {{action modal.submit}}>Submit</button>
    {{/bs-modal-simple}}`);
    await settled();

    await click('#submit');
    assert.ok(submitAction.calledOnce, 'submit action has been called.');
  });

  test('it passes along class attribute', async function(assert) {
    await render(hbs`
      {{#bs-modal-simple fade=false class="custom"}}
        template block text
      {{/bs-modal-simple}}
    `);

    assert.dom('.modal.custom').exists({ count: 1 });
  });

  test('closing modal does not modify public open property', async function(assert) {
    this.set('open', true);
    await render(hbs`{{#bs-modal-simple title="Simple Dialog" fade=false open=open}}Hello world!{{/bs-modal-simple}}`);
    await click('.modal .modal-header .close');
    assert.equal(this.get('open'), true, 'DOes not change open property');
  });
});
