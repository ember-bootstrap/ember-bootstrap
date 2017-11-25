import { find } from 'ember-native-dom-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { testBS3, testBS4 } from '../../../../helpers/bootstrap-test';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | bs form/element/label', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    await render(hbs`{{bs-form/element/label}}`);

    assert.equal(find('*').textContent.trim(), '');

    // Template block usage:
    await render(hbs`
      {{#bs-form/element/label}}
        template block text
      {{/bs-form/element/label}}
    `);

    assert.equal(find('*').textContent.trim(), 'template block text');
  });

  testBS3('component has control-label class', async function(assert) {
    await render(hbs`{{bs-form/element/label}}`);
    assert.equal(find('label').classList.contains('control-label'), true, 'component has control-label class');
  });

  testBS4('component has col-form-label class when using horizontal forms', async function(assert) {
    await render(hbs`{{bs-form/element/label formLayout="horizontal"}}`);
    assert.equal(find('label').classList.contains('col-form-label'), true, 'component has col-form-label class');
  });

  testBS4('component has form-check-label class when using control type checkbox', async function(assert) {
    await render(hbs`{{bs-form/element/label controlType="checkbox"}}`);
    assert.equal(find('label').classList.contains('form-check-label'), true, 'component has form-check-label class');
  });
});
