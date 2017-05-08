import { find, findAll } from 'ember-native-dom-helpers';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('bs-modal/header', 'Integration | Component | bs-modal/header', {
  integration: true
});

test('Header has default markup', function(assert) {
  this.render(hbs`{{bs-modal/header title="Header"}}`);

  assert.equal(findAll('.modal-header').length, 1, 'Modal header exists.');
  assert.equal(findAll('.modal-header button.close').length, 1, 'Modal header has close button.');
  assert.equal(findAll('.modal-header .modal-title').length, 1, 'Modal header has title.');
  assert.equal(find('.modal-header .modal-title').textContent.trim(), 'Header', 'Footer title is correct.');
});

test('Header can have custom block content', function(assert) {
  this.render(hbs`{{#bs-modal/header}}<div id="custom">Test</div>{{/bs-modal/header}}`);

  assert.equal(findAll('.modal-header div#custom').length, 1, 'Modal header custom block.');
  assert.equal(find('.modal-header #custom').innerHTML.trim(), 'Test', 'Block content is shown.');
  assert.equal(findAll('.modal-header button.close').length, 1, 'Modal header has close button.');

});

test('close button can be removed', function(assert) {
  this.render(hbs`{{bs-modal/header title="Header" closeButton=false}}`);

  assert.equal(findAll('.modal-header button.close').length, 0, 'Modal header has no close button.');
});