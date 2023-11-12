import { visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | bs-nav-link', function (hooks) {
  setupApplicationTest(hooks);

  test('active link-to component marks nav item as active', async function (assert) {
    await visit('/acceptance/link/1');
    assert.dom(this.element.querySelectorAll('.nav li')[0]).hasClass('active');
    assert
      .dom(this.element.querySelectorAll('.nav li')[1])
      .hasNoClass('active');
    assert.dom(this.element.querySelectorAll('.nav li')[2]).hasClass('active');
    await visit('/acceptance/link/2');
    assert
      .dom(this.element.querySelectorAll('.nav li')[0])
      .hasNoClass('active');
    assert.dom(this.element.querySelectorAll('.nav li')[1]).hasClass('active');
    assert.dom(this.element.querySelectorAll('.nav li')[2]).hasClass('active');
  });

  test('active @route property marks nav item as active', async function (assert) {
    await visit('/acceptance/linkto/1');
    assert.dom(this.element.querySelectorAll('.nav li')[0]).hasClass('active');
    assert
      .dom(this.element.querySelectorAll('.nav li')[1])
      .hasNoClass('active');
    assert.dom(this.element.querySelectorAll('.nav li')[2]).hasClass('active');
    await visit('/acceptance/linkto/2');
    assert
      .dom(this.element.querySelectorAll('.nav li')[0])
      .hasNoClass('active');
    assert.dom(this.element.querySelectorAll('.nav li')[1]).hasClass('active');
    assert.dom(this.element.querySelectorAll('.nav li')[2]).hasClass('active');
  });

  test('href exists in anchor inside nav item', async function (assert) {
    await visit('/acceptance/link/1');
    assert
      .dom(this.element.querySelectorAll('.nav li a')[0])
      .hasAttribute('href', '/acceptance/link/1');
    assert
      .dom(this.element.querySelectorAll('.nav li a')[1])
      .hasAttribute('href', '/acceptance/link/2');
    assert
      .dom(this.element.querySelectorAll('.nav li a')[2])
      .hasAttribute('href', '/acceptance/link/1');
  });
});
