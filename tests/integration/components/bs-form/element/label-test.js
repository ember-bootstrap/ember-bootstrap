import { moduleForComponent, test } from 'ember-qunit';
import { testBS3, testBS4 } from '../../../../helpers/bootstrap-test';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('bs-form/element/label', 'Integration | Component | bs form/element/label', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{bs-form/element/label}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#bs-form/element/label}}
      template block text
    {{/bs-form/element/label}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});

testBS3('bs3 class', function(assert) {
  this.render(hbs`{{bs-form/element/label}}`);
  assert.equal(this.$('label').hasClass('control-label'), true);
});

testBS4('bs4 class', function(assert) {
  this.render(hbs`{{bs-form/element/label}}`);
  assert.equal(this.$('label').hasClass('col-form-label'), true);
});
