import EmberObject from '@ember/object';

class Config extends EmberObject {}

Config.reopenClass({
  formValidationSuccessIcon: 'glyphicon glyphicon-ok',
  formValidationErrorIcon: 'glyphicon glyphicon-remove',
  formValidationWarningIcon: 'glyphicon glyphicon-warning-sign',
  formValidationInfoIcon: 'glyphicon glyphicon-info-sign',
  insertEmberWormholeElementToDom: true,

  load(config = {}) {
    for (let property in config) {
      if (
        Object.prototype.hasOwnProperty.call(this, property) &&
        typeof this[property] !== 'function'
      ) {
        this[property] = config[property];
      }
    }
  },
});

export default Config;
