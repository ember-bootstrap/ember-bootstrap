import { visit } from '@ember/test-helpers';
import { test, module } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | bs-nav-link', function (hooks) {
  setupApplicationTest(hooks);

  test('active link-to component marks nav item as active', async function (assert) {
    await visit('/acceptance/link/1');
    assert.dom(this.element.querySelectorAll('.nav li')[0]).hasClass('active');
    assert.dom(this.element.querySelectorAll('.nav li')[1]).hasNoClass('active');
    assert.dom(this.element.querySelectorAll('.nav li')[2]).hasClass('active');
    await visit('/acceptance/link/2');
    assert.dom(this.element.querySelectorAll('.nav li')[0]).hasNoClass('active');
    assert.dom(this.element.querySelectorAll('.nav li')[1]).hasClass('active');
    assert.dom(this.element.querySelectorAll('.nav li')[2]).hasClass('active');
  });

  test('active @route property marks nav item as active', async function (assert) {
    await visit('/acceptance/linkto/1');
    assert.dom(this.element.querySelectorAll('.nav li')[0]).hasClass('active');
    assert.dom(this.element.querySelectorAll('.nav li')[1]).hasNoClass('active');
    assert.dom(this.element.querySelectorAll('.nav li')[2]).hasClass('active');
    await visit('/acceptance/linkto/2');
    assert.dom(this.element.querySelectorAll('.nav li')[0]).hasNoClass('active');
    assert.dom(this.element.querySelectorAll('.nav li')[1]).hasClass('active');
    assert.dom(this.element.querySelectorAll('.nav li')[2]).hasClass('active');
  });
});
