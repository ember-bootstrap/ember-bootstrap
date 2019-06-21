function fixSamples(content) {
  return content.replace(/\(at\)/g, '@');
}

module.exports = {
  fixSamples
};
