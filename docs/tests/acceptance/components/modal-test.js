import { module, test } from 'qunit';
import {
  visit,
  currentURL,
  click,
  fillIn,
  findAll,
  waitUntil,
} from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { selectChoose } from 'ember-power-select/test-support';
import { codeSnippetText } from 'ember-bootstrap-docs/tests/helpers/code-snippet';

module('Acceptance | components/modal', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /components/modal', async function (assert) {
    await visit('/components/modal');

    assert.strictEqual(currentURL(), '/components/modal');
  });

  test('opens and closes the simple modal', async function (assert) {
    // The options example renders a second modal, which is open by default.
    let simpleModal = () =>
      findAll('.modal.show').find((modal) =>
        modal.textContent.includes('Simple Dialog'),
      );

    await visit('/components/modal');

    assert.notOk(simpleModal(), 'modal is closed');
    assert.true(codeSnippetText('modal-demo.gjs').includes('@open={{false}}'));

    await click('[data-test-example="modal-demo"] > button');

    assert.ok(simpleModal(), 'modal is open');
    assert.true(codeSnippetText('modal-demo.gjs').includes('@open={{true}}'));

    await click(simpleModal().querySelector('.modal-footer button'));
    await waitUntil(() => !simpleModal());

    assert.true(codeSnippetText('modal-demo.gjs').includes('@open={{false}}'));
  });

  test('changing options updates the modal and the code', async function (assert) {
    await visit('/components/modal');

    let title = '[data-test-example="modal-options"] .modal-title';
    assert.dom(title).hasText('Simple Modal');

    await fillIn('[data-test-option="title"] input', 'Custom title');

    assert.dom(title).hasText('Custom title');
    assert.true(
      codeSnippetText('modal-options.gjs').includes('@title="Custom title"'),
    );
  });

  test('changing the size updates the modal and the code', async function (assert) {
    await visit('/components/modal');

    let dialog = '[data-test-example="modal-options"] .modal-dialog';
    assert.dom(dialog).doesNotHaveClass('modal-lg');

    await selectChoose('[data-test-option="size"]', 'lg');

    assert.dom(dialog).hasClass('modal-lg');
    assert.true(codeSnippetText('modal-options.gjs').includes('@size="lg"'));
  });
});
