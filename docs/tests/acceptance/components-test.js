import { module, test } from 'qunit';
import { visit, currentURL, click, findAll } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | components', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /components', async function (assert) {
    await visit('/components');

    assert.strictEqual(currentURL(), '/components');
  });

  test('lists all components', async function (assert) {
    await visit('/components');

    let components = this.owner.lookup('service:component').models;
    assert.dom('[data-test-component]').exists({ count: components.length });
    for (let component of components) {
      assert
        .dom(`[data-test-component="${component.id}"] th`)
        .hasText(component.title);
    }
  });

  test('navigates to a component demo', async function (assert) {
    await visit('/components');
    await click(
      '[data-test-component="collapse"] a[href="/components/collapse"]',
    );

    assert.strictEqual(currentURL(), '/components/collapse');
    assert.dom('h1').hasText('Collapse');
    assert.dom('.lead').hasAnyText();
    assert
      .dom('.alert-info code')
      .hasText('<BsCollapse>', 'API reference names the component');
    assert
      .dom('.alert-info a[href$="/api/classes/Components.Collapse.html"]')
      .exists('API reference links to the API docs');
  });

  test('every demo page shows its code snippets unindented', async function (assert) {
    let components = this.owner.lookup('service:component').models;

    for (let component of components) {
      // The carousel plays automatically, so its page never settles. It is
      // covered by its own test.
      if (component.id === 'carousel') {
        continue;
      }

      await visit(`/components/${component.id}`);

      let snippets = findAll('[data-test-code-snippet]');
      assert.ok(snippets.length > 0, `${component.id} shows code snippets`);
      for (let snippet of snippets) {
        let name = snippet.dataset.testCodeSnippet;
        let source = snippet.textContent;
        assert.ok(source.trim().length > 0, `${name} is not empty`);
        assert.ok(
          source.split('\n').some((line) => /^\S/.test(line)),
          `${name} has no common indentation`,
        );
      }
    }
  });
});
