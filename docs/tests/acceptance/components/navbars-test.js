import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { selectChoose } from 'ember-power-select/test-support';
import { codeSnippetText } from 'ember-bootstrap-docs/tests/helpers/code-snippet';

module('Acceptance | components/navbars', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /components/navbars', async function (assert) {
    await visit('/components/navbars');

    assert.strictEqual(currentURL(), '/components/navbars');
  });

  test('changing options updates the navbar and the code', async function (assert) {
    await visit('/components/navbars');

    let navbar = '[data-test-example="navbar-demo"] nav.navbar';
    assert.dom(navbar).hasClass('bg-light');

    await selectChoose('[data-test-option="type"]', 'dark');
    await selectChoose('[data-test-option="bg"]', 'primary');

    assert.dom(navbar).hasClass('navbar-dark');
    assert.dom(navbar).hasClass('bg-primary');
    let source = codeSnippetText('navbar-demo.gjs');
    assert.true(source.includes('@type="dark"'), source);
    assert.true(source.includes('@backgroundColor="primary"'), source);
  });
});
