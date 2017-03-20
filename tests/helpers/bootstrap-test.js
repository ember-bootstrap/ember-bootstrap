import config from 'dummy/config/environment';
import test from 'ember-sinon-qunit/test-support/test';

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

function versionDependent(v3, v4) {
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

export function placementClassFor(type, placement) {
  return versionDependent(placement, `${type}-${placement}`);
}

export function positionClassFor(position) {
  return versionDependent(`navbar-${position}`, position);
}

export function positionStickyClass() {
  return versionDependent('navbar-static-top', 'sticky-top');
}

export { test };
