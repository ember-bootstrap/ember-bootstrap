import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('bs-modal-header', 'Integration | Component | bs-modal-header', {
  integration: true
});

test('Header has default markup', function (assert) {
  this.render(hbs`{{bs-modal-header title="Header"}}`);

  assert.equal(this.$('.modal-header').length, 1, 'Modal header exists.');
  assert.equal(this.$('.modal-header button.close').length, 1, 'Modal header has close button.');
  assert.equal(this.$('.modal-header .modal-title').length, 1, 'Modal header has title.');
  assert.equal(this.$('.modal-header .modal-title').text().trim(), 'Header', 'Footer title is correct.');
});


test('Header can have custom block content', function (assert) {
  this.render(hbs`{{#bs-modal-header}}<div id="custom">Test</div>{{/bs-modal-header}}`);

  assert.equal(this.$('.modal-header div#custom').length, 1, 'Modal header custom block.');
  assert.equal(this.$('.modal-header #custom').html().trim(), 'Test', 'Block content is shown.');
  assert.equal(this.$('.modal-header button.close').length, 1, 'Modal header has close button.');

});

test('close button can be removed', function (assert) {
  this.render(hbs`{{bs-modal-header title="Header" closeButton=false}}`);

  assert.equal(this.$('.modal-header button.close').length, 0, 'Modal header has no close button.');

});