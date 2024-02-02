import Route from '@ember/routing/route';
import fetch from 'fetch';

export default class ChangelogRoute extends Route {
  async model() {
    let response = await fetch('/CHANGELOG.md');
    return response.text();
  }
}
