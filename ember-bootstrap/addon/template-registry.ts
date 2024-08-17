import type BsButton from './components/bs-button';
import type BsCollapse from './components/bs-collapse';
import type BsSpinner from './components/bs-spinner';
import type BsProgressBar from 'ember-bootstrap/components/bs-progress/bar';

export default interface EmberBootstrapRegistry {
  BsButton: typeof BsButton;
  BsCollapse: typeof BsCollapse;
  BsSpinner: typeof BsSpinner;
  'bs-progress/bar': typeof BsProgressBar;
}
