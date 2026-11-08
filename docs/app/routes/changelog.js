import Route from '@ember/routing/route';

export default class ChangelogRoute extends Route {
  async model() {
    let response = await fetch('/CHANGELOG.md');
    return response.text();
  }
}
