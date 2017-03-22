'use strict';

const bs3Regex = '\\^3\\.\\d+\\.\\d+';
const bs4Regex = 'next';
const scenarios = [
  {
    dependencies: {
      npm: {
        bootstrap: bs3Regex
      }
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
    }
  }

];

module.exports = scenarios;
