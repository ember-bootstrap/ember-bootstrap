import type BsButton from './components/bs-button';
import type BsCollapse from './components/bs-collapse';
import type BsModal from './components/bs-modal';
import type BsModalBody from './components/bs-modal/body';
import type BsModalDialog from './components/bs-modal/footer';
import type BsModalFooter from './components/bs-modal/footer';
import type BsModalHeader from './components/bs-modal/header';
import type BsModalHeaderClose from './components/bs-modal/header/close';
import type BsModalHeaderTitle from './components/bs-modal/header/title';
import type BsSpinner from './components/bs-spinner';

interface BsModalRegistry {
  'bs-modal/header/close': typeof BsModalHeaderClose;
  'BsModal::Header::Close': typeof BsModalHeaderClose;
  'bs-modal/header/title': typeof BsModalHeaderTitle;
  'BsModal::Header::Title': typeof BsModalHeaderTitle;
  'bs-modal/header': typeof BsModalHeader;
  'BsModal::Header': typeof BsModalHeader;
  'bs-modal/body': typeof BsModalBody;
  'BsModal::Body': typeof BsModalBody;
  'bs-modal/footer': typeof BsModalFooter;
  'BsModal::Footer': typeof BsModalFooter;
  'bs-modal/dialog': typeof BsModalDialog;
  'BsModal::Dialog': typeof BsModalDialog;
  'bs-modal': typeof BsModal;
  BsModal: typeof BsModal;
}

export default interface EmberBootstrapRegistry extends BsModalRegistry {
  'bs-button': typeof BsButton;
  BsButton: typeof BsButton;
  'bs-collapse': typeof BsCollapse;
  BsCollapse: typeof BsCollapse;
  'bs-spinner': typeof BsSpinner;
  BsSpinner: typeof BsSpinner;
}
