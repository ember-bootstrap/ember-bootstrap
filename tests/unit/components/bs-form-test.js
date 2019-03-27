import { module } from 'qunit';
import test from 'ember-sinon-qunit/test-support/test';
import { setupTest } from 'ember-qunit';

module('Unit | Component | bs-form', function(hooks) {
  setupTest(hooks);

  test('submit action returns a promise', async function(assert) {
    let component = this.owner.factoryFor('component:bs-form').create();

    assert.ok(component.actions.submit.bind(component)() instanceof Promise);
  });

  test('submit action resolves for expected scenarios', async function(assert) {
    let scenarios = [
      { },
      { onSubmit: this.fake.resolves() },
      { validate: this.fake.resolves() },
      { onSubmit: this.fake.resolves(), validate: this.fake.resolves() },
    ];
    let component = this.owner.factoryFor('component:bs-form').create();

    for (let scenario of scenarios) {
      component.setProperties(scenario);
      component.set('hasValidator', typeof scenario.validate === 'function');

      await component.actions.submit.bind(component)();

      let { onSubmit, validate } = scenario;
      assert.ok(
        true,
        `scenario: onSubmit ${onSubmit ? 'resolves' : 'not set'} / validate ${validate ? 'resolves' : 'not available'}`
      );
    }
  });

  test('submit action rejects for expected scenarios', async function(assert) {
    let scenarios = [
      { validate: this.fake.rejects() },
      { onSubmit: this.fake.rejects() },
    ];
    let component = this.owner.factoryFor('component:bs-form').create();

    for (let scenario of scenarios) {
      component.setProperties(scenario);
      component.set('hasValidator', typeof scenario.validate === 'function');

      let { onSubmit, validate } = scenario;
      assert.rejects(
        component.actions.submit.bind(component)(),
        `scenario: onSubmit ${onSubmit ? 'rejects' : 'not set'} / validate ${validate ? 'rejects' : 'not available'}`
      );
    }
  });
});
