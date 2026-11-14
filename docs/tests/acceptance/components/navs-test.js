import { module, test } from 'qunit';
import { visit, currentURL, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
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
});
