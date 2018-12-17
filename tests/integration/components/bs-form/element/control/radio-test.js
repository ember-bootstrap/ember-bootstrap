import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { testBS3, testBS4 } from '../../../../../helpers/bootstrap-test';

const simpleOptions = [
  'foo',
  'bar'
];

const hashOptions = [
  {
    title: 'foo'
  },
  {
    title: 'bar'
  }
];

module('Integration | Component | bs form/element/control/radio', function(hooks) {
  setupRenderingTest(hooks);
  hooks.beforeEach(function() {
    this.setProperties({
      simpleOptions,
      hashOptions
    });
  });

  test('it renders simple options', async function(assert) {
    await render(hbs`{{bs-form/element/control/radio options=simpleOptions}}`);

    assert.dom('input[type=radio]').exists({ count: 2 });
    assert.dom('label').exists({ count: 2 });

    assert.dom(this.element.querySelectorAll('label')[0]).hasText('foo');
    assert.dom(this.element.querySelectorAll('label')[1]).hasText('bar');
    assert.dom(this.element.querySelectorAll('label')[0]).hasAttribute('for',
      this.element.querySelectorAll('input[type=radio]')[0].getAttribute('id')
    );
    assert.dom(this.element.querySelectorAll('label')[1]).hasAttribute('for',
      this.element.querySelectorAll('input[type=radio]')[1].getAttribute('id')
    );
  });

  test('it renders hash options', async function(assert) {
    await render(hbs`{{bs-form/element/control/radio options=hashOptions optionLabelPath="title"}}`);

    assert.dom('input[type=radio]').exists({ count: 2 });
    assert.dom('label').exists({ count: 2 });

    assert.dom(this.element.querySelectorAll('label')[0]).hasText('foo');
    assert.dom(this.element.querySelectorAll('label')[1]).hasText('bar');
    assert.dom(this.element.querySelectorAll('label')[0]).hasAttribute('for',
      this.element.querySelectorAll('input[type=radio]')[0].getAttribute('id')
    );
    assert.dom(this.element.querySelectorAll('label')[1]).hasAttribute('for',
      this.element.querySelectorAll('input[type=radio]')[1].getAttribute('id')
    );
  });

  testBS3('has correct markup', async function(assert) {
    await render(hbs`{{bs-form/element/control/radio options=simpleOptions}}`);

    assert.dom('.radio').exists({ count: 2 });
    assert.dom('.radio label').exists({ count: 2 });
    assert.dom('.radio label input[type=radio]').exists({ count: 2 });
  });

  testBS3('supports inline', async function(assert) {
    await render(hbs`{{bs-form/element/control/radio options=simpleOptions inline=true}}`);

    assert.dom('.radio').doesNotExist();
    assert.dom('label.radio-inline').exists({ count: 2 });
    assert.dom('label.radio-inline input[type=radio]').exists({ count: 2 });
  });

  testBS4('has correct markup', async function(assert) {
    await render(hbs`{{bs-form/element/control/radio options=simpleOptions}}`);

    assert.dom('.form-check').exists({ count: 2 });
    assert.dom('.form-check input[type=radio]').hasClass('form-check-input');
    assert.dom('.form-check label').hasClass('form-check-label');
  });

  testBS4('supports inline', async function(assert) {
    await render(hbs`{{bs-form/element/control/radio options=simpleOptions inline=true}}`);

    assert.dom('.form-check.form-check-inline').exists({ count: 2 });
  });

});
