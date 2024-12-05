import type BsButton from './components/bs-button';
import type BsCollapse from './components/bs-collapse';
import type BsSpinner from './components/bs-spinner';

export default interface EmberBootstrapRegistry {
  BsButton: typeof BsButton;
  BsCollapse: typeof BsCollapse;
  BsSpinner: typeof BsSpinner;
}
