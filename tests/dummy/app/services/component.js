import Ember from 'ember';
import Component from '../models/component';

const { A } = Ember;

const componentData = A([
  {
    id: 'accordion',
    title: 'Accordion',
    bsUrl: 'http://getbootstrap.com/javascript/#collapse-example-accordion'
  },
  {
    id: 'alert',
    title: 'Alert',
    bsUrl: 'http://getbootstrap.com/components/#alerts'
  },
  {
    id: 'button',
    title: 'Button',
    bsUrl: 'http://getbootstrap.com/css/#buttons'
  },
  {
    id: 'button-group',
    title: 'Button Group',
    bsUrl: 'http://getbootstrap.com/components/#btn-groups'
  },
  {
    id: 'collapse',
    title: 'Collapse',
    bsUrl: 'http://getbootstrap.com/javascript/#collapse'
  },
  {
    id: 'dropdown',
    title: 'Dropdown',
    bsUrl: 'http://getbootstrap.com/components/#dropdowns'
  },
  {
    id: 'forms',
    title: 'Form',
    bsUrl: 'http://getbootstrap.com/css/#forms'
  },
  {
    id: 'modal',
    title: 'Modal',
    bsUrl: 'http://getbootstrap.com/javascript/#modals'
  },
  {
    id: 'navbars',
    title: 'Navbar',
    bsUrl: 'http://getbootstrap.com/components/#navbar'
  },
  {
    id: 'navs',
    title: 'Nav',
    bsUrl: 'http://getbootstrap.com/components/#nav'
  },
  {
    id: 'popover',
    title: 'Popover',
    bsUrl: 'http://getbootstrap.com/javascript/#popovers'
  },
  {
    id: 'progress',
    title: 'Progress',
    bsUrl: 'http://getbootstrap.com/components/#progress'
  },
  {
    id: 'tabs',
    title: 'Tabs',
    bsUrl: 'http://getbootstrap.com/javascript/#tabs'
  },
  {
    id: 'tooltip',
    title: 'Tooltip',
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
