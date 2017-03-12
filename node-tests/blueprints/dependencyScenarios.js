'use strict';

const bs3Regex = '\\^3\\.\\d+\\.\\d+';
const bs4Regex = 'next';
const scenarios = [
  {
    dependencies: {
      bower: {
        bootstrap: null
      },
      npm: {
        bootstrap: bs3Regex,
        'bootstrap-sass': null
      }
    }
  },
  {
    installed: {
      npm: ['ember-cli-less']
    },
    dependencies: {
      bower: {
        bootstrap: null
      },
      npm: {
        bootstrap: bs3Regex,
        'bootstrap-sass': null
      }
    }
  },
  {
    installed: {
      npm: ['ember-cli-sass']
    },
    dependencies: {
      bower: {
        bootstrap: null
      },
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
      bower: {
        bootstrap: null
      },
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
      npm: ['ember-cli-sass']
    },
    dependencies: {
      bower: {
        bootstrap: null
      },
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
      bower: {
        bootstrap: null
      },
      npm: {
        bootstrap: bs3Regex,
        'bootstrap-sass': null
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
      bower: {
        bootstrap: null
      },
      npm: {
        bootstrap: bs3Regex,
        'bootstrap-sass': null
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
      bower: {
        bootstrap: null
      },
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
      preprocessor: 'less'
    },
    installed: {
      npm: ['ember-cli-sass']
    },
    dependencies: {
      bower: {
        bootstrap: null
      },
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
      bower: {
        bootstrap: null
      },
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
      bower: {
        bootstrap: null
      },
      npm: {
        bootstrap: null,
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
      bower: {
        bootstrap: null
      },
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
      bower: {
        bootstrap: null
      },
      npm: {
        bootstrap: bs3Regex,
        'bootstrap-sass': null
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
      bower: {
        bootstrap: null
      },
      npm: {
        bootstrap: bs3Regex,
        'bootstrap-sass': null
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
      bower: {
        bootstrap: null
      },
      npm: {
        bootstrap: null,
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
      bower: {
        bootstrap: null
      },
      npm: {
        bootstrap: bs3Regex,
        'bootstrap-sass': null
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
      bower: {
        bootstrap: null
      },
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
      preprocessor: 'none',
      bootstrapVersion: 3
    },
    installed: {
      npm: ['ember-cli-less']
    },
    dependencies: {
      bower: {
        bootstrap: null
      },
      npm: {
        bootstrap: bs3Regex,
        'bootstrap-sass': null
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
      bower: {
        bootstrap: null
      },
      npm: {
        bootstrap: bs3Regex,
        'bootstrap-sass': null
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
      bower: {
        bootstrap: null
      },
      npm: {
        bootstrap: bs3Regex,
        'bootstrap-sass': null
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
      bower: {
        bootstrap: null
      },
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
      preprocessor: 'sass',
      bootstrapVersion: 3
    },
    dependencies: {
      bower: {
        bootstrap: null
      },
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
      preprocessor: 'sass',
      bootstrapVersion: 3
    },
    installed: {
      npm: ['ember-cli-sass']
    },
    dependencies: {
      bower: {
        bootstrap: null
      },
      npm: {
        bootstrap: null,
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
      bower: {
        bootstrap: null
      },
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

  // BS4 option
  {
    options: {
      bootstrapVersion: 4
    },
    dependencies: {
      bower: {
        bootstrap: null
      },
      npm: {
        bootstrap: bs4Regex,
        'bootstrap-sass': null
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
      bower: {
        bootstrap: null
      },
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
      bower: {
        bootstrap: null
      },
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
    installed: {
      npm: ['ember-cli-sass']
    },
    dependencies: {
      bower: {
        bootstrap: null
      },
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
      bower: {
        bootstrap: null
      },
      npm: {
        bootstrap: bs4Regex,
        'bootstrap-sass': null
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
      bower: {
        bootstrap: null
      },
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
      bower: {
        bootstrap: null
      },
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
      bower: {
        bootstrap: null
      },
      npm: {
        bootstrap: bs4Regex,
        'bootstrap-sass': null
      },
      addon: {
        'ember-cli-less': null,
        'ember-cli-sass': true
      }
    }
  }

];

module.exports = scenarios;