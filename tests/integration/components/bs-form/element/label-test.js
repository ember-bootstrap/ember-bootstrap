import { find } from 'ember-native-dom-helpers';
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

  assert.equal(find('*').textContent.trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#bs-form/element/label}}
      template block text
    {{/bs-form/element/label}}
  `);

  assert.equal(find('*').textContent.trim(), 'template block text');
});

testBS3('component has control-label class', function(assert) {
  this.render(hbs`{{bs-form/element/label}}`);
  assert.equal(find('label').classList.contains('control-label'), true, 'component has control-label class');
});

testBS4('component has col-form-label class when using horizontal forms', function(assert) {
  this.render(hbs`{{bs-form/element/label formLayout="horizontal"}}`);
  assert.equal(find('label').classList.contains('col-form-label'), true, 'component has col-form-label class');
});

testBS4('component has form-check-label class when using control type checkbox', function(assert) {
  this.render(hbs`{{bs-form/element/label controlType="checkbox"}}`);
  assert.equal(find('label').classList.contains('form-check-label'), true, 'component has form-check-label class');
});
