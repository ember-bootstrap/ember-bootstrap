import Component from '@ember/component';
import { find, findAll, click } from 'ember-native-dom-helpers';
import { moduleForComponent } from 'ember-qunit';
import { test } from '../../helpers/bootstrap-test';
import wait from 'ember-test-helpers/wait';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('bs-modal', 'Integration | Component | bs-modal', {
  integration: true
});

test('Modal yields header, footer and body components', async function(assert) {
  this.render(hbs`{{#bs-modal as |modal|}}
    {{modal.header title="Dialog"}}
    {{#modal.body}}Hello world!{{/modal.body}}
    {{modal.footer}}
  {{/bs-modal}}`);
  await wait();

  assert.equal(findAll('.modal').length, 1, 'Modal exists.');
  assert.equal(findAll('.modal .modal-header').length, 1, 'Modal has header.');
  assert.equal(find('.modal .modal-header .modal-title').textContent.trim(), 'Dialog', 'Modal header has correct title.');
  assert.equal(findAll('.modal .modal-footer').length, 1, 'Modal has footer.');
  assert.equal(findAll('.modal .modal-footer button').length, 1, 'Modal has button in footer.');
  assert.equal(find('.modal .modal-footer button').textContent.trim(), 'Ok', 'Modal button has default title.');
  assert.equal(findAll('.modal .modal-body').length, 1, 'Modal has body.');
  assert.equal(find('.modal .modal-body').textContent.trim(), 'Hello world!', 'Modal body has correct content.');
});

test('Hidden modal does not render', function(assert) {
  this.render(hbs`{{#bs-modal open=false as |modal|}}
    {{modal.header title="Dialog"}}
    {{#modal.body}}Hello world!{{/modal.body}}
    {{modal.footer}}
  {{/bs-modal}}`);

  assert.equal(findAll('.modal *').length, 0, 'Modal does not exist.');
});

test('clicking ok button closes modal when autoClose=true with custom component hierarchy', async function(assert) {
  this.register('component:my-component', Component.extend({
    layout: hbs`{{yield}}`
  }));

  this.render(hbs`
    {{#bs-modal title="Simple Dialog" body=false footer=false as |modal|}}
      {{#my-component}}
        {{#modal.body}}Hello world!{{/modal.body}}
        {{modal.footer}}
      {{/my-component}}
    {{/bs-modal}}
  `);
  await wait();

  await click('.modal .modal-footer button');
  await wait();
  assert.equal(findAll('.modal').length, 0, 'Modal is hidden');
});

test('Modal yields close action', async function(assert) {
  let closeAction = this.spy();
  this.on('close', closeAction);

  this.render(hbs`{{#bs-modal onHide=(action "close") as |modal|}}
    {{modal.header title="Dialog"}}
    {{#modal.body}}Hello world!{{/modal.body}}
    {{#modal.footer}}
      <button id="close" {{action modal.close}}>Close</button>
    {{/modal.footer}}
  {{/bs-modal}}`);
  await wait();

  await click('#close');
  assert.ok(closeAction.calledOnce, 'close action has been called.');
});

test('Modal yields submit action', async function(assert) {
  let submitAction = this.spy();
  this.on('submit', submitAction);

  this.render(hbs`{{#bs-modal onSubmit=(action "submit") as |modal|}}
    {{modal.header title="Dialog"}}
    {{#modal.body}}Hello world!{{/modal.body}}
    {{#modal.footer}}
      <button id="submit" {{action modal.submit}}>Submit</button>
    {{/modal.footer}}
  {{/bs-modal}}`);
  await wait();

  await click('#submit');
  assert.ok(submitAction.calledOnce, 'submit action has been called.');
});
