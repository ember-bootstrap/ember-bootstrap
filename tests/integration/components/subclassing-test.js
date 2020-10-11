import { module } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { test } from '../../helpers/bootstrap';
import hbs from 'htmlbars-inline-precompile';
import setupNoDeprecations from '../../helpers/setup-no-deprecations';
import BsAccordion from 'ember-bootstrap/components/bs-accordion';
import BsAlert from 'ember-bootstrap/components/bs-alert';
import BsButton from 'ember-bootstrap/components/bs-button';
import BsButtonGroup from 'ember-bootstrap/components/bs-button-group';
import BsCarousel from 'ember-bootstrap/components/bs-carousel';
import BsCollapse from 'ember-bootstrap/components/bs-collapse';
import BsDropdown from 'ember-bootstrap/components/bs-dropdown';
import BsForm from 'ember-bootstrap/components/bs-form';
import BsModal from 'ember-bootstrap/components/bs-modal';
import BsNav from 'ember-bootstrap/components/bs-nav';
import BsNavbar from 'ember-bootstrap/components/bs-navbar';
import BsPopover from 'ember-bootstrap/components/bs-popover';
import BsProgress from 'ember-bootstrap/components/bs-progress';
import BsTab from 'ember-bootstrap/components/bs-tab';
import BsTooltip from 'ember-bootstrap/components/bs-tooltip';

const tests = [
  {
    name: 'BsAccordion',
    clazz: BsAccordion,
  },
  {
    name: 'BsAlert',
    clazz: BsAlert,
  },
  {
    name: 'BsButton',
    clazz: BsButton,
  },
  {
    name: 'BsButtonGroup',
    clazz: BsButtonGroup,
  },
  {
    name: 'BsCarousel',
    clazz: BsCarousel,
  },
  {
    name: 'BsCollapse',
    clazz: BsCollapse,
  },
  {
    name: 'BsDropdown',
    clazz: BsDropdown,
  },
  {
    name: 'BsForm',
    clazz: BsForm,
  },
  {
    name: 'BsModal',
    clazz: BsModal,
  },
  {
    name: 'BsNav',
    clazz: BsNav,
  },
  {
    name: 'BsNavbar',
    clazz: BsNavbar,
  },
  {
    name: 'BsPopover',
    clazz: BsPopover,
  },
  {
    name: 'BsProgress',
    clazz: BsProgress,
  },
  {
    name: 'BsTab',
    clazz: BsTab,
  },
  {
    name: 'BsTooltip',
    clazz: BsTooltip,
  },
];

module('Integration | subclassing', function (hooks) {
  setupRenderingTest(hooks);
  setupNoDeprecations(hooks);

  tests.forEach(({ name, clazz }) => {
    module(name, function () {
      test('it should not be subclassed', async function (assert) {
        class MyClass extends clazz {}

        this.owner.register('component:test-component', MyClass);

        await render(hbs`<TestComponent />`);

        assert.deprecationsInclude(
          `Extending from ember-bootstrap component classes is not supported, and might break anytime. Detected subclassing of <${name}> component.`
        );
      });

      test('subclass warning can be silenced', async function (assert) {
        class MyClass extends clazz {
          '__ember-bootstrap_subclass' = true;
        }

        this.owner.register('component:test-component', MyClass);

        await render(hbs`<TestComponent />`);

        assert.deprecations(0);
      });
    });
  });
});
