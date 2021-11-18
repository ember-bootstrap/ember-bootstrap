import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import setupNoDeprecations from '../../../helpers/setup-no-deprecations';
import { testNotBS3 } from '../../../helpers/bootstrap';

module('Integration | Component | bs-nav/link-to', function (hooks) {
  setupRenderingTest(hooks);
  setupNoDeprecations(hooks);
  hooks.beforeEach(function () {
    this.owner.setupRouter();
  });

  module('<LinkTo> properties', function () {
    test('simple route link', async function (assert) {
      await render(hbs`
        <BsNav as |nav|>
          <nav.item>
            <nav.link-to @route="index">Link</nav.link-to>
          </nav.item>
        </BsNav>
      `);

      assert.dom('a').exists({ count: 1 });
      assert.dom('a').hasText('Link');
      assert.dom('a').hasAttribute('href', '/');
    });

    test('link with model', async function (assert) {
      await render(hbs`
        <BsNav as |nav|>
          <nav.item>
            <nav.link-to @route="acceptance.link" @model="1" @query={{hash foo="bar"}}>Link</nav.link-to>
          </nav.item>
        </BsNav>
      `);

      assert.dom('a').exists({ count: 1 });
      assert.dom('a').hasAttribute('href', '/acceptance/link/1?foo=bar');
    });

    testNotBS3('link has nav-link class', async function (assert) {
      await render(hbs`
        <BsNav as |nav|>
          <nav.item>
            <nav.link-to @route="index">Link</nav.link-to>
          </nav.item>
        </BsNav>
      `);

      assert.dom('a').hasClass('nav-link');
    });

    test('disabled link', async function (assert) {
      await render(hbs`
        <BsNav as |nav|>
          <nav.item>
            <nav.link-to @route="index" @disabled={{true}}>Link</nav.link-to>
          </nav.item>
        </BsNav>
      `);
      assert.dom('a').hasClass('disabled');
    });
  });
});
