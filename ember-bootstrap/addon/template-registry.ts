import type BsButton from './components/bs-button';
import type BsCollapse from './components/bs-collapse';
import type BsSpinner from './components/bs-spinner';
import type BsModalHeaderClose from './components/bs-modal/header/close';
import type BsModalHeaderTitle from './components/bs-modal/header/title';

interface BsModalRegistry {
  'bs-modal/header/close': typeof BsModalHeaderClose;
  'BsModal::Header::Close': typeof BsModalHeaderClose;
  'bs-modal/header/title': typeof BsModalHeaderTitle;
  'BsModal::Header::Title': typeof BsModalHeaderTitle;
}

export default interface EmberBootstrapRegistry extends BsModalRegistry {
  'bs-button': typeof BsButton;
  BsButton: typeof BsButton;
  'bs-collapse': typeof BsCollapse;
  BsCollapse: typeof BsCollapse;
  BsSpinner: typeof BsSpinner;
}
