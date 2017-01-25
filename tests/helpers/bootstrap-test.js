import config from 'dummy/config/environment';
import test from 'ember-sinon-qunit/test-support/test';

const currentBootstrapVersion = parseInt(config.bootstrapVersion);

export default function testForBootstrap() {
  let name, fn, bsVersion;

  switch (arguments.length) {
    case 2:
      name = arguments[0];
      fn = arguments[1];
      break;
    case 3:
      bsVersion = arguments[0];
      name = `BS${bsVersion}: ${arguments[1]}`;
      fn = arguments[2];
      break;
    default:
      throw new Error('Unsupported invocation of testForBootstrap function');
  }

  if (bsVersion && bsVersion !== currentBootstrapVersion) {
    // Skip test for different Bootstrap version
    return;
  }
  return test(name, fn);
}