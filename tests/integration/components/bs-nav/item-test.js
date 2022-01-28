import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import setupNoDeprecations from '../../../helpers/setup-no-deprecations';
import sinon from 'sinon';

module('Integration | Component | bs-nav/item', function (hooks) {
  setupRenderingTest(hooks);
  setupNoDeprecations(hooks);

  hooks.beforeEach(function () {
    this.actions = {};
    this.send = (actionName, ...args) => this.actions[actionName].apply(this, args);
    this.owner.setupRouter();
  });

  test('it has correct markup', async function (assert) {
    await render(hbs`
      <BsNav as |nav|>
        <nav.item>
          template block text
        </nav.item>
      </BsNav>
    `);

    assert.dom('*').hasText('template block text', 'Shows block content');
    assert.dom('li').exists({ count: 1 }, 'it is an list item');
    assert.notOk(this.element.querySelector('li').classList.contains('active'), 'has not active class');
    assert.notOk(this.element.querySelector('li').classList.contains('disabled'), 'has not disabled class');
  });

  test('it does not have aria role="presentation"', async function (assert) {
    // Should not have role="presentation" even so Bootstrap 3 docs have it.
    // This was discussed at https://github.com/kaliber5/ember-bootstrap/pull/782.
    await render(hbs`
      <BsNav as |nav|>
        <nav.item>
          template block text
        </nav.item>
      </BsNav>
    `);

    assert.dom('li').doesNotHaveAttribute('role');
  });

  test('can be disabled', async function (assert) {
    await render(hbs`
      <BsNav as |nav|>
        <nav.item @disabled={{true}}>
          template block text
        </nav.item>
      </BsNav>
    `);
    assert.dom('li').hasClass('disabled', 'has disabled class');
  });

  test('can be active', async function (assert) {
    await render(hbs`
      <BsNav as |nav|>
        <nav.item @active={{true}}>
          template block text
        </nav.item>
      </BsNav>
    `);
    assert.dom('li').hasClass('active', 'has active class');
  });

  test('disabled link makes nav item disabled', async function (assert) {
    await render(hbs`
        <BsNav as |nav|>
          <nav.item>
            <nav.link-to @route="application" @disabled={{true}}>Link</nav.link-to>
          </nav.item>
        </BsNav>
      `);
    assert.dom('li').hasClass('disabled', 'has disabled class');
  });

  test('clicking item calls onClick action', async function (assert) {
    let action = sinon.spy();
    this.actions.click = action;
    await render(hbs`
      <BsNav as |nav|>
        <nav.item @onClick={{action "click"}}>
          template block text
        </nav.item>
      </BsNav>
    `);
    await click('li');

    assert.ok(action.calledOnce, 'action has been called');
  });
});
