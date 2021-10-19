import Controller from '@ember/controller';

export default class TabController extends Controller {
  type = 'tabs';
  typeChoices = ['pills', 'tabs'];
}
