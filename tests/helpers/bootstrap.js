import config from 'dummy/config/environment';
import { skip, test } from 'qunit';
import { Promise } from 'rsvp';

const currentBootstrapVersion = parseInt(config.bootstrapVersion);

export function testForBootstrap(bsVersion, name, fn) {
  if (!Array.isArray(bsVersion)) {
    bsVersion = [bsVersion];
  }
  if (!bsVersion.includes(currentBootstrapVersion)) {
    // Skip test for different Bootstrap version
    return;
  }
  return test(`${name} [BS${bsVersion}]`, fn);
}

export function isBootstrap(version) {
  return currentBootstrapVersion === version;
}

export function testBS4() {
  return testForBootstrap(4, ...arguments);
}

export function testBS5() {
  return testForBootstrap(5, ...arguments);
}

export function versionDependent(v4, v5) {
  if (isBootstrap(5)) {
    return v5 ?? v4;
  }

  return v4;
}

export function visibilityClass() {
  return versionDependent('show');
}

export function openClass() {
  return versionDependent('show');
}

export function defaultButtonClass() {
  return versionDependent('btn-secondary');
}

export function formFeedbackClass() {
  return versionDependent('invalid-feedback');
}

export function formFeedbackElement() {
  return versionDependent('.form-control');
}

export function validationSuccessClass() {
  return versionDependent('is-valid');
}

export function validationErrorClass() {
  return versionDependent('is-invalid');
}

export function validationWarningClass() {
  return versionDependent('is-warning');
}

export function placementClassFor(type, placement) {
  return versionDependent(`${type}-${placement}`);
}

export function positionClassFor(position) {
  return versionDependent(position);
}

export function positionStickyClass() {
  return versionDependent('sticky-top');
}

export function formHelpTextClass() {
  return versionDependent('form-text');
}

export function accordionClass() {
  return versionDependent('accordion', 'accordion');
}

export function accordionItemClass() {
  return versionDependent('card', 'accordion-item');
}

export function accordionClassFor(type) {
  type = type ? `-${type}` : '';
  return versionDependent(type ? `bg${type}` : 'card');
}

export function accordionTitleSelector() {
  return versionDependent('.card-header h2', 'h2.accordion-header');
}

export function accordionItemHeadClass() {
  return versionDependent('card-header', 'accordion-header');
}

export function accordionItemClickableSelector() {
  return versionDependent('.card-header h2 button', '.accordion-header button');
}

export function dropdownVisibilityElementSelector() {
  return versionDependent('.dropdown-menu');
}

export function accordionItemBodyClass() {
  return versionDependent('card-body', 'accordion-body');
}

export function tooltipPositionClass(pos) {
  return versionDependent(`bs-tooltip-${pos}`);
}

export function popoverPositionClass(pos) {
  return versionDependent(`bs-popover-${pos}`);
}

export function tooltipArrowClass() {
  return versionDependent('arrow', 'tooltip-arrow');
}

export function popoverArrowClass() {
  return versionDependent('arrow', 'popover-arrow');
}

export function visuallyHiddenClass() {
  return versionDependent('sr-only', 'visually-hidden');
}

export function closeButtonClass() {
  return versionDependent('close', 'btn-close');
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
