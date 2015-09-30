import Ember from 'ember';
import WavesMixin from '../../../mixins/waves';
import { module, test } from 'qunit';

module('Unit | Mixin | waves');

// Replace this with your real tests.
test('it works', function(assert) {
  var WavesObject = Ember.Object.extend(WavesMixin);
  var subject = WavesObject.create();
  assert.ok(subject);
});
