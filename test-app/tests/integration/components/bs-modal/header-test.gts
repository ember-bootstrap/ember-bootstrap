import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, type RenderingTestContext } from '@ember/test-helpers';
import setupNoDeprecations from '../../../helpers/setup-no-deprecations';
import { closeButtonClass, versionDependent } from '../../../helpers/bootstrap';
import BsModalHeader from 'ember-bootstrap/components/bs-modal/header';

module('Integration | Component | bs-modal/header', function (hooks) {
  setupRenderingTest(hooks);
  setupNoDeprecations(hooks);

  test('Header has default markup', async function (assert) {
    await render(<template><BsModalHeader @title='Header' /></template>);

    assert.dom('.modal-header').exists({ count: 1 }, 'Modal header exists.');
    assert
      .dom(`.modal-header button.${closeButtonClass()}`)
      .exists({ count: 1 }, 'Modal header has close button.');
    assert
      .dom('.modal-header .modal-title')
      .exists({ count: 1 }, 'Modal header has title.');
    assert
      .dom('.modal-header .modal-title')
      .hasText('Header', 'Footer title is correct.');
  });

  test('Header can be rendered as non-block', async function (this: RenderingTestContext, assert) {
    await render(<template><BsModalHeader @title='Test' /></template>);

    assert
      .dom('.modal-header')
      .exists({ count: 1 }, 'Modal header is rendered.');
    assert.equal(
      this.element
        .querySelector('.modal-header .modal-title')
        ?.innerHTML.trim(),
      'Test',
      'Title is shown.',
    );
    assert
      .dom(`.modal-header button.${closeButtonClass()}`)
      .exists({ count: 1 }, 'Modal header has close button.');
  });

  test('Header can have custom block content', async function (this: RenderingTestContext, assert) {
    await render(
      <template>
        <BsModalHeader><div id='custom'>Test</div></BsModalHeader>
      </template>,
    );
    ``;
    assert
      .dom('.modal-header div#custom')
      .exists({ count: 1 }, 'Modal header custom block.');
    assert.equal(
      this.element.querySelector('.modal-header #custom')?.innerHTML.trim(),
      'Test',
      'Block content is shown.',
    );
    assert
      .dom(`.modal-header button.${closeButtonClass()}`)
      .exists({ count: 1 }, 'Modal header has close button.');
  });

  test('Header can yield components when block', async function (this: RenderingTestContext, assert) {
    await render(
      <template>
        <BsModalHeader as |header|>
          <header.title>
            <div id='custom'>Test</div>
          </header.title>
          {{header.close}}
        </BsModalHeader>
      </template>,
    );

    assert
      .dom('.modal-header div#custom')
      .exists({ count: 1 }, 'Modal header custom block.');
    assert.equal(
      this.element.querySelector('.modal-header #custom')?.innerHTML.trim(),
      'Test',
      'Block content is shown.',
    );
    assert
      .dom(`.modal-header button.${closeButtonClass()}`)
      .exists({ count: 1 }, 'Modal header has close button.');
  });

  test('close button has expected content', async function (assert) {
    await render(<template><BsModalHeader @title='Header' /></template>);

    assert
      .dom(`.modal-header button.${closeButtonClass()}`)
      .hasText(versionDependent('×', ''));
  });

  test('close button can be removed', async function (assert) {
    await render(
      <template>
        <BsModalHeader @title='Header' @closeButton={{false}} />
      </template>,
    );

    assert
      .dom(`.modal-header button.${closeButtonClass()}`)
      .doesNotExist('Modal header has no close button.');
  });

  test('close button can be removed in yield block form', async function (this: RenderingTestContext, assert) {
    await render(
      <template>
        <BsModalHeader as |header|>
          {{header.title}}
          <div id='custom'>Test</div>
        </BsModalHeader>
      </template>,
    );

    assert
      .dom('.modal-header div#custom')
      .exists({ count: 1 }, 'Modal header custom block.');
    assert.equal(
      this.element.querySelector('.modal-header #custom')?.innerHTML.trim(),
      'Test',
      'Block content is shown.',
    );

    assert
      .dom(`.modal-header button.${closeButtonClass()}`)
      .doesNotExist('Modal header has no close button.');
  });
});
