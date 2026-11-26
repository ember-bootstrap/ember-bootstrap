import { module, test } from 'qunit';
import { visit, currentURL, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { codeSnippetText } from 'ember-bootstrap-docs/tests/helpers/code-snippet';
import sinon from 'sinon';

module('Acceptance | components/button', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /components/button', async function (assert) {
    await visit('/components/button');

    assert.strictEqual(currentURL(), '/components/button');
  });

  test('shows the code of the simple example', async function (assert) {
    await visit('/components/button');

    assert.strictEqual(
      codeSnippetText('button-demo.gjs'),
      '<BsButton @onClick={{this.submit}}>Button</BsButton>',
    );
  });

  test('clicking the button triggers its action', async function (assert) {
    let alert = sinon.stub(window, 'alert');
    await visit('/components/button');
    await click('[data-test-example="button-demo"] button');

    assert.ok(alert.calledOnceWith('You pressed the button!'));
  });
});
