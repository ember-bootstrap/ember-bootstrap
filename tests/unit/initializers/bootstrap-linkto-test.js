import Ember from 'ember';
import BootstrapLinktoInitializer from 'dummy/initializers/bootstrap-linkto';
import { module, test } from 'qunit';
import ComponentChildMixin from 'ember-bootstrap/mixins/component-child';

let application;

const { LinkComponent } = Ember;

module('Unit | Initializer | bootstrap linkto', {
  beforeEach() {
    Ember.run(function() {
      application = Ember.Application.create();
      application.deferReadiness();
    });
  }
});

// Replace this with your real tests.
test('it reopens Ember.LinkComponent to add ComponentChildMixin', function(assert) {
  BootstrapLinktoInitializer.initialize(application);

  // you would normally confirm the results of the initializer here
  assert.ok(ComponentChildMixin.detect(LinkComponent.create()));
});
