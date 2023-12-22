module.exports = function () {
  return {
    delivery: ['meta'],
    policy: {
      'default-src': ["'none'"],
      'script-src': ["'self'"],
      'font-src': ["'self'"],
      'connect-src': ["'self'"],
      'img-src': [
        "'self'",
        // Bootstrap 4 uses data URL for some SVG images in CSS
        'data:',
      ],
      'style-src': [
        "'self'",
        "'sha256-TfKF8gl0QHp566h8GzfYjTsiRn3j9Ll7S0zdoLOq7ic='",
        "'sha256-9jmMc10d3gtj1r8cOJX+x+p1bMOS+vX+i8iVCr3h18A='",
      ],
      'media-src': ["'self'"],
    },
  };
};
