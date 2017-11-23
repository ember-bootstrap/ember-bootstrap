import { find, findAll } from 'ember-native-dom-helpers';
import { module } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { test, testBS3, testBS4 } from '../../helpers/bootstrap-test';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | bs-progress', function(hooks) {
  setupRenderingTest(hooks);

  test('bs-progress has correct markup', async function(assert) {
    // Template block usage:
    await render(hbs`
      {{#bs-progress as |p|}}
        template block text
      {{/bs-progress}}
    `);

    assert.equal(find('*').textContent.trim(), 'template block text', 'Shows block content');
    assert.equal(findAll('div.progress').length, 1, 'Has progress class');
  });

  test('Progress bar has correct width according to value, minValue and maxValue', async function(assert) {

    let baseSize = 500;
    // some test data
    let testData = [
      {
        value: 60,
        minValue: 0,
        maxValue: 100
      },
      {
        value: 3,
        minValue: 0,
        maxValue: 10
      },
      {
        value: 6,
        minValue: 5,
        maxValue: 10
      }
    ];

    await render(hbs`
        <style type="text/css">.progress-bar { transition: none; }</style>
        <div style="width: 500px">
          {{#bs-progress as |p|}}
            {{p.bar value=value minValue=minValue maxValue=maxValue}}
          {{/bs-progress}}
        </div>
      `);

    testData.forEach((data) => {
      let { value } = data;
      let minValue = data.minValue || 0;
      let maxValue = data.maxValue || 100;
      let expectedWidth = (value - minValue) / (maxValue - minValue) * baseSize;

      this.setProperties(data);

      assert.equal(find('.progress-bar').offsetWidth, expectedWidth, 'Progress bar has expected width.');
    });

  });

  test('progress bar has invisible label for screen readers', async function(assert) {
    await render(hbs`
      {{#bs-progress as |p|}}
        {{p.bar value=5 maxValue=10}}
      {{/bs-progress}}
    `);

    assert.equal(find('.progress-bar .sr-only').innerHTML.trim(), '50%', 'Progress bar shows correct default label');

    await render(hbs`
      {{#bs-progress as |p|}}
        {{#p.bar value=5 maxValue=10 as |percent|}}5 ({{percent}}%){{/p.bar}}
      {{/bs-progress}}
    `);

    assert.equal(find('.progress-bar .sr-only').innerHTML.trim(), '5 (50%)', 'Progress bar shows correct custom label');

  });

  test('progress bar can show label', async function(assert) {
    await render(hbs`
      {{#bs-progress as |p|}}
        {{p.bar value=5 maxValue=10 showLabel=true}}
      {{/bs-progress}}
    `);

    assert.equal(find('.progress-bar').innerHTML.trim(), '50%', 'Progress bar shows correct default label');

    await render(hbs`
      {{#bs-progress as |p|}}
        {{#p.bar value=5 maxValue=10 showLabel=true as |percent|}}5 ({{percent}}%){{/p.bar}}
      {{/bs-progress}}
    `);

    assert.equal(find('.progress-bar').innerHTML.trim(), '5 (50%)', 'Progress bar shows correct custom label');

  });

  test('progress bar can round label\'s percent value', async function(assert) {
    await render(hbs`
      {{#bs-progress as |p|}}
        {{p.bar value=5 maxValue=6 roundDigits=2 showLabel=true}}
      {{/bs-progress}}
    `);

    assert.equal(find('.progress-bar').innerHTML.trim(), '83.33%', 'Progress bar shows correct default label');

  });

  testBS3('progress bar supports type class', async function(assert) {
    await render(hbs`
      {{#bs-progress as |p|}}
        {{p.bar value=50 type="success"}}
      {{/bs-progress}}
    `);

    assert.ok(find('.progress-bar').classList.contains('progress-bar-success'), 'Progress bar has type class');

  });

  testBS4('progress bar supports type class', async function(assert) {
    await render(hbs`
      {{#bs-progress as |p|}}
        {{p.bar value=50 type="success"}}
      {{/bs-progress}}
    `);

    assert.ok(find('.progress-bar').classList.contains('bg-success'), 'Progress bar has type class');

  });

  test('progress bar supports striped style', async function(assert) {
    await render(hbs`
      {{#bs-progress as |p|}}
        {{p.bar value=50 type="success" striped=true}}
      {{/bs-progress}}
    `);

    assert.ok(find('.progress-bar').classList.contains('progress-bar-striped'), 'Progress bar has type class');

  });

  testBS3('progress bar supports animated stripes', async function(assert) {
    await render(hbs`
      {{#bs-progress as |p|}}
        {{p.bar value=50 type="success" striped=true animate=true}}
      {{/bs-progress}}
    `);

    assert.ok(find('.progress-bar').classList.contains('progress-bar-striped'), 'Progress bar has type class');
    assert.ok(find('.progress-bar').classList.contains('active'), 'Progress bar has active class');

  });

  testBS4('progress bar supports animated stripes', async function(assert) {
    await render(hbs`
      {{#bs-progress as |p|}}
        {{p.bar value=50 type="success" striped=true animate=true}}
      {{/bs-progress}}
    `);

    assert.ok(find('.progress-bar').classList.contains('progress-bar-striped'), 'Progress bar has type class');
    assert.ok(find('.progress-bar').classList.contains('progress-bar-animated'), 'Progress bar has animated class');

  });

  test('progress bar supports stacked bars', async function(assert) {
    await render(hbs`
      {{#bs-progress as |p|}}
        {{p.bar value=50 type="success"}}
        {{p.bar value=30 type="info"}}
      {{/bs-progress}}
    `);

    assert.equal(findAll('.progress-bar').length, 2, 'Progress bar has two bars');

  });
});
