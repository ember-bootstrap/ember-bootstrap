import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('bs-modal', 'Integration | Component | bs-modal', {
  integration: true
});

const transitionTimeout = 500;

test('Simple modal has header, footer and body', function(assert) {
  this.render(hbs`{{#bs-modal title="Simple Dialog"}}Hello world!{{/bs-modal}}`);

  assert.equal(this.$('.modal').length, 1, 'Modal exists.');
  assert.equal(this.$('.modal .modal-header').length, 1, 'Modal has header.');
  assert.equal(this.$('.modal .modal-header .modal-title').text().trim(), 'Simple Dialog', 'Modal header has correct title.');
  assert.equal(this.$('.modal .modal-footer').length, 1, 'Modal has footer.');
  assert.equal(this.$('.modal .modal-body').length, 1, 'Modal has body.');
  assert.equal(this.$('.modal .modal-body').text().trim(), 'Hello world!', 'Modal body has correct content.');
});

test('Simple modal has default CSS classes', function(assert) {
  this.render(hbs`{{#bs-modal title="Simple Dialog"}}Hello world!{{/bs-modal}}`);

  assert.ok(this.$('.modal').hasClass('fade'), 'Modal has fade class');

  let done = assert.async();
  // wait for fade animation
  setTimeout(() => {
    assert.ok(this.$('.modal').hasClass('in'), 'Modal has in class');
    done();
  }, transitionTimeout);
});

test('open property shows modal', function(assert) {
  this.set('open', false);
  this.render(hbs`{{#bs-modal title="Simple Dialog" fade=false open=open}}Hello world!{{/bs-modal}}`);

  assert.equal(this.$('.modal').hasClass('in'), false, 'Modal has not in class');
  this.set('open', true);
  assert.equal(this.$('.modal').hasClass('in'), true, 'Modal has in class');
  this.set('open', false);
  assert.equal(this.$('.modal').hasClass('in'), false, 'Modal has not in class');
});

test('open property shows modal [fade]', function(assert) {
  let done = assert.async();
  this.set('open', false);
  this.render(hbs`{{#bs-modal title="Simple Dialog" open=open}}Hello world!{{/bs-modal}}`);

  assert.equal(this.$('.modal').hasClass('in'), false, 'Modal has not in class');
  this.set('open', true);
  // wait for fade animation
  setTimeout(() => {
    assert.equal(this.$('.modal').hasClass('in'), true, 'Modal has in class');
    this.set('open', false);
    setTimeout(() => {
      assert.equal(this.$('.modal').hasClass('in'), false, 'Modal has not in class');
      done();
    }, transitionTimeout);
  }, transitionTimeout);
});

test('closeButton property shows close button', function(assert) {
  this.set('closeButton', false);
  this.render(hbs`{{#bs-modal title="Simple Dialog" closeButton=closeButton}}Hello world!{{/bs-modal}}`);
  assert.equal(this.$('.modal .modal-header .close').length, 0, 'Modal has no close button');
  this.set('closeButton', true);
  assert.equal(this.$('.modal .modal-header .close').length, 1, 'Modal has close button');
});

test('fade property toggles fade effect', function(assert) {
  this.set('fade', false);
  this.render(hbs`{{#bs-modal title="Simple Dialog" fade=fade}}Hello world!{{/bs-modal}}`);
  assert.equal(this.$('.modal').hasClass('fade'), false, 'Modal has no fade class');
  this.set('fade', true);
  assert.equal(this.$('.modal').hasClass('fade'), true, 'Modal has fade class');
});

test('backdrop=true adds backdrop element', function(assert) {
  this.render(hbs`{{#bs-modal title="Simple Dialog" backdrop=true}}Hello world!{{/bs-modal}}`);
  let done = assert.async();
  // wait for fade animation
  setTimeout(() => {
    assert.equal(this.$('.modal-backdrop').length, 1, 'Modal has backdrop element');
    assert.ok(this.$('.modal-backdrop').hasClass('in'), 'Modal backdrop has in class');
    done();
  }, transitionTimeout);
});

test('backdrop=false removes backdrop element', function(assert) {
  this.render(hbs`{{#bs-modal title="Simple Dialog" backdrop=false}}Hello world!{{/bs-modal}}`);
  let done = assert.async();
  // wait for fade animation
  setTimeout(() => {
    assert.equal(this.$('.modal-backdrop').length, 0, 'Modal has no backdrop element');
    done();
  }, transitionTimeout);
});

test('clicking close button closes modal when autoClose=true', function(assert) {
  this.render(hbs`{{#bs-modal title="Simple Dialog"}}Hello world!{{/bs-modal}}`);
  let done = assert.async();

  // wait for fade animation
  setTimeout(() => {
    assert.equal(this.$('.modal').hasClass('in'), true, 'Modal is visible');
    this.$('.modal .modal-header .close').click();

    // wait for fade animation
    setTimeout(() => {
      assert.equal(this.$('.modal').hasClass('in'), false, 'Modal is hidden');
      done();
    }, transitionTimeout);
  }, transitionTimeout);
});

test('clicking ok button closes modal when autoClose=true', function(assert) {
  this.render(hbs`{{#bs-modal title="Simple Dialog"}}Hello world!{{/bs-modal}}`);
  let done = assert.async();

  // wait for fade animation
  setTimeout(() => {
    assert.equal(this.$('.modal').hasClass('in'), true, 'Modal is visible');
    this.$('.modal .modal-footer button').click();

    // wait for fade animation
    setTimeout(() => {
      assert.equal(this.$('.modal').hasClass('in'), false, 'Modal is hidden');
      done();
    }, transitionTimeout);
  }, transitionTimeout);
});

test('clicking ok button closes modal when autoClose=true with custom component hierarchy', function(assert) {
  this.register('component:my-component', Ember.Component.extend({
    layout: hbs`{{yield}}`
  }));

  this.render(hbs`
    {{#bs-modal title="Simple Dialog" body=false footer=false}}
      {{#my-component}}
        {{#bs-modal-body}}Hello world!{{/bs-modal-body}}
        {{bs-modal-footer}}
      {{/my-component}}
    {{/bs-modal}}
    
  `);

  let done = assert.async();

  // wait for fade animation
  setTimeout(() => {
    assert.equal(this.$('.modal').hasClass('in'), true, 'Modal is visible');
    this.$('.modal .modal-footer button').click();

    // wait for fade animation
    setTimeout(() => {
      assert.equal(this.$('.modal').hasClass('in'), false, 'Modal is hidden');
      done();
    }, transitionTimeout);
  }, transitionTimeout);
});

test('clicking close button leaves modal open when autoClose=false', function(assert) {
  this.render(hbs`{{#bs-modal title="Simple Dialog" autoClose=false}}Hello world!{{/bs-modal}}`);
  let done = assert.async();

  // wait for fade animation
  setTimeout(() => {
    assert.equal(this.$('.modal').hasClass('in'), true, 'Modal is visible');
    this.$('.modal .modal-header .close').click();

    // wait for fade animation
    setTimeout(() => {
      assert.equal(this.$('.modal').hasClass('in'), true, 'Modal is still visible');
      done();
    }, transitionTimeout);
  }, transitionTimeout);
});

test('can implement custom close buttons', function(assert) {
  this.render(hbs`
    {{#bs-modal title="Simple Dialog" as |modal|}}
      Hello world! <a href="#" class="close-link" {{action 'close' target=modal}}>close</a>
    {{/bs-modal}}
    
  `);

  let done = assert.async();

  // wait for fade animation
  setTimeout(() => {
    assert.equal(this.$('.modal').hasClass('in'), true, 'Modal is visible');
    this.$('.modal .close-link').click();

    // wait for fade animation
    setTimeout(() => {
      assert.equal(this.$('.modal').hasClass('in'), false, 'Modal is hidden');
      done();
    }, transitionTimeout);
  }, transitionTimeout);
});

test('header=false does not create model-header component', function(assert) {
  this.render(hbs`{{#bs-modal title="Simple Dialog" header=false}}Hello world!{{/bs-modal}}`);
  assert.equal(this.$('.modal .modal-header').length, 0, 'Modal has no header.');
});

test('body=false does not create model-header component', function(assert) {
  this.render(hbs`{{#bs-modal title="Simple Dialog" body=false}}Hello world!{{/bs-modal}}`);
  assert.equal(this.$('.modal .modal-body').length, 0, 'Modal has no body.');
});

test('footer=false does not create model-header component', function(assert) {
  this.render(hbs`{{#bs-modal title="Simple Dialog" footer=false}}Hello world!{{/bs-modal}}`);
  assert.equal(this.$('.modal .modal-footer').length, 0, 'Modal has no footer.');
});

test('size property adds size class', function(assert) {
  this.render(hbs`{{#bs-modal title="Simple Dialog" size="lg"}}Hello world!{{/bs-modal}}`);
  assert.ok(this.$('.modal-dialog').hasClass('modal-lg'), 'Modal has size class.');
});

test('openAction/openedAction fire correctly with fade=false', function(assert) {
  assert.expect(4);

  this.set('open', false);
  let openActionCount = 0;
  let openedActionCount = 0;
  this.on('openAction', () => {
    openActionCount += 1;
    assert.notEqual(this.$('.modal-body').width(), 0, 'the modal is displayed when openAction is fired');
    assert.equal(openedActionCount, 0, 'openAction does not fire before openedAction');
  });
  this.on('openedAction', () => {
    openedActionCount += 1;
  });
  this.render(hbs`{{#bs-modal title="Simple Dialog" openAction=(action "openAction") openedAction=(action "openedAction") open=open fade=false}}Hello world!{{/bs-modal}}`);

  this.set('open', true);

  assert.equal(openActionCount, 1, 'open action fired after setting open=true');
  assert.equal(openedActionCount, 1, 'opened action fired after setting open=true');
});

test('openAction/openedAction fire correctly with fade=true', function(assert) {
  assert.expect(5);

  this.set('open', false);
  let openActionCount = 0;
  let openedActionCount = 0;
  this.on('openAction', () => {
    openActionCount += 1;
    assert.notEqual(this.$('.modal-body').width(), 0, 'the modal is displayed when openAction is fired');
  });
  this.on('openedAction', () => {
    openedActionCount += 1;
  });
  this.render(hbs`{{#bs-modal title="Simple Dialog" openAction=(action "openAction") openedAction=(action "openedAction") open=open}}Hello world!{{/bs-modal}}`);

  this.set('open', true);

  assert.equal(openActionCount, 0, 'open action did not fire immediately');
  assert.equal(openedActionCount, 0, 'opened action did not fire immediately');

  // wait for fade animation
  let done = assert.async();
  setTimeout(() => {
    assert.equal(openActionCount, 1, 'open action fired');
    assert.equal(openedActionCount, 1, 'opened action fired');

    done();
  }, transitionTimeout);
});

test('openedAction is called after modal is shown and animation completes', function(assert) {
  assert.expect(1);

  this.set('open', false);
  this.on('testAction', () => {
    assert.ok(true, 'Action has been called.');
  });
  this.render(hbs`{{#bs-modal title="Simple Dialog" openedAction=(action "testAction") open=open}}Hello world!{{/bs-modal}}`);

  this.set('open', true);
  let done = assert.async();
  // wait for fade animation
  setTimeout(() => {
    done();
  }, transitionTimeout);

});

test('closeAction is called when clicking close button', function(assert) {
  assert.expect(1);

  this.on('testAction', () => {
    assert.ok(true, 'Action has been called.');
  });
  this.render(hbs`{{#bs-modal title="Simple Dialog" closeAction=(action "testAction")}}Hello world!{{/bs-modal}}`);
  this.$('.modal .modal-header .close').click();
});

test('closedAction is called after modal is closed', function(assert) {
  assert.expect(1);

  this.set('open', true);
  this.on('testAction', () => {
    assert.ok(true, 'Action has been called.');
  });
  this.render(hbs`{{#bs-modal title="Simple Dialog" closedAction=(action "testAction") open=open}}Hello world!{{/bs-modal}}`);

  this.set('open', false);
  let done = assert.async();
  // wait for fade animation
  setTimeout(() => {
    done();
  }, transitionTimeout);

});

test('submitAction is called when clicking submit button', function(assert) {
  assert.expect(1);

  this.on('testAction', () => {
    assert.ok(true, 'Action has been called.');
  });
  this.render(hbs`{{#bs-modal title="Simple Dialog" submitAction=(action "testAction") footer=false body=false}}{{#bs-modal-body}}Hello world!{{/bs-modal-body}}{{bs-modal-footer closeTitle="Cancel" submitTitle="Ok"}}{{/bs-modal}}`);
  this.$('.modal .modal-footer button[type=submit]').click();
});

test('when modal has a form and the submit button is clicked, the form is submitted', function(assert) {
  assert.expect(1);

  this.on('testAction', () => {
    assert.ok(true, 'Action has been called.');
  });
  this.on('doNotCallThisAction', () => {
    assert.ok(false, 'submitAction of modal must not be called.');
  });
  this.render(hbs`{{#bs-modal title="Simple Dialog" submitAction=(action "doNotCallThisAction") footer=false body=false}}{{#bs-modal-body}}{{#bs-form action=(action "testAction")}}{{/bs-form}}{{/bs-modal-body}}{{bs-modal-footer closeTitle="Cancel" submitTitle="Ok"}}{{/bs-modal}}`);
  this.$('.modal .modal-footer button[type=submit]').click();
});

test('autofocus element is focused when present and fade=false', function(assert) {
  assert.expect(1);

  this.set('open', false);
  this.render(hbs`
    {{#bs-modal title="Simple Dialog" fade=false open=open}}
      <input class="my-input" autofocus="autofocus"/> blahblahblah
    {{/bs-modal}}
    
  `);

  this.$('.modal').one('focus', '.my-input', () => {
    assert.ok(true, 'focus was triggered on the autofocus element');
  });

  this.set('open', true);
});

test('autofocus element is focused when present and fade=true', function(assert) {
  assert.expect(1);

  this.set('open', false);
  this.render(hbs`
    {{#bs-modal title="Simple Dialog" fade=true open=open}}
      <input class="my-input" autofocus="autofocus"/>
    {{/bs-modal}}
    
  `);

  this.$('.modal').one('focus', '.my-input', () => {
    assert.ok(true, 'focus was triggered on the autofocus element');
  });

  this.set('open', true);

  // wait for fade animation
  let done = assert.async();
  setTimeout(() => {
    done();
  }, transitionTimeout);
});

test('Pressing escape key will close the modal if keyboard=true', function(assert) {
  assert.expect(3);
  this.on('testAction', () => {
    assert.ok(true, 'Action has been called.');
  });
  this.render(hbs`{{#bs-modal title="Simple Dialog" closeAction=(action "testAction") keyboard=true}}Hello world!{{/bs-modal}}`);
  let done = assert.async();

  // wait for fade animation
  setTimeout(() => {
    assert.equal(this.$('.modal').hasClass('in'), true, 'Modal is visible');

    // trigger escape key event
    let e = Ember.$.Event('keydown');
    e.which = e.keyCode = 27;
    this.$('.modal').trigger(e);

    // wait for fade animation
    setTimeout(() => {
      assert.equal(this.$('.modal').hasClass('in'), false, 'Modal is hidden');
      done();
    }, transitionTimeout);
  }, transitionTimeout);
});

test('Pressing escape key will close the modal if keyboard=true and element is autofocused', function(assert) {
  assert.expect(3);
  this.on('testAction', () => {
    assert.ok(true, 'Action has been called.');
  });
  this.render(hbs`
    {{#bs-modal title="Simple Dialog" closeAction=(action "testAction") keyboard=true}}
      <input autofocus="autofocus"/>
    {{/bs-modal}}
    
  `);
  let done = assert.async();

  // wait for fade animation
  setTimeout(() => {
    assert.equal(this.$('.modal').hasClass('in'), true, 'Modal is visible');

    // trigger escape key event
    let e = Ember.$.Event('keydown');
    e.which = e.keyCode = 27;
    this.$('.modal').trigger(e);

    // wait for fade animation
    setTimeout(() => {
      assert.equal(this.$('.modal').hasClass('in'), false, 'Modal is hidden');
      done();
    }, transitionTimeout);
  }, transitionTimeout);
});

test('Pressing escape key is ignored if keyboard=false', function(assert) {
  assert.expect(2);
  this.on('testAction', () => {
    assert.ok(false, 'Action must not be called.');
  });
  this.render(hbs`{{#bs-modal title="Simple Dialog" closeAction=(action "testAction") keyboard=false}}Hello world!{{/bs-modal}}`);
  let done = assert.async();

  // wait for fade animation
  setTimeout(() => {
    assert.equal(this.$('.modal').hasClass('in'), true, 'Modal is visible');

    // trigger escape key event
    let e = Ember.$.Event('keydown');
    e.which = e.keyCode = 27;
    this.$('.modal').trigger(e);

    // wait for fade animation
    setTimeout(() => {
      assert.equal(this.$('.modal').hasClass('in'), true, 'Modal is still visible');
      done();
    }, transitionTimeout);
  }, transitionTimeout);
});

test('Clicking on the backdrop will close the modal', function(assert) {
  assert.expect(3);
  this.on('testAction', () => {
    assert.ok(true, 'Action has been called.');
  });
  this.render(hbs`{{#bs-modal title="Simple Dialog" closeAction=(action "testAction")}}Hello world!{{/bs-modal}}`);
  let done = assert.async();

  // wait for fade animation
  setTimeout(() => {
    assert.equal(this.$('.modal').hasClass('in'), true, 'Modal is visible');

    this.$('.modal').click();

    // wait for fade animation
    setTimeout(() => {
      assert.equal(this.$('.modal').hasClass('in'), false, 'Modal is hidden');
      done();
    }, transitionTimeout);
  }, transitionTimeout);
});

test('Clicking on the backdrop is ignored when backdropClose=false', function(assert) {
  assert.expect(2);
  this.on('testAction', () => {
    assert.ok(false, 'Action must not be called.');
  });
  this.render(hbs`{{#bs-modal title="Simple Dialog" closeAction=(action "testAction") backdropClose=false}}Hello world!{{/bs-modal}}`);
  let done = assert.async();

  // wait for fade animation
  setTimeout(() => {
    assert.equal(this.$('.modal').hasClass('in'), true, 'Modal is visible');

    this.$('.modal').click();

    // wait for fade animation
    setTimeout(() => {
      assert.equal(this.$('.modal').hasClass('in'), true, 'Modal is still visible');
      done();
    }, transitionTimeout);
  }, transitionTimeout);
});

test('Renders in wormhole if renderInPlace is not set', function(assert) {
  this.set('show', false);
  this.render(hbs`<div id="ember-bootstrap-modal-container"></div>{{#if show}}{{#bs-modal title="Simple Dialog"}}Hello world!{{/bs-modal}}{{/if}}`);
  this.set('show', true);

  assert.equal(this.$('.modal').length, 1, 'Modal exists.');
  assert.equal(this.$('.modal').parent().attr('id'), 'ember-bootstrap-modal-container');
});

test('Renders in place (no wormhole) if renderInPlace is set', function(assert) {
  this.set('show', false);
  this.render(hbs`<div id="ember-bootstrap-modal-container"></div>{{#if show}}{{#bs-modal title="Simple Dialog" renderInPlace=true}}Hello world!{{/bs-modal}}{{/if}}`);
  this.set('show', true);

  assert.equal(this.$('.modal').length, 1, 'Modal exists.');
  assert.notEqual(this.$('.modal').parent().attr('id'), 'ember-bootstrap-modal-container');
});

test('Removes "modal-open" class when component is removed from view', function(assert) {
  this.set('renderComponent', true);
  this.render(hbs`{{#if renderComponent}}{{#bs-modal title="Simple Dialog"}}Hello world!{{/bs-modal}}{{/if}}`);

  let done = assert.async();

  // wait for fade animation
  setTimeout(() => {
    assert.ok($('body').hasClass('modal-open'), 'body element has "modal-open" class.');

    this.set('renderComponent', false);

    assert.ok(!($('body').hasClass('modal-open')), 'body element does not have "modal-open" class.');
    done();
  }, transitionTimeout);
});

test('Resets scroll bar when component is removed from view', function(assert) {
  document.body.style.paddingRight = '50px';
  this.set('renderComponent', true);
  this.render(hbs`{{#if renderComponent}}{{#bs-modal title="Simple Dialog"}}Hello world!{{/bs-modal}}{{/if}}`);

  let done = assert.async();

  // wait for fade animation
  setTimeout(() => {
    document.body.style.paddingRight = '0px';
    this.set('renderComponent', false);

    assert.equal(document.body.style.paddingRight, '50px', 'paddingRight restored to 50px');
    document.body.style.paddingRight = '0px';
    done();
  }, transitionTimeout);
});

test('it passes along class attribute', function(assert) {
  this.render(hbs`
    {{#bs-modal fade=false class="custom"}}
      template block text
    {{/bs-modal}}
  `);

  assert.equal(this.$('.modal.custom').length, 1);
});