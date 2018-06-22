'use strict';

const bs3Regex = '\\^3\\.\\d+\\.\\d+';
const bs4Regex = '\\^4\\.\\d+\\.\\d+';
const scenarios = [
  {
    dependencies: {
      npm: {
        bootstrap: bs4Regex
      }
    },
    config: {
      bootstrapVersion: 4,
      importBootstrapCSS: true
    }
  },
  { // Existing settings are preserved if they don't need to be overridden
    installed: {
      config: {
        importBootstrapCSS: false
      }
    },
    dependencies: {
      npm: {
        bootstrap: bs4Regex
      }
    },
    config: {
      bootstrapVersion: 4,
      importBootstrapCSS: false
    }
  },
  {
    installed: {
      config: {
        bootstrapVersion: 3
      }
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
    installed: {
      npm: ['ember-cli-sass']
    },
    dependencies: {
      npm: {
        'bootstrap': bs4Regex
      }
    },
    config: {
      bootstrapVersion: 4,
      importBootstrapCSS: false
    }
  },
  {
    options: {
      preprocessor: 'none'
    },
    dependencies: {
      npm: {
        bootstrap: bs4Regex
      }
    },
    config: {
      bootstrapVersion: 4,
      importBootstrapCSS: true
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
        bootstrap: bs4Regex,
        'bootstrap-sass': null
      }
    },
    config: {
      bootstrapVersion: 4,
      importBootstrapCSS: true
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
        bootstrap: bs4Regex,
        'bootstrap-sass': null
      },
      addon: {
        'ember-cli-sass': null
      }
    },
    config: {
      bootstrapVersion: 4,
      importBootstrapCSS: true
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
        bootstrap: bs4Regex
      },
      addon: {
        'ember-cli-less': null
      }
    },
    config: {
      bootstrapVersion: 4,
      importBootstrapCSS: true
    }
  },
  {
    options: {
      preprocessor: 'sass'
    },
    dependencies: {
      npm: {
        'bootstrap': bs4Regex
      },
      addon: {
        'ember-cli-sass': true
      }
    },
    config: {
      bootstrapVersion: 4,
      importBootstrapCSS: false
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
        'bootstrap': bs4Regex
      }
    },
    config: {
      bootstrapVersion: 4,
      importBootstrapCSS: false
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
        'bootstrap': bs4Regex
      },
      addon: {
        'ember-cli-less': null,
        'ember-cli-sass': true
      }
    },
    config: {
      bootstrapVersion: 4,
      importBootstrapCSS: false
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
        bootstrap: bs4Regex
      },
      addon: {
        'ember-cli-less': null,
        'ember-cli-sass': true
      }
    },
    config: {
      bootstrapVersion: 4,
      importBootstrapCSS: false
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
      importBootstrapCSS: true
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
      importBootstrapCSS: false
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
      importBootstrapCSS: false
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
      importBootstrapCSS: true
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
      importBootstrapCSS: true
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
      importBootstrapCSS: true
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
      importBootstrapCSS: true
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
      importBootstrapCSS: false
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
      importBootstrapCSS: false
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
      importBootstrapCSS: false
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
      importBootstrapCSS: false
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
      importBootstrapCSS: false
    }
  }

];

module.exports = scenarios;
