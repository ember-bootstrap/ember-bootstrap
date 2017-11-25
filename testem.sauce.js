/* eslint-env node */
module.exports = {
  'test_page': 'tests/index.html?hidepassed',
  'disable_watching': true,
  'timeout': 540,
  'parallel': 5,
  'browser_start_timeout': 90,
  'launch_in_ci': [
    'SLEdge',
    'SLChrome',
    'SLFirefox',
    // 'SLIE11', reenable when https://github.com/emberjs/ember-qunit/issues/298 has been fixed!
    'SLSafari'
  ],

  'launch_in_dev': [
    'Chrome'
  ],

  launchers: {
    SLEdge: {
      'command': 'ember sauce:launch -b MicrosoftEdge -v 14 --visibility public -p "Windows 10" --no-connect --url "<url>"',
      'protocol': 'tap'
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

    SLIE10: {
      'exe': 'ember',
      'args': [
        'sauce:launch',
        '-b',
        'internet explorer',
        '-v',
        '10',
        '--visibility',
        'public',
        '-p',
        'Windows 8',
        '--attach',
        '--no-connect',
        '--url'
      ],
      'protocol': 'browser'
    },

    SLIE9: {
      'exe': 'ember',
      'args': [
        'sauce:launch',
        '-b',
        'internet explorer',
        '-v',
        '9',
        '--visibility',
        'public',
        '-p',
        'Windows 7',
        '--attach',
        '--no-connect',
        '--url'
      ],
      'protocol': 'browser'
    },

    SLSafari: {
      'command': 'ember sauce:launch -b safari -v 10 --visibility public -p "macOS 10.12" --no-connect --url "<url>"',
      'protocol': 'tap'
    },
    SLSafariLast: {
      'command': 'ember sauce:launch -b safari -v 9 --visibility public -p "OS X 10.11" --no-connect --url "<url>"',
      'protocol': 'tap'
    }
  }
};
