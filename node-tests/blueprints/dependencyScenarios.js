'use strict';

const bs3Regex = '\\^3\\.\\d+\\.\\d+';
const bs4Regex = '4\\.0\\.0-beta\\.2';
const scenarios = [
  {
    dependencies: {
      npm: {
        bootstrap: bs3Regex
      }
    },
    config: {
      bootstrapVersion: 3,
      importBootstrapCSS: true,
      importBootstrapFont: true
    }
  },
  { // Existing settings are preserved if they don't need to be overridden
    installed: {
      config: {
        importBootstrapCSS: false,
        importBootstrapFont: false
      }
    },
    dependencies: {
      npm: {
        bootstrap: bs3Regex
      }
    },
    config: {
      bootstrapVersion: 3,
      importBootstrapCSS: false,
      importBootstrapFont: false
    }
  },
  {
    installed: {
      config: {
        bootstrapVersion: 4
      }
    },
    dependencies: {
      npm: {
        bootstrap: bs4Regex
      }
    },
    config: {
      bootstrapVersion: 4,
      importBootstrapCSS: true,
      importBootstrapFont: false
    }
  },
  {
    installed: {
      npm: ['ember-cli-less']
    },
    dependencies: {
      npm: {
        bootstrap: bs3Regex
      }
    },
    config: {
      bootstrapVersion: 3,
      importBootstrapCSS: false,
      importBootstrapFont: true
    }
  },
  {
    installed: {
      npm: ['ember-cli-sass']
    },
    dependencies: {
      npm: {
        'bootstrap-sass': bs3Regex
      }
    },
    config: {
      bootstrapVersion: 3,
      importBootstrapCSS: false,
      importBootstrapFont: true
    }
  },
  {
    installed: {
      npm: ['ember-cli-sass', 'bootstrap']
    },
    dependencies: {
      npm: {
        bootstrap: null,
        'bootstrap-sass': bs3Regex
      }
    },
    config: {
      bootstrapVersion: 3,
      importBootstrapCSS: false,
      importBootstrapFont: true
    }
  },
  {
    options: {
      preprocessor: 'none'
    },
    dependencies: {
      npm: {
        bootstrap: bs3Regex
      }
    },
    config: {
      bootstrapVersion: 3,
      importBootstrapCSS: true,
      importBootstrapFont: true
    }
  },
  {
    options: {
      preprocessor: 'none'
    },
    installed: {
      npm: ['bootstrap-sass']
    },
    dependencies: {
      npm: {
        bootstrap: bs3Regex,
        'bootstrap-sass': null
      }
    },
    config: {
      bootstrapVersion: 3,
      importBootstrapCSS: true,
      importBootstrapFont: true
    }
  },
  {
    options: {
      preprocessor: 'none'
    },
    installed: {
      npm: ['ember-cli-sass', 'bootstrap-sass']
    },
    dependencies: {
      npm: {
        bootstrap: bs3Regex,
        'bootstrap-sass': null
      },
      addon: {
        'ember-cli-sass': null
      }
    },
    config: {
      bootstrapVersion: 3,
      importBootstrapCSS: true,
      importBootstrapFont: true
    }
  },
  {
    options: {
      preprocessor: 'none'
    },
    installed: {
      npm: ['ember-cli-less']
    },
    dependencies: {
      npm: {
        bootstrap: bs3Regex
      },
      addon: {
        'ember-cli-less': null
      }
    },
    config: {
      bootstrapVersion: 3,
      importBootstrapCSS: true,
      importBootstrapFont: true
    }
  },
  {
    options: {
      preprocessor: 'less'
    },
    dependencies: {
      npm: {
        bootstrap: bs3Regex
      },
      addon: {
        'ember-cli-less': true
      }
    },
    config: {
      bootstrapVersion: 3,
      importBootstrapCSS: false,
      importBootstrapFont: true
    }
  },
  {
    options: {
      preprocessor: 'less'
    },
    installed: {
      npm: ['ember-cli-less']
    },
    dependencies: {
      npm: {
        bootstrap: bs3Regex
      }
    },
    config: {
      bootstrapVersion: 3,
      importBootstrapCSS: false,
      importBootstrapFont: true
    }
  },
  {
    options: {
      preprocessor: 'less'
    },
    installed: {
      npm: ['ember-cli-sass', 'bootstrap-sass']
    },
    dependencies: {
      npm: {
        bootstrap: bs3Regex,
        'bootstrap-sass': null
      },
      addon: {
        'ember-cli-less': true,
        'ember-cli-sass': null
      }
    },
    config: {
      bootstrapVersion: 3,
      importBootstrapCSS: false,
      importBootstrapFont: true
    }
  },
  {
    options: {
      preprocessor: 'sass'
    },
    dependencies: {
      npm: {
        'bootstrap-sass': bs3Regex
      },
      addon: {
        'ember-cli-sass': true
      }
    },
    config: {
      bootstrapVersion: 3,
      importBootstrapCSS: false,
      importBootstrapFont: true
    }
  },
  {
    options: {
      preprocessor: 'sass'
    },
    installed: {
      npm: ['bootstrap']
    },
    dependencies: {
      npm: {
        bootstrap: null,
        'bootstrap-sass': bs3Regex
      },
      addon: {
        'ember-cli-sass': true
      }
    },
    config: {
      bootstrapVersion: 3,
      importBootstrapCSS: false,
      importBootstrapFont: true
    }
  },
  {
    options: {
      preprocessor: 'sass'
    },
    installed: {
      npm: ['ember-cli-sass']
    },
    dependencies: {
      npm: {
        'bootstrap-sass': bs3Regex
      }
    },
    config: {
      bootstrapVersion: 3,
      importBootstrapCSS: false,
      importBootstrapFont: true
    }
  },
  {
    options: {
      preprocessor: 'sass'
    },
    installed: {
      npm: ['ember-cli-less']
    },
    dependencies: {
      npm: {
        'bootstrap-sass': bs3Regex
      },
      addon: {
        'ember-cli-less': null,
        'ember-cli-sass': true
      }
    },
    config: {
      bootstrapVersion: 3,
      importBootstrapCSS: false,
      importBootstrapFont: true
    }
  },
  {
    options: {
      preprocessor: 'sass'
    },
    installed: {
      npm: ['ember-cli-less', 'bootstrap']
    },
    dependencies: {
      npm: {
        bootstrap: null,
        'bootstrap-sass': bs3Regex
      },
      addon: {
        'ember-cli-less': null,
        'ember-cli-sass': true
      }
    },
    config: {
      bootstrapVersion: 3,
      importBootstrapCSS: false,
      importBootstrapFont: true
    }
  },

  // BS3 option
  {
    options: {
      bootstrapVersion: 3
    },
    dependencies: {
      npm: {
        bootstrap: bs3Regex
      }
    },
    config: {
      bootstrapVersion: 3,
      importBootstrapCSS: true,
      importBootstrapFont: true
    }
  },
  {
    options: {
      bootstrapVersion: 3
    },
    installed: {
      npm: ['ember-cli-less']
    },
    dependencies: {
      npm: {
        bootstrap: bs3Regex
      }
    },
    config: {
      bootstrapVersion: 3,
      importBootstrapCSS: false,
      importBootstrapFont: true
    }
  },
  {
    options: {
      bootstrapVersion: 3
    },
    installed: {
      npm: ['ember-cli-sass']
    },
    dependencies: {
      npm: {
        'bootstrap-sass': bs3Regex
      }
    },
    config: {
      bootstrapVersion: 3,
      importBootstrapCSS: false,
      importBootstrapFont: true
    }
  },
  {
    options: {
      preprocessor: 'none',
      bootstrapVersion: 3
    },
    dependencies: {
      npm: {
        bootstrap: bs3Regex
      }
    },
    config: {
      bootstrapVersion: 3,
      importBootstrapCSS: true,
      importBootstrapFont: true
    }
  },
  {
    options: {
      preprocessor: 'none',
      bootstrapVersion: 3
    },
    installed: {
      npm: ['ember-cli-sass']
    },
    dependencies: {
      npm: {
        bootstrap: bs3Regex
      },
      addon: {
        'ember-cli-sass': null
      }
    },
    config: {
      bootstrapVersion: 3,
      importBootstrapCSS: true,
      importBootstrapFont: true
    }
  },
  {
    options: {
      preprocessor: 'none',
      bootstrapVersion: 3
    },
    installed: {
      npm: ['ember-cli-less']
    },
    dependencies: {
      npm: {
        bootstrap: bs3Regex
      },
      addon: {
        'ember-cli-less': null
      }
    },
    config: {
      bootstrapVersion: 3,
      importBootstrapCSS: true,
      importBootstrapFont: true
    }
  },
  {
    options: {
      preprocessor: 'less',
      bootstrapVersion: 3
    },
    dependencies: {
      npm: {
        bootstrap: bs3Regex
      },
      addon: {
        'ember-cli-less': true
      }
    },
    config: {
      bootstrapVersion: 3,
      importBootstrapCSS: false,
      importBootstrapFont: true
    }
  },
  {
    options: {
      preprocessor: 'less',
      bootstrapVersion: 3
    },
    installed: {
      npm: ['ember-cli-less']
    },
    dependencies: {
      npm: {
        bootstrap: bs3Regex
      }
    },
    config: {
      bootstrapVersion: 3,
      importBootstrapCSS: false,
      importBootstrapFont: true
    }
  },
  {
    options: {
      preprocessor: 'less',
      bootstrapVersion: 3
    },
    installed: {
      npm: ['ember-cli-sass']
    },
    dependencies: {
      npm: {
        bootstrap: bs3Regex
      },
      addon: {
        'ember-cli-less': true,
        'ember-cli-sass': null
      }
    },
    config: {
      bootstrapVersion: 3,
      importBootstrapCSS: false,
      importBootstrapFont: true
    }
  },
  {
    options: {
      preprocessor: 'sass',
      bootstrapVersion: 3
    },
    dependencies: {
      npm: {
        'bootstrap-sass': bs3Regex
      },
      addon: {
        'ember-cli-sass': true
      }
    },
    config: {
      bootstrapVersion: 3,
      importBootstrapCSS: false,
      importBootstrapFont: true
    }
  },
  {
    options: {
      preprocessor: 'sass',
      bootstrapVersion: 3
    },
    installed: {
      npm: ['ember-cli-sass']
    },
    dependencies: {
      npm: {
        'bootstrap-sass': bs3Regex
      }
    },
    config: {
      bootstrapVersion: 3,
      importBootstrapCSS: false,
      importBootstrapFont: true
    }
  },
  {
    options: {
      preprocessor: 'sass',
      bootstrapVersion: 3
    },
    installed: {
      npm: ['ember-cli-less']
    },
    dependencies: {
      npm: {
        'bootstrap-sass': bs3Regex
      },
      addon: {
        'ember-cli-less': null,
        'ember-cli-sass': true
      }
    },
    config: {
      bootstrapVersion: 3,
      importBootstrapCSS: false,
      importBootstrapFont: true
    }
  },

  // BS4 option
  {
    options: {
      bootstrapVersion: 4
    },
    dependencies: {
      npm: {
        bootstrap: bs4Regex
      }
    },
    config: {
      bootstrapVersion: 4,
      importBootstrapCSS: true,
      importBootstrapFont: false
    }
  },
  {
    options: {
      bootstrapVersion: 4
    },
    installed: {
      npm: ['ember-cli-sass']
    },
    dependencies: {
      npm: {
        bootstrap: bs4Regex
      }
    },
    config: {
      bootstrapVersion: 4,
      importBootstrapCSS: false,
      importBootstrapFont: false
    }
  },
  {
    options: {
      bootstrapVersion: 4
    },
    installed: {
      npm: ['ember-cli-sass', 'bootstrap-sass']
    },
    dependencies: {
      npm: {
        bootstrap: bs4Regex,
        'bootstrap-sass': null
      }
    },
    config: {
      bootstrapVersion: 4,
      importBootstrapCSS: false,
      importBootstrapFont: false
    }
  },
  {
    options: {
      preprocessor: 'none',
      bootstrapVersion: 4
    },
    dependencies: {
      npm: {
        bootstrap: bs4Regex
      }
    },
    config: {
      bootstrapVersion: 4,
      importBootstrapCSS: true,
      importBootstrapFont: false
    }
  },
  {
    options: {
      preprocessor: 'none',
      bootstrapVersion: 4
    },
    installed: {
      npm: ['ember-cli-sass']
    },
    dependencies: {
      npm: {
        bootstrap: bs4Regex
      },
      addon: {
        'ember-cli-sass': null
      }
    },
    config: {
      bootstrapVersion: 4,
      importBootstrapCSS: true,
      importBootstrapFont: false
    }
  },
  {
    options: {
      preprocessor: 'none',
      bootstrapVersion: 4
    },
    installed: {
      npm: ['ember-cli-sass', 'bootstrap-sass']
    },
    dependencies: {
      npm: {
        bootstrap: bs4Regex,
        'bootstrap-sass': null
      },
      addon: {
        'ember-cli-sass': null
      }
    },
    config: {
      bootstrapVersion: 4,
      importBootstrapCSS: true,
      importBootstrapFont: false
    }
  },
  {
    options: {
      preprocessor: 'none',
      bootstrapVersion: 4
    },
    installed: {
      npm: ['ember-cli-less']
    },
    dependencies: {
      npm: {
        bootstrap: bs4Regex
      },
      addon: {
        'ember-cli-less': null
      }
    },
    config: {
      bootstrapVersion: 4,
      importBootstrapCSS: true,
      importBootstrapFont: false
    }
  },
  {
    options: {
      preprocessor: 'sass',
      bootstrapVersion: 4
    },
    dependencies: {
      npm: {
        bootstrap: bs4Regex
      },
      addon: {
        'ember-cli-sass': true
      }
    },
    config: {
      bootstrapVersion: 4,
      importBootstrapCSS: false,
      importBootstrapFont: false
    }
  },
  {
    options: {
      preprocessor: 'sass',
      bootstrapVersion: 4
    },
    installed: {
      npm: ['bootstrap-sass']
    },
    dependencies: {
      npm: {
        bootstrap: bs4Regex,
        'bootstrap-sass': null
      },
      addon: {
        'ember-cli-sass': true
      }
    },
    config: {
      bootstrapVersion: 4,
      importBootstrapCSS: false,
      importBootstrapFont: false
    }
  },
  {
    options: {
      preprocessor: 'sass',
      bootstrapVersion: 4
    },
    installed: {
      npm: ['ember-cli-sass']
    },
    dependencies: {
      npm: {
        bootstrap: bs4Regex
      }
    },
    config: {
      bootstrapVersion: 4,
      importBootstrapCSS: false,
      importBootstrapFont: false
    }
  },
  {
    options: {
      preprocessor: 'sass',
      bootstrapVersion: 4
    },
    installed: {
      npm: ['ember-cli-sass', 'bootstrap-sass']
    },
    dependencies: {
      npm: {
        bootstrap: bs4Regex,
        'bootstrap-sass': null
      }
    },
    config: {
      bootstrapVersion: 4,
      importBootstrapCSS: false,
      importBootstrapFont: false
    }
  },
  {
    options: {
      preprocessor: 'sass',
      bootstrapVersion: 4
    },
    installed: {
      npm: ['ember-cli-less']
    },
    dependencies: {
      npm: {
        bootstrap: bs4Regex
      },
      addon: {
        'ember-cli-less': null,
        'ember-cli-sass': true
      }
    },
    config: {
      bootstrapVersion: 4,
      importBootstrapCSS: false,
      importBootstrapFont: false
    }
  }

];

module.exports = scenarios;
