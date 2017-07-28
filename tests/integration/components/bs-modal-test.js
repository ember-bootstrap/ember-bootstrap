import { find, findAll, click } from 'ember-native-dom-helpers';
import { moduleForComponent } from 'ember-qunit';
import { test, visibilityClass } from '../../helpers/bootstrap-test';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('bs-modal', 'Integration | Component | bs-modal', {
  integration: true
});

const transitionTimeout = 500;

test('Modal yields header, footer and body components', function(assert) {
  this.render(hbs`{{#bs-modal as |modal|}}
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

test('clicking ok button closes modal when autoClose=true with custom component hierarchy', function(assert) {
  this.register('component:my-component', Ember.Component.extend({
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

  await click('#submit');
  assert.ok(submitAction.calledOnce, 'submit action has been called.');
});
