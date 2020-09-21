import config from 'dummy/config/environment';
import { dependencySatisfies, getConfig, getOwnConfig, macroCondition } from '@embroider/macros';
import { module, skip, test } from 'qunit';
import { Promise } from 'rsvp';

const currentBootstrapVersion = parseInt(config.bootstrapVersion);

function testForBootstrap(bsVersion, name, fn) {
  if (bsVersion !== currentBootstrapVersion) {
    // Skip test for different Bootstrap version
    return;
  }
  return test(`${name} [BS${bsVersion}]`, fn);
}

export function testBS3() {
  return testForBootstrap(3, ...arguments);
}

export function testBS4() {
  return testForBootstrap(4, ...arguments);
}

export function versionDependent(v3, v4) {
  if (currentBootstrapVersion === 3) {
    return v3;
  }

  return v4;
}

// eslint-disable-next-line ember/no-test-module-for
export function moduleForOptionalFeature(optionalFeature, fn) {
  let optionalFeatureEnabled;

  // `getConfig('ember-bootstrap')` is the correct way to retrieve the
  // configuration of the addon it it's dummy app. But the `getConfig`
  // macro is broken for dummy app of an addon in classic builds.
  // `getOwnConfig` macro also has a bug in classic builds. It resolves
  // with the configuration of the addon not of it's dummy app. We can
  // use that bug as a work-a-round for classic builds until the but of
  // `getConfig` macro has been fixed.
  // Both bugs are tracked in this issue:
  // https://github.com/embroider-build/embroider/issues/537
  if (macroCondition(dependencySatisfies('@embroider/webpack', '*'))) {
    optionalFeatureEnabled = getConfig('ember-bootstrap')[optionalFeature];
  } else {
    optionalFeatureEnabled = getOwnConfig()[optionalFeature];
  }

  if (optionalFeatureEnabled === undefined) {
    throw new Error(`Optional feature ${optionalFeature} does not exist.`);
  }

  let name = `Optional feature: ${optionalFeature}`;
  if (optionalFeatureEnabled) {
    module(name, fn);
  } else {
    skip(name, fn);
  }
}

export function visibilityClass() {
  return versionDependent('in', 'show');
}

export function openClass() {
  return versionDependent('open', 'show');
}

export function defaultButtonClass() {
  return versionDependent('btn-default', 'btn-secondary');
}

export function formFeedbackClass() {
  return versionDependent('help-block', 'invalid-feedback');
}

export function formFeedbackElement() {
  return versionDependent('.form-group', '.form-control');
}

export function validationSuccessClass() {
  return versionDependent('has-success', 'is-valid');
}

export function validationErrorClass() {
  return versionDependent('has-error', 'is-invalid');
}

export function validationWarningClass() {
  return versionDependent('has-warning', 'is-warning');
}

export function placementClassFor(type, placement) {
  return versionDependent(placement, `${type}-${placement}`);
}

export function positionClassFor(position) {
  return versionDependent(`navbar-${position}`, position);
}

export function positionStickyClass() {
  return versionDependent('navbar-static-top', 'sticky-top');
}

export function formHelpTextClass() {
  return versionDependent('help-block', 'form-text');
}

export function accordionClassFor(type) {
  type = type ? `-${type}` : '';
  return versionDependent(`panel${type}`, type ? `bg${type}` : 'card');
}

export function accordionTitleSelector() {
  return versionDependent('.panel-title', 'h5');
}

export function accordionItemHeadClass() {
  return versionDependent('panel-heading', 'card-header');
}

export function accordionItemClickableSelector() {
  return versionDependent('.panel-title a', 'h5 button');
}

export function dropdownVisibilityElementSelector() {
  return versionDependent('.dropdown', '.dropdown-menu');
}

export function accordionItemBodyClass() {
  return versionDependent('panel-body', 'card-body');
}

export function tooltipPositionClass(pos) {
  return versionDependent(pos, `bs-tooltip-${pos}`);
}

export function popoverPositionClass(pos) {
  return versionDependent(pos, `bs-popover-${pos}`);
}

export function tooltipArrowClass() {
  return versionDependent('tooltip-arrow', 'arrow');
}

export function isVisible(el) {
  return !isHidden(el);
}

export function isHidden(el) {
  // A bit of an odd test, but taken from https://stackoverflow.com/questions/19669786/check-if-element-is-visible-in-dom
  // referencing https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetParent
  return !el || el.offsetParent === null;
}

export { test };

export function testRequiringFocus(name, fn) {
  if (document.hasFocus()) {
    return test(name, fn);
  } else {
    skip(name);
  }
}

export function testBS3RequiringFocus(name, fn) {
  if (document.hasFocus()) {
    return testBS3(name, fn);
  } else {
    skip(name);
  }
}

export function testBS4RequiringFocus(name, fn) {
  if (document.hasFocus()) {
    return testBS4(name, fn);
  } else {
    skip(name);
  }
}

export function testRequiringTransitions(name, fn) {
  return test(name, fn);
}

export function delay(delay) {
  return new Promise((resolve) => setTimeout(resolve, delay));
}
