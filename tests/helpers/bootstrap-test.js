import config from 'dummy/config/environment';
import test from 'ember-sinon-qunit/test-support/test';
import { skip } from 'qunit';
import transitionSupport from 'ember-bootstrap/utils/transition-support';

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
  return versionDependent('help-block', 'form-control-feedback');
}

export function validationErrorClass() {
  return versionDependent('has-error', 'has-danger');
}

export function validationWarningClass() {
  return 'has-warning';
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
  return versionDependent(`panel${type}`, `card${type}`);
}

export function accordionItemHeadClass() {
  return versionDependent('panel-heading', 'card-header');
}

export function accordionItemBodyClass() {
  return versionDependent('panel-body', 'card-block');
}

export function tooltipPositionClass(pos) {
  return versionDependent(pos, `tooltip-${pos}`);
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
  if (transitionSupport) {
    return test(name, fn);
  } else {
    skip(name);
  }
}