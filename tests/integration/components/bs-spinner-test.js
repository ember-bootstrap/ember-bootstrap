import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { testForBootstrap } from '../../helpers/bootstrap';

module('Integration | Component | bs-spinner', function (hooks) {
  setupRenderingTest(hooks);

  test('spinner has correct default markup', async function (assert) {
    await render(hbs`<BsSpinner/>`);

    assert.dom('div').hasClass('spinner-border', 'spinner has spinner-border class');
  });

  test('spinner has correct size', async function (assert) {
    await render(hbs`<BsSpinner @size="sm" />`);

    assert.dom('div').hasClass('spinner-border-sm', 'spinner has size class');
  });

  test('spinner has correct type', async function (assert) {
    await render(hbs`<BsSpinner @type="primary"/>`);

    assert.dom('div').hasClass('text-primary', 'spinner has text-primary class');
  });

  testForBootstrap(4, 'spinner has accessibility block', async function (assert) {
    await render(hbs`<BsSpinner/>`);

    assert.dom('span').hasClass('rs-only', 'accessibility text exists');
  });

  testForBootstrap(5, 'spinner has accessibility block', async function (assert) {
    await render(hbs`<BsSpinner/>`);

    assert.dom('span').hasClass('visually-hidden', 'accessibility text exists');
  });

  test('spinner has default accessibility text', async function (assert) {
    await render(hbs`<BsSpinner/>`);

    assert.dom('span').hasText('Loading...');
  });

  test('spinner has HTML attributes', async function (assert) {
    await render(hbs`<BsSpinner id="test"/>`);

    assert.equal(this.element.querySelector('div').getAttribute('id'), 'test');
    assert.equal(this.element.querySelector('div').getAttribute('role'), 'status');
  });

  test('spinnerType property allows changing spinner type', async function (assert) {
    await render(hbs`<BsSpinner @spinnerType="grow" />`);

    assert.dom('div').hasClass('spinner-grow');
  });

  test('accessibilityText property allows changing accessibility text', async function (assert) {
    await render(hbs`<BsSpinner @accessibilityText="Custom text" />`);

    assert.dom('span').hasText('Custom text', 'Custom text is shown');
  });

  test('type property allows changing spinner color', async function (assert) {
    await render(hbs`<BsSpinner @type="warning" />`);

    assert.dom('div').hasClass('text-warning', 'Spinner has warning-color');
  });
});
