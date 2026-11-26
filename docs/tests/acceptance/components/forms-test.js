import { module, test } from 'qunit';
import { visit, currentURL, click, fillIn, findAll } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { codeSnippetText } from 'ember-bootstrap-docs/tests/helpers/code-snippet';
import sinon from 'sinon';

module('Acceptance | components/forms', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /components/forms', async function (assert) {
    await visit('/components/forms');

    assert.strictEqual(currentURL(), '/components/forms');
  });

  test('changing the layout updates the form and the code', async function (assert) {
    await visit('/components/forms');

    // The layout switch itself is a horizontal form, so look at the demo form.
    let demoForm = () => findAll('[data-test-example="form-demo"] form')[1];
    assert
      .dom('.row', demoForm())
      .doesNotExist('demo form uses vertical layout');
    assert.true(
      codeSnippetText('form-demo.gjs').includes('@formLayout="vertical"'),
    );

    let [, horizontal] = findAll('[data-test-option="formLayout"] label.btn');
    await click(horizontal);

    assert.dom('.row', demoForm()).exists('demo form uses horizontal layout');
    assert.true(
      codeSnippetText('form-demo.gjs').includes('@formLayout="horizontal"'),
    );
  });

  test('shows the component with the default form state', async function (assert) {
    await visit('/components/forms');

    let source = codeSnippetText('form-component.gjs');
    assert.true(
      source.startsWith("import Component from '@glimmer/component';"),
    );
    assert.true(source.includes("@tracked email = 'foo@example.com';"));
    assert.true(
      source.trimEnd().endsWith('  <template>\n    ...\n  </template>\n}'),
      'closes the class with a template placeholder',
    );
  });

  test('form controls are bound to the component state', async function (assert) {
    let alert = sinon.stub(window, 'alert');
    await visit('/components/forms');

    // Both examples are bound to the same component state.
    assert
      .dom('[data-test-example="form-customized"] input')
      .hasValue('foo@example.com');

    await fillIn(
      '[data-test-example="form-demo"] input[type="email"]',
      'jane@example.com',
    );
    assert
      .dom('[data-test-example="form-customized"] input')
      .hasValue('jane@example.com');

    await click('[data-test-example="form-customized"] button[type="submit"]');
    assert.ok(alert.calledOnceWith('Successfully submitted form data!'));
  });
});
