import { module } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import {
  click,
  find,
  render,
  settled,
  triggerEvent,
  waitFor,
  waitUntil,
  triggerKeyEvent,
} from '@ember/test-helpers';
import { test, testBS5, visibilityClass } from '../../helpers/bootstrap';
import setupNoDeprecations from '../../helpers/setup-no-deprecations';
import sinon from 'sinon';
import { skipTransition } from 'ember-bootstrap/utils/transition-end';
import BsModal from 'ember-bootstrap/components/bs-modal';
import { tracked } from '@glimmer/tracking';
import { on } from '@ember/modifier';

module('Integration | Component | bs-modal', function (hooks) {
  setupRenderingTest(hooks);
  setupNoDeprecations(hooks);

  test('Modal yields header, footer and body components', async function (assert) {
    await render(
      <template>
        <BsModal as |modal|>
          <modal.header @title='Dialog' />
          <modal.body>Hello world!</modal.body>
          <modal.footer />
        </BsModal>
      </template>,
    );

    assert.dom('.modal').exists({ count: 1 }, 'Modal exists.');
    assert
      .dom('.modal .modal-header')
      .exists({ count: 1 }, 'Modal has header.');
    assert
      .dom('.modal .modal-header .modal-title')
      .hasText('Dialog', 'Modal header has correct title.');
    assert
      .dom('.modal .modal-footer')
      .exists({ count: 1 }, 'Modal has footer.');
    assert
      .dom('.modal .modal-footer button')
      .exists({ count: 1 }, 'Modal has button in footer.');
    assert
      .dom('.modal .modal-footer button')
      .hasText('Ok', 'Modal button has default title.');
    assert.dom('.modal .modal-body').exists({ count: 1 }, 'Modal has body.');
    assert
      .dom('.modal .modal-body')
      .hasText('Hello world!', 'Modal body has correct content.');
  });

  test('Hidden modal does not render', async function (assert) {
    await render(
      <template>
        <BsModal @open={{false}} as |modal|>
          <modal.header @title='Dialog' />
          <modal.body>Hello world!</modal.body>
          <modal.footer />
        </BsModal>
      </template>,
    );

    assert.dom('.modal *').doesNotExist('Modal does not exist.');
  });

  test('clicking ok button closes modal when autoClose=true with custom component hierarchy', async function (assert) {
    const testComponent = <template>
      {{! template-lint-disable no-yield-only }}{{yield}}
    </template>;

    await render(
      <template>
        <BsModal
          @title='Simple Dialog'
          @body={{false}}
          @footer={{false}}
          as |modal|
        >
          <testComponent>
            <modal.body>Hello world!</modal.body>
            <modal.footer />
          </testComponent>
        </BsModal>
      </template>,
    );

    await click('.modal .modal-footer button');
    assert.dom('.modal').doesNotExist('Modal is hidden');
  });

  test('Modal yields close action', async function (assert) {
    const closeAction = sinon.spy();

    await render(
      <template>
        <BsModal @onHide={{closeAction}} as |modal|>
          <modal.header @title='Dialog' />
          <modal.body>Hello world!</modal.body>
          <modal.footer>
            <button
              type='button'
              id='close'
              {{on 'click' modal.close}}
            >Close</button>
          </modal.footer>
        </BsModal>
      </template>,
    );

    await click('#close');
    assert.ok(closeAction.calledOnce, 'close action has been called.');
  });

  test('Modal yields submit action', async function (assert) {
    const submitAction = sinon.spy();

    await render(
      <template>
        <BsModal @onSubmit={{submitAction}} as |modal|>
          <modal.header @title='Dialog' />
          <modal.body>Hello world!</modal.body>
          <modal.footer>
            <button
              type='button'
              id='submit'
              {{on 'click' modal.submit}}
            >Submit</button>
          </modal.footer>
        </BsModal>
      </template>,
    );

    await click('#submit');
    assert.ok(submitAction.calledOnce, 'submit action has been called.');
  });

  test('Modal has accesibility attributes with custom title', async function (assert) {
    await render(
      <template>
        <BsModal as |modal|>
          <modal.header>
            <h4 class='modal-title'>
              Custom Dialog title
            </h4>
          </modal.header>
          <modal.body>Hello world!</modal.body>
          <modal.footer />
        </BsModal>
      </template>,
    );

    const modalTitleId = document.getElementsByClassName('modal-title')[0].id;

    assert.dom('.modal').exists({ count: 1 }, 'Modal exists.');
    assert.dom('.modal').hasAttribute('role', 'dialog');
    assert.dom('.modal-dialog').hasAttribute('role', 'document');
    assert.dom('.modal').hasAttribute('aria-labelledby', modalTitleId);
  });

  test('Modal has accesibility attributes with default title', async function (assert) {
    await render(
      <template>
        <BsModal as |modal|>
          <modal.header @title='Some title' />
          <modal.body>Hello world!</modal.body>
          <modal.footer />
        </BsModal>
      </template>,
    );

    const modalTitleId = document.getElementsByClassName('modal-title')[0].id;

    assert.dom('.modal').exists({ count: 1 }, 'Modal exists.');
    assert.dom('.modal').hasAttribute('role', 'dialog');
    assert.dom('.modal-dialog').hasAttribute('role', 'document');
    assert.dom('.modal').hasAttribute('aria-labelledby', modalTitleId);
  });

  test('it passes along HTML attributes', async function (assert) {
    await render(
      <template>
        <BsModal @fade={{false}} class='custom' role='alert' data-test>
          template block text
        </BsModal>
      </template>,
    );

    assert.dom('.modal').exists({ count: 1 });
    assert.dom('.modal').hasClass('custom');
    assert.dom('.modal').hasAttribute('role', 'alert');
    assert.dom('.modal').hasAttribute('data-test');
  });

  test('it keeps itself visible when mouse click is started from inside of the modal \
    and dragged outside of the modal', async function (assert) {
    await render(
      <template>
        <BsModal>
          template block text
        </BsModal>
      </template>,
    );
    await triggerEvent('.modal-content', 'mousedown');
    await triggerEvent('.modal', 'mouseup');
    await triggerEvent('.modal', 'click');

    assert.dom('.modal').exists('Modal should be still visible');
  });

  test('it closes itself when backdrop is clicked', async function (assert) {
    await render(
      <template>
        <BsModal>
          template block text
        </BsModal>
      </template>,
    );
    await click('.modal');

    assert.dom('.modal').doesNotExist('Modal closes itself as normal');
  });

  test('backdrop=true adds backdrop element, renderInPlace = false', async function (assert) {
    await render(
      <template>
        <BsModal @backdrop={{true}}>Hello world!</BsModal>
      </template>,
    );

    assert
      .dom('.modal-backdrop')
      .exists({ count: 1 }, 'Modal has backdrop element');
    assert
      .dom('.modal-backdrop')
      .hasClass(visibilityClass(), 'Modal backdrop has visibility class');
  });

  test('backdrop=true adds backdrop element, renderInPlace = true', async function (assert) {
    await render(
      <template>
        <BsModal @backdrop={{true}} @renderInPlace={{true}}>Hello world!</BsModal>
      </template>,
    );

    assert
      .dom('.modal-backdrop')
      .exists({ count: 1 }, 'Modal has backdrop element');
    assert
      .dom('.modal-backdrop')
      .hasClass(visibilityClass(), 'Modal backdrop has visibility class');
  });

  test('it can reopen after closing by clicking the backdrop', async function (assert) {
    class State {
      @tracked open = false;
    }

    const state = new State();
    const close = () => (state.open = false);

    await render(
      <template>
        <BsModal @open={{state.open}} @onHidden={{close}}>Hello world!</BsModal>
      </template>,
    );

    assert.dom('.modal').doesNotExist('Modal is hidden');

    state.open = true;
    await settled();

    assert.dom('.modal').hasClass(visibilityClass(), 'Modal is visible');
    assert.dom('.modal').isVisible();

    await click('.modal');
    assert.dom('.modal').doesNotExist('Modal is hidden');

    state.open = true;
    await settled();

    assert.dom('.modal').isVisible('Modal is visible again');
  });

  test('it can reopen after closing by setting the `open` state to false', async function (assert) {
    class State {
      @tracked open = false;
    }

    const state = new State();

    await render(
      <template>
        <BsModal @open={{state.open}}>Hello world!</BsModal>
      </template>,
    );

    assert.dom('.modal').doesNotExist('Modal is hidden');
    state.open = true;
    await settled();

    assert.dom('.modal').hasClass(visibilityClass(), 'Modal is visible');
    assert.dom('.modal').isVisible();

    state.open = false;
    await settled();
    assert.dom('.modal').doesNotExist('Modal is hidden');

    state.open = true;
    await settled();

    assert.dom('.modal').isVisible('Modal is visible again');
  });

  testBS5(
    'it allows to render modal in fullscreen using @fullscreen argument',
    async function (assert) {
      class State {
        @tracked fullscreen = null;
      }

      const state = new State();
      await render(
        <template>
          <BsModal @fullscreen={{state.fullscreen}}>Hello World!</BsModal>
        </template>,
      );
      assert
        .dom('.modal-dialog')
        .doesNotHaveClass(
          /modal-fullscreen/,
          'it is not rendered as fullscreen if @full is undefined',
        );

      state.fullscreen = true;
      await settled();
      assert
        .dom('.modal-dialog')
        .hasClass(
          'modal-fullscreen',
          'it renders in fullscreen for all breakpoints if @fullscreen is `true`',
        );

      state.fullscreen = 'sm';
      await settled();
      assert
        .dom('.modal-dialog')
        .hasClass('modal-fullscreen-sm-down', 'it supports `sm` breakpoint');

      state.fullscreen = 'md';
      await settled();
      assert
        .dom('.modal-dialog')
        .hasClass('modal-fullscreen-md-down', 'it supports `md` breakpoint');

      state.fullscreen = 'lg';
      await settled();
      assert
        .dom('.modal-dialog')
        .hasClass('modal-fullscreen-lg-down', 'it supports `lg` breakpoint');

      state.fullscreen = 'xl';
      await settled();
      assert
        .dom('.modal-dialog')
        .hasClass('modal-fullscreen-xl-down', 'it supports `xl` breakpoint');

      state.fullscreen = 'xxl';
      await settled();
      assert
        .dom('.modal-dialog')
        .hasClass('modal-fullscreen-xxl-down', 'it supports `xxl` breakpoint');
    },
  );

  module('it animates opening and closing the modal', function () {
    hooks.before(function () {
      skipTransition(false);
    });

    hooks.after(function () {
      skipTransition(undefined);
    });

    test('it animates opening the modal', async function (assert) {
      class State {
        @tracked open = false;
      }

      const state = new State();
      await render(
        <template>
          <BsModal @open={{state.open}}>Hello world!</BsModal>
        </template>,
      );

      state.open = true;
      await waitFor('.modal.show');
      assert.dom('.modal').hasStyle({ display: 'block' });

      await waitUntil(() => {
        return find('.modal').getAnimations().length > 0;
      });
      assert.ok(
        find('.modal')
          .getAnimations()
          .find((animation) => animation.transitionProperty === 'opacity'),
        'modal opening is animated',
      );
    });

    test('it animates closing the modal', async function (assert) {
      await render(
        <template>
          <BsModal as |modal|>
            <button {{on 'click' modal.close}} type='button'>close</button>
          </BsModal>
        </template>,
      );

      // wait until modal is shown and opening transition is finished
      await waitFor('.modal.show');
      await Promise.all(
        find('.modal')
          .getAnimations()
          .map((animation) => animation.finished),
      );

      // close modal
      click('button');

      await waitUntil(() => {
        return !find('.modal').classList.contains(visibilityClass());
      });
      assert.dom('.modal').hasStyle({ display: 'block' });

      await waitUntil(() => {
        return find('.modal').getAnimations().length > 0;
      });
      assert.ok(
        find('.modal')
          .getAnimations()
          .find((animation) => animation.transitionProperty === 'opacity'),
        'modal closing is animated',
      );

      await settled();
      assert.dom('.modal').doesNotExist();
    });
  });

  test('Modal shows appropriate size respective to @size argument', async function (assert) {
    class State {
      @tracked size = null;
    }

    const state = new State();
    await render(<template><BsModal @size={{state.size}} /></template>);
    assert.dom('.modal').exists({ count: 1 }, 'Modal exists.');
    assert.dom('.modal-dialog').hasNoClass('modal-lg');
    assert.dom('.modal-dialog').hasNoClass('modal-sm');
    state.size = 'sm';
    await settled();
    assert.dom('.modal-dialog').hasClass('modal-sm');
    state.size = 'lg';
    await settled();
    assert.dom('.modal-dialog').hasClass('modal-lg');
  });

  test('Modal can be centered vertically', async function (assert) {
    class State {
      @tracked position = 'top';
    }
    const state = new State();
    await render(<template><BsModal @position={{state.position}} /></template>);
    assert.dom('.modal').exists({ count: 1 }, 'Modal exists.');
    assert.dom('.modal-dialog').hasNoClass('modal-dialog-centered');
    state.position = 'center';
    await settled();
    assert.dom('.modal-dialog').hasClass('modal-dialog-centered');
  });

  test('shows scrollable modal with respective to @scrollable argument', async function (assert) {
    class State {
      @tracked scrollable = false;
    }
    const state = new State();
    await render(
      <template><BsModal @scrollable={{state.scrollable}} /></template>,
    );
    assert.dom('.modal').exists({ count: 1 }, 'Modal exists.');
    assert.dom('.modal-dialog').hasNoClass('modal-dialog-scrollable');
    state.scrollable = true;
    await settled();
    assert.dom('.modal-dialog').hasClass('modal-dialog-scrollable');
  });

  test('Modal closes when escape key is pressed if @keyboard=true', async function (assert) {
    await render(<template><BsModal @keyboard={{true}} /></template>);
    assert.dom('.modal').exists({ count: 1 }, 'Modal exists.');
    await triggerKeyEvent('.modal', 'keydown', 'Escape');
    assert.dom('.modal').doesNotExist('Modal does not exist.');
  });

  test('Modal does not close when escape key is pressed if @keyboard=false', async function (assert) {
    await render(<template><BsModal @keyboard={{false}} /></template>);
    assert.dom('.modal').exists({ count: 1 }, 'Modal exists.');
    await triggerKeyEvent('.modal', 'keydown', 'Escape');
    assert.dom('.modal').exists({ count: 1 }, 'Modal exists.');
  });

  test('Modal closes when click is done outside the modal if @backdropClose=true', async function (assert) {
    await render(<template><BsModal @backdropClose={{true}} /></template>);
    assert.dom('.modal').exists({ count: 1 }, 'Modal exists.');
    await click('*');
    assert.dom('.modal').doesNotExist('Modal does not exist.');
  });

  test('Modal does not close when click is done outside the modal if @backdropClose=false', async function (assert) {
    await render(<template><BsModal @backdropClose={{false}} /></template>);
    assert.dom('.modal').exists({ count: 1 }, 'Modal exists.');
    await click('*');
    assert.dom('.modal').exists({ count: 1 }, 'Modal exists.');
  });
});
