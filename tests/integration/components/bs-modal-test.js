import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('bs-modal', 'Integration | Component | bs-modal', {
  integration: true
});

test('Simple modal has header, footer and body', function (assert) {
  this.render(hbs`{{#bs-modal title="Simple Dialog"}}Hello world!{{/bs-modal}}<div id="ember-bootstrap-modal-container"></div>`);

  assert.equal(this.$('.modal').length, 1, 'Modal exists.');
  assert.equal(this.$('.modal .modal-header').length, 1, 'Modal has header.');
  assert.equal(this.$('.modal .modal-footer').length, 1, 'Modal has footer.');
  assert.equal(this.$('.modal .modal-body').length, 1, 'Modal has body.');
});


test('Simple modal has default CSS classes', function (assert) {
  this.render(hbs`{{#bs-modal title="Simple Dialog"}}Hello world!{{/bs-modal}}<div id="ember-bootstrap-modal-container"></div>`);

  assert.ok(this.$('.modal').hasClass('fade'), 'Modal has fade class');
//  assert.ok(this.$('.modal').hasClass('in'), 'Modal has in class');
});
