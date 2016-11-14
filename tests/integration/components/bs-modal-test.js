import { moduleForComponent, test } from 'ember-qunit';
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

  assert.equal(this.$('.modal').length, 1, 'Modal exists.');
  assert.equal(this.$('.modal .modal-header').length, 1, 'Modal has header.');
  assert.equal(this.$('.modal .modal-header .modal-title').text().trim(), 'Dialog', 'Modal header has correct title.');
  assert.equal(this.$('.modal .modal-footer').length, 1, 'Modal has footer.');
  assert.equal(this.$('.modal .modal-footer button').length, 1, 'Modal has button in footer.');
  assert.equal(this.$('.modal .modal-footer button').text().trim(), 'Ok', 'Modal button has default title.');
  assert.equal(this.$('.modal .modal-body').length, 1, 'Modal has body.');
  assert.equal(this.$('.modal .modal-body').text().trim(), 'Hello world!', 'Modal body has correct content.');
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
  setTimeout(() => {
    assert.equal(this.$('.modal').hasClass('in'), true, 'Modal is visible');
    this.$('.modal .modal-footer button').click();

    // wait for fade animation
    setTimeout(() => {
      assert.equal(this.$('.modal').hasClass('in'), false, 'Modal is hidden');
      done();
    }, transitionTimeout);
  }, transitionTimeout);
});