// BEGIN-SNIPPET form-controller
import Controller from '@ember/controller';
import { action } from '@ember/object';
import { getOwner } from '@ember/application';
import Login from '../../models/login';

export default class FormsController extends Controller {
  formLayout = 'vertical';
  email = 'foo@example.com';
  password = null;
  checkbox = false;
  switched = false;
  radio = null;
  radioOptions = [
    {
      label: 'foo',
    },
    {
      label: 'bar',
    },
  ];

  get login() {
    return Login.create(getOwner(this).ownerInjection());
  }

  @action
  submit() {
    window.alert('Successfully submitted form data!');
  }
}
// END-SNIPPET
