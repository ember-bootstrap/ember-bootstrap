import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('bs-modal', 'Integration | Component | bs-modal', {
  integration: true
});

var transitionTimeout = 500;

test('Simple modal has header, footer and body', function (assert) {
  this.render(hbs`{{#bs-modal title="Simple Dialog"}}Hello world!{{/bs-modal}}<div id="ember-bootstrap-modal-container"></div>`);

  assert.equal(this.$('.modal').length, 1, 'Modal exists.');
  assert.equal(this.$('.modal .modal-header').length, 1, 'Modal has header.');
  assert.equal(this.$('.modal .modal-header .modal-title').text().trim(), 'Simple Dialog', 'Modal header has correct title.');
  assert.equal(this.$('.modal .modal-footer').length, 1, 'Modal has footer.');
  assert.equal(this.$('.modal .modal-body').length, 1, 'Modal has body.');
  assert.equal(this.$('.modal .modal-body').text().trim(), 'Hello world!', 'Modal body has correct content.');
});


test('Simple modal has default CSS classes', function (assert) {
  this.render(hbs`{{#bs-modal title="Simple Dialog"}}Hello world!{{/bs-modal}}<div id="ember-bootstrap-modal-container"></div>`);

  assert.ok(this.$('.modal').hasClass('fade'), 'Modal has fade class');

  var done = assert.async();
  // wait for fade animation
  setTimeout(() => {
    assert.ok(this.$('.modal').hasClass('in'), 'Modal has in class');
    done();
  }, transitionTimeout);
});

test('open property shows modal', function (assert) {
  this.set('open', false);
  this.render(hbs`{{#bs-modal title="Simple Dialog" fade=false open=open}}Hello world!{{/bs-modal}}<div id="ember-bootstrap-modal-container"></div>`);

  assert.equal(this.$('.modal').hasClass('in'), false, 'Modal has not in class');
  this.set('open', true);
  assert.equal(this.$('.modal').hasClass('in'), true, 'Modal has in class');
});

test('closeButton property shows close button', function (assert) {
  this.set('closeButton', false);
  this.render(hbs`{{#bs-modal title="Simple Dialog" closeButton=closeButton}}Hello world!{{/bs-modal}}<div id="ember-bootstrap-modal-container"></div>`);
  assert.equal(this.$('.modal .modal-header .close').length, 0, 'Modal has no close button');
  this.set('closeButton', true);
  assert.equal(this.$('.modal .modal-header .close').length, 1, 'Modal has close button');
});


test('fade property toggles fade effect', function (assert) {
  this.set('fade', false);
  this.render(hbs`{{#bs-modal title="Simple Dialog" fade=fade}}Hello world!{{/bs-modal}}<div id="ember-bootstrap-modal-container"></div>`);
  assert.equal(this.$('.modal').hasClass('fade'), false, 'Modal has no fade class');
  this.set('fade', true);
  assert.equal(this.$('.modal').hasClass('fade'), true, 'Modal has fade class');
});


test('backdrop=true adds backdrop element', function (assert) {
  this.render(hbs`{{#bs-modal title="Simple Dialog" backdrop=true}}Hello world!{{/bs-modal}}<div id="ember-bootstrap-modal-container"></div>`);
  var done = assert.async();
  // wait for fade animation
  setTimeout(() => {
    assert.equal(this.$('.modal-backdrop').length, 1, 'Modal has backdrop element');
    assert.ok(this.$('.modal-backdrop').hasClass('in'), 'Modal backdrop has in class');
    done();
  }, transitionTimeout);

});

test('backdrop=false removes backdrop element', function (assert) {
  this.render(hbs`{{#bs-modal title="Simple Dialog" backdrop=false}}Hello world!{{/bs-modal}}<div id="ember-bootstrap-modal-container"></div>`);
  var done = assert.async();
  // wait for fade animation
  setTimeout(() => {
    assert.equal(this.$('.modal-backdrop').length, 0, 'Modal has backdrop element');
    done();
  }, transitionTimeout);

});

test('clicking close button closes modal when autoClose=true', function (assert) {
  this.render(hbs`{{#bs-modal title="Simple Dialog"}}Hello world!{{/bs-modal}}<div id="ember-bootstrap-modal-container"></div>`);
  var done = assert.async();

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


test('clicking ok button closes modal when autoClose=true', function (assert) {
  this.render(hbs`{{#bs-modal title="Simple Dialog"}}Hello world!{{/bs-modal}}<div id="ember-bootstrap-modal-container"></div>`);
  var done = assert.async();

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

test('clicking ok button closes modal when autoClose=true with custom component hierarchy', function (assert) {
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
    <div id="ember-bootstrap-modal-container"></div>
  `);

  var done = assert.async();

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

test('clicking close button leaves modal open when autoClose=false', function (assert) {
  this.render(hbs`{{#bs-modal title="Simple Dialog" autoClose=false}}Hello world!{{/bs-modal}}<div id="ember-bootstrap-modal-container"></div>`);
  var done = assert.async();

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


test('header=false does not create model-header component', function (assert) {
  this.render(hbs`{{#bs-modal title="Simple Dialog" header=false}}Hello world!{{/bs-modal}}<div id="ember-bootstrap-modal-container"></div>`);
  assert.equal(this.$('.modal .modal-header').length, 0, 'Modal has no header.');
});

test('body=false does not create model-header component', function (assert) {
  this.render(hbs`{{#bs-modal title="Simple Dialog" body=false}}Hello world!{{/bs-modal}}<div id="ember-bootstrap-modal-container"></div>`);
  assert.equal(this.$('.modal .modal-body').length, 0, 'Modal has no body.');
});

test('footer=false does not create model-header component', function (assert) {
  this.render(hbs`{{#bs-modal title="Simple Dialog" footer=false}}Hello world!{{/bs-modal}}<div id="ember-bootstrap-modal-container"></div>`);
  assert.equal(this.$('.modal .modal-footer').length, 0, 'Modal has no footer.');
});

test('size property adds size class', function (assert) {
  this.render(hbs`{{#bs-modal title="Simple Dialog" size="lg"}}Hello world!{{/bs-modal}}<div id="ember-bootstrap-modal-container"></div>`);
  assert.ok(this.$('.modal-dialog').hasClass('modal-lg'), 'Modal has size class.');
});

test('openedAction is called after modal is shown', function (assert) {
  assert.expect(1);

  this.set('open', false);
  this.on('testAction', () => {
    assert.ok(true, 'Action has been called.');
  });
  this.render(hbs`{{#bs-modal title="Simple Dialog" openedAction=(action "testAction") open=open}}Hello world!{{/bs-modal}}<div id="ember-bootstrap-modal-container"></div>`);

  this.set('open', true);
  var done = assert.async();
  // wait for fade animation
  setTimeout(() => {
    done();
  }, transitionTimeout);

});

test('closeAction is called when clicking close button', function (assert) {
  assert.expect(1);

  this.on('testAction', () => {
    assert.ok(true, 'Action has been called.');
  });
  this.render(hbs`{{#bs-modal title="Simple Dialog" closeAction=(action "testAction")}}Hello world!{{/bs-modal}}<div id="ember-bootstrap-modal-container"></div>`);
  this.$('.modal .modal-header .close').click();
});

test('closedAction is called after modal is closed', function (assert) {
  assert.expect(1);

  this.set('open', true);
  this.on('testAction', () => {
    assert.ok(true, 'Action has been called.');
  });
  this.render(hbs`{{#bs-modal title="Simple Dialog" closedAction=(action "testAction") open=open}}Hello world!{{/bs-modal}}<div id="ember-bootstrap-modal-container"></div>`);

  this.set('open', false);
  var done = assert.async();
  // wait for fade animation
  setTimeout(() => {
    done();
  }, transitionTimeout);

});

test('submitAction is called when clicking submit button', function (assert) {
  assert.expect(1);

  this.on('testAction', () => {
    assert.ok(true, 'Action has been called.');
  });
  this.render(hbs`{{#bs-modal title="Simple Dialog" submitAction=(action "testAction") footer=false body=false}}{{#bs-modal-body}}Hello world!{{/bs-modal-body}}{{bs-modal-footer closeTitle="Cancel" submitTitle="Ok"}}{{/bs-modal}}<div id="ember-bootstrap-modal-container"></div>`);
  this.$('.modal .modal-footer button[type=submit]').click();
});

test('when modal has a form and the submit button is clicked, the form is submitted', function (assert) {
  assert.expect(1);

  this.on('testAction', () => {
    assert.ok(true, 'Action has been called.');
  });
  this.on('doNotCallThisAction', () => {
    assert.ok(false, 'submitAction of modal must not be called.');
  });
  this.render(hbs`{{#bs-modal title="Simple Dialog" submitAction=(action "doNotCallThisAction") footer=false body=false}}{{#bs-modal-body}}{{#bs-form action=(action "testAction")}}{{/bs-form}}{{/bs-modal-body}}{{bs-modal-footer closeTitle="Cancel" submitTitle="Ok"}}{{/bs-modal}}<div id="ember-bootstrap-modal-container"></div>`);
  this.$('.modal .modal-footer button[type=submit]').click();
});

test('autofocus element is focused when present and fade=false', function (assert) {
  assert.expect(1);

  this.set('open', false);
  this.render(hbs`
    {{#bs-modal title="Simple Dialog" fade=false open=open}}
      <input class="my-input" autofocus="autofocus"/> blahblahblah
    {{/bs-modal}}
    <div id="ember-bootstrap-modal-container"></div>
  `);

  this.$('.my-input').focus(() => {
    assert.ok(true, "focus was triggered on the autofocus element");
  });

  this.set('open', true);
});

test('autofocus element is focused when present and fade=true', function (assert) {
  assert.expect(1);

  this.set('open', false);
  this.render(hbs`
    {{#bs-modal title="Simple Dialog" fade=true open=open}}
      <input class="my-input" autofocus="autofocus"/>
    {{/bs-modal}}
    <div id="ember-bootstrap-modal-container"></div>
  `);

  this.$('.my-input').focus(() => {
    assert.ok(true, "focus was triggered on the autofocus element");
  });

  this.set('open', true);

  // wait for fade animation
  var done = assert.async();
  setTimeout(() => {
    done();
  }, transitionTimeout);
});

test('Pressing escape key will close the modal if keyboard=true', function(assert) {
  assert.expect(3);
  this.on('testAction', () => {
    assert.ok(true, 'Action has been called.');
  });
  this.render(hbs`{{#bs-modal title="Simple Dialog" closeAction=(action "testAction") keyboard=true}}Hello world!{{/bs-modal}}<div id="ember-bootstrap-modal-container"></div>`);
  var done = assert.async();

  // wait for fade animation
  setTimeout(() => {
    assert.equal(this.$('.modal').hasClass('in'), true, 'Modal is visible');

    // trigger escape key event
    var e = Ember.$.Event("keydown");
    e.which = e.keyCode = 27;
    this.$('.modal').trigger(e);

    // wait for fade animation
    setTimeout(() => {
      assert.equal(this.$('.modal').hasClass('in'), false, 'Modal is hidden');
      done();
    }, transitionTimeout);
  }, transitionTimeout);
});

test('Pressing escape key will close the modal if keyboard=true and element is autofocused', function (assert) {
  assert.expect(3);
  this.on('testAction', () => {
    assert.ok(true, 'Action has been called.');
  });
  this.render(hbs`
    {{#bs-modal title="Simple Dialog" closeAction=(action "testAction") keyboard=true}}
      <input autofocus="autofocus"/>
    {{/bs-modal}}
    <div id="ember-bootstrap-modal-container"></div>
  `);
  var done = assert.async();

  // wait for fade animation
  setTimeout(() => {
    assert.equal(this.$('.modal').hasClass('in'), true, 'Modal is visible');

    // trigger escape key event
    var e = Ember.$.Event("keydown");
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
  this.render(hbs`{{#bs-modal title="Simple Dialog" closeAction=(action "testAction") keyboard=false}}Hello world!{{/bs-modal}}<div id="ember-bootstrap-modal-container"></div>`);
  var done = assert.async();

  // wait for fade animation
  setTimeout(() => {
    assert.equal(this.$('.modal').hasClass('in'), true, 'Modal is visible');

    // trigger escape key event
    var e = Ember.$.Event("keydown");
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
  this.render(hbs`{{#bs-modal title="Simple Dialog" closeAction=(action "testAction")}}Hello world!{{/bs-modal}}<div id="ember-bootstrap-modal-container"></div>`);
  var done = assert.async();

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
  this.render(hbs`{{#bs-modal title="Simple Dialog" closeAction=(action "testAction") backdropClose=false}}Hello world!{{/bs-modal}}<div id="ember-bootstrap-modal-container"></div>`);
  var done = assert.async();

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
  this.render(hbs`{{#bs-modal title="Simple Dialog"}}Hello world!{{/bs-modal}}<div id="ember-bootstrap-modal-container"></div>`);

  assert.equal(this.$('.modal').length, 1, 'Modal exists.');
  assert.equal(this.$('.modal').parent().attr('id'), 'ember-bootstrap-modal-container');
});

test('Renders in place (no wormhole) if renderInPlace is set', function(assert) {
  this.render(hbs`{{#bs-modal title="Simple Dialog" renderInPlace=true}}Hello world!{{/bs-modal}}<div id="ember-bootstrap-modal-container"></div>`);

  assert.equal(this.$('.modal').length, 1, 'Modal exists.');
  assert.notEqual(this.$('.modal').parent().attr('id'), 'ember-bootstrap-modal-container');
});
