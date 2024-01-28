import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | bs-list-group', function (hooks) {
  setupRenderingTest(hooks);

  test('bs-list-group has correct default markup', async function (assert) {
    await render(hbs`<BsListGroup />`);

    assert
      .dom('ul')
      .exists('ul exists')
      .hasClass('list-group', 'ul has list-group class');
  });

  test('custom HTML-attributes can be added to list', async function (assert) {
    await render(hbs`<BsListGroup class='custom' role='foo' data-test />`);
    assert
      .dom('ul.list-group')
      .hasClass('custom', 'class can be added')
      .hasAttribute('role', 'foo')
      .hasAttribute('data-test');
  });

  test('bs-list-group can be numbered', async function (assert) {
    await render(hbs`<BsListGroup @numbered={{true}} />`);

    assert
      .dom('ol')
      .exists('ol exists')
      .hasClass('list-group', 'ol has list-group class')
      .hasClass('list-group-numbered', 'ol has list-group-numbered class');
  });

  test('bs-list-group can be borderless', async function (assert) {
    await render(hbs`<BsListGroup @flush={{true}} />`);

    assert
      .dom('ul')
      .hasClass('list-group-flush', 'ul has list-group-flush class');
  });

  test('bs-list-group can be horizontal', async function (assert) {
    await render(hbs`<BsListGroup @horizontal={{true}} />`);

    assert
      .dom('ul')
      .hasClass('list-group-horizontal', 'ul has list-group-horizontal class');
  });

  test('bs-list-group can be horizontal for selected screen size', async function (assert) {
    await render(
      hbs`<BsListGroup @horizontal={{true}} @horizontalSize='sm' />`,
    );

    assert
      .dom('ul')
      .doesNotHaveClass(
        'list-group-horizontal',
        'ul does not have list-group-horizontal class',
      )
      .hasClass(
        'list-group-horizontal-sm',
        'ul has list-group-horizontal-sm class',
      );
  });
});
