import type BsButton from './components/bs-button';
import type BsCollapse from './components/bs-collapse';
import type BsDropdownMenuDivider from './components/bs-dropdown/menu/divider';
import type BsDropdownMenuItem from './components/bs-dropdown/menu/item';
import type BsDropdownToggle from './components/bs-dropdown/toggle';
import type BsSpinner from './components/bs-spinner';

export default interface EmberBootstrapRegistry {
  BsButton: typeof BsButton;
  BsCollapse: typeof BsCollapse;
  'BsDropdown::Menu::Divider': typeof BsDropdownMenuDivider;
  'bs-dropdown/menu/divider': typeof BsDropdownMenuDivider;
  'BsDropdown::Menu::Item': typeof BsDropdownMenuItem;
  'bs-dropdown/menu/item': typeof BsDropdownMenuItem;
  'BsDropdown::Toggle': typeof BsDropdownToggle;
  'bs-dropdown/toggle': typeof BsDropdownToggle;
  BsSpinner: typeof BsSpinner;
}
