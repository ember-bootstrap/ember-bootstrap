import config from 'test-app/config/environment';
import { skip, test as qunitTest } from 'qunit';
import type { CustomAssert, CustomTestContext } from '.';

const currentBootstrapVersion = config.bootstrapVersion;

function test<TC extends CustomTestContext>(
  name: string,
  callback: (this: TC, assert: CustomAssert) => void | Promise<void>,
) {
  qunitTest(name, callback);
}

export function testForBootstrap(
  bsVersion: number | number[],
  name: string,
  fn: Parameters<typeof test>[1],
) {
  if (!Array.isArray(bsVersion)) {
    bsVersion = [bsVersion];
  }
  if (!bsVersion.includes(currentBootstrapVersion)) {
    // Skip test for different Bootstrap version
    return;
  }
  return test(`${name} [BS${bsVersion}]`, fn);
}

export function isBootstrap(version: number) {
  return currentBootstrapVersion === version;
}

export function testBS4(name: string, fn: Parameters<typeof test>[1]) {
  return testForBootstrap(4, name, fn);
}

export function testBS5(name: string, fn: Parameters<typeof test>[1]) {
  return testForBootstrap(5, name, fn);
}

export function versionDependent<T>(v4: T, v5?: T): T {
  return isBootstrap(5) ? (v5 ?? v4) : v4;
}

export function visibilityClass() {
  return 'show';
}

export function openClass() {
  return 'show';
}

export function defaultButtonClass() {
  return 'btn-secondary';
}

export function formFeedbackClass() {
  return 'invalid-feedback';
}

export function formFeedbackElement() {
  return '.form-control';
}

export function validationSuccessClass() {
  return 'is-valid';
}

export function validationErrorClass() {
  return 'is-invalid';
}

export function validationWarningClass() {
  return 'is-warning';
}

export function placementClassFor(type: string, placement: string) {
  return `${type}-${placement}`;
}

export function positionClassFor(position: string) {
  return position;
}

export function positionStickyClass() {
  return 'sticky-top';
}

export function formHelpTextClass() {
  return 'form-text';
}

export function accordionClass() {
  return versionDependent('accordion', 'accordion');
}

export function accordionItemClass() {
  return versionDependent('card', 'accordion-item');
}

export function accordionClassFor(type?: string) {
  type = type ? `-${type}` : '';
  return type ? `bg${type}` : 'card';
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
  return '.dropdown-menu';
}

export function accordionItemBodyClass() {
  return versionDependent('card-body', 'accordion-body');
}

export function tooltipPositionClass(pos: string) {
  return `bs-tooltip-${pos}`;
}

export function popoverPositionClass(pos: string) {
  return `bs-popover-${pos}`;
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

export function testRequiringFocus(
  name: string,
  fn: Parameters<typeof test>[1],
) {
  if (document.hasFocus()) {
    return test(name, fn);
  } else {
    skip(name);
  }
}

export function testRequiringTransitions(
  name: string,
  fn: Parameters<typeof test>[1],
) {
  return test(name, fn);
}

export function delay(delay: number) {
  return new Promise((resolve) => setTimeout(resolve, delay));
}
