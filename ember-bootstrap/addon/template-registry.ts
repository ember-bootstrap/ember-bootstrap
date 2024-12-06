import type BsButton from './components/bs-button';
import type BsCollapse from './components/bs-collapse';
import type BsModal from './components/bs-modal';
import type BsSpinner from './components/bs-spinner';

export default interface EmberBootstrapRegistry {
  BsButton: typeof BsButton;
  BsCollapse: typeof BsCollapse;
  BsSpinner: typeof BsSpinner;
  BsModal: typeof BsModal;
}
