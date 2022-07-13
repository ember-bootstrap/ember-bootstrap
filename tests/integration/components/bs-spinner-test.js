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

  testForBootstrap(4, 'spinner has accessibility block (block-mode)', async function (assert) {
    await render(hbs`<BsSpinner>Loading</BsSpinner>`);

    assert.dom('span').hasClass('sr-only', 'accessibility block exists');
    assert.dom('span.sr-only').hasText('Loading', 'accessibility text is shown');
  });

  testForBootstrap(4, 'spinner does not have accessibility block (blockless-mode)', async function (assert) {
    await render(hbs`<BsSpinner />`);

    assert.dom('span.sr-only').doesNotExist('accessibility block does not exist');
  });

  testForBootstrap(5, 'spinner has accessibility block (block-mode)', async function (assert) {
    await render(hbs`<BsSpinner>Loading</BsSpinner>`);

    assert.dom('span').hasClass('visually-hidden', 'accessibility block exists');
    assert.dom('span.visually-hidden').hasText('Loading', 'accessibility text is shown');
  });

  testForBootstrap(5, 'spinner does not have accessibility block (blockless-mode)', async function (assert) {
    await render(hbs`<BsSpinner />`);

    assert.dom('span.visually-hidden').doesNotExist('accessibility block does not exist');
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
});
