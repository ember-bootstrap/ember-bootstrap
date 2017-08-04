/* eslint-env node */
module.exports = {
  'test_page': 'tests/index.html?hidepassed',
  'disable_watching': true,

  'launch_in_ci': [
    // 'SLEdge',
    'SLChrome'
    // 'SLFirefox',
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
        '14',
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
        '59',
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
