import Ember from 'ember';

export function initialize() {
    Ember.I18n.translations = {
        label: {
            translated: "This is a translated label"
        }
    };
}

export default {
    name: 'i18n',
    initialize: initialize
};
