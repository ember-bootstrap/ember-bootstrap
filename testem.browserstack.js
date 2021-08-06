/* eslint-env node */
module.exports = {
  test_page: 'tests/index.html?hidepassed',
  disable_watching: true,
  parallel: 5,
  browser_start_timeout: 2000,
  browser_disconnect_timeout: 120,
  launch_in_ci: ['BS_Safari_Current', 'BS_MS_Edge'],

  launch_in_dev: ['Chrome'],

  launchers: {
    BS_Chrome_Current: {
      exe: 'node_modules/.bin/browserstack-launch',
      args: ['--os', 'Windows', '--osv', '10', '--b', 'chrome', '--bv', 'latest', '-t', '1200', '--u', '<url>'],
      protocol: 'browser',
    },
    BS_Firefox_Current: {
      exe: 'node_modules/.bin/browserstack-launch',
      args: ['--os', 'Windows', '--osv', '10', '--b', 'firefox', '--bv', 'latest', '-t', '1200', '--u', '<url>'],
      protocol: 'browser',
    },
    BS_Safari_Current: {
      exe: 'node_modules/.bin/browserstack-launch',
      args: ['--os', 'OS X', '--osv', 'Mojave', '--b', 'safari', '--bv', 'latest', '-t', '1200', '--u', '<url>'],
      protocol: 'browser',
    },
    BS_Safari_Last: {
      exe: 'node_modules/.bin/browserstack-launch',
      args: ['--os', 'OS X', '--osv', 'High Sierra', '--b', 'safari', '--bv', 'latest', '-t', '1200', '--u', '<url>'],
      protocol: 'browser',
    },
    BS_MS_Edge: {
      exe: 'node_modules/.bin/browserstack-launch',
      args: ['--os', 'Windows', '--osv', '10', '--b', 'edge', '--bv', 'latest', '-t', '1200', '--u', '<url>'],
      protocol: 'browser',
    },
  },
};
