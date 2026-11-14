import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class ChangelogRoute extends Route {
  @service fastboot;

  async model() {
    let url = '/CHANGELOG.md';

    // Node's fetch does not support relative URLs. Resolve against the
    // origin of the current request when running in FastBoot (prember).
    if (this.fastboot.isFastBoot) {
      let { protocol, host } = this.fastboot.request;
      url = `${protocol}//${host}${url}`;
    }

    let response = await fetch(url);
    return response.text();
  }
}
