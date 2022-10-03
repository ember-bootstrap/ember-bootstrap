import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | bs-list-group/item', function (hooks) {
  setupRenderingTest(hooks);

  test('item is yielded from bs-list-group', async function (assert) {
    await render(hbs`<BsListGroup as |ListGroup|>
      <ListGroup.item>First</ListGroup.item>
    </BsListGroup>`);
    assert
      .dom('ul li.list-group-item')
      .exists('li with class list-group-item exists')
      .hasText('First', 'li has valid text');
  });

  test('custom HTML-attributes can be added to list items', async function (assert) {
    await render(hbs`<BsListGroup as |ListGroup|>
      <ListGroup.item class="custom" role="foo" data-test>First</ListGroup.item>
    </BsListGroup>`);
    assert
      .dom('ul li.list-group-item')
      .hasClass('custom', 'class can be added')
      .hasAttribute('role', 'foo')
      .hasAttribute('data-test');
  });

  test('item can be disabled', async function (assert) {
    await render(hbs`<BsListGroup as |ListGroup|>
      <ListGroup.item class="first" @disabled={{true}}>First</ListGroup.item>
      <ListGroup.item class="second">Second</ListGroup.item>
    </BsListGroup>`);
    assert
      .dom('ul li.list-group-item.first')
      .hasClass('disabled', 'First item has class disabled')
      .hasAria('disabled', 'true', 'First item has aria-attr disabled');

    assert
      .dom('ul li.list-group-item.second')
      .doesNotHaveClass('disabled', 'Second item does not have class disabled')
      .doesNotHaveAria('disabled', 'Second item does not have aria-attr disabled');
  });

  test('item can be active', async function (assert) {
    await render(hbs`<BsListGroup as |ListGroup|>
      <ListGroup.item class="first" @active={{true}}>First</ListGroup.item>
      <ListGroup.item class="second">Second</ListGroup.item>
    </BsListGroup>`);
    assert
      .dom('ul li.list-group-item.first')
      .hasClass('active', 'First item has class active')
      .hasAria('current', 'true', 'First item has aria-attr current');

    assert
      .dom('ul li.list-group-item.second')
      .doesNotHaveClass('active', 'Second item does not have class active')
      .doesNotHaveAria('current', 'Second item does not have aria-attr current');
  });

  test('item can be typed', async function (assert) {
    await render(hbs`<BsListGroup as |ListGroup|>
      <ListGroup.item class="first" @type="primary">First</ListGroup.item>
      <ListGroup.item class="second" @type="secondary">Second</ListGroup.item>
    </BsListGroup>`);

    assert
      .dom('ul li.list-group-item.first')
      .hasClass('list-group-item-primary', 'First item has class list-group-item-primary');

    assert
      .dom('ul li.list-group-item.second')
      .hasClass('list-group-item-secondary', 'Second item has class list-group-item-secondary');
  });

  test('custom HTML-tag (<button>) automatically set when `@actionable` is `true`', async function (assert) {
    await render(hbs`<BsListGroup as |ListGroup|>
      <ListGroup.item @actionable={{true}} class="first">First</ListGroup.item>
      <ListGroup.item class="second">Second</ListGroup.item>
    </BsListGroup>`);

    assert
      .dom('ul button.list-group-item.first')
      .exists('First item has tag <button>')
      .hasAttribute('type', 'button', 'by default, type is set to "button" for <button>');

    assert
      .dom('ul li.list-group-item.second')
      .doesNotHaveClass('list-group-item-action', 'Second item does not have class list-group-item-action');
  });

  test('default attributes for custom HTML-tag (<button>) may be overridden', async function (assert) {
    await render(hbs`<BsListGroup as |ListGroup|>
      <ListGroup.item @actionable={{true}} type="submit" class="first">First</ListGroup.item>
    </BsListGroup>`);

    assert
      .dom('ul button.list-group-item.first')
      .exists('First item has tag <button>')
      .hasAttribute('type', 'submit', 'type is set manually');
  });
});
