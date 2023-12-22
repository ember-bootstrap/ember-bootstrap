import Route from '@ember/routing/route';

export default class extends Route {
  model({ model }) {
    return model;
  }
}
