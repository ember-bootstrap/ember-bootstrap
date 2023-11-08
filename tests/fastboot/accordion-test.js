import { module } from 'qunit';
import { setup, visit } from 'ember-cli-fastboot-testing/test-support';
import {
  accordionClass,
  accordionItemClass,
  accordionItemHeadClass,
  test,
} from '../helpers/bootstrap';

module('FastBoot | accordion', function (hooks) {
  setup(hooks);

  test('it renders', async function (assert) {
    await visit('/fastboot/accordion');

    assert.dom(`.${accordionClass()}`).exists();
    assert
      .dom(`.${accordionClass()} .${accordionItemClass()}`)
      .exists({ count: 3 });
    assert
      .dom(
        `.${accordionClass()} .${accordionItemClass()} .${accordionItemHeadClass()}`,
      )
      .hasText('First item');
  });
});
