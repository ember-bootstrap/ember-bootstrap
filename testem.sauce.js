/* eslint-env node */
module.exports = {
  'test_page': 'tests/index.html?hidepassed',
  'disable_watching': true,
  'timeout': 540,
  'browser_start_timeout': 90,
  'browser_disconnect_timeout': 60,
  'launch_in_ci': [
    // Edge is still disabled due to https://github.com/johanneswuerbach/ember-cli-sauce/issues/101
    // 'SLEdge'
    'SLChrome',
    'SLFirefox'
    // 'SLIE11',
    // 'SLSafari'
  ],

  'launch_in_dev': [
    'Chrome'
  ],

  launchers: {
    SLEdge: {
      'exe': 'ember',
      'args': [
        'sauce:launch',
        '-b',
        'MicrosoftEdge',
        '-v',
        '15',
        '--visibility',
        'public',
        '-p',
        'Windows 10',
        '--attach',
        '--no-connect',
        '--url'
      ],
      'protocol': 'browser'
    },

    SLChrome: {
      'exe': 'ember',
      'args': [
        'sauce:launch',
        '-b',
        'Chrome',
        '-v',
        '60',
        '--visibility',
        'public',
        '-p',
        'Windows 10',
        '--attach',
        '--no-connect',
        '--url'
      ],
      'protocol': 'browser'
    },

    SLFirefox: {
      'exe': 'ember',
      'args': [
        'sauce:launch',
        '-b',
        'Firefox',
        '-v',
        '54',
        '--visibility',
        'public',
        '-p',
        'Windows 10',
        '--attach',
        '--no-connect',
        '--url'
      ],
      'protocol': 'browser'
    },

    SLIE11: {
      'exe': 'ember',
      'args': [
        'sauce:launch',
        '-b',
        'internet explorer',
        '-v',
        '11',
        '--visibility',
        'public',
        '-p',
        'Windows 10',
        '--attach',
        '--no-connect',
        '--url'
      ],
      'protocol': 'browser'
    },

    SLSafari: {
      'exe': 'ember',
      'args': [
        'sauce:launch',
        '-b',
        'safari',
        '-v',
        '10',
        '--visibility',
        'public',
        '-p',
        'macOS 10.12',
        '--attach',
        '--no-connect',
        '--url'
      ],
      'protocol': 'browser'
    }
  }
};
