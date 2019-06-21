import { visit } from '@ember/test-helpers';
import { test, module } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | bs-nav-link', function(hooks) {
  setupApplicationTest(hooks);

  test('active link-to component marks nav item as active', async function(assert) {
    await visit('/acceptance/link/1');
    assert.dom(this.element.querySelectorAll('#nav-link-test li')[0]).hasClass('active');
    assert.dom(this.element.querySelectorAll('#nav-link-test li')[1]).hasNoClass('active');
    assert.dom(this.element.querySelectorAll('#nav-link-test li')[2]).hasClass('active');
    await visit('/acceptance/link/2');
    assert.dom(this.element.querySelectorAll('#nav-link-test li')[0]).hasNoClass('active');
    assert.dom(this.element.querySelectorAll('#nav-link-test li')[1]).hasClass('active');
    assert.dom(this.element.querySelectorAll('#nav-link-test li')[2]).hasClass('active');
  });

  test('active linkTo property marks nav item as active', async function(assert) {
    await visit('/acceptance/link/1');
    assert.dom(this.element.querySelectorAll('#nav-link-test2 li')[0]).hasClass('active');
    assert.dom(this.element.querySelectorAll('#nav-link-test2 li')[1]).hasNoClass('active');
    assert.dom(this.element.querySelectorAll('#nav-link-test2 li')[2]).hasClass('active');
    await visit('/acceptance/link/2');
    assert.dom(this.element.querySelectorAll('#nav-link-test2 li')[0]).hasNoClass('active');
    assert.dom(this.element.querySelectorAll('#nav-link-test2 li')[1]).hasClass('active');
    assert.dom(this.element.querySelectorAll('#nav-link-test2 li')[2]).hasClass('active');
  });

});
