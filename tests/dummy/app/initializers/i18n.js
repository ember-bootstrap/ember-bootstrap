import Ember from 'ember';

export function initialize() {
    if (Ember.isPresent(Ember.I18n)) {
        Ember.I18n.translations = {
            label: {
                translated: "This is a translated label"
            }
        };
    }
}

export default {
    name: 'i18n',
    initialize: initialize
};
