import { run } from '@ember/runloop';

export default function destroyApp(application) {
  run(application, 'destroy');
  let el = document.getElementById('ember-bootstrap-modal-container');
  if (el) {
    el.remove();
  }
}
