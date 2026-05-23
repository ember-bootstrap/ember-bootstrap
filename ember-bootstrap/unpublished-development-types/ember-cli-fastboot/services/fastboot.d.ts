declare module 'ember-cli-fastboot/services/fastboot' {
  import Service from '@ember/service';

  export default class FastBootService extends Service {
    isFastBoot: boolean;
  }
}
