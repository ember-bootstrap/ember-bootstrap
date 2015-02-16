import Ember from 'ember';
import modalRoute from 'ember-bootstrap/mixins/modal-route';

export default Ember.Route.extend(modalRoute, {
    backRoute: 'modal'
});