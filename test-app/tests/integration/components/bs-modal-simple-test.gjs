import { module, skip } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import {
  click,
  focus,
  render,
  settled,
  triggerKeyEvent,
  waitUntil,
} from '@ember/test-helpers';
import {
  delay,
  defaultButtonClass,
  closeButtonClass,
  test,
  testRequiringFocus,
  testRequiringTransitions,
  visibilityClass,
} from '../../helpers/bootstrap';
import setupNoDeprecations from '../../helpers/setup-no-deprecations';
import a11yAudit from 'ember-a11y-testing/test-support/audit';
import sinon from 'sinon';
import BsModalSimple from 'ember-bootstrap/components/bs-modal-simple';
import BsForm from 'ember-bootstrap/components/bs-form';
import { on } from '@ember/modifier';
import { tracked } from '@glimmer/tracking';

module('Integration | Component | bs-modal-simple', function (hooks) {
  setupRenderingTest(hooks);
  setupNoDeprecations(hooks);

  test('Simple modal has header, footer and body', async function (assert) {
    await render(
      <template>
        <BsModalSimple @fade={{false}} @title='Simple Dialog'>Hello world!</BsModalSimple>
      </template>,
    );

    assert.dom('.modal').exists({ count: 1 }, 'Modal exists.');
    assert
      .dom('.modal .modal-header')
      .exists({ count: 1 }, 'Modal has header.');
    assert
      .dom('.modal .modal-header .modal-title')
      .hasText('Simple Dialog', 'Modal header has correct title.');
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
        <BsModalSimple @open={{false}} @title='Simple Dialog'>Hello world!</BsModalSimple>
      </template>,
    );

    assert.dom('.modal *').doesNotExist('Modal does not exist.');
  });

  test('Simple modal has default CSS classes', async function (assert) {
    await render(
      <template>
        <BsModalSimple @title='Simple Dialog'>Hello world!</BsModalSimple>
      </template>,
    );

    assert.dom('.modal').hasClass('fade', 'Modal has fade class');
    assert
      .dom('.modal')
      .hasClass(visibilityClass(), 'Modal has visibility class');
  });

  test('Simple modal supports custom buttons', async function (assert) {
    await render(
      <template>
        <BsModalSimple
          @title='Simple Dialog'
          @closeTitle='Cancel'
          @submitTitle='Ok'
        >Hello world!</BsModalSimple>
      </template>,
    );

    assert
      .dom(`.modal .modal-footer button.${defaultButtonClass()}`)
      .exists({ count: 1 }, 'Modal has close button.');
    assert
      .dom(`.modal .modal-footer button.${defaultButtonClass()}`)
      .hasText('Cancel', 'Close button has correct title.');
    assert
      .dom('.modal .modal-footer button.btn-primary')
      .exists({ count: 1 }, 'Modal has submit button.');
    assert
      .dom('.modal .modal-footer button.btn-primary')
      .hasText('Ok', 'Submit button has correct title.');
  });

  test('Simple modal supports a custom submit button type', async function (assert) {
    await render(
      <template>
        <BsModalSimple
          @closeTitle='Cancel'
          @submitTitle='Ok'
          @submitButtonType='danger'
        >Hello world!</BsModalSimple>
      </template>,
    );

    assert
      .dom('.modal .modal-footer button.btn-danger')
      .exists({ count: 1 }, 'Modal has submit button with btn-danger class.');
  });

  test('open modal is immediately shown', async function (assert) {
    await render(
      <template>
        <BsModalSimple @title='Simple Dialog' @fade={{false}}>Hello world!</BsModalSimple>
      </template>,
    );

    assert.dom('.modal').hasClass(visibilityClass(), 'Modal is visible');
    assert.dom('.modal').isVisible();
  });

  testRequiringTransitions(
    'open modal is immediately shown [fade]',
    async function (assert) {
      await render(
        <template>
          <BsModalSimple @title='Simple Dialog'>Hello world!</BsModalSimple>
        </template>,
      );

      assert.dom('.modal').hasClass(visibilityClass(), 'Modal is visible');
      assert.dom('.modal').isVisible();
    },
  );

  test('open property shows modal', async function (assert) {
    class State {
      @tracked open = false;
    }
    const state = new State();
    await render(
      <template>
        <BsModalSimple
          @title='Simple Dialog'
          @fade={{false}}
          @open={{state.open}}
        >Hello world!</BsModalSimple>
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
  });

  // https://github.com/kaliber5/ember-bootstrap/issues/1612
  test('open property accepts loosely types values', async function (assert) {
    class State {
      @tracked open = null;
    }
    const state = new State();
    await render(
      <template>
        <BsModalSimple
          @title='Simple Dialog'
          @fade={{false}}
          @open={{state.open}}
        >Hello world!</BsModalSimple>
      </template>,
    );

    assert.dom('.modal').doesNotExist('Modal is hidden');

    state.open = '';
    await settled();
    assert.dom('.modal').doesNotExist('Modal is hidden');

    state.open = {};
    await settled();

    assert.dom('.modal').hasClass(visibilityClass(), 'Modal is visible');
    assert.dom('.modal').isVisible();
  });

  testRequiringTransitions(
    'open property shows modal [fade]',
    async function (assert) {
      class State {
        @tracked open = false;
      }
      const state = new State();
      await render(
        <template>
          <BsModalSimple @title='Simple Dialog' @open={{state.open}}>Hello
            world!</BsModalSimple>
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
    },
  );

  test('closeButton property shows close button', async function (assert) {
    class State {
      @tracked closeButton = false;
    }
    const state = new State();
    await render(
      <template>
        <BsModalSimple
          @title='Simple Dialog'
          @closeButton={{state.closeButton}}
        >Hello world!</BsModalSimple>
      </template>,
    );

    assert
      .dom(`.modal .modal-header .${closeButtonClass()}`)
      .doesNotExist('Modal has no close button');
    state.closeButton = true;
    await settled();
    assert
      .dom(`.modal .modal-header .${closeButtonClass()}`)
      .exists({ count: 1 }, 'Modal has close button');
  });

  test('fade property toggles fade effect', async function (assert) {
    class State {
      @tracked fade = false;
    }
    const state = new State();
    await render(
      <template>
        <BsModalSimple @title='Simple Dialog' @fade={{state.fade}}>Hello world!</BsModalSimple>
      </template>,
    );
    assert.dom('.modal').hasNoClass('fade', 'Modal has no fade class');
    state.fade = true;
    await settled();
    assert.dom('.modal').hasClass('fade', 'Modal has fade class');
  });

  test('backdrop=true adds backdrop element', async function (assert) {
    await render(
      <template>
        <BsModalSimple @title='Simple Dialog' @backdrop={{true}}>Hello world!</BsModalSimple>
      </template>,
    );

    assert
      .dom('.modal-backdrop')
      .exists({ count: 1 }, 'Modal has backdrop element');
    assert
      .dom('.modal-backdrop')
      .hasClass(visibilityClass(), 'Modal backdrop has visibility class');
  });

  test('backdrop=false removes backdrop element', async function (assert) {
    await render(
      <template>
        <BsModalSimple @title='Simple Dialog' @backdrop={{false}}>Hello world!</BsModalSimple>
      </template>,
    );

    assert.dom('.modal-backdrop').doesNotExist('Modal has no backdrop element');
  });

  test('clicking close button closes modal', async function (assert) {
    await render(
      <template>
        <BsModalSimple @title='Simple Dialog'>Hello world!</BsModalSimple>
      </template>,
    );

    assert.dom('.modal').exists({ count: 1 }, 'Modal is visible');
    assert.dom('.modal').hasClass(visibilityClass(), 'Modal is visible');
    await click(`.modal .modal-header .${closeButtonClass()}`);

    assert.dom('.modal').doesNotExist('Modal is hidden');
  });

  test('clicking ok button closes modal', async function (assert) {
    await render(
      <template>
        <BsModalSimple @title='Simple Dialog'>Hello world!</BsModalSimple>
      </template>,
    );

    assert.dom('.modal').exists({ count: 1 }, 'Modal is visible');
    assert.dom('.modal').hasClass(visibilityClass(), 'Modal is visible');
    await click('.modal .modal-footer button');

    assert.dom('.modal').doesNotExist('Modal is hidden');
  });

  test('clicking close button leaves modal open when onHide action returns false', async function (assert) {
    const hideAction = sinon.stub().returns(false);

    await render(
      <template>
        <BsModalSimple @title='Simple Dialog' @onHide={{hideAction}}>Hello
          world!</BsModalSimple>
      </template>,
    );

    // wait for fade animation
    assert.dom('.modal').exists({ count: 1 }, 'Modal is visible');
    assert.dom('.modal').hasClass(visibilityClass(), 'Modal is visible');
    await click(`.modal .modal-header .${closeButtonClass()}`);

    assert.dom('.modal').hasClass(visibilityClass(), 'Modal is still visible');
  });

  test('can implement custom close buttons', async function (assert) {
    await render(
      <template>
        <BsModalSimple @title='Simple Dialog' as |modal|>
          Hello world!
          <a href='#' class='close-link' onclick={{modal.close}}>close</a>
        </BsModalSimple>
      </template>,
    );

    assert.dom('.modal').exists({ count: 1 }, 'Modal is visible');
    assert.dom('.modal').hasClass(visibilityClass(), 'Modal is visible');
    await click('.modal .close-link');

    assert.dom('.modal').doesNotExist('Modal is hidden');
  });

  test('size property adds size class', async function (assert) {
    await render(
      <template>
        <BsModalSimple @title='Simple Dialog' @size='lg' @fade={{false}}>Hello
          world!</BsModalSimple>
      </template>,
    );
    assert.dom('.modal-dialog').hasClass('modal-lg', 'Modal has size class.');
  });

  test('onShow/onShown actions fire correctly with fade=false', async function (assert) {
    class State {
      @tracked open = false;
    }
    const state = new State();
    const openAction = sinon.spy();
    const openedAction = sinon.spy();
    await render(
      <template>
        <BsModalSimple
          @title='Simple Dialog'
          @onShow={{openAction}}
          @onShown={{openedAction}}
          @open={{state.open}}
          @fade={{false}}
        >Hello world!</BsModalSimple>
      </template>,
    );

    state.open = true;
    await settled();

    assert.ok(
      openAction.calledOnce,
      'onShow action fired after setting open=true',
    );
    assert.ok(
      openedAction.calledOnce,
      'onShown action fired after setting open=true',
    );
  });

  testRequiringTransitions(
    'onShow/onShown fire correctly with fade=true',
    async function (assert) {
      class State {
        @tracked open = false;
      }
      const state = new State();
      const openAction = sinon.spy();
      const openedAction = sinon.spy();
      await render(
        <template>
          <BsModalSimple
            @title='Simple Dialog'
            @onShow={{openAction}}
            @onShown={{openedAction}}
            @open={{state.open}}
          >Hello world!</BsModalSimple>
        </template>,
      );

      state.open = true;
      assert.notOk(openAction.called, 'onShow action did not fire immediately');
      assert.notOk(
        openedAction.called,
        'onShown action did not fire immediately',
      );

      // wait for fade animation
      await settled();
      assert.ok(openAction.calledOnce, 'onShow action did fire');
      assert.ok(openedAction.calledOnce, 'onShown action did fire');
    },
  );

  test('onHide is called when clicking close button', async function (assert) {
    const testAction = sinon.spy();
    await render(
      <template>
        <BsModalSimple
          @title='Simple Dialog'
          @fade={{false}}
          @onHide={{testAction}}
        >Hello world!</BsModalSimple>
      </template>,
    );
    await click(`.modal .modal-header .${closeButtonClass()}`);
    assert.ok(testAction.calledOnce);
  });

  test('onHidden is called after modal is closed', async function (assert) {
    class State {
      @tracked open = true;
    }
    const state = new State();
    const hiddenAction = sinon.spy();
    await render(
      <template>
        <BsModalSimple
          @title='Simple Dialog'
          @onHidden={{hiddenAction}}
          @open={{state.open}}
        >Hello world!</BsModalSimple>
      </template>,
    );

    state.open = false;
    // wait for fade animation
    await settled();
    assert.ok(hiddenAction.calledOnce);
  });

  test('onSubmit is called when clicking submit button', async function (assert) {
    const testAction = sinon.spy();
    await render(
      <template>
        <BsModalSimple
          @title='Simple Dialog'
          @closeTitle='Cancel'
          @submitTitle='Ok'
          @onSubmit={{testAction}}
        >Hello world!</BsModalSimple>
      </template>,
    );
    await click('.modal .modal-footer button.btn-primary');
    assert.ok(testAction.calledOnce);
  });

  test('when modal has a form and the submit button is clicked, the form is submitted', async function (assert) {
    const modalSubmit = sinon.spy();
    const formSubmit = sinon.spy();
    await render(
      <template>
        <BsModalSimple
          @title='Simple Dialog'
          @closeTitle='Cancel'
          @submitTitle='Ok'
          @onSubmit={{modalSubmit}}
        ><BsForm @onSubmit={{formSubmit}} /></BsModalSimple>
      </template>,
    );
    await click('.modal .modal-footer button.btn-primary');
    assert.ok(formSubmit.calledOnce);
    assert.notOk(modalSubmit.called);
  });

  test('when modal has several forms and the submit button is clicked, those forms are submitted', async function (assert) {
    const modalSubmit = sinon.spy();
    const formOneSubmit = sinon.spy();
    const formTwoSubmit = sinon.spy();
    await render(
      <template>
        <BsModalSimple
          @title='Simple Dialog'
          @closeTitle='Cancel'
          @submitTitle='Ok'
          @onSubmit={{modalSubmit}}
        ><BsForm @onSubmit={{formOneSubmit}} /><BsForm
            @onSubmit={{formTwoSubmit}}
          /></BsModalSimple>
      </template>,
    );
    await click('.modal .modal-footer button.btn-primary');
    assert.ok(formOneSubmit.calledOnce);
    assert.ok(formTwoSubmit.called);
    assert.notOk(modalSubmit.calledOnce);
  });

  testRequiringFocus(
    'autofocus element is focused when present and fade=false',
    async function (assert) {
      class State {
        @tracked open = false;
      }
      const state = new State();
      await render(
        <template>
          <BsModalSimple
            @title='Simple Dialog'
            @fade={{false}}
            @open={{state.open}}
          >
            <input data-test-autofocus autofocus='autofocus' />
          </BsModalSimple>
        </template>,
      );

      state.open = true;
      await settled();
      assert.dom('input[data-test-autofocus]').isFocused();
    },
  );

  testRequiringFocus('modal is focused when open', async function (assert) {
    await render(
      <template>
        <BsModalSimple @title='Simple Dialog' @fade={{false}} @open={{true}}>
          Hallo
        </BsModalSimple>
      </template>,
    );

    assert.dom('.modal-content').isFocused();
  });

  testRequiringFocus(
    'modal is focused when opened later',
    async function (assert) {
      class State {
        @tracked open = false;
      }
      const state = new State();
      await render(
        <template>
          <BsModalSimple
            @title='Simple Dialog'
            @fade={{false}}
            @open={{state.open}}
          >
            Hallo
          </BsModalSimple>
        </template>,
      );

      state.open = true;
      await settled();

      assert.dom('.modal-content').isFocused();
    },
  );

  // unfortunately it seems we cannot simulate the user moving focus by tabbing by triggering key events :(
  // keeping this around in case a working solution pops up...
  skip('focus is trapped in modal', async function (assert) {
    await render(
      <template>
        <BsModalSimple @title='Simple Dialog' @fade={{false}}>
          <input data-test-input />
          <a href='#' data-test-link>Link</a>
        </BsModalSimple>
      </template>,
    );

    await triggerKeyEvent(document, 'keyup', 9); // tab
    assert.dom('.close').isFocused();

    await triggerKeyEvent(document, 'keyup', 9); // tab
    assert.dom('[data-test-input]').isFocused(); // input

    await triggerKeyEvent(document, 'keyup', 9); // tab
    assert.dom('[data-test-link]').isFocused(); // link

    await triggerKeyEvent(document, 'keyup', 9); // tab
    assert.dom('.btn').isFocused(); // default submit button

    await triggerKeyEvent(document, 'keyup', 9); // tab
    assert.dom('.close').isFocused(); // cycle to close button
  });

  testRequiringFocus(
    'focus is reset to previously focused element',
    async function (assert) {
      class State {
        @tracked open = false;
      }
      const state = new State();
      await render(
        <template>
          <button type='button' data-test-button>Open</button>
          <BsModalSimple
            @title='Simple Dialog'
            @fade={{false}}
            @open={{state.open}}
          >
            Hallo
          </BsModalSimple>
        </template>,
      );
      await focus('[data-test-button]');

      state.open = true;
      await settled();

      state.open = false;
      await settled();
      await delay(0);

      assert.dom('[data-test-button]').isFocused();
    },
  );

  testRequiringFocus(
    'Pressing escape key will close the modal if keyboard=true',
    async function (assert) {
      const hideAction = sinon.spy();
      await render(
        <template>
          <BsModalSimple
            @title='Simple Dialog'
            @onHide={{hideAction}}
            @keyboard={{true}}
          >Hello world!</BsModalSimple>
        </template>,
      );

      // wait for fade animation
      await waitUntil(() =>
        this.element
          .querySelector('.modal')
          .classList.contains(visibilityClass()),
      );

      // trigger escape key event
      await triggerKeyEvent('.modal', 'keydown', 27);

      // wait for fade animation
      await waitUntil(() => !this.element.querySelector('.modal'));

      assert.ok(hideAction.calledOnce, 'Action has been called.');
    },
  );

  testRequiringFocus(
    'Pressing escape key will close the modal if keyboard=true and element is autofocused',
    async function (assert) {
      const hideAction = sinon.spy();
      await render(
        <template>
          <BsModalSimple
            @title='Simple Dialog'
            @onHide={{hideAction}}
            @keyboard={{true}}
          >
            <input autofocus='autofocus' />
          </BsModalSimple>
        </template>,
      );

      // wait for fade animation
      await waitUntil(() =>
        this.element
          .querySelector('.modal')
          .classList.contains(visibilityClass()),
      );

      // trigger escape key event
      await triggerKeyEvent('.modal', 'keydown', 27);

      // wait for fade animation
      await waitUntil(() => !this.element.querySelector('.modal'));

      assert.ok(hideAction.calledOnce, 'Action has been called.');
    },
  );

  testRequiringFocus(
    'Pressing escape key is ignored if keyboard=false',
    async function (assert) {
      const hideAction = sinon.spy();
      await render(
        <template>
          <BsModalSimple
            @title='Simple Dialog'
            @onHide={{hideAction}}
            @keyboard={{false}}
          >Hello world!</BsModalSimple>
        </template>,
      );

      // wait for fade animation
      await waitUntil(() =>
        this.element
          .querySelector('.modal')
          .classList.contains(visibilityClass()),
      );

      // trigger escape key event
      await triggerKeyEvent('.modal', 'keydown', 27);

      assert.notOk(hideAction.called);
    },
  );

  test('Clicking on the backdrop will close the modal', async function (assert) {
    const hideAction = sinon.spy();
    await render(
      <template>
        <BsModalSimple @title='Simple Dialog' @onHide={{hideAction}}>Hello
          world!</BsModalSimple>
      </template>,
    );

    // wait for fade animation
    await waitUntil(() =>
      this.element
        .querySelector('.modal')
        .classList.contains(visibilityClass()),
    );

    await click('.modal');

    // wait for fade animation
    await waitUntil(() => !this.element.querySelector('.modal'));
    assert.ok(hideAction.calledOnce);
  });

  test('Clicking on the backdrop is ignored when backdropClose=false', async function (assert) {
    const hideAction = sinon.spy();
    await render(
      <template>
        <BsModalSimple
          @title='Simple Dialog'
          @onHide={{hideAction}}
          @backdropClose={{false}}
        >Hello world!</BsModalSimple>
      </template>,
    );
    // wait for fade animation
    await waitUntil(() =>
      this.element
        .querySelector('.modal')
        .classList.contains(visibilityClass()),
    );
    await click('.modal');

    assert.dom('.modal').hasClass(visibilityClass(), 'Modal is still visible');
    assert.notOk(hideAction.called);
  });

  test("Renders in wormhole's default destination if renderInPlace is not set", async function (assert) {
    class State {
      @tracked show = false;
    }
    const state = new State();
    await render(
      <template>
        <div id='ember-bootstrap-wormhole'></div>{{#if
          state.show
        }}<BsModalSimple @title='Simple Dialog'>Hello world!</BsModalSimple>{{/if}}
      </template>,
    );
    state.show = true;
    await settled();

    assert.dom('.modal').exists({ count: 1 }, 'Modal exists.');
    assert
      .dom('#ember-bootstrap-wormhole .modal')
      .exists({ count: 1 }, 'Modal exists in wormhole');
  });

  test('Renders in test container if renderInPlace is not set', async function (assert) {
    class State {
      @tracked show = false;
    }
    const state = new State();
    await render(
      <template>
        <div id='wrapper'>{{#if state.show}}<BsModalSimple
              @title='Simple Dialog'
            >Hello world!</BsModalSimple>{{/if}}</div>
      </template>,
    );
    state.show = true;
    await settled();

    assert.dom('.modal').exists({ count: 1 }, 'Modal exists.');
    assert.dom('#wrapper .modal').doesNotExist();
  });

  test('Renders in place (no wormhole) if renderInPlace is set', async function (assert) {
    class State {
      @tracked show = false;
    }
    const state = new State();
    await render(
      <template>
        <div id='ember-bootstrap-wormhole'></div><div id='wrapper'>{{#if
            state.show
          }}<BsModalSimple @title='Simple Dialog' @renderInPlace={{true}}>Hello
              world!</BsModalSimple>{{/if}}</div>
      </template>,
    );
    state.show = true;
    await settled();

    assert.dom('#wrapper .modal').exists({ count: 1 }, 'Modal exists in place');
  });

  test('Removes "modal-open" class when component is removed from view', async function (assert) {
    class State {
      @tracked renderComponent = true;
    }
    const state = new State();
    await render(
      <template>
        {{#if state.renderComponent}}<BsModalSimple @title='Simple Dialog'>Hello
            world!</BsModalSimple>{{/if}}
      </template>,
    );

    // wait for fade animation
    await waitUntil(() =>
      this.element
        .querySelector('.modal')
        .classList.contains(visibilityClass()),
    );
    assert
      .dom(document.body)
      .hasClass('modal-open', 'body element has "modal-open" class.');

    state.renderComponent = false;
    await settled();

    assert.notOk(
      document.body.classList.contains('modal-open'),
      'body element does not have "modal-open" class.',
    );
  });

  test('Resets scroll bar when component is removed from view', async function (assert) {
    document.body.style.paddingRight = '50px';
    class State {
      @tracked renderComponent = true;
    }
    const state = new State();
    await render(
      <template>
        {{#if state.renderComponent}}<BsModalSimple @title='Simple Dialog'>Hello
            world!</BsModalSimple>{{/if}}
      </template>,
    );

    await waitUntil(() =>
      this.element
        .querySelector('.modal')
        .classList.contains(visibilityClass()),
    );

    document.body.style.paddingRight = '0px';
    state.renderComponent = false;
    await settled();

    assert.equal(
      document.body.style.paddingRight,
      '50px',
      'paddingRight restored to 50px',
    );
    document.body.style.paddingRight = '0px';
  });

  test('Modal yields close action', async function (assert) {
    const closeAction = sinon.spy();

    await render(
      <template>
        <BsModalSimple @onHide={{closeAction}} as |modal|>
          <button
            type='button'
            id='close'
            {{on 'click' modal.close}}
          >Close</button>
        </BsModalSimple>
      </template>,
    );

    await click('#close');
    assert.ok(closeAction.calledOnce, 'close action has been called.');
  });

  test('Modal yields submit action', async function (assert) {
    const submitAction = sinon.spy();

    await render(
      <template>
        <BsModalSimple @onSubmit={{submitAction}} as |modal|>
          <button
            type='button'
            id='submit'
            {{on 'click' modal.submit}}
          >Submit</button>
        </BsModalSimple>
      </template>,
    );

    await click('#submit');
    assert.ok(submitAction.calledOnce, 'submit action has been called.');
  });

  test('closing modal does not modify public open property', async function (assert) {
    class State {
      @tracked open = true;
    }
    const state = new State();
    await render(
      <template>
        <BsModalSimple
          @title='Simple Dialog'
          @fade={{false}}
          @open={{state.open}}
        >Hello world!</BsModalSimple>
      </template>,
    );
    await click(`.modal .modal-header .${closeButtonClass()}`);
    assert.true(state.open, 'Does not change open property');
  });

  test('modal can be centered vertically', async function (assert) {
    await render(
      <template>
        <BsModalSimple
          @title='Simple Dialog'
          @fade={{false}}
          @position='center'
        >Hello world!</BsModalSimple>
      </template>,
    );
    assert.dom('.modal-dialog').hasClass('modal-dialog-centered');
  });

  test('Modal has accessibility attributes with default title', async function (assert) {
    await render(
      <template>
        <BsModalSimple @open={{true}} @title='Simple Dialog'>Hello world!</BsModalSimple>
      </template>,
    );

    const modalTitleId = document.getElementsByClassName('modal-title')[0].id;
    assert.notOk(modalTitleId.includes('undefined'), 'Should have a proper ID');
    assert.dom('.modal').exists({ count: 1 }, 'Modal exists.');
    assert.dom('.modal').hasAttribute('role', 'dialog');
    assert.dom('.modal-dialog').hasAttribute('role', 'document');
    assert.dom('.modal').hasAttribute('aria-labelledby', modalTitleId);
  });

  test('it passes along HTML attributes', async function (assert) {
    await render(
      <template>
        <BsModalSimple @fade={{false}} class='custom' role='alert' data-test>
          template block text
        </BsModalSimple>
      </template>,
    );

    assert.dom('.modal').exists({ count: 1 });
    assert.dom('.modal').hasClass('custom');
    assert.dom('.modal').hasAttribute('role', 'alert');
    assert.dom('.modal').hasAttribute('data-test');
  });

  test('modal can be set to scrollable', async function (assert) {
    await render(
      <template>
        <BsModalSimple
          @title='Simple Dialog'
          @fade={{false}}
          @scrollable={{true}}
        >Hello world!</BsModalSimple>
      </template>,
    );
    assert.dom('.modal-dialog').hasClass('modal-dialog-scrollable');
  });

  test('it passes accessibility checks', async function (assert) {
    await render(
      <template>
        <BsModalSimple @title='Some Title'>
          template block text
        </BsModalSimple>
      </template>,
    );

    await a11yAudit({
      rules: {
        'heading-order': { enabled: false },
        'color-contrast': { enabled: false },
      },
    });
    assert.ok(true, 'A11y audit passed');
  });
});
