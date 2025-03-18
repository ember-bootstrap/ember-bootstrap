import type BsAccordion from './components/bs-accordion';
import type BsButton from './components/bs-button';
import type BsCollapse from './components/bs-collapse';
import type BsDropdown from './components/bs-dropdown';
import type BsModal from './components/bs-modal';
import type BsSpinner from './components/bs-spinner';

export default interface EmberBootstrapRegistry {
  BsAccordion: typeof BsAccordion;
  BsButton: typeof BsButton;
  BsCollapse: typeof BsCollapse;
  BsDropdown: typeof BsDropdown;
  BsSpinner: typeof BsSpinner;
  BsModal: typeof BsModal;
}
