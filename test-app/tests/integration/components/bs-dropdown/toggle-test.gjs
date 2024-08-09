import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import setupNoDeprecations from '../../../helpers/setup-no-deprecations';
import sinon from 'sinon';
import BsDropdown from 'ember-bootstrap/components/bs-dropdown';

module('Integration | Component | bs-dropdown/toggle', function (hooks) {
  setupRenderingTest(hooks);
  setupNoDeprecations(hooks);

  test('toggle has correct default markup', async function (assert) {
    await render(
      <template>
        <BsDropdown as |dd|><dd.toggle>Test</dd.toggle></BsDropdown>
      </template>,
    );

    assert.dom('a').exists('toggle is an anchor tag by default');
    assert.dom('a').hasAttribute('href', '#', 'has href attribute');
    assert.dom('.dropdown-toggle').exists('has dropdown-toggle class');
    assert.dom('a').hasAttribute('role', 'button', 'has role=button');
  });

  test('clicking toggle sends onClick action', async function (assert) {
    const onClick = sinon.stub();
    await render(
      <template>
        <BsDropdown as |dd|>
          <dd.toggle @onClick={{onClick}}>Test</dd.toggle>
        </BsDropdown>
      </template>,
    );
    await click('a');
    assert.ok(onClick.calledOnce, 'onClick action has been called.');
  });
});
