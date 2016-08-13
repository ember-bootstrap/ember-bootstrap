import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('bs-dropdown-toggle', 'Integration | Component | bs-dropdown-toggle', {
  integration: true
});

test('toggle has correct default markup', function(assert) {
  this.render(hbs`{{#bs-dropdown-toggle}}Test{{/bs-dropdown-toggle}}`);

  assert.equal(this.$(':first-child').prop('tagName'), 'A', 'toggle is an anchor tag by default');
  assert.equal(this.$(':first-child').attr('href'), '#', 'has href attribute');
  assert.equal(this.$(':first-child').hasClass('dropdown-toggle'), true, 'has dropdown-toggle class');
  assert.equal(this.$(':first-child').attr('role'), 'button', 'has role=button');
});

test('toggle as button does not have href', function(assert) {
  this.render(hbs`{{#bs-dropdown-toggle tagName="button"}}Test{{/bs-dropdown-toggle}}`);

  assert.equal(this.$(':first-child').prop('tagName'), 'BUTTON', 'toggle is a button');
  assert.equal(this.$(':first-child').is('[href]'), false, 'does not have href attribute');
});

test('clicking dropdown button sends toggleDropdown action', function(assert) {
  let actionHandler = {
    toggleDropdown() {
      assert.ok(true, 'toggleDropdown action has been called');
    }
  };
  this.render(hbs`{{#bs-dropdown-toggle targetObject=actionHandler}}Test{{/bs-dropdown-toggle}}`);
  this.set('actionHandler', actionHandler);

  this.$('a').click();
});

