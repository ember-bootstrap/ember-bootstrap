import { module } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { testBS3, testBS4 } from '../../helpers/bootstrap-test';

module('Integration | Helper | hasBootstrapVersion', function(hooks) {
  setupRenderingTest(hooks);

  testBS3('it works', async function(assert) {
    await render(hbs`{{#if (has-bootstrap-version 3)}}Ok{{/if}}`);
    assert.dom(this.element).hasText('Ok');

    await render(hbs`{{#if (has-bootstrap-version 4)}}Ok{{/if}}`);
    assert.dom(this.element).hasNoText();
  });

  testBS4('it works', async function(assert) {
    await render(hbs`{{#if (has-bootstrap-version 4)}}Ok{{/if}}`);
    assert.dom(this.element).hasText('Ok');

    await render(hbs`{{#if (has-bootstrap-version 3)}}Ok{{/if}}`);
    assert.dom(this.element).hasNoText();
  });
});
