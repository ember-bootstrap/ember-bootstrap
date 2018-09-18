import config from 'dummy/config/environment';
import test from 'ember-sinon-qunit/test-support/test';
import { skip } from 'qunit';
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

export function testRequiringTransitions(name, fn) {
  return test(name, fn);
}

export function delay(delay) {
  return new Promise((resolve) => setTimeout(resolve, delay));
}