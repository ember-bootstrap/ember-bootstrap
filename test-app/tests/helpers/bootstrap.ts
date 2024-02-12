import config from 'test-app/config/environment';
import { skip, test } from 'qunit';

type BootstrapVersion = 4 | 5;

const currentBootstrapVersion = parseInt(config.bootstrapVersion) as BootstrapVersion;

export function testForBootstrap(bsVersion: BootstrapVersion | BootstrapVersion[], name: string, fn: () => void) {
  if (!Array.isArray(bsVersion)) {
    bsVersion = [bsVersion];
  }
  if (!bsVersion.includes(currentBootstrapVersion)) {
    // Skip test for different Bootstrap version
    return;
  }
  return test(`${name} [BS${bsVersion}]`, fn);
}

export function isBootstrap(version: BootstrapVersion) {
  return currentBootstrapVersion === version;
}

export function testBS4(name: string, fn: () => void) {
  return testForBootstrap(4, name, fn);
}

export function testBS5(name: string, fn: () => void) {
  return testForBootstrap(5, name, fn);
}

export function versionDependent(v4: string, v5?: string) {
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

export function placementClassFor(type: string, placement: string) {
  return versionDependent(`${type}-${placement}`);
}

export function positionClassFor(position: string) {
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

export function accordionClassFor(type?: string) {
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

export function tooltipPositionClass(pos: string) {
  return versionDependent(`bs-tooltip-${pos}`);
}

export function popoverPositionClass(pos: string) {
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

export function isVisible(el: HTMLElement) {
  return !isHidden(el);
}

export function isHidden(el: HTMLElement) {
  // A bit of an odd test, but taken from https://stackoverflow.com/questions/19669786/check-if-element-is-visible-in-dom
  // referencing https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetParent
  return !el || el.offsetParent === null;
}

export { test };

export function testRequiringFocus(name: string, fn: () => void) {
  if (document.hasFocus()) {
    return test(name, fn);
  } else {
    skip(name);
  }
}

export function testRequiringTransitions(name: string, fn: () => void) {
  return test(name, fn);
}

export function delay(delay: number) {
  return new Promise((resolve) => setTimeout(resolve, delay));
}
