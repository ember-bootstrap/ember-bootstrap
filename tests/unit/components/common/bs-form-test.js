import { setupTest, test } from 'ember-qunit';
import { reject, resolve } from 'rsvp';
import { module } from 'qunit';

module('Unit | Component | bs-form', function(hooks) {
  setupTest(hooks);

  test('calling form.validate returns success if validations pass', function(assert) {
    assert.expect(1);

    let Factory = this.owner.factoryFor('component:bs-form');
    let subject = Factory.create({ hasValidator: true, model: {}, validate: function() { return resolve(); } });

    let validatedResult = subject.actions.validate.apply(subject);
    validatedResult.then(() => {
      assert.ok(true, 'validations passed');
    });
  });

  test('calling form.validate returns false if validations fail', function(assert) {
    assert.expect(1);

    let Factory = this.owner.factoryFor('component:bs-form');
    let subject = Factory.create({ hasValidator: true, model: {}, validate: function() { return reject(); } });

    let validatedResult = subject.actions.validate.apply(subject);
    validatedResult.catch(() => {
      assert.ok(true, 'validations failed');
    });
  });

  test('calling form.validate with a model validates that specific model', function(assert) {
    assert.expect(2);

    let testModel = {
      validated: false,
    };

    let Factory = this.owner.factoryFor('component:bs-form');
    let subject = Factory.create({
      hasValidator: true,
      validate: function(model) {
        return model.validated ? resolve() : reject();
      }
    });

    let failingResult = subject.actions.validate.apply(subject, [ testModel ]);
    failingResult.catch(() => {
      assert.ok(true, 'validations failed');
    });

    testModel.validated = true;

    let passingResult = subject.actions.validate.apply(subject, [ testModel ]);
    passingResult.then(() => {
      assert.ok(true, 'validations passed');
    });
  });
});