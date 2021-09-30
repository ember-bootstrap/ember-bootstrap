import Controller from '@ember/controller';

export default class ProgressController extends Controller {
  value = 50;
  minValue = 0;
  maxValue = 100;
  showLabel = false;
  type = 'default';
  striped = false;
  animate = false;
  roundDigits = 0;
  typeChoices = ['default', 'success', 'info', 'warning', 'danger'];
}
