import Ember from 'ember';

const Config = Ember.Object.extend();

Config.reopenClass({
  formValidationSuccessIcon: 'glyphicon glyphicon-ok',
  formValidationErrorIcon: 'glyphicon glyphicon-remove',
  formValidationWarningIcon: 'glyphicon glyphicon-warning-sign',
  formValidationInfoIcon: 'glyphicon glyphicon-info-sign',
  insertEmberWormholeElementToDom: true,

  load(config = {}) {
    for (let property in config) {
      if (this.hasOwnProperty(property) && typeof this[property] !== 'function') {
        this[property] = config[property];
      }
    }
  }
});

export default Config;
