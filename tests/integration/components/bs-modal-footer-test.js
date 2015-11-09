import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('bs-modal-footer', 'Integration | Component | bs-modal-footer', {
  integration: true
});

test('Footer has close button', function (assert) {
  this.render(hbs`{{bs-modal-footer closeTitle="close"}}`);

  assert.equal(this.$('.modal-footer').length, 1, 'Modal footer exists.');
  assert.equal(this.$('.modal-footer button').length, 1, 'Modal has button.');
  assert.ok(this.$('.modal-footer button').hasClass('btn-primary'), 'Button is a primary button.');
  assert.ok(this.$('.modal-footer button').attr('type'), 'button', 'Submit button is of type submit.');
  assert.equal(this.$('.modal-footer button').text().trim(), 'close', 'Button title is correct.');
});

test('Footer can have submit button', function (assert) {
  this.render(hbs`{{bs-modal-footer closeTitle="close" submitTitle="submit"}}`);

  assert.equal(this.$('.modal-footer button').length, 2, 'Modal footer has two button.');
  assert.ok(this.$('.modal-footer button:first-child').hasClass('btn-default'), 'Close button is a default button.');
  assert.ok(this.$('.modal-footer button:first-child').attr('type'), 'button', 'Submit button is of type submit.');
  assert.equal(this.$('.modal-footer button:first-child').text().trim(), 'close', 'Close button title is correct.');
  assert.ok(this.$('.modal-footer button:last-child').hasClass('btn-primary'), 'Submit button is a primary button.');
  assert.ok(this.$('.modal-footer button:last-child').attr('type'), 'submit', 'Submit button is of type submit.');
  assert.equal(this.$('.modal-footer button:last-child').text().trim(), 'submit', 'Submit button title is correct.');
});

test('Footer can have custom block content', function (assert) {
  this.render(hbs`{{#bs-modal-footer closeTitle="close" submitTitle="submit"}}custom{{/bs-modal-footer}}`);

  assert.equal(this.$('.modal-footer button').length, 0, 'Modal footer has no buttons.');
  assert.equal(this.$('.modal-footer').text().trim(), 'custom', 'Block content is shown.');
});

test('submitDisabled disables submit button', function (assert) {
  this.set('disabled', true);
  this.render(hbs`{{bs-modal-footer closeTitle="close" submitTitle="submit" submitDisabled=disabled}}`);

  assert.equal(this.$('.modal-footer button').length, 2, 'Modal footer has two button.');
  assert.ok(this.$('.modal-footer button:first-child').not(':disabled'), 'Close button is not disabled.');
  assert.ok(this.$('.modal-footer button:last-child').is(':disabled'), 'Submit button is disabled.');

  this.set('disabled', false);

  assert.ok(this.$('.modal-footer button:last-child').not(':disabled'), 'Submit button is not disabled.');

});