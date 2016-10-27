import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('bs-alert', 'Integration | Component | bs-alert', {
  integration: true
});

test('alert has correct CSS classes', function(assert) {
  this.render(hbs`{{#bs-alert type="success" dismissible=true}}Test{{/bs-alert}}`);

  assert.equal(this.$(':first-child').hasClass('alert'), true, 'alert has alert class');
  assert.equal(this.$(':first-child').hasClass('alert-success'), true, 'alert has type class');
  assert.equal(this.$(':first-child').hasClass('alert-dismissible'), true, 'alert has dismissible class');
});

test('dismissible alert can be hidden by clicking close button with fade=false', function(assert) {
  this.render(hbs`{{#bs-alert type="success" fade=false}}Test{{/bs-alert}}`);

  assert.equal(this.$().find('button.close').length, 1, 'alert has close button');
  this.$().find('button.close').click();

  assert.equal(this.$(':first-child').hasClass('alert'), false, 'alert has no alert class');
  assert.equal(this.$(':first-child').text().trim(), '', 'alert has no content');

});

test('dismissible alert can be hidden by clicking close button with fade=true', function(assert) {
  this.render(hbs`{{#bs-alert type="success" fade=true}}Test{{/bs-alert}}`);

  assert.equal(this.$().find('button.close').length, 1, 'alert has close button');
  this.$().find('button.close').click();

  assert.equal(this.$(':first-child').hasClass('alert'), true, 'alert has alert class');
  assert.equal(this.$(':first-child').hasClass('in'), false, 'alert has no in class');

  let done = assert.async();
  // wait for transitions to complete
  setTimeout(() => {
    assert.equal(this.$(':first-child').hasClass('alert'), false, 'alert has no alert class');
    assert.equal(this.$(':first-child').text().trim(), '', 'alert has no content');

    done();
  }, 300);

});

test('alert can be hidden by setting visible property', function(assert) {
  this.set('visible', true);
  this.render(hbs`{{#bs-alert type="success" fade=false visible=visible}}Test{{/bs-alert}}`);

  this.set('visible', false);

  assert.equal(this.$(':first-child').hasClass('alert'), false, 'alert has no alert class');
  assert.equal(this.$(':first-child').text().trim(), '', 'alert has no content');

});

test('dismissedAction is called after modal is closed', function(assert) {
  assert.expect(1);

  this.on('testAction', () => {
    assert.ok(true, 'Action has been called.');
  });
  this.render(hbs`{{#bs-alert type="success" fade=false dismissedAction=(action "testAction")}}Test{{/bs-alert}}`);

  this.$().find('button.close').click();
});

test('alert is initially hidden when visible=false', function(assert) {
  this.render(hbs`{{#bs-alert type="success" fade=false visible=false}}Test{{/bs-alert}}`);

  assert.equal(this.$(':first-child').hasClass('alert'), false, 'alert has no alert class');
  assert.equal(this.$(':first-child').text().trim(), '', 'alert has no content');

});

test('alert can be made visible when setting visible=true', function(assert) {
  this.set('visible', false);
  this.render(hbs`{{#bs-alert type="success" visible=visible fade=false}}Test{{/bs-alert}}`);
  this.set('visible', true);

  assert.equal(this.$(':first-child').hasClass('alert'), true, 'alert has alert class');
  assert.equal(this.$(':first-child').hasClass('alert-success'), true, 'alert has type class');
});