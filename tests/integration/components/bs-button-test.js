import { moduleForComponent } from 'ember-qunit';
import test from 'ember-sinon-qunit/test-support/test';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('bs-button', 'Integration | Component | bs-button', {
  integration: true
});

test('button has correct CSS classes', function(assert) {
  this.render(hbs`{{#bs-button type="primary" size="lg" active=true block=true}}Test{{/bs-button}}`);

  assert.equal(this.$('button').hasClass('btn'), true, 'button has btn class');
  assert.equal(this.$('button').hasClass('btn-primary'), true, 'button has type class');
  assert.equal(this.$('button').hasClass('btn-lg'), true, 'button has size class');
  assert.equal(this.$('button').hasClass('active'), true, 'button has active class');
  assert.equal(this.$('button').hasClass('btn-block'), true, 'button has block class');
});

test('button has HTML attributes', function(assert) {
  this.render(hbs`{{#bs-button id="test" disabled=true title="title"}}Test{{/bs-button}}`);

  assert.equal(this.$('button').attr('id'), 'test');
  assert.equal(this.$('button').attr('disabled'), 'disabled');
  assert.equal(this.$('button').attr('title'), 'title');
});

test('button has default label', function(assert) {
  this.render(hbs`{{bs-button defaultText="test"}}`);
  assert.equal(this.$('button').text(), 'test');
});

test('button has default type "button"', function(assert) {
  this.render(hbs`{{bs-button}}`);
  assert.equal(this.$('button').prop('type'), 'button');
});

test('buttonType property allows changing button type', function(assert) {
  this.render(hbs`{{bs-button buttonType="submit"}}`);
  assert.equal(this.$('button').prop('type'), 'submit');
});

test('button with icon property shows icon', function(assert) {
  this.render(hbs`{{bs-button icon="fa fa-check"}}`);

  assert.equal(this.$('button').find('i').hasClass('fa'), true);
  assert.equal(this.$('button').find('i').hasClass('fa-check'), true);
});

test('button with iconActive and iconInactive properties shows icon depending on active state', function(assert) {
  this.set('active', false);
  this.render(hbs`{{bs-button active=active iconInactive="fa fa-plus" iconActive="fa fa-minus"}}`);

  assert.equal(this.$('button').find('i').hasClass('fa'), true);
  assert.equal(this.$('button').find('i').hasClass('fa-plus'), true);

  this.set('active', true);

  assert.equal(this.$('button').find('i').hasClass('fa'), true);
  assert.equal(this.$('button').find('i').hasClass('fa-minus'), true);

  this.set('active', false);

  assert.equal(this.$('button').find('i').hasClass('fa'), true);
  assert.equal(this.$('button').find('i').hasClass('fa-plus'), true);
});

test('clicking a button sends onClick action with "value" property as a parameter', function(assert) {
  let action = this.spy();
  this.on('testAction', action);
  this.render(hbs`{{bs-button onClick=(action "testAction") value="dummy"}}`);

  this.$('button').click();
  assert.ok(action.calledWith('dummy'), 'onClick action has been called with button value');
});

test('button text is changed according to button state', function(assert) {

  this.render(hbs`{{bs-button defaultText="text1" loadingText="text2" textState=textState}}`);
  assert.equal(this.$('button').text(), 'text1');

  this.set('textState', 'loading');

  assert.equal(this.$('button').text(), 'text2');

  this.set('textState', 'default');

  assert.equal(this.$('button').text(), 'text1');
});

test('setting reset to true resets button state', function(assert) {
  this.render(hbs`{{bs-button defaultText="text1" loadingText="text2" textState=textState reset=reset}}`);
  this.set('textState', 'loading');

  assert.equal(this.$('button').text(), 'text2');

  this.set('reset', true);

  assert.equal(this.$('button').text(), 'text1');
});

test('clicking a button sends onclick action, if promise is returned from closure action button state is changed according to promise state', function(assert) {
  let promise, resolvePromise;

  this.on('testAction', () => {
    promise = new Ember.RSVP.Promise(function(resolve) {
      resolvePromise = resolve;
    });
    return promise;
  });

  this.render(hbs`{{bs-button onClick=(action "testAction") textState=textState defaultText="default" pendingText="pending" resolvedText="resolved" rejectedText="rejected"}}`);

  assert.expect(2);
  this.$('button').click();
  assert.equal(this.$('button').text(), 'pending');

  Ember.run(resolvePromise);

  assert.equal(this.$('button').text(), 'resolved');

});
