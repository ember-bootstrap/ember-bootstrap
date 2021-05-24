import Component from '@ember/component';
import { module } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, find, triggerEvent, settled, waitFor, waitUntil } from '@ember/test-helpers';
import { isBootstrap, test, visibilityClass } from '../../helpers/bootstrap';
import hbs from 'htmlbars-inline-precompile';
import setupNoDeprecations from '../../helpers/setup-no-deprecations';
import sinon from 'sinon';

module('Integration | Component | bs-modal', function (hooks) {
  setupRenderingTest(hooks);
  setupNoDeprecations(hooks);

  hooks.beforeEach(function () {
    this.actions = {};
    this.send = (actionName, ...args) => this.actions[actionName].apply(this, args);
  });

  test('Modal yields header, footer and body components', async function (assert) {
    await render(hbs`
      <BsModal as |modal|>
        <modal.header @title="Dialog" />
        <modal.body>Hello world!</modal.body>
        <modal.footer />
      </BsModal>
    `);

    assert.dom('.modal').exists({ count: 1 }, 'Modal exists.');
    assert.dom('.modal .modal-header').exists({ count: 1 }, 'Modal has header.');
    assert.dom('.modal .modal-header .modal-title').hasText('Dialog', 'Modal header has correct title.');
    assert.dom('.modal .modal-footer').exists({ count: 1 }, 'Modal has footer.');
    assert.dom('.modal .modal-footer button').exists({ count: 1 }, 'Modal has button in footer.');
    assert.dom('.modal .modal-footer button').hasText('Ok', 'Modal button has default title.');
    assert.dom('.modal .modal-body').exists({ count: 1 }, 'Modal has body.');
    assert.dom('.modal .modal-body').hasText('Hello world!', 'Modal body has correct content.');
  });

  test('Hidden modal does not render', async function (assert) {
    await render(hbs`
      <BsModal @open={{false}} as |modal|>
        <modal.header @title="Dialog" />
        <modal.body>Hello world!</modal.body>
        <modal.footer />
      </BsModal>
    `);

    assert.dom('.modal *').doesNotExist('Modal does not exist.');
  });

  test('clicking ok button closes modal when autoClose=true with custom component hierarchy', async function (assert) {
    this.owner.register(
      'component:test-component',
      class extends Component {
        layout = hbs`{{yield}}`;
      }
    );

    await render(hbs`
      <BsModal @title="Simple Dialog" @body={{false}} @footer={{false}} as |modal|>
        {{#test-component}}
          <modal.body>Hello world!</modal.body>
          <modal.footer />
        {{/test-component}}
      </BsModal>

    `);

    await click('.modal .modal-footer button');
    assert.dom('.modal').doesNotExist('Modal is hidden');
  });

  test('Modal yields close action', async function (assert) {
    let closeAction = sinon.spy();
    this.actions.close = closeAction;

    await render(hbs`
      <BsModal @onHide={{action "close"}} as |modal|>
        <modal.header @title="Dialog" />
        <modal.body>Hello world!</modal.body>
        <modal.footer>
          <button type="button" id="close" {{action modal.close}}>Close</button>
        </modal.footer>
      </BsModal>
    `);

    await click('#close');
    assert.ok(closeAction.calledOnce, 'close action has been called.');
  });

  test('Modal yields submit action', async function (assert) {
    let submitAction = sinon.spy();
    this.actions.submit = submitAction;

    await render(hbs`
      <BsModal @onSubmit={{action "submit"}} as |modal|>
        <modal.header @title="Dialog" />
        <modal.body>Hello world!</modal.body>
        <modal.footer>
          <button type="button" id="submit" {{action modal.submit}}>Submit</button>
        </modal.footer>
      </BsModal>
    `);

    await click('#submit');
    assert.ok(submitAction.calledOnce, 'submit action has been called.');
  });

  test('Modal has accesibility attributes with custom title', async function (assert) {
    await render(hbs`
      <BsModal as |modal|>
        <modal.header>
          <h4 class="modal-title">
            Custom Dialog title
          </h4>
        </modal.header>
        <modal.body>Hello world!</modal.body>
        <modal.footer />
      </BsModal>
    `);

    const modalTitleId = document.getElementsByClassName('modal-title')[0].id;

    assert.dom('.modal').exists({ count: 1 }, 'Modal exists.');
    assert.dom('.modal').hasAttribute('role', 'dialog');
    assert.dom('.modal-dialog').hasAttribute('role', 'document');
    assert.dom('.modal').hasAttribute('aria-labelledby', modalTitleId);
  });

  test('Modal has accesibility attributes with default title', async function (assert) {
    await render(hbs`
      <BsModal as |modal|>
        <modal.header @title="Some title" />
        <modal.body>Hello world!</modal.body>
        <modal.footer />
      </BsModal>
    `);

    const modalTitleId = document.getElementsByClassName('modal-title')[0].id;

    assert.dom('.modal').exists({ count: 1 }, 'Modal exists.');
    assert.dom('.modal').hasAttribute('role', 'dialog');
    assert.dom('.modal-dialog').hasAttribute('role', 'document');
    assert.dom('.modal').hasAttribute('aria-labelledby', modalTitleId);
  });

  test('it passes along class attribute', async function (assert) {
    await render(hbs`
      <BsModal @fade={{false}} @class="custom">
        template block text
      </BsModal>
    `);

    assert.dom('.modal.custom').exists({ count: 1 });
  });

  test('it passes along HTML attributes', async function (assert) {
    await render(hbs`
      <BsModal @fade={{false}} class="custom" role="alert" data-test>
        template block text
      </BsModal>
    `);

    assert.dom('.modal').exists({ count: 1 });
    assert.dom('.modal').hasClass('custom');
    assert.dom('.modal').hasAttribute('role', 'alert');
    assert.dom('.modal').hasAttribute('data-test');
  });

  test('it keeps itself visible when mouse click is started from inside of the modal \
    and dragged outside of the modal', async function (assert) {
    await render(hbs`
      <BsModal>
        template block text
      </BsModal>
    `);
    await triggerEvent('.modal-content', 'mousedown');
    await triggerEvent('.modal', 'mouseup');
    await triggerEvent('.modal', 'click');

    assert.dom('.modal').exists('Modal should be still visible');
  });

  test('it closes itself when backdrop is clicked', async function (assert) {
    await render(hbs`
      <BsModal>
        template block text
      </BsModal>
    `);
    await click('.modal');

    assert.dom('.modal').doesNotExist('Modal closes itself as normal');
  });

  test('backdrop=true adds backdrop element, renderInPlace = false', async function (assert) {
    await render(hbs`<BsModal @backdrop={{true}}>Hello world!</BsModal>`);

    assert.dom('.modal-backdrop').exists({ count: 1 }, 'Modal has backdrop element');
    assert.dom('.modal-backdrop').hasClass(visibilityClass(), 'Modal backdrop has visibility class');
  });

  test('backdrop=true adds backdrop element, renderInPlace = true', async function (assert) {
    await render(hbs`<BsModal @backdrop={{true}} @renderInPlace={{true}}>Hello world!</BsModal>`);

    assert.dom('.modal-backdrop').exists({ count: 1 }, 'Modal has backdrop element');
    assert.dom('.modal-backdrop').hasClass(visibilityClass(), 'Modal backdrop has visibility class');
  });

  test('it can reopen after closing by clicking the backdrop', async function (assert) {
    this.set('open', false);
    this.set('close', () => this.set('open', false));
    await render(hbs`<BsModal @open={{this.open}} @onHidden={{action this.close}}>Hello world!</BsModal>`);

    assert.dom('.modal').doesNotExist('Modal is hidden');
    this.set('open', true);
    await settled();

    assert.dom('.modal').hasClass(visibilityClass(), 'Modal is visible');
    assert.dom('.modal').isVisible();

    await click('.modal');
    assert.dom('.modal').doesNotExist('Modal is hidden');

    this.set('open', true);
    await settled();

    assert.dom('.modal').isVisible('Modal is visible again');
  });

  test('it can reopen after closing by setting the `open` state to false', async function (assert) {
    this.set('open', false);
    await render(hbs`<BsModal @open={{this.open}}>Hello world!</BsModal>`);

    assert.dom('.modal').doesNotExist('Modal is hidden');
    this.set('open', true);
    await settled();

    assert.dom('.modal').hasClass(visibilityClass(), 'Modal is visible');
    assert.dom('.modal').isVisible();

    this.set('open', false);
    await settled();
    assert.dom('.modal').doesNotExist('Modal is hidden');

    this.set('open', true);
    await settled();

    assert.dom('.modal').isVisible('Modal is visible again');
  });

  test('it animates opening the modal', async function (assert) {
    // record all transition events to assert against later
    const transitionEvents = [];
    this.element.addEventListener('transitionrun', (event) => {
      transitionEvents.push(event);
    });

    this.set('open', false);
    await render(hbs`<BsModal @open={{this.open}}>Hello world!</BsModal>`);

    this.set('open', true);
    await waitFor('.modal.show');
    assert.dom('.modal').hasClass('show');
    if (isBootstrap(3)) {
      assert.dom('.modal').hasClass('in');
    }
    if (isBootstrap(4)) {
      assert.dom('.modal').hasStyle({ display: 'block' });
    }

    await waitUntil(
      () => {
        return transitionEvents.find((event) => event.target === find('.modal') && event.propertyName === 'opacity');
      },
      {
        timeoutMessage: 'awaiting modal opening transition timed out',
      }
    );
    assert.ok(
      // waitUntil condition already implicitly asserted that modal opening transition has run
      // adding an explicit assertion to ease reading test log
      true,
      'modal opening was animated'
    );
  });

  test('it animates closing the modal', async function (assert) {
    await render(hbs`
      <BsModal as |modal|>
        <button {{on "click" modal.close}} type="button">close</button>
      </BsModal>
    `);

    // wait until modal is shown and opening transition is finished
    await waitFor('.modal.show');
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // record all transition events emitted by modal to assert against later
    let transitionEvents = [];
    this.element.addEventListener('transitionrun', (event) => {
      transitionEvents.push(event);
    });

    // keep reference to modal element to compare with event target after modal has been destroyed
    const modalEl = find('.modal');

    // close modal
    click('button');

    await waitUntil(() => {
      return !modalEl.classList.contains(visibilityClass());
    });
    assert.dom('.modal').doesNotHaveClass(visibilityClass);
    if (isBootstrap(3)) {
      assert.dom('.modal').hasClass('show');
    }
    if (isBootstrap(4)) {
      assert.dom('.modal').hasStyle({ display: 'block' });
    }

    await settled();
    assert.dom('.modal').doesNotExist();

    await waitUntil(
      () => {
        return transitionEvents.find((event) => event.target === modalEl && event.propertyName === 'opacity');
      },
      {
        timeoutMessage: 'awaiting modal closing transition timed out',
      }
    );
    assert.ok(
      // waitUntil condition already implicitly asserted that modal closing transition has run
      // adding an explicit assertion to ease reading test log
      true,
      'modal closing was animated'
    );
  });
});
