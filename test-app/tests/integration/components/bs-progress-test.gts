import { module } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled } from '@ember/test-helpers';
import { test, visuallyHiddenClass } from '../../helpers/bootstrap';
import setupStylesheetSupport from '../../helpers/setup-stylesheet-support';
import setupNoDeprecations from '../../helpers/setup-no-deprecations';
import a11yAudit from 'ember-a11y-testing/test-support/audit';
import BsProgress from 'ember-bootstrap/components/bs-progress';
import { tracked } from '@glimmer/tracking';

module('Integration | Component | bs-progress', function (hooks) {
  setupRenderingTest(hooks);
  setupStylesheetSupport(hooks);
  setupNoDeprecations(hooks);

  test('bs-progress has correct markup', async function (assert) {
    // Template block usage:
    await render(
      <template>
        <BsProgress as |p|>
          <p.bar @value={{5}} @minValue={{0}} @maxValue={{10}} />
        </BsProgress>
      </template>,
    );

    assert.dom('div.progress').exists({ count: 1 }, 'Has progress class');
    assert.dom('div.progress-bar').hasAttribute('role', 'progressbar');

    assert
      .dom('div.progress-bar')
      .exists({ count: 1 }, 'Has progress-bar class');
    assert.dom('div.progress-bar').hasAttribute('aria-valuenow', '5');
    assert.dom('div.progress-bar').hasAttribute('aria-valuemin', '0');
    assert.dom('div.progress-bar').hasAttribute('aria-valuemax', '10');
  });

  test('Progress bar has correct width according to value, minValue and maxValue', async function (assert) {
    class State {
      @tracked value?: number;
      @tracked minValue?: number;
      @tracked maxValue?: number;
    }
    const state = new State();

    let baseSize = 500;
    // some test data
    let testData = [
      { value: 60, minValue: 0, maxValue: 100 },
      { value: 3, minValue: 0, maxValue: 10 },
      { value: 6, minValue: 5, maxValue: 10 },
    ];

    this.insertCSSRule('.progress-bar { transition: none; }');
    this.insertCSSRule('.width-500 { width: 500px }');

    await render(
      <template>
        <div class='width-500'>
          <BsProgress as |p|>
            <p.bar
              @value={{state.value}}
              @minValue={{state.minValue}}
              @maxValue={{state.maxValue}}
            />
          </BsProgress>
        </div>
      </template>,
    );

    for (const data of testData) {
      const { value } = data;
      const minValue = data.minValue || 0;
      const maxValue = data.maxValue || 100;
      const expectedWidth =
        ((value - minValue) / (maxValue - minValue)) * baseSize;

      state.value = data.value;
      state.minValue = data.minValue;
      state.maxValue = data.maxValue;
      await settled();

      assert.equal(
        document.querySelector<HTMLDivElement>('.progress-bar')?.offsetWidth,
        expectedWidth,
        'Progress bar has expected width.',
      );
    }
  });

  test('progress bar has invisible label for screen readers', async function (assert) {
    await render(
      <template>
        <BsProgress as |p|>
          <p.bar @value={{5}} @maxValue={{10}} />
        </BsProgress>
      </template>,
    );

    assert.equal(
      document
        .querySelector(`.progress-bar .${visuallyHiddenClass()}`)!
        .innerHTML.trim(),
      '50%',
      'Progress bar shows correct default label',
    );

    await render(
      <template>
        <BsProgress as |p|>
          <p.bar @value={{5}} @maxValue={{10}} as |percent|>5 ({{percent}}%)</p.bar>
        </BsProgress>
      </template>,
    );

    assert.equal(
      document
        .querySelector(`.progress-bar .${visuallyHiddenClass()}`)!
        .innerHTML.trim(),
      '5 (50%)',
      'Progress bar shows correct custom label',
    );
  });

  test('progress bar can show label', async function (assert) {
    await render(
      <template>
        <BsProgress as |p|>
          <p.bar @value={{5}} @maxValue={{10}} @showLabel={{true}} />
        </BsProgress>
      </template>,
    );

    assert.equal(
      document.querySelector('.progress-bar')!.innerHTML.trim(),
      '50%',
      'Progress bar shows correct default label',
    );

    await render(
      <template>
        <BsProgress as |p|>
          <p.bar
            @value={{5}}
            @maxValue={{10}}
            @showLabel={{true}}
            as |percent|
          >5 ({{percent}}%)</p.bar>
        </BsProgress>
      </template>,
    );

    assert.equal(
      document.querySelector('.progress-bar')!.innerHTML.trim(),
      '5 (50%)',
      'Progress bar shows correct custom label',
    );
  });

  test("progress bar can round label's percent value", async function (assert) {
    await render(
      <template>
        <BsProgress as |p|>
          <p.bar
            @value={{5}}
            @maxValue={{6}}
            @roundDigits={{2}}
            @showLabel={{true}}
          />
        </BsProgress>
      </template>,
    );

    assert.equal(
      document.querySelector('.progress-bar')!.innerHTML.trim(),
      '83.33%',
      'Progress bar shows correct default label',
    );
  });

  test('progress bar supports type class', async function (assert) {
    await render(
      <template>
        <BsProgress as |p|>
          <p.bar @value={{50}} @type='success' />
        </BsProgress>
      </template>,
    );

    assert
      .dom('.progress-bar')
      .hasClass('bg-success', 'Progress bar has type class');
  });

  test('progress bar supports striped style', async function (assert) {
    await render(
      <template>
        <BsProgress as |p|>
          <p.bar @value={{50}} @type='success' @striped={{true}} />
        </BsProgress>
      </template>,
    );

    assert
      .dom('.progress-bar')
      .hasClass('progress-bar-striped', 'Progress bar has type class');
  });

  test('progress bar supports animated stripes', async function (assert) {
    await render(
      <template>
        <BsProgress as |p|>
          <p.bar
            @value={{50}}
            @type='success'
            @striped={{true}}
            @animate={{true}}
          />
        </BsProgress>
      </template>,
    );

    assert
      .dom('.progress-bar')
      .hasClass('progress-bar-striped', 'Progress bar has type class');
    assert
      .dom('.progress-bar')
      .hasClass('progress-bar-animated', 'Progress bar has animated class');
  });

  test('progress bar supports stacked bars', async function (assert) {
    await render(
      <template>
        <BsProgress as |p|>
          <p.bar @value={{50}} @type='success' />
          <p.bar @value={{30}} @type='info' />
        </BsProgress>
      </template>,
    );

    assert
      .dom('.progress-bar')
      .exists({ count: 2 }, 'Progress bar has two bars');
  });

  test('it passes accessibility checks', async function (assert) {
    await render(
      <template>
        <BsProgress as |p|>
          <p.bar @value={{5}} @maxValue={{10}} aria-label='Saving...' />
        </BsProgress>
        <button type='button'>Test</button>
      </template>,
    );

    await a11yAudit();
    assert.ok(true, 'A11y audit passed');
  });
});
