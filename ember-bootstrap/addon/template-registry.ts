import type BsButton from './components/bs-button';
import type BsCollapse from './components/bs-collapse';
import type BsDropdownMenuDivider from './components/bs-dropdown/menu/divider';

export default interface EmberBootstrapRegistry {
  BsButton: typeof BsButton;
  BsCollapse: typeof BsCollapse;
  'BsDropdown::Menu::Divider': typeof BsDropdownMenuDivider;
  'bs-dropdown/menu/divider': typeof BsDropdownMenuDivider;
}
