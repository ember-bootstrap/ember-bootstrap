export default {
  name: 'waves-init',
  initialize: function(instance) {
  	if (typeof(Waves) !== 'undefined') {
      Waves.init();
    }
  }
};
