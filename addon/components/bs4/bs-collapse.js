import Collapse from 'ember-bootstrap/components/base/bs-collapse';

export default Collapse.extend({
  classNameBindings: ['collapse', 'in:show', 'collapsing']
});
