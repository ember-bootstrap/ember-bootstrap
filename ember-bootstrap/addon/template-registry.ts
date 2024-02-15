import type BsButton from './components/bs-button';
import type BsCollapse from './components/bs-collapse';

export default interface EmberBootstrapRegistry {
  BsButton: typeof BsButton;
  BsCollapse: typeof BsCollapse;
}
