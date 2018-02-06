import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | bs-dropdown/button', function(hooks) {
  setupRenderingTest(hooks);

  test('dropdown button has correct default markup', async function(assert) {
    await render(hbs`{{#bs-dropdown/button}}Test{{/bs-dropdown/button}}`);

    assert.equal(this.element.querySelector(':first-child').tagName, 'BUTTON', 'dropdown button is a button');
    assert.dom(':first-child').hasClass('dropdown-toggle', 'has dropdown-toggle class');
    assert.equal(this.element.querySelector(':first-child').getAttribute('role'), 'button', 'has role=button');
  });
});

