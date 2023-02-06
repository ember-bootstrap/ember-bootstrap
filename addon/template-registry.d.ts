import type BsAccordion from './components/bs-accordion';
import type BsAlert from './components/bs-alert';
import type BsButton from './components/bs-button';
import type BsButtonGroup from './components/bs-button-group';
import type BsCarousel from './components/bs-carousel';
import type BsCollapse from './components/bs-collapse';
import type BsContextualHelp from './components/bs-contextual-help';
import type BsDropdown from './components/bs-dropdown';
import type BsForm from './components/bs-form';
import type BsLinkTo from './components/bs-link-to';
import type BsListGroup from './components/bs-list-group';
import type BsModal from './components/bs-modal';
import type BsModalSimple from './components/bs-modal-simple';
import type BsNav from './components/bs-nav';
import type BsNavbar from './components/bs-navbar';
import type BsPopover from './components/bs-popover';
import type BsProgress from './components/bs-progress';
import type BsSpinner from './components/bs-spinner';
import type BsTab from './components/bs-tab';
import type BsTooltip from './components/bs-tooltip';
import type BsAccordionItem from './components/bs-accordion/item';
import type BsAccordionItemBody from './components/bs-accordion/item/body';
import type BsAccordionItemTitle from './components/bs-accordion/item/title';
import type BsButtonGroupButton from './components/bs-button-group/button';
import type BsCarouselSlide from './components/bs-carousel/slide';
import type BsContextualHelpElement from './components/bs-contextual-help/element';
import type BsDropdownButton from './components/bs-dropdown/button';
import type BsDropdownMenu from './components/bs-dropdown/menu';
import type BsDropdownToggle from './components/bs-dropdown/toggle';
import type BsDropdownMenuDivider from './components/bs-dropdown/menu/divider';
import type BsDropdownMenuItem from './components/bs-dropdown/menu/item';
import type BsFormElement from './components/bs-form/element';
import type BsFormElementControl from './components/bs-form/element/control';
import type BsFormElementErrors from './components/bs-form/element/errors';
import type BsFormElementFeedbackIcon from './components/bs-form/element/feedback-icon';
import type BsFormElementHelpText from './components/bs-form/element/help-text';
import type BsFormElementLabel from './components/bs-form/element/label';
import type BsFormElementLegend from './components/bs-form/element/legend';
import type BsFormElementControlCheckbox from './components/bs-form/element/control/checkbox';
import type BsFormElementControlInput from './components/bs-form/element/control/input';
import type BsFormElementControlRadio from './components/bs-form/element/control/radio';
import type BsFormElementControlSwitch from './components/bs-form/element/control/switch';
import type BsFormElementControlTextarea from './components/bs-form/element/control/textarea';
import type BsFormElementLayoutHorizontal from './components/bs-form/element/layout/horizontal';
import type BsFormElementLayoutInline from './components/bs-form/element/layout/inline';
import type BsFormElementLayoutVertical from './components/bs-form/element/layout/vertical';
import type BsFormElementLayoutHorizontalCheckbox from './components/bs-form/element/layout/horizontal/checkbox';
import type BsFormElementLayoutInlineCheckbox from './components/bs-form/element/layout/inline/checkbox';
import type BsFormElementLayoutVerticalCheckbox from './components/bs-form/element/layout/vertical/checkbox';
import type BsListGroupItem from './components/bs-list-group/item';
import type BsModalBody from './components/bs-modal/body';
import type BsModalDialog from './components/bs-modal/dialog';
import type BsModalFooter from './components/bs-modal/footer';
import type BsModalHeader from './components/bs-modal/header';
import type BsModalHeaderClose from './components/bs-modal/header/close';
import type BsModalHeaderTitle from './components/bs-modal/header/title';
import type BsNavItem from './components/bs-nav/item';
import type BsNavbarContent from './components/bs-navbar/content';
import type BsNavbarLinkTo from './components/bs-navbar/link-to';
import type BsNavbarNav from './components/bs-navbar/nav';
import type BsNavbarToggle from './components/bs-navbar/toggle';
import type BsPopoverElement from './components/bs-popover/element';
import type BsProgressBar from './components/bs-progress/bar';
import type BsTabPane from './components/bs-tab/pane';
import type BsTooltipElement from './components/bs-tooltip/element';

export default interface EmberBootstrapRegistry {
  BsAccordion: typeof BsAccordion;
  'bs-accordion': typeof BsAccordion;
  'BsAccordion::Item': typeof BsAccordionItem;
  'bs-accordion/item': typeof BsAccordionItem;
  'BsAccordion::Item::Body': typeof BsAccordionItemBody;
  'bs-accordion/item/body': typeof BsAccordionItemBody;
  'BsAccordion::Item::Title': typeof BsAccordionItemTitle;
  'bs-accordion/item/title': typeof BsAccordionItemTitle;

  BsAlert: typeof BsAlert;
  'bs-alert': typeof BsAlert;
  BsButton: typeof BsButton;
  'bs-button': typeof BsButton;

  BsButtonGroup: typeof BsButtonGroup;
  'bs-button-group': typeof BsButtonGroup;
  'BsButtonGroup::Button': typeof BsButtonGroupButton;
  'bs-button-group/button': typeof BsButtonGroupButton;

  BsCarousel: typeof BsCarousel;
  'bs-carousel': typeof BsCarousel;
  'BsCarousel::Slide': typeof BsCarouselSlide;
  'bs-carousel/slide': typeof BsCarouselSlide;

  BsCollapse: typeof BsCollapse;
  'bs-collapse': typeof BsCollapse;

  BsContextualHelp: typeof BsContextualHelp;
  'bs-contextual-help': typeof BsContextualHelp;
  'BsContextualHelp::Element': typeof BsContextualHelpElement;
  'bs-contextual-help/element': typeof BsContextualHelpElement;

  BsDropdown: typeof BsDropdown;
  'bs-dropdown': typeof BsDropdown;
  'BsDropdown::Button': typeof BsDropdownButton;
  'bs-dropdown/button': typeof BsDropdownButton;
  'BsDropdown::Menu': typeof BsDropdownMenu;
  'bs-dropdown/menu': typeof BsDropdownMenu;
  'BsDropdown::Menu::Divider': typeof BsDropdownMenuDivider;
  'bs-dropdown/menu/divider': typeof BsDropdownMenuDivider;
  'BsDropdown::Menu::Item': typeof BsDropdownMenuItem;
  'bs-dropdown/menu/item': typeof BsDropdownMenuItem;
  'BsDropdown::Toggle': typeof BsDropdownToggle;
  'bs-dropdown/toggle': typeof BsDropdownToggle;

  BsForm: typeof BsForm;
  'bs-form': typeof BsForm;
  'BsForm::Element': typeof BsFormElement;
  'bs-form/element': typeof BsFormElement;
  'BsForm::Element::Control': typeof BsFormElementControl;
  'bs-form/element/control': typeof BsFormElementControl;
  'BsForm::Element::Errors': typeof BsFormElementErrors;
  'bs-form/element/errors': typeof BsFormElementErrors;
  'BsForm::Element::FeedbackIcon': typeof BsFormElementFeedbackIcon;
  'bs-form/element/feedback-icon': typeof BsFormElementFeedbackIcon;
  'BsForm::Element::HelpText': typeof BsFormElementHelpText;
  'bs-form/element/help-text': typeof BsFormElementHelpText;
  'BsForm::Element::Label': typeof BsFormElementLabel;
  'bs-form/element/label': typeof BsFormElementLabel;
  'BsForm::Element::Legend': typeof BsFormElementLegend;
  'bs-form/element/legend': typeof BsFormElementLegend;

  'BsForm::Element::Control::Checkbox': typeof BsFormElementControlCheckbox;
  'bs-form/element/control/checkbox': typeof BsFormElementControlCheckbox;
  'BsForm::Element::Control::Input': typeof BsFormElementControlInput;
  'bs-form/element/control/input': typeof BsFormElementControlInput;
  'BsForm::Element::Control::Radio': typeof BsFormElementControlRadio;
  'bs-form/element/control/radio': typeof BsFormElementControlRadio;
  'BsForm::Element::Control::Switch': typeof BsFormElementControlSwitch;
  'bs-form/element/control/switch': typeof BsFormElementControlSwitch;
  'BsForm::Element::Control::Textarea': typeof BsFormElementControlTextarea;
  'bs-form/element/control/textarea': typeof BsFormElementControlTextarea;

  'BsForm::Element::Layout::Horizontal': typeof BsFormElementLayoutHorizontal;
  'bs-form/element/layout/horizontal': typeof BsFormElementLayoutHorizontal;
  'BsForm::Element::Layout::Horizontal::Checkbox': typeof BsFormElementLayoutHorizontalCheckbox;
  'bs-form/element/layout/horizontal/checkbox': typeof BsFormElementLayoutHorizontalCheckbox;

  'BsForm::Element::Layout::Inline': typeof BsFormElementLayoutInline;
  'bs-form/element/layout/inline': typeof BsFormElementLayoutInline;
  'BsForm::Element::Layout::Inline::Checkbox': typeof BsFormElementLayoutInlineCheckbox;
  'bs-form/element/layout/inline/checkbox': typeof BsFormElementLayoutInlineCheckbox;

  'BsForm::Element::Layout::Vertical': typeof BsFormElementLayoutVertical;
  'bs-form/element/layout/vertical': typeof BsFormElementLayoutVertical;
  'BsForm::Element::Layout::Vertical::Checkbox': typeof BsFormElementLayoutVerticalCheckbox;
  'bs-form/element/layout/vertical/checkbox': typeof BsFormElementLayoutVerticalCheckbox;

  BsLinkTo: typeof BsLinkTo;
  'bs-link-to': typeof BsLinkTo;

  BsListGroup: typeof BsListGroup;
  'bs-list-group': typeof BsListGroup;
  'BsListGroup::Item': typeof BsListGroupItem;
  'bs-list-group/item': typeof BsListGroupItem;

  BsModal: typeof BsModal;
  'bs-modal': typeof BsModal;
  'BsModal::Body': typeof BsModalBody;
  'bs-modal/body': typeof BsModalBody;
  'BsModal::Dialog': typeof BsModalDialog;
  'bs-modal/dialog': typeof BsModalDialog;
  'BsModal::Footer': typeof BsModalFooter;
  'bs-modal/footer': typeof BsModalFooter;
  'BsModal::Header': typeof BsModalHeader;
  'bs-modal/header': typeof BsModalHeader;
  'BsModal::Header::Close': typeof BsModalHeaderClose;
  'bs-modal/header/close': typeof BsModalHeaderClose;
  'BsModal::Header::Title': typeof BsModalHeaderTitle;
  'bs-modal/header/title': typeof BsModalHeaderTitle;

  BsModalSimple: typeof BsModalSimple;
  'bs-modal-simple': typeof BsModalSimple;

  BsNav: typeof BsNav;
  'bs-nav': typeof BsNav;
  'BsNav::Item': typeof BsNavItem;
  'bs-nav/item': typeof BsNavItem;

  BsNavbar: typeof BsNavbar;
  'bs-navbar': typeof BsNavbar;
  'BsNavbar::Content': typeof BsNavbarContent;
  'bs-navbar/content': typeof BsNavbarContent;
  'BsNavbar::LinkTo': typeof BsNavbarLinkTo;
  'bs-navbar/link-to': typeof BsNavbarLinkTo;
  'BsNavbar::Nav': typeof BsNavbarNav;
  'bs-navbar/nav': typeof BsNavbarNav;
  'BsNavbar::Toggle': typeof BsNavbarToggle;
  'bs-navbar/toggle': typeof BsNavbarToggle;

  BsPopover: typeof BsPopover;
  'bs-popover': typeof BsPopover;
  'BsPopover::Element': typeof BsPopoverElement;
  'bs-popover/element': typeof BsPopoverElement;

  BsProgress: typeof BsProgress;
  'bs-progress': typeof BsProgress;
  'BsProgress::Bar': typeof BsProgressBar;
  'bs-progress/bar': typeof BsProgressBar;

  BsSpinner: typeof BsSpinner;
  'bs-spinner': typeof BsSpinner;

  BsTab: typeof BsTab;
  'bs-tab': typeof BsTab;
  'BsTab::Pane': typeof BsTabPane;
  'bs-tab/pane': typeof BsTabPane;

  BsTooltip: typeof BsTooltip;
  'bs-tooltip': typeof BsTooltip;
  'BsTooltip::Element': typeof BsTooltipElement;
  'bs-tooltip/element': typeof BsTooltipElement;
}
