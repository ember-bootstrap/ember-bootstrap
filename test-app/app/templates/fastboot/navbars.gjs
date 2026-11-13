import RouteTemplate from 'ember-route-template';
import { LinkTo } from '@ember/routing';
import BsNavbar from 'ember-bootstrap/components/bs-navbar';

export default RouteTemplate(
  <template>
    <BsNavbar as |navbar|>
      <div class='navbar-header'>
        {{navbar.toggle}}
        <LinkTo @route='index' class='navbar-brand'>Brand</LinkTo>
      </div>
      <navbar.content>
        <navbar.nav as |nav|>
          <nav.item>
            <nav.link-to @route='index'>Home</nav.link-to>
          </nav.item>
          <nav.item>
            <nav.link-to @route='fastboot.navbars'>Navbars</nav.link-to>
          </nav.item>
          <nav.dropdown as |dd|>
            <dd.toggle>Dropdown <span class='caret'></span></dd.toggle>
            <dd.menu as |ddm|>
              <ddm.item>
                <ddm.link-to @route='index'>Home</ddm.link-to>
              </ddm.item>
              <ddm.item>
                <ddm.link-to @route='fastboot.navbars'>Navbars</ddm.link-to>
              </ddm.item>
            </dd.menu>
          </nav.dropdown>
        </navbar.nav>
      </navbar.content>
    </BsNavbar>
  </template>,
);
