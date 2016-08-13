import Ember from 'ember';
import ComponentChildMixin from 'ember-bootstrap/mixins/component-child';

const { LinkComponent } = Ember;

export function initialize(/* application */) {
  if (!ComponentChildMixin.detect(LinkComponent)) {
    LinkComponent.reopen(ComponentChildMixin);
  }
}

export default {
  name: 'bootstrap-linkto',
  initialize
};
