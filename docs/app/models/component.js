import config from 'ember-bootstrap-docs/config/environment';

export default class Component {
  id = null;
  title = null;
  description = null;
  className = null;
  bsUrl = null;

  get apiUrl() {
    let { className } = this;
    return `${config.rootURL}api/classes/Components.${className}.html`;
  }

  get demoRoute() {
    return `demo.${this.id}`;
  }

  get templateName() {
    return `Bs${this.className}`;
  }

  constructor({ id, title, description, bsUrl, className }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.className = className ?? title;
    this.bsUrl = bsUrl;
  }
}
