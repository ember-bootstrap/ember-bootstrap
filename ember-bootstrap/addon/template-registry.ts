import type BsAccordion from './components/bs-accordion';
import type BsButton from './components/bs-button';
import type BsCarousel from 'ember-bootstrap/components/bs-carousel';
import type BsCollapse from './components/bs-collapse';
import type BsModal from './components/bs-modal';
import type BsSpinner from './components/bs-spinner';

export default interface EmberBootstrapRegistry {
  BsAccordion: typeof BsAccordion;
  BsButton: typeof BsButton;
  BsCarousel: typeof BsCarousel;
  BsCollapse: typeof BsCollapse;
  BsSpinner: typeof BsSpinner;
  BsModal: typeof BsModal;
}
