import { module, test } from 'qunit';
import { visit, currentURL, click, fillIn } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { selectChoose } from 'ember-power-select/test-support';
import { codeSnippetText } from 'ember-bootstrap-docs/tests/helpers/code-snippet';

module('Acceptance | components/alert', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /components/alert', async function (assert) {
    await visit('/components/alert');

    assert.strictEqual(currentURL(), '/components/alert');
  });

  test('changing options updates the alerts and the code', async function (assert) {
    await visit('/components/alert');

    let alerts = '[data-test-example="alert-options"] .alert';
    assert.dom(alerts).exists({ count: 2 });
    assert.dom(`${alerts} h4`).hasText('Well done!');

    await fillIn('[data-test-option="headerTag"] input', 'h5');

    assert.dom(`${alerts} h5`).hasText('Well done!');
    assert.true(
      codeSnippetText('alert-options.gjs').includes('@headerTag="h5"'),
    );

    await click('[data-test-option="visible"] input');

    assert.dom(alerts).doesNotExist();
    assert.true(
      codeSnippetText('alert-options.gjs').includes('@visible={{false}}'),
    );
  });

  test('changing the type updates the alerts and the code', async function (assert) {
    await visit('/components/alert');

    let alerts = '[data-test-example="alert-options"] .alert';
    assert.dom(alerts).hasClass('alert-success');

    await selectChoose('[data-test-option="type"]', 'danger');

    assert.dom(alerts).hasClass('alert-danger');
    assert.true(
      codeSnippetText('alert-options.gjs').includes('@type="danger"'),
    );
  });
});
