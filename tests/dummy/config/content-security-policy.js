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
      'style-src': ["'self'"],
      'media-src': ["'self'"],
    },
  };
};
