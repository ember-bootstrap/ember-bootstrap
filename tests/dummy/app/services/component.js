import Ember from 'ember';
import Component from '../models/component';

const { A } = Ember;

const componentData = A([
  {
    id: 'accordion',
    title: 'Accordion',
    description: 'Toggle the display of content sections.',
    bsUrl: 'http://getbootstrap.com/javascript/#collapse-example-accordion'
  },
  {
    id: 'alert',
    title: 'Alert',
    description: 'Provide contextual feedback messages for typical user actions with the handful of available and flexible alert messages.',
    bsUrl: 'http://getbootstrap.com/components/#alerts'
  },
  {
    id: 'button',
    title: 'Button',
    description: 'Add styling and advanced functionality to your buttons.',
    bsUrl: 'http://getbootstrap.com/css/#buttons'
  },
  {
    id: 'button-group',
    title: 'Button Group',
    description: 'Group a series of buttons together on a single line with the button group, with radio and checkbox style behavior.',
    bsUrl: 'http://getbootstrap.com/components/#btn-groups'
  },
  {
    id: 'collapse',
    title: 'Collapse',
    description: 'Easily hide and reveal additional content.',
    bsUrl: 'http://getbootstrap.com/javascript/#collapse'
  },
  {
    id: 'dropdown',
    title: 'Dropdown',
    description: 'Toggleable, contextual menu for displaying lists of links.',
    bsUrl: 'http://getbootstrap.com/components/#dropdowns'
  },
  {
    id: 'forms',
    title: 'Form',
    description: 'Advanced forms with support for easy markup generation and validation.',
    bsUrl: 'http://getbootstrap.com/css/#forms'
  },
  {
    id: 'modal',
    title: 'Modal',
    description: 'Modals are streamlined, but flexible, dialog prompts with the minimum required functionality and smart defaults.',
    bsUrl: 'http://getbootstrap.com/javascript/#modals'
  },
  {
    id: 'navbars',
    title: 'Navbar',
    description: 'Navbars are responsive meta components that serve as navigation headers for your application or site. They begin collapsed (and are toggleable) in mobile views and become horizontal as the available viewport width increases.',
    bsUrl: 'http://getbootstrap.com/components/#navbar'
  },
  {
    id: 'navs',
    title: 'Nav',
    description: 'Navigation components with default pills and tabs styles.',
    bsUrl: 'http://getbootstrap.com/components/#nav'
  },
  {
    id: 'popover',
    title: 'Popover',
    description: 'Add small overlays of content, like those on the iPad, to any element for housing secondary information.',
    bsUrl: 'http://getbootstrap.com/javascript/#popovers'
  },
  {
    id: 'progress',
    title: 'Progress',
    description: 'Provide up-to-date feedback on the progress of a workflow or action with simple yet flexible progress bars.',
    bsUrl: 'http://getbootstrap.com/components/#progress'
  },
  {
    id: 'tabs',
    title: 'Tabs',
    description: 'Add quick, dynamic tab functionality to transition through panes of local content, even via dropdown menus.',
    bsUrl: 'http://getbootstrap.com/javascript/#tabs'
  },
  {
    id: 'tooltip',
    title: 'Tooltip',
    description: 'Add contextual information to any element.',
    bsUrl: 'http://getbootstrap.com/javascript/#tooltips'
  }
]);

const components = A(componentData.map((data) => Component.create(data)));

export default Ember.Service.extend({

  models: components,

  findAll() {
    return components;
  },

  find(id) {
    return components
      .findBy('id', id);
  }
});
