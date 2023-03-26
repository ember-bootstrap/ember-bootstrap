import Service from '@ember/service';
import { A } from '@ember/array';
import Component from '../models/component';

const componentData = A([
  {
    id: 'accordion',
    title: 'Accordion',
    description: 'Toggle the display of content sections.',
    bsUrl:
      'https://getbootstrap.com/docs/4.3/components/collapse/#accordion-example',
  },
  {
    id: 'alert',
    title: 'Alert',
    description:
      'Provide contextual feedback messages for typical user actions with the handful of available and flexible alert messages.',
    bsUrl: 'https://getbootstrap.com/docs/4.3/components/alerts/',
  },
  {
    id: 'button',
    title: 'Button',
    description: 'Add styling and advanced functionality to your buttons.',
    bsUrl: 'https://getbootstrap.com/docs/4.3/components/buttons/',
  },
  {
    id: 'button-group',
    title: 'Button Group',
    className: 'ButtonGroup',
    description:
      'Group a series of buttons together on a single line with the button group, with radio and checkbox style behavior.',
    bsUrl: 'https://getbootstrap.com/docs/4.3/components/button-group/',
  },
  {
    id: 'carousel',
    title: 'Carousel',
    description: 'A slideshow component for cycling through elements.',
    bsUrl: 'https://getbootstrap.com/docs/4.3/components/carousel/',
  },
  {
    id: 'collapse',
    title: 'Collapse',
    description: 'Easily hide and reveal additional content.',
    bsUrl: 'https://getbootstrap.com/docs/4.3/components/collapse/',
  },
  {
    id: 'dropdown',
    title: 'Dropdown',
    description: 'Toggleable, contextual menu for displaying lists of links.',
    bsUrl: 'https://getbootstrap.com/docs/4.3/components/dropdowns/',
  },
  {
    id: 'forms',
    title: 'Form',
    description:
      'Advanced forms with support for easy markup generation and validation.',
    bsUrl: 'https://getbootstrap.com/docs/4.3/components/forms/',
  },
  {
    id: 'list-group',
    title: 'List Group',
    className: 'ListGroup',
    description:
      'List groups are a flexible and powerful component for displaying a series of content. Modify and extend them to support just about any content within.',
    bsUrl: 'https://getbootstrap.com/docs/5.2/components/list-group/',
  },
  {
    id: 'modal',
    title: 'Modal',
    description:
      'Modals are streamlined, but flexible, dialog prompts with the minimum required functionality and smart defaults.',
    bsUrl: 'https://getbootstrap.com/docs/4.3/components/modal/',
  },
  {
    id: 'navbars',
    title: 'Navbar',
    description:
      'Navbars are responsive meta components that serve as navigation headers for your application or site. They begin collapsed (and are toggleable) in mobile views and become horizontal as the available viewport width increases.',
    bsUrl: 'https://getbootstrap.com/docs/4.3/components/navbar/',
  },
  {
    id: 'navs',
    title: 'Nav',
    description: 'Navigation components with default pills and tabs styles.',
    bsUrl: 'https://getbootstrap.com/docs/4.3/components/navs/',
  },
  {
    id: 'popover',
    title: 'Popover',
    description:
      'Add small overlays of content, like those on the iPad, to any element for housing secondary information.',
    bsUrl: 'https://getbootstrap.com/docs/4.3/components/popovers/',
  },
  {
    id: 'progress',
    title: 'Progress',
    description:
      'Provide up-to-date feedback on the progress of a workflow or action with simple yet flexible progress bars.',
    bsUrl: 'https://getbootstrap.com/docs/4.3/components/progress/',
  },
  {
    id: 'spinner',
    title: 'Spinner',
    description:
      'Bootstrap “spinners” can be used to show the loading state in your projects.',
    bsUrl: 'https://getbootstrap.com/docs/4.6/components/spinners/',
  },
  {
    id: 'tabs',
    title: 'Tabs',
    className: 'Tab',
    description:
      'Add quick, dynamic tab functionality to transition through panes of local content, even via dropdown menus.',
    bsUrl: 'https://getbootstrap.com/docs/4.3/components/navs/#tabs',
  },
  {
    id: 'tooltip',
    title: 'Tooltip',
    description: 'Add contextual information to any element.',
    bsUrl: 'https://getbootstrap.com/docs/4.3/components/tooltips/',
  },
]);

const components = A(componentData.map((data) => Component.create(data)));

export default Service.extend({
  models: components,

  findAll() {
    return components;
  },

  find(id) {
    return components.findBy('id', id);
  },
});
