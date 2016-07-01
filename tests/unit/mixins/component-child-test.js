import Ember from 'ember';
import ComponentChildMixin from 'ember-bootstrap/mixins/component-child';
import ComponentParentMixin from 'ember-bootstrap/mixins/component-parent';

import { module, test } from 'qunit';

module('Unit | Mixin | component child');

test('child component registers itself with parent upon willRender event', function(assert) {
  let ComponentChildObject = Ember.Component.extend(ComponentChildMixin);
  let child = ComponentChildObject.create();
  let ComponentParentObject = Ember.Component.extend(ComponentParentMixin);
  let parent = ComponentParentObject.create();

  assert.expect(1);

  // mock out registerChild method
  parent.registerChild = function(registerChild) {
    assert.equal(registerChild, child, 'child registers itself with parent');
  };

  child.parentView = parent;

  child.trigger('willRender');
});

test('child component removes itself from parent upon willDestroyElement event', function(assert) {
  let ComponentChildObject = Ember.Component.extend(ComponentChildMixin);
  let child = ComponentChildObject.create();
  let ComponentParentObject = Ember.Component.extend(ComponentParentMixin);
  let parent = ComponentParentObject.create();

  assert.expect(1);

  // mock out removeChild method
  parent.removeChild = function(registerChild) {
    assert.equal(registerChild, child, 'child removes itself from parent');
  };

  child.parentView = parent;

  child.trigger('willDestroyElement');
});
