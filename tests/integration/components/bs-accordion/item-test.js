import {
  moduleForComponent
} from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import test from 'ember-sinon-qunit/test-support/test';

moduleForComponent('bs-accordion-item', 'Integration | Component | bs-accordion-item', {
  integration: true
});

test('accordion item has correct default markup', function(assert) {
  this.render(hbs`{{#bs-accordion/item title="TITLE"}}CONTENT{{/bs-accordion/item}}`);
  assert.equal(this.$(':first-child').hasClass('panel'), true, 'has panel class');
  assert.equal(this.$(':first-child').hasClass('panel-default'), true, 'has panel-default class');
  assert.equal(this.$('.panel-heading').hasClass('collapsed'), true, 'panel-heading has collapsed class');
  assert.equal(this.$('.panel-collapse').hasClass('collapse'), true, 'panel-collapse has collapse class');
  assert.equal(this.$('.panel-collapse').hasClass('in'), false, 'panel-collapse has not in class');
  assert.equal(this.$('.panel-title').text().trim(), 'TITLE', 'panel-title has correct title');
  assert.equal(this.$('.panel-body').text().trim(), 'CONTENT', 'panel-body has correct content');
});

test('calls onClick action when clicking heading', function(assert) {
  let action = this.spy();
  this.on('click', action);
  this.render(hbs`{{#bs-accordion/item value=1 onClick=(action "click") title="TITLE"}}CONTENT{{/bs-accordion/item}}`);

  this.$('.panel-heading').click();
  assert.ok(action.calledWith(1), 'onClick action has been called.');
});
