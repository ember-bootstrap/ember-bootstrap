import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import setupNoDeprecations from '../../../helpers/setup-no-deprecations';
import sinon from 'sinon';
import BsNav from 'ember-bootstrap/components/bs-nav';

module('Integration | Component | bs-nav/item', function (hooks) {
  setupRenderingTest(hooks);
  setupNoDeprecations(hooks);

  test('it has correct markup', async function (assert) {
    await render(
      <template>
        <BsNav as |nav|>
          <nav.item>
            template block text
          </nav.item>
        </BsNav>
      </template>,
    );

    assert.dom('*').hasText('template block text', 'Shows block content');
    assert.dom('li').exists({ count: 1 }, 'it is an list item');
    assert.notOk(
      this.element.querySelector('li').classList.contains('active'),
      'has not active class',
    );
    assert.notOk(
      this.element.querySelector('li').classList.contains('disabled'),
      'has not disabled class',
    );
  });

  test('it does not have aria role="presentation"', async function (assert) {
    // Should not have role="presentation" even so Bootstrap 3 docs have it.
    // This was discussed at https://github.com/kaliber5/ember-bootstrap/pull/782.
    await render(
      <template>
        <BsNav as |nav|>
          <nav.item>
            template block text
          </nav.item>
        </BsNav>
      </template>,
    );

    assert.dom('li').doesNotHaveAttribute('role');
  });

  test('clicking item calls onClick action', async function (assert) {
    const clickAction = sinon.spy();
    await render(
      <template>
        <BsNav as |nav|>
          <nav.item @onClick={{clickAction}}>
            template block text
          </nav.item>
        </BsNav>
      </template>,
    );
    await click('li');

    assert.ok(clickAction.calledOnce, 'action has been called');
  });
});
