import type BsAccordion from './components/bs-accordion.gts';
import type BsButton from './components/bs-button.gts';
import type BsCarousel from './components/bs-carousel.gts';
import type BsCollapse from './components/bs-collapse.gts';
import type BsModal from './components/bs-modal.gts';
import type BsSpinner from './components/bs-spinner.gts';

export default interface EmberBootstrapRegistry {
  BsAccordion: typeof BsAccordion;
  BsButton: typeof BsButton;
  BsCarousel: typeof BsCarousel;
  BsCollapse: typeof BsCollapse;
  BsSpinner: typeof BsSpinner;
  BsModal: typeof BsModal;
}
