import { module, test } from 'qunit';
import { visit, currentURL, fillIn } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { codeSnippetText } from 'ember-bootstrap-docs/tests/helpers/code-snippet';

module('Acceptance | components/progress', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /components/progress', async function (assert) {
    await visit('/components/progress');

    assert.strictEqual(currentURL(), '/components/progress');
  });

  test('changing the value updates the progress bar and the code', async function (assert) {
    await visit('/components/progress');

    let bar = '[data-test-example="progress-options"] .progress-bar';
    assert.dom(bar).hasAttribute('aria-valuenow', '50');

    await fillIn('[data-test-option="value"] input', '75');

    assert.dom(bar).hasAttribute('aria-valuenow', '75');
    assert.true(codeSnippetText('progress-options.gjs').includes('75'));
  });
});
