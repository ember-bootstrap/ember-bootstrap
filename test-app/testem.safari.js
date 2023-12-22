'use strict';

/* eslint-env node */
module.exports = {
  test_page: 'tests/index.html?hidepassed',
  disable_watching: true,
  parallel: 1,
  browser_start_timeout: 120,
  launch_in_ci: ['Safari'],
  launchers: {
    // Allow safari to proceed without user intervention. See https://github.com/testem/testem/issues/1387
    Safari: {
      protocol: 'browser',
      exe: 'osascript',
      args: [
        '-e',
        `tell application "Safari"
          activate
          open location "<url>"
         end tell
         delay 3000`,
      ],
    },
  },
};
