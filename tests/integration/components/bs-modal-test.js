import Component from '@ember/component';
import { find, findAll, click } from 'ember-native-dom-helpers';
import { module } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { test } from '../../helpers/bootstrap-test';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | bs-modal', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.actions = {};
    this.send = (actionName, ...args) => this.actions[actionName].apply(this, args);
  });

  test('Modal yields header, footer and body components', async function(assert) {
    await render(hbs`{{#bs-modal as |modal|}}
      {{modal.header title="Dialog"}}
      {{#modal.body}}Hello world!{{/modal.body}}
      {{modal.footer}}
    {{/bs-modal}}`);

    assert.equal(findAll('.modal').length, 1, 'Modal exists.');
    assert.equal(findAll('.modal .modal-header').length, 1, 'Modal has header.');
    assert.equal(find('.modal .modal-header .modal-title').textContent.trim(), 'Dialog', 'Modal header has correct title.');
    assert.equal(findAll('.modal .modal-footer').length, 1, 'Modal has footer.');
    assert.equal(findAll('.modal .modal-footer button').length, 1, 'Modal has button in footer.');
    assert.equal(find('.modal .modal-footer button').textContent.trim(), 'Ok', 'Modal button has default title.');
    assert.equal(findAll('.modal .modal-body').length, 1, 'Modal has body.');
    assert.equal(find('.modal .modal-body').textContent.trim(), 'Hello world!', 'Modal body has correct content.');
  });

  test('Hidden modal does not render', async function(assert) {
    await render(hbs`{{#bs-modal open=false as |modal|}}
      {{modal.header title="Dialog"}}
      {{#modal.body}}Hello world!{{/modal.body}}
      {{modal.footer}}
    {{/bs-modal}}`);

    assert.equal(findAll('.modal *').length, 0, 'Modal does not exist.');
  });

  test('clicking ok button closes modal when autoClose=true with custom component hierarchy', async function(assert) {
    this.owner.register('component:my-component', Component.extend({
      layout: hbs`{{yield}}`
    }));

    await render(hbs`
      {{#bs-modal title="Simple Dialog" body=false footer=false as |modal|}}
        {{#my-component}}
          {{#modal.body}}Hello world!{{/modal.body}}
          {{modal.footer}}
        {{/my-component}}
      {{/bs-modal}}
      
    `);

    await click('.modal .modal-footer button');
    assert.equal(findAll('.modal').length, 0, 'Modal is hidden');
  });

  test('Modal yields close action', async function(assert) {
    let closeAction = this.spy();
    this.actions.close = closeAction;

    await render(hbs`{{#bs-modal onHide=(action "close") as |modal|}}
      {{modal.header title="Dialog"}}
      {{#modal.body}}Hello world!{{/modal.body}}
      {{#modal.footer}}
        <button id="close" {{action modal.close}}>Close</button>
      {{/modal.footer}}
    {{/bs-modal}}`);

    await click('#close');
    assert.ok(closeAction.calledOnce, 'close action has been called.');
  });

  test('Modal yields submit action', async function(assert) {
    let submitAction = this.spy();
    this.actions.submit = submitAction;

    await render(hbs`{{#bs-modal onSubmit=(action "submit") as |modal|}}
      {{modal.header title="Dialog"}}
      {{#modal.body}}Hello world!{{/modal.body}}
      {{#modal.footer}}
        <button id="submit" {{action modal.submit}}>Submit</button>
      {{/modal.footer}}
    {{/bs-modal}}`);

    await click('#submit');
    assert.ok(submitAction.calledOnce, 'submit action has been called.');
  });
});
