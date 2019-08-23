import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { match } from '@ember/object/computed';

export default Controller.extend({
  router: service(),

  hideNav: match('router.currentRouteName', /acceptance/)
});
