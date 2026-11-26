import { module, test } from 'qunit';
import { visit, currentURL, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { selectChoose } from 'ember-power-select/test-support';
import { codeSnippetText } from 'ember-bootstrap-docs/tests/helpers/code-snippet';

module('Acceptance | components/navs', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /components/navs', async function (assert) {
    await visit('/components/navs');

    assert.strictEqual(currentURL(), '/components/navs');
  });

  test('changing options updates the nav and the code', async function (assert) {
    await visit('/components/navs');

    assert.dom('[data-test-example="nav-demo"] .nav').hasClass('nav-pills');
    assert
      .dom('[data-test-example="nav-demo"] .nav')
      .doesNotHaveClass('flex-column');

    await click('[data-test-option="stacked"] input');

    assert.dom('[data-test-example="nav-demo"] .nav').hasClass('flex-column');
    assert.true(codeSnippetText('nav-demo.gjs').includes('@stacked={{true}}'));
  });

  test('changing the type updates the nav and the code', async function (assert) {
    await visit('/components/navs');

    await selectChoose('[data-test-option="type"]', 'tabs');

    assert.dom('[data-test-example="nav-demo"] .nav').hasClass('nav-tabs');
    assert.true(codeSnippetText('nav-demo.gjs').includes('@type="tabs"'));
  });

  test('tabs can not be stacked', async function (assert) {
    await visit('/components/navs');

    await click('[data-test-option="stacked"] input');
    assert.dom('[data-test-option="justified"] input').isDisabled();

    await selectChoose('[data-test-option="type"]', 'tabs');

    assert.dom('[data-test-option="stacked"] input').isNotChecked();
    assert.dom('[data-test-option="stacked"] input').isDisabled();
    assert.dom('[data-test-option="justified"] input').isNotDisabled();
    assert
      .dom('[data-test-example="nav-demo"] .nav')
      .doesNotHaveClass('flex-column');
  });
});
