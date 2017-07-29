import {
  find,
  findAll,
  click,
  keyEvent,
  waitUntil
} from 'ember-native-dom-helpers';
import wait from 'ember-test-helpers/wait';
import { moduleForComponent } from 'ember-qunit';
import {
  test,
  defaultButtonClass,
  visibilityClass
} from '../../helpers/bootstrap-test';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('bs-modal-simple', 'Integration | Component | bs-modal-simple', {
  integration: true
});

const transitionTimeout = 500;

test('Simple modal has header, footer and body', function(assert) {
  this.render(hbs`{{#bs-modal-simple title="Simple Dialog"}}Hello world!{{/bs-modal-simple}}`);

  assert.equal(findAll('.modal').length, 1, 'Modal exists.');
  assert.equal(findAll('.modal .modal-header').length, 1, 'Modal has header.');
  assert.equal(find('.modal .modal-header .modal-title').textContent.trim(), 'Simple Dialog', 'Modal header has correct title.');
  assert.equal(findAll('.modal .modal-footer').length, 1, 'Modal has footer.');
  assert.equal(findAll('.modal .modal-footer button').length, 1, 'Modal has button in footer.');
  assert.equal(find('.modal .modal-footer button').textContent.trim(), 'Ok', 'Modal button has default title.');
  assert.equal(findAll('.modal .modal-body').length, 1, 'Modal has body.');
  assert.equal(find('.modal .modal-body').textContent.trim(), 'Hello world!', 'Modal body has correct content.');
});

test('Simple modal has default CSS classes', function(assert) {
  this.render(hbs`{{#bs-modal-simple title="Simple Dialog"}}Hello world!{{/bs-modal-simple}}`);

  assert.ok(find('.modal').classList.contains('fade'), 'Modal has fade class');

  let done = assert.async();
  // wait for fade animation
  setTimeout(() => {
    assert.ok(find('.modal').classList.contains(visibilityClass()), 'Modal has visibility class');
    done();
  }, transitionTimeout);
});

test('Simple modal supports custom buttons', function(assert) {
  this.render(hbs`{{#bs-modal-simple title="Simple Dialog" closeTitle="Cancel" submitTitle="Ok"}}Hello world!{{/bs-modal-simple}}`);

  assert.equal(findAll(`.modal .modal-footer button.${defaultButtonClass()}`).length, 1, 'Modal has close button.');
  assert.equal(find(`.modal .modal-footer button.${defaultButtonClass()}`).textContent.trim(), 'Cancel', 'Close button has correct title.');
  assert.equal(findAll('.modal .modal-footer button.btn-primary').length, 1, 'Modal has submit button.');
  assert.equal(find('.modal .modal-footer button.btn-primary').textContent.trim(), 'Ok', 'Submit button has correct title.');

});

test('open modal is immediately shown', function(assert) {
  this.render(hbs`{{#bs-modal-simple title="Simple Dialog" fade=false}}Hello world!{{/bs-modal-simple}}`);

  assert.ok(find('.modal').classList.contains(visibilityClass()), 'Modal is visible');
  assert.equal(find('.modal').style.display, 'block', 'Modal is visible');
});

test('open modal is immediately shown [fade]', function(assert) {
  let done = assert.async();
  this.render(hbs`{{#bs-modal-simple title="Simple Dialog"}}Hello world!{{/bs-modal-simple}}`);

  assert.notOk(find('.modal').classList.contains(visibilityClass()), 'Modal is hidden');
  assert.notEqual(find('.modal').style.display, 'block', 'Modal is visible');

  // wait for fade animation
  setTimeout(() => {
    assert.equal(find('.modal').classList.contains(visibilityClass()), true, 'Modal is visible');
    assert.equal(find('.modal').style.display, 'block', 'Modal is visible');
    done();
  }, transitionTimeout);
});

test('open property shows modal', function(assert) {
  this.set('open', false);
  this.render(hbs`{{#bs-modal-simple title="Simple Dialog" fade=false open=open}}Hello world!{{/bs-modal-simple}}`);

  assert.notOk(find('.modal').classList.contains(visibilityClass()), 'Modal is hidden');
  assert.notEqual(find('.modal').style.display, 'block', 'Modal is hidden');
  this.set('open', true);
  assert.ok(find('.modal').classList.contains(visibilityClass()), 'Modal is visible');
  assert.equal(find('.modal').style.display, 'block', 'Modal is visible');
  this.set('open', false);
  assert.notOk(find('.modal').classList.contains(visibilityClass()), 'Modal is hidden');
  assert.notEqual(find('.modal').style.display, 'block', 'Modal is hidden');
});

test('open property shows modal [fade]', function(assert) {
  let done = assert.async();
  this.set('open', false);
  this.render(hbs`{{#bs-modal-simple title="Simple Dialog" open=open}}Hello world!{{/bs-modal-simple}}`);

  assert.equal(find('.modal').classList.contains(visibilityClass()), false, 'Modal is hidden');
  assert.notEqual(find('.modal').style.display, 'block', 'Modal is hidden');
  this.set('open', true);
  // wait for fade animation
  setTimeout(() => {
    assert.equal(find('.modal').classList.contains(visibilityClass()), true, 'Modal is visible');
    assert.equal(find('.modal').style.display, 'block', 'Modal is visible');
    this.set('open', false);
    setTimeout(() => {
      assert.equal(find('.modal').classList.contains(visibilityClass()), false, 'Modal is hidden');
      assert.notEqual(find('.modal').style.display, 'block', 'Modal is hidden');
      done();
    }, transitionTimeout);
  }, transitionTimeout);
});

test('closeButton property shows close button', function(assert) {
  this.set('closeButton', false);
  this.render(hbs`{{#bs-modal-simple title="Simple Dialog" closeButton=closeButton}}Hello world!{{/bs-modal-simple}}`);
  assert.equal(findAll('.modal .modal-header .close').length, 0, 'Modal has no close button');
  this.set('closeButton', true);
  assert.equal(findAll('.modal .modal-header .close').length, 1, 'Modal has close button');
});

test('fade property toggles fade effect', function(assert) {
  this.set('fade', false);
  this.render(hbs`{{#bs-modal-simple title="Simple Dialog" fade=fade}}Hello world!{{/bs-modal-simple}}`);
  assert.equal(find('.modal').classList.contains('fade'), false, 'Modal has no fade class');
  this.set('fade', true);
  assert.equal(find('.modal').classList.contains('fade'), true, 'Modal has fade class');
});

test('backdrop=true adds backdrop element', function(assert) {
  this.render(hbs`{{#bs-modal-simple title="Simple Dialog" backdrop=true}}Hello world!{{/bs-modal-simple}}`);
  let done = assert.async();
  // wait for fade animation
  setTimeout(() => {
    assert.equal(findAll('.modal-backdrop').length, 1, 'Modal has backdrop element');
    assert.ok(find('.modal-backdrop').classList.contains(visibilityClass()), 'Modal backdrop has visibility class');
    done();
  }, transitionTimeout);
});

test('backdrop=false removes backdrop element', function(assert) {
  this.render(hbs`{{#bs-modal-simple title="Simple Dialog" backdrop=false}}Hello world!{{/bs-modal-simple}}`);
  let done = assert.async();
  // wait for fade animation
  setTimeout(() => {
    assert.equal(findAll('.modal-backdrop').length, 0, 'Modal has no backdrop element');
    done();
  }, transitionTimeout);
});

test('clicking close button closes modal', function(assert) {
  this.render(hbs`{{#bs-modal-simple title="Simple Dialog"}}Hello world!{{/bs-modal-simple}}`);
  let done = assert.async();

  // wait for fade animation
  setTimeout(async() => {
    assert.equal(find('.modal').classList.contains(visibilityClass()), true, 'Modal is visible');
    await click('.modal .modal-header .close');

    // wait for fade animation
    setTimeout(() => {
      assert.equal(find('.modal').classList.contains(visibilityClass()), false, 'Modal is hidden');
      done();
    }, transitionTimeout);
  }, transitionTimeout);
});

test('clicking ok button closes modal', function(assert) {
  this.render(hbs`{{#bs-modal-simple title="Simple Dialog"}}Hello world!{{/bs-modal-simple}}`);
  let done = assert.async();

  // wait for fade animation
  setTimeout(async() => {
    assert.equal(find('.modal').classList.contains(visibilityClass()), true, 'Modal is visible');
    await click('.modal .modal-footer button');

    // wait for fade animation
    setTimeout(() => {
      assert.equal(find('.modal').classList.contains(visibilityClass()), false, 'Modal is hidden');
      done();
    }, transitionTimeout);
  }, transitionTimeout);
});

test('clicking close button leaves modal open when onHide action returns false', function(assert) {
  let hideAction = this.stub();
  hideAction.returns(false);
  this.on('hide', hideAction);

  this.render(hbs`{{#bs-modal-simple title="Simple Dialog" onHide=(action "hide")}}Hello world!{{/bs-modal-simple}}`);
  let done = assert.async();

  // wait for fade animation
  setTimeout(async() => {
    assert.equal(find('.modal').classList.contains(visibilityClass()), true, 'Modal is visible');
    await click('.modal .modal-header .close');

    // wait for fade animation
    setTimeout(() => {
      assert.equal(find('.modal').classList.contains(visibilityClass()), true, 'Modal is still visible');
      done();
    }, transitionTimeout);
  }, transitionTimeout);
});

test('can implement custom close buttons', function(assert) {
  this.render(hbs`
    {{#bs-modal-simple title="Simple Dialog" as |modal|}}
      Hello world! <a href="#" class="close-link" onclick={{modal.close}}>close</a>
    {{/bs-modal-simple}}
  `);

  let done = assert.async();

  // wait for fade animation
  setTimeout(async() => {
    assert.equal(find('.modal').classList.contains(visibilityClass()), true, 'Modal is visible');
    await click('.modal .close-link');

    // wait for fade animation
    setTimeout(() => {
      assert.equal(find('.modal').classList.contains(visibilityClass()), false, 'Modal is hidden');
      done();
    }, transitionTimeout);
  }, transitionTimeout);
});

test('size property adds size class', function(assert) {
  this.render(hbs`{{#bs-modal-simple title="Simple Dialog" size="lg"}}Hello world!{{/bs-modal-simple}}`);
  assert.ok(find('.modal-dialog').classList.contains('modal-lg'), 'Modal has size class.');
});

test('onShow/onShown actions fire correctly with fade=false', function(assert) {
  this.set('open', false);
  let showSpy = this.spy();
  let shownSpy = this.spy();
  this.on('openAction', showSpy);
  this.on('openedAction', shownSpy);
  this.render(hbs`{{#bs-modal-simple title="Simple Dialog" onShow=(action "openAction") onShown=(action "openedAction") open=open fade=false}}Hello world!{{/bs-modal-simple}}`);

  this.set('open', true);

  assert.ok(showSpy.calledOnce, 'onShow action fired after setting open=true');
  assert.ok(shownSpy.calledOnce, 'onShown action fired after setting open=true');
});

test('onShow/onShown fire correctly with fade=true', function(assert) {
  this.set('open', false);
  let showSpy = this.spy();
  let shownSpy = this.spy();
  this.on('openAction', showSpy);
  this.on('openedAction', shownSpy);
  this.render(hbs`{{#bs-modal-simple title="Simple Dialog" onShow=(action "openAction") onShown=(action "openedAction") open=open}}Hello world!{{/bs-modal-simple}}`);

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
  this.on('testAction', hideSpy);
  this.render(hbs`{{#bs-modal-simple title="Simple Dialog" fade=false onHide=(action "testAction")}}Hello world!{{/bs-modal-simple}}`);
  await click('.modal .modal-header .close');
  assert.ok(hideSpy.calledOnce);
});

test('onHidden is called after modal is closed', function(assert) {
  this.set('open', true);
  let hiddenSpy = this.spy();
  this.on('testAction', hiddenSpy);
  this.render(hbs`{{#bs-modal-simple title="Simple Dialog" onHidden=(action "testAction") open=open}}Hello world!{{/bs-modal-simple}}`);

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
  this.on('testAction', submitSpy);
  this.render(hbs`{{#bs-modal-simple title="Simple Dialog" closeTitle="Cancel" submitTitle="Ok" onSubmit=(action "testAction") as |modal|}}Hello world!{{/bs-modal-simple}}`);
  await click('.modal .modal-footer button.btn-primary');
  assert.ok(submitSpy.calledOnce);
});

test('when modal has a form and the submit button is clicked, the form is submitted', async function(assert) {
  let modalSpy = this.spy();
  let formSpy = this.spy();
  this.on('modalSubmit', modalSpy);
  this.on('formSubmit', formSpy);
  this.render(hbs`{{#bs-modal-simple title="Simple Dialog" closeTitle="Cancel" submitTitle="Ok" onSubmit=(action "modalSubmit") as |modal|}}{{#bs-form onSubmit=(action "formSubmit")}}{{/bs-form}}{{/bs-modal-simple}}`);
  await click('.modal .modal-footer button.btn-primary');
  assert.ok(formSpy.calledOnce);
  assert.notOk(modalSpy.called);
});

test('when modal has several forms and the submit button is clicked, those forms are submitted', async function(assert) {
  let modalSpy = this.spy();
  let formOneSpy = this.spy();
  let formTwoSpy = this.spy();
  this.on('modalSubmit', modalSpy);
  this.on('formOneSubmit', formOneSpy);
  this.on('formTwoSubmit', formTwoSpy);
  this.render(hbs`{{#bs-modal-simple title="Simple Dialog" closeTitle="Cancel" submitTitle="Ok" onSubmit=(action "modalSubmit") as |modal|}}{{#bs-form onSubmit=(action "formOneSubmit")}}{{/bs-form}}{{#bs-form onSubmit=(action "formTwoSubmit")}}{{/bs-form}}{{/bs-modal-simple}}`);
  await click('.modal .modal-footer button.btn-primary');
  assert.ok(formOneSpy.calledOnce);
  assert.ok(formTwoSpy.calledOnce);
  assert.notOk(modalSpy.called);
});

test('autofocus element is focused when present and fade=false', async function(assert) {
  let action = this.spy();
  this.on('focusAction', action);

  this.set('open', false);
  this.render(hbs`
    {{#bs-modal-simple title="Simple Dialog" fade=false open=open}}
      <input class="my-input" autofocus="autofocus" onfocus={{action "focusAction"}}> blahblahblah
    {{/bs-modal-simple}}
  `);
  await wait();

  this.set('open', true);
  assert.ok(action.calledOnce, 'focus was triggered on the autofocus element');
});

test('Pressing escape key will close the modal if keyboard=true', async function(assert) {
  let action = this.spy();
  this.on('testAction', action);
  this.render(hbs`{{#bs-modal-simple title="Simple Dialog" onHide=(action "testAction") keyboard=true}}Hello world!{{/bs-modal-simple}}`);
  await wait();

  // wait for fade animation
  await waitUntil(() => find('.modal').classList.contains(visibilityClass()));

  // trigger escape key event
  await keyEvent('.modal', 'keydown', 27);

  // wait for fade animation
  await waitUntil(() => !find('.modal').classList.contains(visibilityClass()));

  assert.ok(action.calledOnce, 'Action has been called.');
});

test('Pressing escape key will close the modal if keyboard=true and element is autofocused', async function(assert) {
  let action = this.spy();
  this.on('testAction', action);
  this.render(hbs`
    {{#bs-modal-simple title="Simple Dialog" onHide=(action "testAction") keyboard=true}}
      <input autofocus="autofocus"/>
    {{/bs-modal-simple}}

  `);
  await wait();

  // wait for fade animation
  await waitUntil(() => find('.modal').classList.contains(visibilityClass()));

  // trigger escape key event
  await keyEvent('.modal', 'keydown', 27);

  // wait for fade animation
  await waitUntil(() => !find('.modal').classList.contains(visibilityClass()));

  assert.ok(action.calledOnce, 'Action has been called.');
});

test('Pressing escape key is ignored if keyboard=false', async function(assert) {
  let hideSpy = this.spy();
  this.on('testAction', hideSpy);
  this.render(hbs`{{#bs-modal-simple title="Simple Dialog" onHide=(action "testAction") keyboard=false}}Hello world!{{/bs-modal-simple}}`);
  await wait();

  // wait for fade animation
  await waitUntil(() => find('.modal').classList.contains(visibilityClass()));

  // trigger escape key event
  await keyEvent('.modal', 'keydown', 27);

  assert.notOk(hideSpy.called);
});

test('Clicking on the backdrop will close the modal', async function(assert) {
  let hideSpy = this.spy();
  this.on('testAction', hideSpy);
  this.render(hbs`{{#bs-modal-simple title="Simple Dialog" onHide=(action "testAction")}}Hello world!{{/bs-modal-simple}}`);
  await wait();

  // wait for fade animation
  await waitUntil(() => find('.modal').classList.contains(visibilityClass()));

  await click('.modal');

  // wait for fade animation
  await waitUntil(() => !find('.modal').classList.contains(visibilityClass()));
  assert.ok(hideSpy.calledOnce);
});

test('Clicking on the backdrop is ignored when backdropClose=false', async function(assert) {
  let hideSpy = this.spy();
  this.on('testAction', hideSpy);
  this.render(hbs`{{#bs-modal-simple title="Simple Dialog" onHide=(action "testAction") backdropClose=false}}Hello world!{{/bs-modal-simple}}`);
  let done = assert.async();

  // wait for fade animation
  await waitUntil(() => find('.modal').classList.contains(visibilityClass()));

  await click('.modal');

  // wait for fade animation
  setTimeout(() => {
    assert.equal(find('.modal').classList.contains(visibilityClass()), true, 'Modal is still visible');
    assert.notOk(hideSpy.called);
    done();
  }, transitionTimeout);
});

test('Renders in wormhole if renderInPlace is not set', function(assert) {
  this.set('show', false);
  this.render(hbs`<div id="ember-bootstrap-wormhole"></div>{{#if show}}{{#bs-modal-simple title="Simple Dialog"}}Hello world!{{/bs-modal-simple}}{{/if}}`);
  this.set('show', true);

  assert.equal(findAll('.modal').length, 1, 'Modal exists.');
  assert.equal(findAll('#ember-bootstrap-wormhole .modal').length, 1, 'Modal exists in wormhole');
});

test('Renders in place (no wormhole) if renderInPlace is set', function(assert) {
  this.set('show', false);
  this.render(hbs`<div id="ember-bootstrap-wormhole"></div>{{#if show}}{{#bs-modal-simple title="Simple Dialog" renderInPlace=true}}Hello world!{{/bs-modal-simple}}{{/if}}`);
  this.set('show', true);

  assert.equal(findAll('.modal').length, 1, 'Modal exists.');
  assert.equal(findAll('#ember-bootstrap-wormhole .modal').length, 0, 'Modal exists outside wormhole');
});

test('Removes "modal-open" class when component is removed from view', async function(assert) {
  this.set('renderComponent', true);
  this.render(hbs`{{#if renderComponent}}{{#bs-modal-simple title="Simple Dialog"}}Hello world!{{/bs-modal-simple}}{{/if}}`);

  // wait for fade animation
  await waitUntil(() => find('.modal').classList.contains(visibilityClass()));
  assert.ok(document.body.classList.contains('modal-open'), 'body element has "modal-open" class.');

  this.set('renderComponent', false);

  assert.ok(!document.body.classList.contains('modal-open'), 'body element does not have "modal-open" class.');
});

test('Resets scroll bar when component is removed from view', async function(assert) {
  document.body.style.paddingRight = '50px';
  this.set('renderComponent', true);
  this.render(hbs`{{#if renderComponent}}{{#bs-modal-simple title="Simple Dialog"}}Hello world!{{/bs-modal-simple}}{{/if}}`);

  await waitUntil(() => find('.modal').classList.contains(visibilityClass()));

  document.body.style.paddingRight = '0px';
  this.set('renderComponent', false);

  assert.equal(document.body.style.paddingRight, '50px', 'paddingRight restored to 50px');
  document.body.style.paddingRight = '0px';
});

test('Modal yields close action', async function(assert) {
  let closeAction = this.spy();
  this.on('close', closeAction);

  this.render(hbs`{{#bs-modal-simple onHide=(action "close") as |modal|}}
      <button id="close" {{action modal.close}}>Close</button>
  {{/bs-modal-simple}}`);

  await click('#close');
  assert.ok(closeAction.calledOnce, 'close action has been called.');
});

test('Modal yields submit action', async function(assert) {
  let submitAction = this.spy();
  this.on('submit', submitAction);

  this.render(hbs`{{#bs-modal-simple onSubmit=(action "submit") as |modal|}}
      <button id="submit" {{action modal.submit}}>Submit</button>
  {{/bs-modal-simple}}`);

  await click('#submit');
  assert.ok(submitAction.calledOnce, 'submit action has been called.');
});

test('it passes along class attribute', function(assert) {
  this.render(hbs`
    {{#bs-modal-simple fade=false class="custom"}}
      template block text
    {{/bs-modal-simple}}
  `);

  assert.equal(findAll('.modal.custom').length, 1);
});

test('closing modal does not modify public open property', async function(assert) {
  this.set('open', true);
  this.render(hbs`{{#bs-modal-simple title="Simple Dialog" fade=false open=open}}Hello world!{{/bs-modal-simple}}`);
  await click('.modal .modal-header .close');
  assert.equal(this.get('open'), true, 'DOes not change open property');
});
