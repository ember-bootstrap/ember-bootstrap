import defaultValue from 'ember-bootstrap/utils/default-decorator';
import { module, test } from 'qunit';
import EmberObject, { computed } from '@ember/object';

class Test extends EmberObject {
  @defaultValue
  foo = 'bar';
}

module('Unit | Utility | defaultValue', function() {
  test('it assigns a default value', function(assert) {
    let subject = Test.create();
    assert.equal(subject.foo, 'bar');
  });

  test('it can be set with a setter', function(assert) {
    let subject = Test.create();
    subject.set('foo', 'baz');
    assert.equal(subject.foo, 'baz');
  });

  test('it can be set', function(assert) {
    let subject = Test.create();
    subject.foo = 'baz';
    assert.equal(subject.foo, 'baz');
  });

  test('it can be overridden with a CP', function(assert) {
    class ChildTest extends Test {
      @computed
      get foo() {
        return 'baz';
      }
    }

    let subject = ChildTest.create();
    assert.equal(subject.foo, 'baz');
  });

  test('it can be overridden with a instance field', function(assert) {
    class ChildTest extends Test {
      foo = 'baz';
    }

    let subject = ChildTest.create();
    assert.equal(subject.foo, 'baz');
  });
});
