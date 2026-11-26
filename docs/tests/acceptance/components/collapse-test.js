import { module, test } from 'qunit';
import { visit, currentURL, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { codeSnippetText } from 'ember-bootstrap-docs/tests/helpers/code-snippet';

module('Acceptance | components/collapse', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /components/collapse', async function (assert) {
    await visit('/components/collapse');

    assert.strictEqual(currentURL(), '/components/collapse');
  });

  test('toggles the content and updates the code', async function (assert) {
    await visit('/components/collapse');

    assert
      .dom('[data-test-example="collapse-demo"] .collapse')
      .doesNotHaveClass('show');
    assert.dom('[data-test-example="collapse-demo"] button').hasText('Show');
    assert.true(
      codeSnippetText('collapse-demo.gjs').includes('@collapsed={{true}}'),
    );

    await click('[data-test-example="collapse-demo"] button');

    assert
      .dom('[data-test-example="collapse-demo"] .collapse')
      .hasClass('show');
    assert.dom('[data-test-example="collapse-demo"] button').hasText('Hide');
    assert.true(
      codeSnippetText('collapse-demo.gjs').includes('@collapsed={{false}}'),
    );
  });
});
