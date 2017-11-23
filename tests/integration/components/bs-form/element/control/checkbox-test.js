import { find, findAll } from 'ember-native-dom-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { testBS4 } from '../../../../../helpers/bootstrap-test';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | bs form/element/control/checkbox', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    await render(hbs`{{bs-form/element/control/checkbox}}`);

    assert.equal(findAll('input[type=checkbox]').length, 1);
  });

  testBS4('component has form-check-input class', async function(assert) {
    await render(hbs`{{bs-form/element/control/checkbox}}`);
    assert.equal(find('input[type=checkbox]').classList.contains('form-check-input'), true, 'component has form-check-input class');
  });
});
