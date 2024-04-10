import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import setupNoDeprecations from '../../../helpers/setup-no-deprecations';
import sinon from 'sinon';
import { CustomTestContext } from 'ember-bootstrap/tests/helpers';

module('Integration | Component | bs-dropdown/toggle', function (hooks) {
  setupRenderingTest(hooks);
  setupNoDeprecations(hooks);

  test('toggle has correct default markup', async function (assert) {
    await render(
      hbs`<BsDropdown as |dd|><dd.toggle>Test</dd.toggle></BsDropdown>`,
    );

    assert.dom('a').exists('toggle is an anchor tag by default');
    assert.dom('a').hasAttribute('href', '#', 'has href attribute');
    assert.dom('.dropdown-toggle').exists('has dropdown-toggle class');
    assert.dom('a').hasAttribute('role', 'button', 'has role=button');
  });

  test<
    CustomTestContext & { clickHandler: () => void }
  >('clicking toggle sends onClick action', async function (assert) {
    const clickHandler = sinon.spy();
    this.set('clickHandler', clickHandler);
    await render<typeof this>(
      hbs`<BsDropdown as |dd|><dd.toggle
    @onClick={{this.clickHandler}}
  >Test</dd.toggle></BsDropdown>`,
    );
    await click('a');
    assert.ok(clickHandler.calledOnce, 'onClick action has been called.');
  });
});
