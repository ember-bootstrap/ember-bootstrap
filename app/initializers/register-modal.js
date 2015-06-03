import instanceInitializer from "../instance-initializers/register-modal";

export default {
  name: instanceInitializer.name,

  initialize: function(registry, application) {
    if (application.instanceInitializer) { return; }

    instanceInitializer.initialize(application);
  }
};