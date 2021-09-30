import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';

export default class NavbarsController extends Controller {
  @tracked
  type = 'light';

  @tracked
  bg = 'light';

  typeChoices = ['light', 'dark'];
  bgChoices = [
    'light',
    'dark',
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'info',
  ];
}
