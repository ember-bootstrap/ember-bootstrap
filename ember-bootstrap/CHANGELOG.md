

















## v6.3.1 (2024-04-16)

#### :bug: Bug Fix
* [#2123](https://github.com/ember-bootstrap/ember-bootstrap/pull/2123) Add @ to `onClick` in BsModal::Footer submit button ([@SanderKnauff](https://github.com/SanderKnauff))
* [#2110](https://github.com/ember-bootstrap/ember-bootstrap/pull/2110) Dropdown should not add .btn-group class ([@jelhan](https://github.com/jelhan))
* [#2120](https://github.com/ember-bootstrap/ember-bootstrap/pull/2120) Fix alignment of dropdown menus when using Bootstrap 5 ([@SanderKnauff](https://github.com/SanderKnauff))

#### :house: Internal
* [#2111](https://github.com/ember-bootstrap/ember-bootstrap/pull/2111) Extend `<BsButton>` component by invoking it in template rather than extending JS class ([@jelhan](https://github.com/jelhan))
* [#2122](https://github.com/ember-bootstrap/ember-bootstrap/pull/2122) Modernize hbs import in tests ([@jelhan](https://github.com/jelhan))
* [#2114](https://github.com/ember-bootstrap/ember-bootstrap/pull/2114) Refactor tests for dropdown menu ([@jelhan](https://github.com/jelhan))

#### Committers: 2
- Jeldrik Hanschke ([@jelhan](https://github.com/jelhan))
- Sander Knauff ([@SanderKnauff](https://github.com/SanderKnauff))


## v6.3.0 (2024-04-04)

This release fixes a wrong placement of tooltips if using Bootstrap >= 5.3. The fixes causes a slightly to high padding of tooltips if using Bootstrap < 5.3. It is recommended to upgrade Bootstrap to >= 5.3 at the same time.

#### :rocket: Enhancement
* [#2108](https://github.com/ember-bootstrap/ember-bootstrap/pull/2108) Convert BsSpinner to TypeScript ([@Baltazore](https://github.com/Baltazore))

#### :bug: Bug Fix
* [#2119](https://github.com/ember-bootstrap/ember-bootstrap/pull/2119) Fix tooltip offset when using Bootstrap >= 5.3 ([@SanderKnauff](https://github.com/SanderKnauff))

#### :house: Internal
* [#2113](https://github.com/ember-bootstrap/ember-bootstrap/pull/2113) Drop unused argument @ariaRole from <BsDropdown::Menu> ([@jelhan](https://github.com/jelhan))

#### Committers: 3
- Jeldrik Hanschke ([@jelhan](https://github.com/jelhan))
- Kirill Shaplyko ([@Baltazore](https://github.com/Baltazore))
- Sander Knauff ([@SanderKnauff](https://github.com/SanderKnauff))


## v6.2.0 (2024-02-17)

We started converting Ember Bootstrap to TypeScript and shipping types for Glint. The types are work in progress. They are neither complete nor considered stable.
Nevertheless, we appreiate early adopters testing them out and providing feedback. A template registry for Glint can be imported from `ember-bootstrap/template-registry`.
The template registry currently covers `<BsButton>`, `<BsCollapse>`, and `<BsLinkTo>`.

Help converting the remaining components to TypeScript and publishing types for them is highly appreciated. Please find details in the
[TypeScript tracking issue](https://github.com/ember-bootstrap/ember-bootstrap/issues/2053) on GitHub and feel free reaching out to us in `#e-bootstrap` channel on
Ember Discord.

Additionally, we welcome [@SanderKnauff](https://github.com/SanderKnauff) as a new maintainer of Ember Bootstrap.

#### :rocket: Enhancement
* [#2091](https://github.com/ember-bootstrap/ember-bootstrap/pull/2091) Deprecate `importBootstrapCSS`, remove `importBootstrapTheme` and `importBootstrapFont` ([@SanderKnauff](https://github.com/SanderKnauff))
* [#2099](https://github.com/ember-bootstrap/ember-bootstrap/pull/2099) Convert BsLinkTo to TypeScript ([@jelhan](https://github.com/jelhan))
* [#2095](https://github.com/ember-bootstrap/ember-bootstrap/pull/2095) Convert BsCollapse to TypeScript ([@jelhan](https://github.com/jelhan))
* [#2093](https://github.com/ember-bootstrap/ember-bootstrap/pull/2093) Convert BsButton to TypeScript ([@simonihmig](https://github.com/simonihmig))
* [#2083](https://github.com/ember-bootstrap/ember-bootstrap/pull/2083) Deprecate inserting wormhole target ([@SanderKnauff](https://github.com/SanderKnauff))
* [#2068](https://github.com/ember-bootstrap/ember-bootstrap/pull/2068) Support ember-style-modifier v4 ([@jelhan](https://github.com/jelhan))
* [#2065](https://github.com/ember-bootstrap/ember-bootstrap/pull/2065) Clean-up unused custom CSS ([@jelhan](https://github.com/jelhan))
* [#2055](https://github.com/ember-bootstrap/ember-bootstrap/pull/2055) Drop RSVP dependency ([@SanderKnauff](https://github.com/SanderKnauff))
* [#2052](https://github.com/ember-bootstrap/ember-bootstrap/pull/2052) Remove unused dependency on ember-decorators ([@jelhan](https://github.com/jelhan))
* [#2049](https://github.com/ember-bootstrap/ember-bootstrap/pull/2049) Drop component subclassing deprecation ([@SanderKnauff](https://github.com/SanderKnauff))

#### :bug: Bug Fix
* [#2100](https://github.com/ember-bootstrap/ember-bootstrap/pull/2100) Fix click events inside `bs-dropdown`s not activating ([@SanderKnauff](https://github.com/SanderKnauff))
* [#2077](https://github.com/ember-bootstrap/ember-bootstrap/pull/2077) Fix several issues with BsCarousel component ([@SanderKnauff](https://github.com/SanderKnauff))
* [#2048](https://github.com/ember-bootstrap/ember-bootstrap/pull/2048) Add bs-collapse to the include list of bs-navbar ([@SanderKnauff](https://github.com/SanderKnauff))

#### :memo: Documentation
* [#2083](https://github.com/ember-bootstrap/ember-bootstrap/pull/2083) Deprecate inserting wormhole target ([@SanderKnauff](https://github.com/SanderKnauff))
* [#2050](https://github.com/ember-bootstrap/ember-bootstrap/pull/2050) Remove browserstack from README.md ([@SanderKnauff](https://github.com/SanderKnauff))

#### :house: Internal
* [#2094](https://github.com/ember-bootstrap/ember-bootstrap/pull/2094) Resolve remaining lint warnings in docs app ([@SanderKnauff](https://github.com/SanderKnauff))
* [#2097](https://github.com/ember-bootstrap/ember-bootstrap/pull/2097) Run Safari tests after basic tests ([@simonihmig](https://github.com/simonihmig))
* [#2096](https://github.com/ember-bootstrap/ember-bootstrap/pull/2096) Add initial typescript configuration to test-app project ([@SanderKnauff](https://github.com/SanderKnauff))
* [#2092](https://github.com/ember-bootstrap/ember-bootstrap/pull/2092) Add initial typescript configuration to addon project ([@SanderKnauff](https://github.com/SanderKnauff))
* [#2073](https://github.com/ember-bootstrap/ember-bootstrap/pull/2073) Convert to monorepo ([@SanderKnauff](https://github.com/SanderKnauff))
* [#2062](https://github.com/ember-bootstrap/ember-bootstrap/pull/2062) Resolve ESLint warnings in test app ([@SanderKnauff](https://github.com/SanderKnauff))
* [#2061](https://github.com/ember-bootstrap/ember-bootstrap/pull/2061) Add @sanderknauff as maintainer ([@SanderKnauff](https://github.com/SanderKnauff))
* [#2054](https://github.com/ember-bootstrap/ember-bootstrap/pull/2054) Use @cached decorator from @glimmer/tracking rather than 3rd party library ([@jelhan](https://github.com/jelhan))

#### Committers: 3
- Jeldrik Hanschke ([@jelhan](https://github.com/jelhan))
- Sander Knauff ([@SanderKnauff](https://github.com/SanderKnauff))
- Simon Ihmig ([@simonihmig](https://github.com/simonihmig))


## v6.1.0 (2023-12-20)

This is primarily a maintenance release modernizing the code. It refactors remaining components to `@glimmer/component`,
drops remaining observers, and refactors away from remaining computed properties usage. Thanks a lot to [@SanderKnauff](https://github.com/SanderKnauff)
for doing most of the hard work.

Additionally it includes a bug fix for using a dropdown within a navbar on small screen sizes.

#### Features
* [#2038](https://github.com/ember-bootstrap/ember-bootstrap/pull/2038) Refactor bs-carousel and related components to Glimmer components ([@SanderKnauff](https://github.com/SanderKnauff))
* [#2034](https://github.com/ember-bootstrap/ember-bootstrap/pull/2034) Refactor bs-tab and related components to Glimmer component ([@SanderKnauff](https://github.com/SanderKnauff))
* [#2031](https://github.com/ember-bootstrap/ember-bootstrap/pull/2031) Refactor bs-dropdown and related components to Glimmer component ([@SanderKnauff](https://github.com/SanderKnauff))
* [#2030](https://github.com/ember-bootstrap/ember-bootstrap/pull/2030) Refactor bs-progress and bs-progress/bar to Glimmer components ([@SanderKnauff](https://github.com/SanderKnauff))
* [#2025](https://github.com/ember-bootstrap/ember-bootstrap/pull/2025) Refactor BsNavbar, BsNavbar::Content and BSNavbar::Toggle to Glimmer components ([@SanderKnauff](https://github.com/SanderKnauff))
* [#2020](https://github.com/ember-bootstrap/ember-bootstrap/pull/2020) Refactor BsNav to Glimmer component ([@SanderKnauff](https://github.com/SanderKnauff))

#### Bug Fixes
* [#2040](https://github.com/ember-bootstrap/ember-bootstrap/pull/2040) Drop .active and .disabled CSS classes from .nav-item only expected for BS3 ([@SanderKnauff](https://github.com/SanderKnauff))
* [#1946](https://github.com/ember-bootstrap/ember-bootstrap/pull/1946) bs-dropdown dynamic positioning should not be used when in a navbar ([@craigteegarden](https://github.com/craigteegarden))
* [#2027](https://github.com/ember-bootstrap/ember-bootstrap/pull/2027) Refactor bs-alert to remove @localCopy and avoid mutation after consumption error in Ember canary ([@SanderKnauff](https://github.com/SanderKnauff))

#### Internal
* [#2041](https://github.com/ember-bootstrap/ember-bootstrap/pull/2041) Run tests on Safari in CI (again) ([@SanderKnauff](https://github.com/SanderKnauff))
* [#2047](https://github.com/ember-bootstrap/ember-bootstrap/pull/2047) remove unused mixins for component parent <-> child relationship ([@jelhan](https://github.com/jelhan))
* [#2044](https://github.com/ember-bootstrap/ember-bootstrap/pull/2044) remove unused computed property utils ([@jelhan](https://github.com/jelhan))
* [#2042](https://github.com/ember-bootstrap/ember-bootstrap/pull/2042) refactor from computed property to glimmer tracking caching ([@jelhan](https://github.com/jelhan))
* [#2028](https://github.com/ember-bootstrap/ember-bootstrap/pull/2028) Migrate project to pnpm ([@SanderKnauff](https://github.com/SanderKnauff))

#### Committers: 3
- Craig Teegarden ([@craigteegarden](https://github.com/craigteegarden))
- Jeldrik Hanschke ([@jelhan](https://github.com/jelhan))
- Sander Knauff ([@SanderKnauff](https://github.com/SanderKnauff))


## v6.0.1 (2023-11-12)

#### Documentation
* [#2018](https://github.com/ember-bootstrap/ember-bootstrap/pull/2018) fix broken readme due to merge conflicts ([@jelhan](https://github.com/jelhan))

#### Committers: 1
- Jeldrik Hanschke ([@jelhan](https://github.com/jelhan))

## v6.0.0 (2023-11-12)

#### :boom: Breaking Change
* [#2008](https://github.com/ember-bootstrap/ember-bootstrap/pull/2008) drop support for Ember classic (optional features) ([@jelhan](https://github.com/jelhan))
* [#1996](https://github.com/ember-bootstrap/ember-bootstrap/pull/1996) drop support for Ember < 4.8 ([@jelhan](https://github.com/jelhan))

#### Features
* [#2011](https://github.com/ember-bootstrap/ember-bootstrap/pull/2011) ember-unique-id-helper-polyfill is not needed anymove ([@jelhan](https://github.com/jelhan))
* [#2001](https://github.com/ember-bootstrap/ember-bootstrap/pull/2001) improve wording of error message for removed whitelist / blacklist option ([@jelhan](https://github.com/jelhan))

#### Bug Fixes
* [#1997](https://github.com/ember-bootstrap/ember-bootstrap/pull/1997) do not require Bootstrap dep unless importing it through this addon ([@jelhan](https://github.com/jelhan))

#### Documentation
* [#2016](https://github.com/ember-bootstrap/ember-bootstrap/pull/2016) Fix outdated repository URLs in package.json ([@jelhan](https://github.com/jelhan))

#### Internal
* [#2017](https://github.com/ember-bootstrap/ember-bootstrap/pull/2017) Drop dependency resolution overwrite not needed anymore ([@jelhan](https://github.com/jelhan))
* [#2015](https://github.com/ember-bootstrap/ember-bootstrap/pull/2015) migrate to actievely maintained lerna-changelog release-it plugin ([@jelhan](https://github.com/jelhan))
* [#2010](https://github.com/ember-bootstrap/ember-bootstrap/pull/2010) upgrade addon with Ember CLI v4.12 blueprints ([@jelhan](https://github.com/jelhan))
* [#2009](https://github.com/ember-bootstrap/ember-bootstrap/pull/2009) upgrade docs app with Ember CLI 4.12 blueprints ([@jelhan](https://github.com/jelhan))
* [#2003](https://github.com/ember-bootstrap/ember-bootstrap/pull/2003) upgrade docs app to Ember 4.12 ([@jelhan](https://github.com/jelhan))
* [#2004](https://github.com/ember-bootstrap/ember-bootstrap/pull/2004) use Prettier for Glimmer templates ([@jelhan](https://github.com/jelhan))

#### Committers: 1
- Jeldrik Hanschke ([@jelhan](https://github.com/jelhan))


## v6.0.0-6 (2023-11-06)

Fixes deployment of docs only.


## v6.0.0-5 (2023-11-06)

Fixes deployment of docs only.


## v6.0.0-4 (2023-11-06)

Fixes deployment of docs only.


## v6.0.0-3 (2023-11-06)

#### :boom: Breaking Change
* [#1961](https://github.com/ember-bootstrap/ember-bootstrap/pull/1961) drop support for node 16 ([@jelhan](https://github.com/jelhan))
* [#1935](https://github.com/ember-bootstrap/ember-bootstrap/pull/1935) Replace blacklist/whitelist with include/exclude in config (Closes [#1154](https://github.com/kaliber5/ember-bootstrap/issues/1154)) ([@seanCodes](https://github.com/seanCodes))
* [#1929](https://github.com/ember-bootstrap/ember-bootstrap/pull/1929) Drop node 14 support ([@simonihmig](https://github.com/simonihmig))
* [#1913](https://github.com/ember-bootstrap/ember-bootstrap/pull/1913) remove buttonType argument of <BsButton> ([@jelhan](https://github.com/jelhan))

#### Features
* [#1950](https://github.com/ember-bootstrap/ember-bootstrap/pull/1950) Support ember-element-helper v0.7.0 and v0.8.0 ([@SaumyaBhushan](https://github.com/SaumyaBhushan))
* [#1958](https://github.com/ember-bootstrap/ember-bootstrap/pull/1958) support ember-popper-modifier v4 ([@jelhan](https://github.com/jelhan))
* [#1952](https://github.com/ember-bootstrap/ember-bootstrap/pull/1952) support ember-concurrency v3 ([@jelhan](https://github.com/jelhan))
* [#1919](https://github.com/ember-bootstrap/ember-bootstrap/pull/1919) Allow multiple custom grid classes in horizontal layout ([@dagroe](https://github.com/dagroe))
* [#1811](https://github.com/ember-bootstrap/ember-bootstrap/pull/1811) Yield form's model from <BsForm> ([@bvedad](https://github.com/bvedad))

#### Bug Fixes
* [#1911](https://github.com/ember-bootstrap/ember-bootstrap/pull/1911) Fix submitOnEnter when multiple input elements are present ([@jelhan](https://github.com/jelhan))

#### Documentation
* [#1962](https://github.com/ember-bootstrap/ember-bootstrap/pull/1962) clean-up leftovers from removed @buttonType argument of BsButton ([@jelhan](https://github.com/jelhan))

#### Internal
* [#1956](https://github.com/ember-bootstrap/ember-bootstrap/pull/1956) fix failing tests in CI due to change in recent Bootstrap version ([@jelhan](https://github.com/jelhan))
* [#1909](https://github.com/ember-bootstrap/ember-bootstrap/pull/1909) Disable fastboot tests for ember canary ([@jelhan](https://github.com/jelhan))
* [#1908](https://github.com/ember-bootstrap/ember-bootstrap/pull/1908) remove ember-export-application-global dev dependency ([@jelhan](https://github.com/jelhan))

#### Committers: 6
- Daniel Gröger ([@dagroe](https://github.com/dagroe))
- Jeldrik Hanschke ([@jelhan](https://github.com/jelhan))
- Saumya ([@SaumyaBhushan](https://github.com/SaumyaBhushan))
- Sean Juarez ([@seanCodes](https://github.com/seanCodes))
- Simon Ihmig ([@simonihmig](https://github.com/simonihmig))
- Vedad Burgic ([@bvedad](https://github.com/bvedad))

## v6.0.0-2 (2023-03-15)

#### :boom: Breaking Change
* [#1870](https://github.com/ember-bootstrap/ember-bootstrap/pull/1870) move @glimmer/component and @glimmer/tracking to peer dependencies ([@jelhan](https://github.com/jelhan))

#### Features
* [#1895](https://github.com/ember-bootstrap/ember-bootstrap/pull/1895) support tracked-toolbox v2 ([@jelhan](https://github.com/jelhan))

#### Bug Fixes
* [#1867](https://github.com/ember-bootstrap/ember-bootstrap/pull/1867) fix: correct dropdown direction class for BS5 ([@silhusk](https://github.com/silhusk))

#### Documentation
* [#1874](https://github.com/ember-bootstrap/ember-bootstrap/pull/1874) remove usage of outdated component name at demo page for BsDropdown ([@Sheikh-JamirAlam](https://github.com/Sheikh-JamirAlam))

#### Internal
* [#1901](https://github.com/ember-bootstrap/ember-bootstrap/pull/1901) should not run ember test for node-tests scenario ([@jelhan](https://github.com/jelhan))
* [#1878](https://github.com/ember-bootstrap/ember-bootstrap/pull/1878) add basic test coverage for docs app ([@jelhan](https://github.com/jelhan))
* [#1879](https://github.com/ember-bootstrap/ember-bootstrap/pull/1879) run tests against all supported Ember LTS versions in CI ([@jelhan](https://github.com/jelhan))

#### Committers: 3
- Jeldrik Hanschke ([@jelhan](https://github.com/jelhan))
- Sheikh Jamir Alam ([@Sheikh-JamirAlam](https://github.com/Sheikh-JamirAlam))
- [@silhusk](https://github.com/silhusk)

## v6.0.0-1 (2023-01-19)

#### Features
* [#1854](https://github.com/ember-bootstrap/ember-bootstrap/pull/1854) Drop polyfills not needed anymore ([@jelhan](https://github.com/jelhan))

#### Bug Fixes
* [#1856](https://github.com/ember-bootstrap/ember-bootstrap/pull/1856) polyfill for unique-id helper is required to support Ember < 4.4 ([@jelhan](https://github.com/jelhan))

#### Committers: 1
- Jeldrik Hanschke ([@jelhan](https://github.com/jelhan))

## v6.0.0-0 (2023-01-19)

#### :boom: Breaking Change
* [#1844](https://github.com/ember-bootstrap/ember-bootstrap/pull/1844) fix HTML markup for <BsAccordion> per Bootstrap docs ([@jelhan](https://github.com/jelhan))
* [#1839](https://github.com/ember-bootstrap/ember-bootstrap/pull/1839) drop support for Ember 3.24 ([@jelhan](https://github.com/jelhan))
* [#1838](https://github.com/ember-bootstrap/ember-bootstrap/pull/1838) drop support for node 12 and 17 ([@jelhan](https://github.com/jelhan))

#### Features
* [#1812](https://github.com/ember-bootstrap/ember-bootstrap/pull/1812) control programmatically if validation errors should be shown ([@dagroe](https://github.com/dagroe))
* [#1852](https://github.com/ember-bootstrap/ember-bootstrap/pull/1852) support ember-popper-modifier v3 ([@jelhan](https://github.com/jelhan))
* [#1841](https://github.com/ember-bootstrap/ember-bootstrap/pull/1841) support ember-ref-bucket v5 ([@jelhan](https://github.com/jelhan))
* [#1826](https://github.com/ember-bootstrap/ember-bootstrap/pull/1826) support ember-style-modifier v1, v2 and v3 ([@jelhan](https://github.com/jelhan))
* [#1853](https://github.com/ember-bootstrap/ember-bootstrap/pull/1853) support ember-modifier v4 ([@jelhan](https://github.com/jelhan))
* [#1849](https://github.com/ember-bootstrap/ember-bootstrap/pull/1849) drop dependency on @ember/string ([@jelhan](https://github.com/jelhan))
* [#1808](https://github.com/ember-bootstrap/ember-bootstrap/pull/1808) add Bootstrap list group component ([@onechiporenko](https://github.com/onechiporenko))
* [#1799](https://github.com/ember-bootstrap/ember-bootstrap/pull/1799) add Bootstrap spinner component ([@onechiporenko](https://github.com/onechiporenko))

#### Documentation
* [#1825](https://github.com/ember-bootstrap/ember-bootstrap/pull/1825) clean API docs for removed property (BS3 only) ([@jelhan](https://github.com/jelhan))

#### Internal
* [#1850](https://github.com/ember-bootstrap/ember-bootstrap/pull/1850) run lint and tests for docs app in CI ([@jelhan](https://github.com/jelhan))
* [#1851](https://github.com/ember-bootstrap/ember-bootstrap/pull/1851) ignore docs/build generated by docs build in ESLint ([@jelhan](https://github.com/jelhan))
* [#1815](https://github.com/ember-bootstrap/ember-bootstrap/pull/1815) remove branch in tests for Ember version out of support ([@jelhan](https://github.com/jelhan))
* [#1814](https://github.com/ember-bootstrap/ember-bootstrap/pull/1814) fix CI for BS5 ([@simonihmig](https://github.com/simonihmig))
* [#1788](https://github.com/ember-bootstrap/ember-bootstrap/pull/1788) add additional tests for arguments of BsModal ([@bvedad](https://github.com/bvedad))

#### Committers: 5
- Daniel Gröger ([@dagroe](https://github.com/dagroe))
- Jeldrik Hanschke ([@jelhan](https://github.com/jelhan))
- Oleg Nechiporenko ([@onechiporenko](https://github.com/onechiporenko))
- Simon Ihmig ([@simonihmig](https://github.com/simonihmig))
- Vedad Burgic ([@bvedad](https://github.com/bvedad))


## v5.1.1 (2022-05-25)

#### Documentation
* [#1791](https://github.com/kaliber5/ember-bootstrap/pull/1791) Fix typos in API docs ([@simonihmig](https://github.com/simonihmig))
* [#1790](https://github.com/kaliber5/ember-bootstrap/pull/1790) Bug fix: carousel component missing from API docs ([@bvedad](https://github.com/bvedad))

#### Internal
* [#1793](https://github.com/kaliber5/ember-bootstrap/pull/1793) Add form element to arguments passed to (private) validate hook ([@simonihmig](https://github.com/simonihmig))
* [#1787](https://github.com/kaliber5/ember-bootstrap/pull/1787) Added missing tests for assertion of href attribute for BsNavbar ([@bvedad](https://github.com/bvedad))

#### Committers: 2
- Simon Ihmig ([@simonihmig](https://github.com/simonihmig))
- Vedad Burgic ([@bvedad](https://github.com/bvedad))

## v5.1.0 (2022-04-29)

#### Features
* [#1775](https://github.com/kaliber5/ember-bootstrap/pull/1775) Convert BsForm to Glimmer component ([@simonihmig](https://github.com/simonihmig))
* [#1774](https://github.com/kaliber5/ember-bootstrap/pull/1774) Convert remaining form components to TO/Glimmer ([@simonihmig](https://github.com/simonihmig))
* [#1773](https://github.com/kaliber5/ember-bootstrap/pull/1773) Convert form layout components to template-only ([@simonihmig](https://github.com/simonihmig))
* [#1772](https://github.com/kaliber5/ember-bootstrap/pull/1772) Convert form controls to Glimmer components ([@simonihmig](https://github.com/simonihmig))
* [#1741](https://github.com/kaliber5/ember-bootstrap/pull/1741) Implement fullscreen modal with BS breakpoints ([@Ayoahha](https://github.com/Ayoahha))

#### Bug Fixes
* [#1770](https://github.com/kaliber5/ember-bootstrap/pull/1770) Fix markup of tabs with dropdowns ([@simonihmig](https://github.com/simonihmig))
* [#1769](https://github.com/kaliber5/ember-bootstrap/pull/1769) Fix a11y markup of Tabs ([@simonihmig](https://github.com/simonihmig))
* [#1768](https://github.com/kaliber5/ember-bootstrap/pull/1768) Fix broken aria-labelledby attribute of modals ([@simonihmig](https://github.com/simonihmig))
* [#1750](https://github.com/kaliber5/ember-bootstrap/pull/1750) Needs peerDependency on ember-source ([@ef4](https://github.com/ef4))

#### Documentation
* [#1771](https://github.com/kaliber5/ember-bootstrap/pull/1771) Document a11y markup for progress bar ([@simonihmig](https://github.com/simonihmig))

#### Internal
* [#1783](https://github.com/kaliber5/ember-bootstrap/pull/1783) Ignore deprecations from ember-popper-modifier ([@simonihmig](https://github.com/simonihmig))
* [#1760](https://github.com/kaliber5/ember-bootstrap/pull/1760) drop @class argument of <BsPopover> and <BsPopover::Element> ([@jelhan](https://github.com/jelhan))
* [#1757](https://github.com/kaliber5/ember-bootstrap/pull/1757) pass class as attribute to <BsLinkTo> if possible ([@jelhan](https://github.com/jelhan))
* [#1759](https://github.com/kaliber5/ember-bootstrap/pull/1759) drop @class argument of <BsTooltip> and <BsTooltip::Element> ([@jelhan](https://github.com/jelhan))
* [#1755](https://github.com/kaliber5/ember-bootstrap/pull/1755) drop private @class argument of <BsModal> ([@jelhan](https://github.com/jelhan))
* [#1756](https://github.com/kaliber5/ember-bootstrap/pull/1756) drop @class argument of <BsAccordion::Item::Body> ([@jelhan](https://github.com/jelhan))
* [#1758](https://github.com/kaliber5/ember-bootstrap/pull/1758) drop private @class argument of <BsDropdown::Menu> ([@jelhan](https://github.com/jelhan))

#### Committers: 4
- Ayoahha ([@Ayoahha](https://github.com/Ayoahha))
- Edward Faulkner ([@ef4](https://github.com/ef4))
- Jeldrik Hanschke ([@jelhan](https://github.com/jelhan))
- Simon Ihmig ([@simonihmig](https://github.com/simonihmig))

## v5.0.0 (2022-02-09)

> See the other 5.0.0 pre-releases for the complete changelog!

#### Documentation
* [#1745](https://github.com/kaliber5/ember-bootstrap/pull/1745) Fix targets for docs app ([@simonihmig](https://github.com/simonihmig))

#### Committers: 1
- Simon Ihmig ([@simonihmig](https://github.com/simonihmig))


## v5.0.0-rc.0 (2022-01-30)

#### :boom: Breaking Change
* [#1736](https://github.com/kaliber5/ember-bootstrap/pull/1736) Upgrade Ember to 4.1, drop support for Ember < 3.24 ([@simonihmig](https://github.com/simonihmig))

#### Bug Fixes
* [#1720](https://github.com/kaliber5/ember-bootstrap/pull/1720) Accept loosely typed values for modal `@open` ([@simonihmig](https://github.com/simonihmig))
* [#1718](https://github.com/kaliber5/ember-bootstrap/pull/1718) Call onShow(n)/onHide/onHidden when controlling tooltips and popovers programmatically ([@simonihmig](https://github.com/simonihmig))

#### Internal
* [#1736](https://github.com/kaliber5/ember-bootstrap/pull/1736) Upgrade Ember to 4.1, drop support for Ember < 3.24 ([@simonihmig](https://github.com/simonihmig))

#### Committers: 1
- Simon Ihmig ([@simonihmig](https://github.com/simonihmig))

## v5.0.0-beta.2 (2021-11-24)

#### :boom: Breaking Change
* [#1699](https://github.com/kaliber5/ember-bootstrap/pull/1699) modal footer should not render a `<form>` element ([@jelhan](https://github.com/jelhan))

#### Features
* [#1689](https://github.com/kaliber5/ember-bootstrap/pull/1689) Make Bootstrap 5 the new default when adding the addon ([@simonihmig](https://github.com/simonihmig))

#### Bug Fixes
* [#1705](https://github.com/kaliber5/ember-bootstrap/pull/1705) Update ember-focus-trap, fixing Ember 4 compatibility ([@simonihmig](https://github.com/simonihmig))
* [#1680](https://github.com/kaliber5/ember-bootstrap/pull/1680) Update to `@ember/render-modifiers` v2 ([@simonihmig](https://github.com/simonihmig))

#### Internal
* [#1706](https://github.com/kaliber5/ember-bootstrap/pull/1706) Remove use of curly component invocation for link components ([@simonihmig](https://github.com/simonihmig))

#### Committers: 2
- Jeldrik Hanschke ([@jelhan](https://github.com/jelhan))
- Simon Ihmig ([@simonihmig](https://github.com/simonihmig))

## v5.0.0-beta.1 (2021-10-21)

#### :boom: Breaking Change
* [#1631](https://github.com/kaliber5/ember-bootstrap/pull/1631) remove `<BsForm::Group>` component ([@jelhan](https://github.com/jelhan))
* [#1632](https://github.com/kaliber5/ember-bootstrap/pull/1632) remove is-validating, is-required and is-disabled CSS classes from `<BsForm::Element>` ([@jelhan](https://github.com/jelhan))
* [#1624](https://github.com/kaliber5/ember-bootstrap/pull/1624) Upgrade to ember-auto-import v2 ([@simonihmig](https://github.com/simonihmig))

#### Bug Fixes
* [#1623](https://github.com/kaliber5/ember-bootstrap/pull/1623) Add `.mb-3` margins to BS5 form elements in vertical layout ([@simonihmig](https://github.com/simonihmig))
* [#1627](https://github.com/kaliber5/ember-bootstrap/pull/1627) show custom errors and warnings regardless if validation plugin is used ([@jelhan](https://github.com/jelhan))
* [#1620](https://github.com/kaliber5/ember-bootstrap/pull/1620) Fix BS5 markup for alert close button ([@simonihmig](https://github.com/simonihmig))

#### Documentation
* [#1622](https://github.com/kaliber5/ember-bootstrap/pull/1622) Modernize docs app and migrate to Bootstrap 5 ([@simonihmig](https://github.com/simonihmig))
* [#1625](https://github.com/kaliber5/ember-bootstrap/pull/1625) Reflect dropped BS 3 and added BS 5 support in readme ([@jelhan](https://github.com/jelhan))

#### Internal
* [#1635](https://github.com/kaliber5/ember-bootstrap/pull/1635) Remove deprecation messages for arguments dropped in v4 ([@murilo-goncalves](https://github.com/murilo-goncalves))
* [#1629](https://github.com/kaliber5/ember-bootstrap/pull/1629) remove BS3-only arguments @useIcons, @validation, ... of <BsForm::Group> ([@jelhan](https://github.com/jelhan))

#### Committers: 3
- Jeldrik Hanschke ([@jelhan](https://github.com/jelhan))
- Murilo Gonçalves ([@murilo-goncalves](https://github.com/murilo-goncalves))
- Simon Ihmig ([@simonihmig](https://github.com/simonihmig))

## v5.0.0-beta.0 (2021-09-24)

#### :boom: Breaking Change
* [#1609](https://github.com/kaliber5/ember-bootstrap/pull/1609) Drop ember-popper in favor of ember-popper-modifier and popper.js v2 ([@simonihmig](https://github.com/simonihmig))
* [#1610](https://github.com/kaliber5/ember-bootstrap/pull/1610) Remove deprecated `parentView` trigger element option for tooltips/popovers ([@simonihmig](https://github.com/simonihmig))
* [#1604](https://github.com/kaliber5/ember-bootstrap/pull/1604) Remove BS3 support from addon blueprint ([@simonihmig](https://github.com/simonihmig))
* [#1603](https://github.com/kaliber5/ember-bootstrap/pull/1603) Remove BS3 support from addon entrypoint ([@simonihmig](https://github.com/simonihmig))
* [#1600](https://github.com/kaliber5/ember-bootstrap/pull/1600) Remove Bootstrap 3 support from components ([@simonihmig](https://github.com/simonihmig))

#### Features
* [#1609](https://github.com/kaliber5/ember-bootstrap/pull/1609) Drop ember-popper in favor of ember-popper-modifier and popper.js v2 ([@simonihmig](https://github.com/simonihmig))
* [#1607](https://github.com/kaliber5/ember-bootstrap/pull/1607) Permit blocking of dropdown close if onHide returns false ([@gfmartinez](https://github.com/gfmartinez))
* [#1608](https://github.com/kaliber5/ember-bootstrap/pull/1608) Update dependencies for Ember 4 support ([@simonihmig](https://github.com/simonihmig))

#### Bug Fixes
* [#1614](https://github.com/kaliber5/ember-bootstrap/pull/1614) Fix BS5 markup for modal close button ([@simonihmig](https://github.com/simonihmig))

#### Documentation
* [#1619](https://github.com/kaliber5/ember-bootstrap/pull/1619) Add ember-bootstrap-postcss to addons section ([@oliverlj](https://github.com/oliverlj))
* [#1617](https://github.com/kaliber5/ember-bootstrap/pull/1617) Add BS5 and remove BS3 instructions to docs app ([@simonihmig](https://github.com/simonihmig))

#### Committers: 3
- Gabriel Martinez ([@gfmartinez](https://github.com/gfmartinez))
- LE JACQUES Olivier ([@oliverlj](https://github.com/oliverlj))
- Simon Ihmig ([@simonihmig](https://github.com/simonihmig))

## v5.0.0-alpha.1 (2021-08-17)

#### :boom: Breaking Change
* [#1596](https://github.com/kaliber5/ember-bootstrap/pull/1596) Drop IE11 support ([@simonihmig](https://github.com/simonihmig))
* [#1595](https://github.com/kaliber5/ember-bootstrap/pull/1595) Drop node 10 support ([@simonihmig](https://github.com/simonihmig))
* [#1593](https://github.com/kaliber5/ember-bootstrap/pull/1593) Drop support for ember-concurrency 1.x as a dependency ([@simonihmig](https://github.com/simonihmig))

#### Features
* [#1561](https://github.com/kaliber5/ember-bootstrap/pull/1561) Add Bootstrap v5 support for accordions ([@simonihmig](https://github.com/simonihmig))
* [#1537](https://github.com/kaliber5/ember-bootstrap/pull/1537) Remove `.btn-block` support for Bootstrap 5 ([@simonihmig](https://github.com/simonihmig))
* [#1597](https://github.com/kaliber5/ember-bootstrap/pull/1597) Add Bootstrap v5 support for Navbars ([@simonihmig](https://github.com/simonihmig))

#### Bug Fixes
* [#1590](https://github.com/kaliber5/ember-bootstrap/pull/1590) Fix `.collapsed` markup for accordions ([@simonihmig](https://github.com/simonihmig))

#### Internal
* [#1594](https://github.com/kaliber5/ember-bootstrap/pull/1594) Fix tests for Ember 4.0 Canary ([@simonihmig](https://github.com/simonihmig))

#### Committers: 1
- Simon Ihmig ([@simonihmig](https://github.com/simonihmig))

## v5.0.0-alpha.0 (2021-08-06)

#### :boom: Breaking Change
* [#1581](https://github.com/kaliber5/ember-bootstrap/pull/1581) BsButton should not silenty catch errors thrown by @onClick handler ([@jelhan](https://github.com/jelhan))

#### Features
* [#1540](https://github.com/kaliber5/ember-bootstrap/pull/1540) Add Bootstrap v5 support for ButtonGroup ([@simonihmig](https://github.com/simonihmig))

#### Bug Fixes
* [#1581](https://github.com/kaliber5/ember-bootstrap/pull/1581) BsButton should not silenty catch errors thrown by @onClick handler ([@jelhan](https://github.com/jelhan))

#### Committers: 3
- Jeldrik Hanschke ([@jelhan](https://github.com/jelhan))
- Simon Ihmig ([@simonihmig](https://github.com/simonihmig))
- [@dependabot-preview[bot]](https://github.com/apps/dependabot-preview)

## v4.9.0 (2021-05-31)

#### Features
* [#1226](https://github.com/kaliber5/ember-bootstrap/pull/1226) Refactor BsAccordion to Glimmer component ([@simonihmig](https://github.com/simonihmig))
* [#1541](https://github.com/kaliber5/ember-bootstrap/pull/1541) Change `.sr-only` utility to `.visually-hidden` for Bootstrap v5 ([@simonihmig](https://github.com/simonihmig))
* [#1536](https://github.com/kaliber5/ember-bootstrap/pull/1536) Deprecate Bootstrap 3 support ([@simonihmig](https://github.com/simonihmig))

#### Bug Fixes
* [#1538](https://github.com/kaliber5/ember-bootstrap/pull/1538) Fix BsButtonGroup radio to not trigger onChange when clicking active button ([@simonihmig](https://github.com/simonihmig))
* [#1535](https://github.com/kaliber5/ember-bootstrap/pull/1535) Fix BsForm element causing "same computation" Glimmer assertion in rare edge case ([@simonihmig](https://github.com/simonihmig))

#### Internal
* [#1533](https://github.com/kaliber5/ember-bootstrap/pull/1533) harmonize code paths used in FastBoot and non-FastBoot of <BsModal> ([@jelhan](https://github.com/jelhan))
* [#1534](https://github.com/kaliber5/ember-bootstrap/pull/1534) Update ember-focus-trap ([@simonihmig](https://github.com/simonihmig))

#### Committers: 3
- Jeldrik Hanschke ([@jelhan](https://github.com/jelhan))
- Simon Ihmig ([@simonihmig](https://github.com/simonihmig))
- [@dependabot-preview[bot]](https://github.com/apps/dependabot-preview)

## v4.8.1 (2021-05-27)

#### Bug Fixes
* [#1532](https://github.com/kaliber5/ember-bootstrap/pull/1532) remove trailing bracket in <BsModal::Header> ([@jelhan](https://github.com/jelhan))

#### Internal
* [#1531](https://github.com/kaliber5/ember-bootstrap/pull/1531) refactor handleBackdrop method of <BsModal> into separate show and hide methods ([@jelhan](https://github.com/jelhan))

#### Committers: 1
- Jeldrik Hanschke ([@jelhan](https://github.com/jelhan))

## v4.8.0 (2021-05-27)

#### Features
* [#1529](https://github.com/kaliber5/ember-bootstrap/pull/1529) Shadow DOM compatibility ([@lolmaus](https://github.com/lolmaus))

#### Bug Fixes
* [#1341](https://github.com/kaliber5/ember-bootstrap/pull/1341) Fix optimized Embroider build ([@simonihmig](https://github.com/simonihmig))

#### Internal
* [#1527](https://github.com/kaliber5/ember-bootstrap/pull/1527) register resize listener using on-window helper in BsModal ([@jelhan](https://github.com/jelhan))
* [#1528](https://github.com/kaliber5/ember-bootstrap/pull/1528) refactor to async/await instead of callbacks in BsModal ([@jelhan](https://github.com/jelhan))
* [#1466](https://github.com/kaliber5/ember-bootstrap/pull/1466) Add test coverage for modal animation ([@jelhan](https://github.com/jelhan))

#### Committers: 4
- Andrey Mikhaylov (lolmaus) ([@lolmaus](https://github.com/lolmaus))
- Jeldrik Hanschke ([@jelhan](https://github.com/jelhan))
- Simon Ihmig ([@simonihmig](https://github.com/simonihmig))
- Travis Hoover ([@thoov](https://github.com/thoov))

## v4.7.1 (2021-05-19)

#### Bug Fixes
* [#1519](https://github.com/kaliber5/ember-bootstrap/pull/1519) Fix Navbar link markup regression introduced in v4.7.0 ([@simonihmig](https://github.com/simonihmig))

#### Committers: 1
- Simon Ihmig ([@simonihmig](https://github.com/simonihmig))

## v4.7.0 (2021-05-19)

#### Features
* [#1512](https://github.com/kaliber5/ember-bootstrap/pull/1512) Update forms for Bootstrap v5 ([@simonihmig](https://github.com/simonihmig))
* [#1504](https://github.com/kaliber5/ember-bootstrap/pull/1504) Deprecate positional arguments for link-to components ([@simonihmig](https://github.com/simonihmig))
* [#1502](https://github.com/kaliber5/ember-bootstrap/pull/1502) Update Tooltips and Popovers for Bootstrap v5 ([@simonihmig](https://github.com/simonihmig))
* [#1455](https://github.com/kaliber5/ember-bootstrap/pull/1455) Refactor Nav/Navbar/Dropdown's LinkTo components to not extend from Ember's LinkComponent ([@simonihmig](https://github.com/simonihmig))
* [#1495](https://github.com/kaliber5/ember-bootstrap/pull/1495) Support switch control in forms (BS4 only) ([@lindyhopchris](https://github.com/lindyhopchris))
* [#1499](https://github.com/kaliber5/ember-bootstrap/pull/1499) Add experimental/incomplete Bootstrap 5 support to existing components ([@simonihmig](https://github.com/simonihmig))
* [#1497](https://github.com/kaliber5/ember-bootstrap/pull/1497) Support Bootstrap v5 in default blueprint ([@simonihmig](https://github.com/simonihmig))
* [#1496](https://github.com/kaliber5/ember-bootstrap/pull/1496) Support Bootstrap v5 in addon index.js ([@simonihmig](https://github.com/simonihmig))
* [#1468](https://github.com/kaliber5/ember-bootstrap/pull/1468) Altered hasBlock in favor for has-block helper ([@bgantzler](https://github.com/bgantzler))

> Note that Bootstrap v5 support added here is still experimental and incomplete!

#### Bug Fixes
* [#1517](https://github.com/kaliber5/ember-bootstrap/pull/1517) Fixed component dependencies when using `whitelist` to "tree-shake" components ([@simonihmig](https://github.com/simonihmig))
* [#1513](https://github.com/kaliber5/ember-bootstrap/pull/1513) forward arguments in <BsNavbar::LinkTo> to <BsLinkTo> ([@jelhan](https://github.com/jelhan))
* [#1500](https://github.com/kaliber5/ember-bootstrap/pull/1500) Re-add broken fade arg to BsAlert component ([@gfmartinez](https://github.com/gfmartinez))
* [#1516](https://github.com/kaliber5/ember-bootstrap/pull/1516) Fix horizontal form layout for checkbox elements ([@simonihmig](https://github.com/simonihmig))
* [#1477](https://github.com/kaliber5/ember-bootstrap/pull/1477) Fix deprecations ([@simonihmig](https://github.com/simonihmig))
* [#1421](https://github.com/kaliber5/ember-bootstrap/pull/1421) Do not use implicit this fallback in templates ([@jelhan](https://github.com/jelhan))

#### Documentation
* [#1514](https://github.com/kaliber5/ember-bootstrap/pull/1514) Fix docs app by upgrading dependencies ([@jelhan](https://github.com/jelhan))

#### Internal
* [#1510](https://github.com/kaliber5/ember-bootstrap/pull/1510) Fix CI for running Firefox ([@simonihmig](https://github.com/simonihmig))
* [#1507](https://github.com/kaliber5/ember-bootstrap/pull/1507) Update to Ember 3.26 blueprint ([@simonihmig](https://github.com/simonihmig))
* [#1448](https://github.com/kaliber5/ember-bootstrap/pull/1448) Fix deprecations failing the build ([@simonihmig](https://github.com/simonihmig))

#### Committers: 6
- Christopher Gammie ([@lindyhopchris](https://github.com/lindyhopchris))
- Gabriel Martinez ([@gfmartinez](https://github.com/gfmartinez))
- Jeldrik Hanschke ([@jelhan](https://github.com/jelhan))
- Simon Ihmig ([@simonihmig](https://github.com/simonihmig))
- [@bgantzler](https://github.com/bgantzler)
- [@dependabot-preview[bot]](https://github.com/apps/dependabot-preview)


## v4.6.3 (2021-02-01)

#### Bug Fixes
* [#1415](https://github.com/kaliber5/ember-bootstrap/pull/1415) Fix for showOwnValidation throwing "same computation" Ember assertion ([@lindyhopchris](https://github.com/lindyhopchris))

#### Committers: 2
- Christopher Gammie ([@lindyhopchris](https://github.com/lindyhopchris))
- [@dependabot-preview[bot]](https://github.com/apps/dependabot-preview)

## v4.6.2 (2021-01-21)

#### Bug Fixes
* [#1406](https://github.com/kaliber5/ember-bootstrap/pull/1406) <BsForm::Element> should respect @value argument ([@jelhan](https://github.com/jelhan))

#### Committers: 2
- Jeldrik Hanschke ([@jelhan](https://github.com/jelhan))
- [@dependabot-preview[bot]](https://github.com/apps/dependabot-preview)

## v4.6.1 (2021-01-19)

#### Bug Fixes
* [#1393](https://github.com/kaliber5/ember-bootstrap/pull/1393) Fix modals not being able to open after being closed once ([@SanderKnauff](https://github.com/SanderKnauff))

#### Committers: 2
- Sander Knauff ([@SanderKnauff](https://github.com/SanderKnauff))
- [@dependabot-preview[bot]](https://github.com/apps/dependabot-preview)

## v4.6.0 (2020-12-30)

#### Features
* [#1282](https://github.com/kaliber5/ember-bootstrap/pull/1282) Refactor Modals to Glimmer components ([@simonihmig](https://github.com/simonihmig))

#### Bug Fixes
* [#1383](https://github.com/kaliber5/ember-bootstrap/pull/1383) Fix cleanup of event listeners for Tooltips/Popovers ([@simonihmig](https://github.com/simonihmig))
* [#1369](https://github.com/kaliber5/ember-bootstrap/pull/1369) Fix attaching to targets that are rendered *after* the tooltip/popover  ([@simonihmig](https://github.com/simonihmig))
* [#1370](https://github.com/kaliber5/ember-bootstrap/pull/1370) Fix modal not receiving focus ([@simonihmig](https://github.com/simonihmig))
* [#1365](https://github.com/kaliber5/ember-bootstrap/pull/1365) <BsDropdown> should use defaultValue if @htmlTag is undefined ([@jelhan](https://github.com/jelhan))

#### Documentation
* [#1364](https://github.com/kaliber5/ember-bootstrap/pull/1364) <BsForm> demo uses properties which have been removed in v4 ([@jelhan](https://github.com/jelhan))

#### Internal
* [#1382](https://github.com/kaliber5/ember-bootstrap/pull/1382) Run ember-cli-update ([@simonihmig](https://github.com/simonihmig))

#### Committers: 3
- Jeldrik Hanschke ([@jelhan](https://github.com/jelhan))
- Simon Ihmig ([@simonihmig](https://github.com/simonihmig))
- [@dependabot-preview[bot]](https://github.com/apps/dependabot-preview)

## v4.5.0 (2020-12-03)

#### Breaking
* [Ember Bootstrap Changeset Validations](https://github.com/kaliber5/ember-bootstrap-changeset-validations) v3 relied on private API, which was changed in this release. If you are using it, you must update to its [v4 release](https://github.com/kaliber5/ember-bootstrap-changeset-validations/releases/tag/v4.0.0).

#### Features
* [#1339](https://github.com/kaliber5/ember-bootstrap/pull/1339) Refactor <BsForm::Group> and <BsForm::Element> to glimmer component and tracked properties ([@jelhan](https://github.com/jelhan))

#### Internal
* [#1349](https://github.com/kaliber5/ember-bootstrap/pull/1349) Allow Embroider tests to fail ([@simonihmig](https://github.com/simonihmig))
* [#1340](https://github.com/kaliber5/ember-bootstrap/pull/1340) Fix FastBoot tests ([@simonihmig](https://github.com/simonihmig))

#### Committers: 3
- Jeldrik Hanschke ([@jelhan](https://github.com/jelhan))
- Simon Ihmig ([@simonihmig](https://github.com/simonihmig))
- [@dependabot-preview[bot]](https://github.com/apps/dependabot-preview)

## v4.4.0 (2020-10-30)

#### Features
* [#1279](https://github.com/kaliber5/ember-bootstrap/pull/1279) Refactor Tooltips and Popovers to Glimmer components ([@simonihmig](https://github.com/simonihmig))
* [#1263](https://github.com/kaliber5/ember-bootstrap/pull/1263) render header for `<BsAlert>` using named blocks ([@jelhan](https://github.com/jelhan))

#### Bug Fixes
* [#1281](https://github.com/kaliber5/ember-bootstrap/pull/1281) Fixed onDismissed being called twice when visible changes value ([@ijlee2](https://github.com/ijlee2))
* [#1306](https://github.com/kaliber5/ember-bootstrap/pull/1306) `<BsAccordion>` should support `@onChange={{undefined}}` ([@jelhan](https://github.com/jelhan))
* [#1284](https://github.com/kaliber5/ember-bootstrap/pull/1284) Fix deprecate's own deprecations for Ember canary ([@simonihmig](https://github.com/simonihmig))

#### Committers: 5
- Isaac Lee ([@ijlee2](https://github.com/ijlee2))
- Jeldrik Hanschke ([@jelhan](https://github.com/jelhan))
- Robert Jackson ([@rwjblue](https://github.com/rwjblue))
- Simon Ihmig ([@simonihmig](https://github.com/simonihmig))
- [@dependabot-preview[bot]](https://github.com/apps/dependabot-preview)

## v4.3.0 (2020-10-06)

#### Features
* [#1251](https://github.com/kaliber5/ember-bootstrap/pull/1251) Support Embroider with staticComponents for full tree-shaking ([@simonihmig](https://github.com/simonihmig))

#### Bug Fixes
* [#1275](https://github.com/kaliber5/ember-bootstrap/pull/1275) Enable splattributes on dropdown menu divider and add tests ([@fran-worley](https://github.com/fran-worley))
* [#1272](https://github.com/kaliber5/ember-bootstrap/pull/1272) Avoid deprecation warning for dropdown button ([@simonihmig](https://github.com/simonihmig))

#### Documentation
* [#1274](https://github.com/kaliber5/ember-bootstrap/pull/1274) Update contributing docs to account for new @embroider/macros based build setup ([@simonihmig](https://github.com/simonihmig))
* [#1271](https://github.com/kaliber5/ember-bootstrap/pull/1271) Add Embroider compatibility note ([@simonihmig](https://github.com/simonihmig))

#### Internal
* [#1273](https://github.com/kaliber5/ember-bootstrap/pull/1273) use @embroider/test-setup ([@ef4](https://github.com/ef4))

#### Committers: 4
- Edward Faulkner ([@ef4](https://github.com/ef4))
- Fran Worley ([@fran-worley](https://github.com/fran-worley))
- Simon Ihmig ([@simonihmig](https://github.com/simonihmig))
- [@dependabot-preview[bot]](https://github.com/apps/dependabot-preview)

## v4.2.0 (2020-09-28)

#### Features
* [#1259](https://github.com/kaliber5/ember-bootstrap/pull/1259) Support both ember-concurrency 1.x and 2.x ([@maxfierke](https://github.com/maxfierke))
* [#1237](https://github.com/kaliber5/ember-bootstrap/pull/1237) Deprecate @triggerElement="parentView" for Tooltips and Popovers ([@simonihmig](https://github.com/simonihmig))
* [#1224](https://github.com/kaliber5/ember-bootstrap/pull/1224) Refactor BsAlert to Glimmer component ([@simonihmig](https://github.com/simonihmig))
* [#1225](https://github.com/kaliber5/ember-bootstrap/pull/1225) Refactor BsCollapse to Glimmer component ([@simonihmig](https://github.com/simonihmig))
* [#1022](https://github.com/kaliber5/ember-bootstrap/pull/1022) Refactor Button and ButtonGroup to Glimmer components ([@simonihmig](https://github.com/simonihmig))

#### Bug Fixes
* [#1250](https://github.com/kaliber5/ember-bootstrap/pull/1250) <BsForm> should support @onBefore, @onSubmit and @onInvalid arguments to be undefined ([@jelhan](https://github.com/jelhan))
* [#1249](https://github.com/kaliber5/ember-bootstrap/pull/1249) upgrade @embroider/macros to fix usage in addons ([@jelhan](https://github.com/jelhan))

#### Documentation
* [#1260](https://github.com/kaliber5/ember-bootstrap/pull/1260) Declare _element property as private ([@simonihmig](https://github.com/simonihmig))
* [#1257](https://github.com/kaliber5/ember-bootstrap/pull/1257) fix usage example in accordion docs ([@jelhan](https://github.com/jelhan))

#### Committers: 4
- Jeldrik Hanschke ([@jelhan](https://github.com/jelhan))
- Max Fierke ([@maxfierke](https://github.com/maxfierke))
- Simon Ihmig ([@simonihmig](https://github.com/simonihmig))
- [@dependabot-preview[bot]](https://github.com/apps/dependabot-preview)

## v4.1.2 (2020-09-06)

#### Bug Fixes
* [#1223](https://github.com/kaliber5/ember-bootstrap/pull/1223) Manual include/exclude of components: <BsForm> requires <BsButton> due to yielded submitButton ([@jelhan](https://github.com/jelhan))

#### Committers: 1
- Jeldrik Hanschke ([@jelhan](https://github.com/jelhan))

## v4.1.1 (2020-09-05)

#### Bug Fixes
* [#1219](https://github.com/kaliber5/ember-bootstrap/pull/1219) Fix Tooltips/Popovers when used w/ FastBoot and rehydration enabled ([@simonihmig](https://github.com/simonihmig))

#### Internal
* [#1221](https://github.com/kaliber5/ember-bootstrap/pull/1221) Colocate component templates ([@jelhan](https://github.com/jelhan))

#### Committers: 2
- Jeldrik Hanschke ([@jelhan](https://github.com/jelhan))
- Simon Ihmig ([@simonihmig](https://github.com/simonihmig))

## v4.1.0 (2020-09-01)

#### Features
* [#1205](https://github.com/kaliber5/ember-bootstrap/pull/1205) yield submitButton component from <BsForm> ([@jelhan](https://github.com/jelhan))
* [#1203](https://github.com/kaliber5/ember-bootstrap/pull/1203) yield setValue function from <form.element> to mutate the value in custom controls ([@jelhan](https://github.com/jelhan))

#### Documentation
* [#1218](https://github.com/kaliber5/ember-bootstrap/pull/1218) Update docs for new yielded submit button ([@simonihmig](https://github.com/simonihmig))
* [#1204](https://github.com/kaliber5/ember-bootstrap/pull/1204) isSettled property of Button was documented as isFulfilled ([@jelhan](https://github.com/jelhan))

#### Internal
* [#1217](https://github.com/kaliber5/ember-bootstrap/pull/1217) Fix CSP failures in FastBoot tests ([@simonihmig](https://github.com/simonihmig))
* [#1207](https://github.com/kaliber5/ember-bootstrap/pull/1207) Fix CI config for running FastBoot tests ([@simonihmig](https://github.com/simonihmig))

#### Committers: 3
- Jeldrik Hanschke ([@jelhan](https://github.com/jelhan))
- Simon Ihmig ([@simonihmig](https://github.com/simonihmig))
- [@dependabot-preview[bot]](https://github.com/apps/dependabot-preview)

## v4.0.1 (2020-08-21)

#### Bug Fixes
* [#1183](https://github.com/kaliber5/ember-bootstrap/pull/1183) Avoid using ref modifier in form ([@basz](https://github.com/basz))

#### Internal
* [#1182](https://github.com/kaliber5/ember-bootstrap/pull/1182) Replace ember-ref-modifier to ember-ref-bucket ([@lifeart](https://github.com/lifeart))

#### Committers: 4
- Alex Kanunnikov ([@lifeart](https://github.com/lifeart))
- Bas Kamer ([@basz](https://github.com/basz))
- Simon Ihmig ([@simonihmig](https://github.com/simonihmig))
- [@dependabot-preview[bot]](https://github.com/apps/dependabot-preview)

## v4.0.0 (2020-08-04)

## v4.0.0-rc.3 (2020-07-08)

#### Bug Fixes
* [#1142](https://github.com/kaliber5/ember-bootstrap/pull/1142) Fix subclassing deprecation, causing exceptions in BsModalSimple and BsNav ([@simonihmig](https://github.com/simonihmig))

#### Internal
* [#1140](https://github.com/kaliber5/ember-bootstrap/pull/1140) Update Ember and dependencies ([@simonihmig](https://github.com/simonihmig))
* [#1143](https://github.com/kaliber5/ember-bootstrap/pull/1143) Fix failing beta/canary tests ([@simonihmig](https://github.com/simonihmig))
* [#1126](https://github.com/kaliber5/ember-bootstrap/pull/1126) Reenable Embroider tests ([@simonihmig](https://github.com/simonihmig))

#### Committers: 2
- Simon Ihmig ([@simonihmig](https://github.com/simonihmig))
- [@dependabot-preview[bot]](https://github.com/apps/dependabot-preview)

## v4.0.0-rc.2 (2020-06-15)

#### :boom: Breaking Change
* [#1104](https://github.com/kaliber5/ember-bootstrap/pull/1104) Remove support for subclassing component classes  ([@simonihmig](https://github.com/simonihmig))
* [#1097](https://github.com/kaliber5/ember-bootstrap/pull/1097) Remove leftover two-way binding of form element's `@value` argument and yielded `value` ([@basz](https://github.com/basz))
* [#1106](https://github.com/kaliber5/ember-bootstrap/pull/1106) Refactor BsModalSimple to not extend from BsModal ([@simonihmig](https://github.com/simonihmig))

#### Features
* [#1112](https://github.com/kaliber5/ember-bootstrap/pull/1112) Add codemod link to warnings ([@simonihmig](https://github.com/simonihmig))
* [#1107](https://github.com/kaliber5/ember-bootstrap/pull/1107) Render body.modal-open in FastBoot ([@simonihmig](https://github.com/simonihmig))

#### Bug Fixes
* [#1098](https://github.com/kaliber5/ember-bootstrap/pull/1098) Reset style attribute after transition of BsCollapse ([@basz](https://github.com/basz))
* [#1097](https://github.com/kaliber5/ember-bootstrap/pull/1097) Remove leftover two-way binding of form element's `@value` argument ([@basz](https://github.com/basz))
* [#1076](https://github.com/kaliber5/ember-bootstrap/pull/1076) Remove debug code from production builds ([@simonihmig](https://github.com/simonihmig))
* [#1077](https://github.com/kaliber5/ember-bootstrap/pull/1077) Fix warnings for removed form element arguments disabled and readonly ([@simonihmig](https://github.com/simonihmig))

#### Documentation
* [#1116](https://github.com/kaliber5/ember-bootstrap/pull/1116) Pre-render docs as static pages w/ prember ([@simonihmig](https://github.com/simonihmig))
* [#1108](https://github.com/kaliber5/ember-bootstrap/pull/1108) Update API docs for FormElement#value ([@simonihmig](https://github.com/simonihmig))

#### Internal
* [#1115](https://github.com/kaliber5/ember-bootstrap/pull/1115) Deploy docs in CI ([@simonihmig](https://github.com/simonihmig))
* [#1114](https://github.com/kaliber5/ember-bootstrap/pull/1114) Add `docs:build` and `docs:serve` scripts, remove publishing of docs from gulpfile ([@simonihmig](https://github.com/simonihmig))

#### Committers: 3
- Bas Kamer ([@basz](https://github.com/basz))
- Simon Ihmig ([@simonihmig](https://github.com/simonihmig))
- [@dependabot-preview[bot]](https://github.com/apps/dependabot-preview)


## v4.0.0-rc.1 (2020-05-08)

#### Bug Fixes
* [#1068](https://github.com/kaliber5/ember-bootstrap/pull/1068) Fix modal backdrop visibility class ([@lolmaus](https://github.com/lolmaus))
* [#1061](https://github.com/kaliber5/ember-bootstrap/pull/1061) Fix first tab pane being active by default ([@simonihmig](https://github.com/simonihmig))

#### Internal
* [#930](https://github.com/kaliber5/ember-bootstrap/pull/930) Test addon build with embroider ([@simonihmig](https://github.com/simonihmig))

#### Committers: 3
- Andrey Mikhaylov (lolmaus) ([@lolmaus](https://github.com/lolmaus))
- Simon Ihmig ([@simonihmig](https://github.com/simonihmig))
- [@dependabot-preview[bot]](https://github.com/apps/dependabot-preview)

## v4.0.0-rc.0 (2020-04-28)

#### :boom: Breaking Change
* All components are refactored to tag-less Ember components as a first stepping stone to a full Glimmer components rewrite. In most cases this should not affect you, but there are some edge cases where it might break, e.g. using `ember-test-selectors` with the legacy curly invocation syntax or using `attributeBindings` provided by `@ember/component` like `@id`. In all cases setting them as HTML attributes using angle bracket component invocation is the recommended path forward.
* [#965](https://github.com/kaliber5/ember-bootstrap/pull/965), [#1037](https://github.com/kaliber5/ember-bootstrap/pull/1037) Drop support for Ember < 3.16 and node 8 ([@jelhan](https://github.com/jelhan), [@simonihmig](https://github.com/simonihmig))
* [#1004](https://github.com/kaliber5/ember-bootstrap/pull/1004) Drop deprecated arguments for HTML attributes of Form and Button components ([@jelhan](https://github.com/jelhan))
* [#932](https://github.com/kaliber5/ember-bootstrap/pull/932) radio group should have a legend not a label ([@jelhan](https://github.com/jelhan))

#### Bug Fixes
* [#1041](https://github.com/kaliber5/ember-bootstrap/pull/1041) Fix autofocus for Modals in IE11 ([@simonihmig](https://github.com/simonihmig))
* [#982](https://github.com/kaliber5/ember-bootstrap/pull/982) Fix ARIA role of progress bars, convert to tag-less / outerHTML component ([@simonihmig](https://github.com/simonihmig))
* [#932](https://github.com/kaliber5/ember-bootstrap/pull/932) radio group should have a legend not a label ([@jelhan](https://github.com/jelhan))

#### Internal
* [#1045](https://github.com/kaliber5/ember-bootstrap/pull/1045) Add dependabot setup ([@simonihmig](https://github.com/simonihmig))
* [#1043](https://github.com/kaliber5/ember-bootstrap/pull/1043) Add Github Actions setup ([@simonihmig](https://github.com/simonihmig))
* [#1038](https://github.com/kaliber5/ember-bootstrap/pull/1038) setup prettier ([@jelhan](https://github.com/jelhan))
* [#1040](https://github.com/kaliber5/ember-bootstrap/pull/1040) setup release-it with lerna-changelog integration ([@jelhan](https://github.com/jelhan))
* [#1023](https://github.com/kaliber5/ember-bootstrap/pull/1023) Use `@embroider/macros` for built-time transforms ([@simonihmig](https://github.com/simonihmig))
* [#1007](https://github.com/kaliber5/ember-bootstrap/pull/1007) Remove usage of `this.get()` ([@simonihmig](https://github.com/simonihmig))
* [#1006](https://github.com/kaliber5/ember-bootstrap/pull/1006) Remove Bootstrap version specific trees ([@simonihmig](https://github.com/simonihmig))
* [#1005](https://github.com/kaliber5/ember-bootstrap/pull/1005) Convert Form to tag-less / outerHTML component ([@simonihmig](https://github.com/simonihmig))
* [#1002](https://github.com/kaliber5/ember-bootstrap/pull/1002) Convert Carousel to tag-less / outerHTML component ([@simonihmig](https://github.com/simonihmig))
* [#1001](https://github.com/kaliber5/ember-bootstrap/pull/1001) Convert Accordion to tag-less / outerHTML component ([@simonihmig](https://github.com/simonihmig))
* [#998](https://github.com/kaliber5/ember-bootstrap/pull/998) Convert Tab to tag-less / outerHTML component ([@simonihmig](https://github.com/simonihmig))
* [#997](https://github.com/kaliber5/ember-bootstrap/pull/997) Convert Navbar to tag-less / outerHTML component ([@simonihmig](https://github.com/simonihmig))
* [#996](https://github.com/kaliber5/ember-bootstrap/pull/996) Convert Collapse to tag-less / outerHTML component ([@simonihmig](https://github.com/simonihmig))
* [#993](https://github.com/kaliber5/ember-bootstrap/pull/993) Use public in-element through polyfill ([@simonihmig](https://github.com/simonihmig))
* [#992](https://github.com/kaliber5/ember-bootstrap/pull/992) Use build helpers / first set of migration ([@simonihmig](https://github.com/simonihmig))
* [#988](https://github.com/kaliber5/ember-bootstrap/pull/988) Convert Navs to tag-less / outerHTML component ([@simonihmig](https://github.com/simonihmig))
* [#985](https://github.com/kaliber5/ember-bootstrap/pull/985) Convert ButtonGroup to tag-less / outerHTML component ([@simonihmig](https://github.com/simonihmig))
* [#981](https://github.com/kaliber5/ember-bootstrap/pull/981) Convert Modals to tag-less / outerHTML component ([@simonihmig](https://github.com/simonihmig))
* [#980](https://github.com/kaliber5/ember-bootstrap/pull/980) Convert Button and Dropdown to tag-less / outerHTML component ([@simonihmig](https://github.com/simonihmig))
* [#982](https://github.com/kaliber5/ember-bootstrap/pull/982) Fix ARIA role of progress bars, convert to tag-less / outerHTML component ([@simonihmig](https://github.com/simonihmig))
* [#976](https://github.com/kaliber5/ember-bootstrap/pull/976) Convert Alert to tag-less / outerHTML component ([@simonihmig](https://github.com/simonihmig))
* [#970](https://github.com/kaliber5/ember-bootstrap/pull/970) add template linting for tests ([@jelhan](https://github.com/jelhan))
* [#966](https://github.com/kaliber5/ember-bootstrap/pull/966) refactor component invocation in tests to angle brackets syntax ([@jelhan](https://github.com/jelhan))

#### Committers: 4
- Jacob Jewell ([@jakesjews](https://github.com/jakesjews))
- Jeldrik Hanschke ([@jelhan](https://github.com/jelhan))
- Simon Ihmig ([@simonihmig](https://github.com/simonihmig))
- [@dependabot-preview[bot]](https://github.com/apps/dependabot-preview)


## 3.1.3 (2020-04-11)

#### Bug Fixes
* [#1029](https://github.com/kaliber5/ember-bootstrap/pull/1029) Fix dropdown focus to stay on toggle element ([@simonihmig](https://github.com/simonihmig))

#### Committers: 4
- Jeldrik Hanschke ([@jelhan](https://github.com/jelhan))
- Keita Urashima ([@ursm](https://github.com/ursm))
- Simon Ihmig ([@simonihmig](https://github.com/simonihmig))
- [@JamesS-M](https://github.com/JamesS-M)
## 3.1.2 (2020-03-10)

#### Deprecations
* [#995](https://github.com/kaliber5/ember-bootstrap/pull/995) Deprecate readonly and disabled args of bs form element ([@jelhan](https://github.com/jelhan))
* [#987](https://github.com/kaliber5/ember-bootstrap/pull/987) deprecate required arg of <BsForm::Element> ([@jelhan](https://github.com/jelhan))

#### Bug Fixes
* [#1014](https://github.com/kaliber5/ember-bootstrap/pull/1014) Fix `calling set on destroyed object` for tooltips when tooltip is disposed before being shown ([@simonihmig](https://github.com/simonihmig))
* [#1011](https://github.com/kaliber5/ember-bootstrap/pull/1011) Fix a typo in deprecation message ([@ursm](https://github.com/ursm))
* [#1009](https://github.com/kaliber5/ember-bootstrap/pull/1009) Fix bs-carousel with async observers ([@jakesjews](https://github.com/jakesjews))
* [#983](https://github.com/kaliber5/ember-bootstrap/pull/983) Fix progress bar role and ARIA attributes ([@simonihmig](https://github.com/simonihmig))

#### Documentation
* [#967](https://github.com/kaliber5/ember-bootstrap/pull/967) Fix typo in CHANGELOG.md ([@akashdsouza](https://github.com/akashdsouza))

#### Internal
* [#964](https://github.com/kaliber5/ember-bootstrap/pull/964) upgrade ember to 3.15 ([@jelhan](https://github.com/jelhan))

#### Committers: 5
- Jacob Jewell ([@jakesjews](https://github.com/jakesjews))
- Jeldrik Hanschke ([@jelhan](https://github.com/jelhan))
- Keita Urashima ([@ursm](https://github.com/ursm))
- Simon Ihmig ([@simonihmig](https://github.com/simonihmig))
- [@akashdsouza](https://github.com/akashdsouza)
## 3.1.1 (2020-01-07)

#### Deprecations
* [#933](https://github.com/kaliber5/ember-bootstrap/pull/933) Deprecate arguments whose only purpose is supporting HTML attributes ([@jelhan](https://github.com/jelhan))

  This deprecates *all* component arguments that are used to set HTML attributes. All of these will be removed in the next major version v4.0.
  A deprecation warning will be issued in development for most arguments when used.

  The migration path is to use angle bracket invocation (available since Ember 3.4 or by installing [ember-angle-bracket-invocation-polyfill](https://github.com/rwjblue/ember-angle-bracket-invocation-polyfill)) to set them directly.
  E.g. use `<BsButton @type="primary" title="foo">Ok</BsButton>` instead of `{{#bs-button type="primary" title="foo"}}Ok{{/bs-button}}` to set `title`.

#### Bug Fixes
* [#948](https://github.com/kaliber5/ember-bootstrap/pull/948) Modals ignore clicking backdrop to close, if mousedown happened on dialog element, reflecting original bootstrap.js behaviour ([@eyupatis](https://github.com/eyupatis))
* [#951](https://github.com/kaliber5/ember-bootstrap/pull/951) support optional feature default-async-observers ([@jelhan](https://github.com/jelhan))
* [#942](https://github.com/kaliber5/ember-bootstrap/pull/942) Fix keyboard control of Dropdowns rendered in a wormhole ([@simonihmig](https://github.com/simonihmig))

#### Documentation
* [#960](https://github.com/kaliber5/ember-bootstrap/pull/960) Add note to insertEmberWormholeElementToDom config when rendering app into custom element ([@simonihmig](https://github.com/simonihmig))
* [#959](https://github.com/kaliber5/ember-bootstrap/pull/959) Mention ember-angle-bracket-invocation-polyfill in setup guide ([@simonihmig](https://github.com/simonihmig))
* [#958](https://github.com/kaliber5/ember-bootstrap/pull/958) Fix missing "Addons" nav item in API docs ([@simonihmig](https://github.com/simonihmig))
* [#949](https://github.com/kaliber5/ember-bootstrap/pull/949) Separate docs app ([@simonihmig](https://github.com/simonihmig))
* [#947](https://github.com/kaliber5/ember-bootstrap/pull/947) Fix typo (Pikaday instead of PiCkaday) ([@gianlucatomasino](https://github.com/gianlucatomasino))

#### Internal
* [#954](https://github.com/kaliber5/ember-bootstrap/pull/954) run lint and tests for docs app in CI ([@jelhan](https://github.com/jelhan))
* [#943](https://github.com/kaliber5/ember-bootstrap/pull/943) Update to Ember 3.14 ([@simonihmig](https://github.com/simonihmig))

#### Committers: 4
- Eyüp Atiş ([@eyupatis](https://github.com/eyupatis))
- Gianluca Tomasino ([@gianlucatomasino](https://github.com/gianlucatomasino))
- Jeldrik Hanschke ([@jelhan](https://github.com/jelhan))
- Simon Ihmig ([@simonihmig](https://github.com/simonihmig))
## 3.1.0 (2019-11-02)

#### Features
* [#925](https://github.com/kaliber5/ember-bootstrap/pull/925) Trap focus inside Modals ([@simonihmig](https://github.com/simonihmig))
* [#921](https://github.com/kaliber5/ember-bootstrap/pull/921) Add keyboard control to dropdowns ([@simonihmig](https://github.com/simonihmig))
* [#923](https://github.com/kaliber5/ember-bootstrap/pull/923) Add aria-expanded attribute to dropdown toggle ([@simonihmig](https://github.com/simonihmig))
* [#919](https://github.com/kaliber5/ember-bootstrap/pull/919) onSlideChange action added for bs-carousel ([@Techn1x](https://github.com/Techn1x))
* [#911](https://github.com/kaliber5/ember-bootstrap/pull/911) Add scrollable content support for BS4 modal ([@rwachtler](https://github.com/rwachtler))

#### Bug Fixes
* [#926](https://github.com/kaliber5/ember-bootstrap/pull/926) Add tablist role to <BsTab> ([@simonihmig](https://github.com/simonihmig))
* [#924](https://github.com/kaliber5/ember-bootstrap/pull/924) app.options['ember-bootstrap'] may be undefined ([@jelhan](https://github.com/jelhan))

#### Internal
* [#927](https://github.com/kaliber5/ember-bootstrap/pull/927) Add ember-a11y-testing ([@simonihmig](https://github.com/simonihmig))

#### Committers: 4
- Brad Overton ([@Techn1x](https://github.com/Techn1x))
- Jeldrik Hanschke ([@jelhan](https://github.com/jelhan))
- Ramiz Wachtler ([@rwachtler](https://github.com/rwachtler))
- Simon Ihmig ([@simonihmig](https://github.com/simonihmig))
## 3.0.2 (2019-10-25)

#### Bug Fixes
* [#914](https://github.com/kaliber5/ember-bootstrap/pull/914) Revert Embroider Fix, which caused a Sass import regression ([@simonihmig](https://github.com/simonihmig))

#### Committers: 1
- Simon Ihmig ([@simonihmig](https://github.com/simonihmig))
## 3.0.1 (2019-10-20)

#### Bug Fixes
* [#910](https://github.com/kaliber5/ember-bootstrap/pull/910) Fix compatibility with Embroider ([@simonihmig](https://github.com/simonihmig))

#### Documentation
* [#908](https://github.com/kaliber5/ember-bootstrap/pull/908) fix wrong indentation and typo in component name ([@jelhan](https://github.com/jelhan))

#### Committers: 2
- Jeldrik Hanschke ([@jelhan](https://github.com/jelhan))
- Simon Ihmig ([@simonihmig](https://github.com/simonihmig))
## 3.0.0 (2019-10-11)

#### Documentation
* [#907](https://github.com/kaliber5/ember-bootstrap/pull/907) Replace ember-select-2 example with ember-pikaday in form docs ([@jelhan](https://github.com/jelhan))

#### Committers: 2
- Jeldrik Hanschke ([@jelhan](https://github.com/jelhan))
- Michael Serna ([@sernadesigns](https://github.com/sernadesigns))
## 3.0.0-rc.6 (2019-09-26)

#### Bug Fixes
* [#883](https://github.com/kaliber5/ember-bootstrap/pull/883) Workaround for Ember CLI 3.13 bug (Depreciated/Removed treeForAddonTemplates) ([@veebs](https://github.com/veebs))

#### Committers: 1
- Vibul Imtarnasan ([@veebs](https://github.com/veebs))
## 3.0.0-rc.5 (2019-09-10)

#### Bug Fixes
* [#894](https://github.com/kaliber5/ember-bootstrap/pull/894) Move ember-decorators to dependencies ([@simonihmig](https://github.com/simonihmig))

#### Committers: 1
- Simon Ihmig ([@simonihmig](https://github.com/simonihmig))
## 3.0.0-rc.4 (2019-09-09)

#### :boom: Breaking Change
* [#888](https://github.com/kaliber5/ember-bootstrap/pull/888) Migrated all components to native classes. Requires Babel-Polyfill for IE11 ([@simonihmig](https://github.com/simonihmig))

#### Documentation
* [#892](https://github.com/kaliber5/ember-bootstrap/pull/892) Fix CSP for demo app ([@simonihmig](https://github.com/simonihmig))

#### Internal
* [#888](https://github.com/kaliber5/ember-bootstrap/pull/888) Migrated all components to native classes. Requires Babel-Polyfill for IE11 ([@simonihmig](https://github.com/simonihmig))

#### Committers: 3
- Cyrille David ([@dcyriller](https://github.com/dcyriller))
- Jeldrik Hanschke ([@jelhan](https://github.com/jelhan))
- Simon Ihmig ([@simonihmig](https://github.com/simonihmig))
## 3.0.0-rc.3 (2019-08-23)

#### :boom: Breaking Change
* [#879](https://github.com/kaliber5/ember-bootstrap/pull/879) Revert the link support of nav.item and the deprecation of nav.link-to ([@simonihmig](https://github.com/simonihmig))

  *Note: this is a breaking change only compared to `3.0.0-rc.x`, but not compared to previous versions, as it reverts the changes in `3.0.0-rc.0`*

#### Features
* [#886](https://github.com/kaliber5/ember-bootstrap/pull/886) Add `linkTo` alias for yielded nav and dropdown link components, for better angle brackets style ([@simonihmig](https://github.com/simonihmig))

#### Bug Fixes
* [#884](https://github.com/kaliber5/ember-bootstrap/pull/884) Fix FastBoot rendering of opened modals ([@simonihmig](https://github.com/simonihmig))
* [#871](https://github.com/kaliber5/ember-bootstrap/pull/871) Workaround nav.item not applying `active` class correctly due to Ember 3.12-beta bug ([@simonihmig](https://github.com/simonihmig))
* [#877](https://github.com/kaliber5/ember-bootstrap/pull/877) support hash helper used as form model ([@jelhan](https://github.com/jelhan))
* [#872](https://github.com/kaliber5/ember-bootstrap/pull/872) Fix form validation for Ember 3.12-beta ([@simonihmig](https://github.com/simonihmig))

#### Documentation
* [#885](https://github.com/kaliber5/ember-bootstrap/pull/885) Update docs to show angle bracket syntax for dropdown link-to ([@simonihmig](https://github.com/simonihmig))

#### Internal
* [#875](https://github.com/kaliber5/ember-bootstrap/pull/875) Refactor FastBoot tests to use ember-cli-fastboot-testing ([@simonihmig](https://github.com/simonihmig))

#### Committers: 2
- Jeldrik Hanschke ([@jelhan](https://github.com/jelhan))
- Simon Ihmig ([@simonihmig](https://github.com/simonihmig))
## 3.0.0-rc.2 (2019-08-12)

#### :boom: Breaking Change
* [#861](https://github.com/kaliber5/ember-bootstrap/pull/861) Change nav.item link support to match Ember's `<LinkTo>` ([@simonihmig](https://github.com/simonihmig))
* [#862](https://github.com/kaliber5/ember-bootstrap/pull/862) BsForm should not catch errors thrown by onSubmit action ([@jelhan](https://github.com/jelhan))

#### Features
* [#861](https://github.com/kaliber5/ember-bootstrap/pull/861) Change nav.item link support to match Ember's `<LinkTo>` ([@simonihmig](https://github.com/simonihmig))
* [#859](https://github.com/kaliber5/ember-bootstrap/pull/859) Warn if configured to import Glyphicon but Boostrap 4 is used ([@jelhan](https://github.com/jelhan))

#### Bug Fixes
* [#862](https://github.com/kaliber5/ember-bootstrap/pull/862) BsForm should not catch errors thrown by onSubmit action ([@jelhan](https://github.com/jelhan))

#### Internal
* [#864](https://github.com/kaliber5/ember-bootstrap/pull/864) Refactored mixins ([@simonihmig](https://github.com/simonihmig))

#### Committers: 2
- Jeldrik Hanschke ([@jelhan](https://github.com/jelhan))
- Simon Ihmig ([@simonihmig](https://github.com/simonihmig))
## 3.0.0-rc.1 (2019-07-08)

#### :boom: Breaking Change
* [#851](https://github.com/kaliber5/ember-bootstrap/pull/851) Render Modals, Tooltips and Popovers in a wormhole even in tests ([@simonihmig](https://github.com/simonihmig))

#### Bug Fixes
* [#847](https://github.com/kaliber5/ember-bootstrap/pull/847) FormElement: revert passing HTML attributes to its control component w/ angle brackets ([@simonihmig](https://github.com/simonihmig))

#### Committers: 1
- Simon Ihmig ([@simonihmig](https://github.com/simonihmig))

## v3.0.0-rc.0 (2019-06-26)

#### :boom: Breaking Change
* [#842](https://github.com/kaliber5/ember-bootstrap/pull/842) Button is disabled by default if in pending state ([@jelhan](https://github.com/jelhan))
* [#834](https://github.com/kaliber5/ember-bootstrap/pull/834) Form's and Button's preventConcurrency defaults to true ([@jelhan](https://github.com/jelhan))
* [#820](https://github.com/kaliber5/ember-bootstrap/pull/820) Form validations are shown only after an eventual promise returned from onInvalid action resolves ([@simonihmig](https://github.com/simonihmig))
* [#794](https://github.com/kaliber5/ember-bootstrap/pull/794) Add novalidate attribute to forms by default if they support client-side validations ([@simonihmig](https://github.com/simonihmig))
* [#788](https://github.com/kaliber5/ember-bootstrap/pull/788) Drop node 6 support ([@simonihmig](https://github.com/simonihmig))
* [#787](https://github.com/kaliber5/ember-bootstrap/pull/787) Dropped support for Ember < 2.18 ([@simonihmig](https://github.com/simonihmig))
* [#795](https://github.com/kaliber5/ember-bootstrap/pull/795) Modals are tagless (wrapping div has been removed), which might break when setting an ID or `ember-test-selectors` attribute on curly component invocation.
  Angle bracket component invocation syntax should be used for that use case. E.g. `{{#bs-modal data-test-foo=true}}` should be refactored to `<BsModal data-test-foo>`.

#### Features
* [#842](https://github.com/kaliber5/ember-bootstrap/pull/842) Button is disabled by default if in pending state ([@jelhan](https://github.com/jelhan))
* [#834](https://github.com/kaliber5/ember-bootstrap/pull/834) Form's and Button's preventConcurrency defaults to true ([@jelhan](https://github.com/jelhan))
* [#795](https://github.com/kaliber5/ember-bootstrap/pull/795) Refactored templates to Octane style (angle bracket invocation, named args, this.args), allows setting HTML attributes using angle bracket invocation to the proper element ([@simonihmig](https://github.com/simonihmig))
* [#820](https://github.com/kaliber5/ember-bootstrap/pull/820) Form validations are shown only after an eventual promise returned from onInvalid action resolves ([@simonihmig](https://github.com/simonihmig))
* [#783](https://github.com/kaliber5/ember-bootstrap/pull/783) Add linkTo support for nav.item, deprecate nav.link-to ([@simonihmig](https://github.com/simonihmig))
* [#794](https://github.com/kaliber5/ember-bootstrap/pull/794) Add novalidate attribute to forms by default if they support client-side validations ([@simonihmig](https://github.com/simonihmig))

#### Documentation
* [#819](https://github.com/kaliber5/ember-bootstrap/pull/819) Add dynamic snippets to demo app ([@simonihmig](https://github.com/simonihmig))
* [#777](https://github.com/kaliber5/ember-bootstrap/pull/777) Update API docs for Angle Bracket Invocation ([@betocantu93](https://github.com/betocantu93))
* [#778](https://github.com/kaliber5/ember-bootstrap/pull/778) Updated demo examples to angle brackets syntax ([@rajasegar](https://github.com/rajasegar))

#### Internal
* [#840](https://github.com/kaliber5/ember-bootstrap/pull/840) Update all dependencies ([@simonihmig](https://github.com/simonihmig))

#### Committers: 5
- Alberto Cantú Gómez ([@betocantu93](https://github.com/betocantu93))
- Andrey Mikhaylov (lolmaus) ([@lolmaus](https://github.com/lolmaus))
- Rajasegar Chandran ([@rajasegar](https://github.com/rajasegar))
- Simon Ihmig ([@simonihmig](https://github.com/simonihmig))
- jelhan ([@jelhan](https://github.com/jelhan))


## v2.8.0 (2019-06-14)

#### Features
* [#789](https://github.com/kaliber5/ember-bootstrap/pull/789) Yield submit action from BsForm ([@jelhan](https://github.com/jelhan))

#### Committers: 1
- jelhan ([@jelhan](https://github.com/jelhan))
## v2.7.1 (2019-05-26)

#### Bug Fixes
* [#818](https://github.com/kaliber5/ember-bootstrap/pull/818) Form asserts for valid `formLayout` value ([@simonihmig](https://github.com/simonihmig))
* [#815](https://github.com/kaliber5/ember-bootstrap/pull/815) Fixed modal error when clicking on SVG in IE11 ([@simonihmig](https://github.com/simonihmig))

#### Committers: 1
- Simon Ihmig ([@simonihmig](https://github.com/simonihmig))
## v2.7.0 (2019-05-14)

#### Features
* [#809](https://github.com/kaliber5/ember-bootstrap/pull/809) Propagate `disabled` and `readonly` property to all yielded form elements ([@simonihmig](https://github.com/simonihmig))
* [#701](https://github.com/kaliber5/ember-bootstrap/pull/701) Modal header component yields title and close components ([@lougreenwood](https://github.com/lougreenwood))

#### Committers: 2
- Lou Greenwood ([@lougreenwood](https://github.com/lougreenwood))
- Simon Ihmig ([@simonihmig](https://github.com/simonihmig))
## v2.6.2 (2019-04-24)

#### Features
* [#804](https://github.com/kaliber5/ember-bootstrap/pull/804) Assertion to prevent setting both property and value on a form element ([@rrglomsk](https://github.com/rrglomsk))

#### Internal
* [#802](https://github.com/kaliber5/ember-bootstrap/pull/802) Allow ember-concurrency 0.8.x - 0.10.x ([@simonihmig](https://github.com/simonihmig))

#### Committers: 3
- Rachel Glomski ([@rrglomsk](https://github.com/rrglomsk))
- Simon Ihmig ([@simonihmig](https://github.com/simonihmig))
- jelhan ([@jelhan](https://github.com/jelhan))
## v2.6.1 (2019-04-04)

#### Bug Fixes
* [#782](https://github.com/kaliber5/ember-bootstrap/pull/782) nav items should not have role="presentation" ([@jelhan](https://github.com/jelhan))
* [#786](https://github.com/kaliber5/ember-bootstrap/pull/786) Dropdown respects closeOnMenuClick=false even after re-opening the menu ([@marceloandrader](https://github.com/marceloandrader))
* [#775](https://github.com/kaliber5/ember-bootstrap/pull/775) Fix IE 11 throws if form.element is used with a not-supported controlType ([@jelhan](https://github.com/jelhan))
* [#770](https://github.com/kaliber5/ember-bootstrap/pull/770) radio controls should be usable in block mode ([@jelhan](https://github.com/jelhan))

#### Documentation
* [#791](https://github.com/kaliber5/ember-bootstrap/pull/791) Add ember-bootstrap-model-select to addon integrations ([@nickschot](https://github.com/nickschot))

#### Internal
* [#785](https://github.com/kaliber5/ember-bootstrap/pull/785) Update to Ember 3.8 ([@simonihmig](https://github.com/simonihmig))

#### Committers: 5
- Marcelo Andrade ([@marceloandrader](https://github.com/marceloandrader))
- Nick Schot ([@nickschot](https://github.com/nickschot))
- Simon Ihmig ([@simonihmig](https://github.com/simonihmig))
- [@kumy](https://github.com/kumy)
- jelhan ([@jelhan](https://github.com/jelhan))
## v2.6.0 (2019-03-05)

#### Features
* [#732](https://github.com/kaliber5/ember-bootstrap/pull/732) Form yields isSubmitted and isRejected properties ([@jelhan](https://github.com/jelhan))
* [#753](https://github.com/kaliber5/ember-bootstrap/pull/753) Forms use the set function of the model if it is present ([@nickschot](https://github.com/nickschot))

#### Bug Fixes
* [#767](https://github.com/kaliber5/ember-bootstrap/pull/767) Fix IE11 errors in Collapse and Progress components ([@simonihmig](https://github.com/simonihmig))
* [#766](https://github.com/kaliber5/ember-bootstrap/pull/766) Fix inline radio element used with optionLabelPath (BS3) ([@kumy](https://github.com/kumy))
* [#756](https://github.com/kaliber5/ember-bootstrap/pull/756) Fixed deprecations in Ember 3.8.0-beta and 3.9-canary ([@simonihmig](https://github.com/simonihmig))
* [#754](https://github.com/kaliber5/ember-bootstrap/pull/754) Fix transition for bs-collapse ([@simonihmig](https://github.com/simonihmig))

#### Documentation
* [#765](https://github.com/kaliber5/ember-bootstrap/pull/765) Add controlType in radio examples ([@kumy](https://github.com/kumy))

#### Internal
* [#764](https://github.com/kaliber5/ember-bootstrap/pull/764) Drop Saucelabs in favour of Browserstack ([@simonihmig](https://github.com/simonihmig))
* [#763](https://github.com/kaliber5/ember-bootstrap/pull/763) Make ButtonGroup's justified property BS3 only ([@simonihmig](https://github.com/simonihmig))
* [#758](https://github.com/kaliber5/ember-bootstrap/pull/758) tests: remove work-a-round for qunit test runner CSP violation ([@jelhan](https://github.com/jelhan))

#### Committers: 4
- Nick Schot ([@nickschot](https://github.com/nickschot))
- Simon Ihmig ([@simonihmig](https://github.com/simonihmig))
- [@kumy](https://github.com/kumy)
- jelhan ([@jelhan](https://github.com/jelhan))
## v2.5.0 (2019-01-31)

#### Features
* [#741](https://github.com/kaliber5/ember-bootstrap/pull/741) Add option to hide all validations after form submission ([@simonihmig](https://github.com/simonihmig))
* [#746](https://github.com/kaliber5/ember-bootstrap/pull/746) CSP: refactor to not require `style-src 'unsafe-inline` and add test coverage ([@jelhan](https://github.com/jelhan))

#### Bug Fixes
* [#745](https://github.com/kaliber5/ember-bootstrap/pull/745) Fix broken tooltips/popovers in Ember 3.8.0(-beta) ([@simonihmig](https://github.com/simonihmig))
* [#737](https://github.com/kaliber5/ember-bootstrap/pull/737) Form: click on input group button should not show validations ([@jelhan](https://github.com/jelhan))
* [#738](https://github.com/kaliber5/ember-bootstrap/pull/738) Modal should not violate CSP style-src 'none' ([@jelhan](https://github.com/jelhan))
* [#735](https://github.com/kaliber5/ember-bootstrap/pull/735) Fix popover clicks ([@bendemboski](https://github.com/bendemboski))
* [#730](https://github.com/kaliber5/ember-bootstrap/pull/730) Form submission state reflects Promise returned by onInvalid action ([@jelhan](https://github.com/jelhan))

#### Internal
* [#744](https://github.com/kaliber5/ember-bootstrap/pull/744) Fix failing build under node 6 ([@simonihmig](https://github.com/simonihmig))

#### Committers: 5
- Ben Demboski ([@bendemboski](https://github.com/bendemboski))
- Lou Greenwood ([@lougreenwood](https://github.com/lougreenwood))
- Simon Ihmig ([@simonihmig](https://github.com/simonihmig))
- Sumeet Attree ([@sumeetattree](https://github.com/sumeetattree))
- jelhan ([@jelhan](https://github.com/jelhan))
## v2.4.0 (2018-12-18)

#### Features
* [#726](https://github.com/kaliber5/ember-bootstrap/pull/726) Add support for radio form elements ([@simonihmig](https://github.com/simonihmig))

#### Bug Fixes
* [#718](https://github.com/kaliber5/ember-bootstrap/pull/718) Fix layout of checkbox elements for Bootstrap 4 ([@simonihmig](https://github.com/simonihmig))
* [#714](https://github.com/kaliber5/ember-bootstrap/pull/714) Remove deprecated copy method ([@jelhan](https://github.com/jelhan))

#### Documentation
* [#719](https://github.com/kaliber5/ember-bootstrap/pull/719) Add docs section about supplementary addons ([@simonihmig](https://github.com/simonihmig))
* [#712](https://github.com/kaliber5/ember-bootstrap/pull/712) Add a Contribution Guide with detailed instructions for new contributors ([@simonihmig](https://github.com/simonihmig))
* [#710](https://github.com/kaliber5/ember-bootstrap/pull/710) Remove broken crosslink closing tag ([@nickschot](https://github.com/nickschot))

#### Internal
* [#727](https://github.com/kaliber5/ember-bootstrap/pull/727) Update all dependencies ([@simonihmig](https://github.com/simonihmig))

#### Committers: 3
- Nick Schot ([@nickschot](https://github.com/nickschot))
- Simon Ihmig ([@simonihmig](https://github.com/simonihmig))
- jelhan ([@jelhan](https://github.com/jelhan))

## v2.3.0 (2018-11-18)

#### Features
* [#698](https://github.com/kaliber5/ember-bootstrap/pull/698) Improve yielded components ([@lougreenwood](https://github.com/lougreenwood))
* [#688](https://github.com/kaliber5/ember-bootstrap/pull/688) Modal: Improve accessibility with proper ARIA attributes ([@dgavey](https://github.com/dgavey))
* [#686](https://github.com/kaliber5/ember-bootstrap/pull/686) Form: optionally prevent concurrent submissions ([@jelhan](https://github.com/jelhan))
* [#669](https://github.com/kaliber5/ember-bootstrap/pull/669) Button: optional prevent concurrent click actions ([@jelhan](https://github.com/jelhan))

#### Bug Fixes
* [#706](https://github.com/kaliber5/ember-bootstrap/pull/706) Dropdown: Clicking outside should close the menu when closeOnMenuClick and renderInPlace are false ([@offirgolan](https://github.com/offirgolan))
* [#702](https://github.com/kaliber5/ember-bootstrap/pull/702) Don't wrap checkboxes in labels [BS4] ([@lougreenwood](https://github.com/lougreenwood))

#### Internal
* [#709](https://github.com/kaliber5/ember-bootstrap/pull/709) Update ember-cli-release hook for changelog generation ([@simonihmig](https://github.com/simonihmig))
* [#708](https://github.com/kaliber5/ember-bootstrap/pull/708) Use lerna-changelog for Changelog generation ([@simonihmig](https://github.com/simonihmig))
* [#695](https://github.com/kaliber5/ember-bootstrap/pull/695) Update to Ember 3.5 ([@simonihmig](https://github.com/simonihmig))

#### Committers: 5
- Derek Gavey ([@dgavey](https://github.com/dgavey))
- Lou Greenwood ([@lougreenwood](https://github.com/lougreenwood))
- Offir Golan ([@offirgolan](https://github.com/offirgolan))
- Simon Ihmig ([@simonihmig](https://github.com/simonihmig))
- jelhan ([@jelhan](https://github.com/jelhan))<a name="2.2.0"></a>
## [2.2.0](https://github.com/kaliber5/ember-bootstrap/compare/v2.1.2...v2.2.0) (2018-10-25)


#### Bug Fixes

* **Dropdown:** Propagate class to the menu dom element. Thanks to [@offirgolan](https://github.com/offirgolan) ([0ca7edb](https://github.com/kaliber5/ember-bootstrap/commit/0ca7edb))


#### Features

* **Accordion:** add disabled property to Accordion. Thanks to [@donaldwasserman](https://github.com/donaldwasserman) ([d81b9fd](https://github.com/kaliber5/ember-bootstrap/commit/d81b9fd))
* **Form:** support autocapitalize and autocorrect attributes. Thanks to [@CodingItWrong](https://github.com/CodingItWrong) ([402c975](https://github.com/kaliber5/ember-bootstrap/commit/402c975))



<a name="2.1.2"></a>
## [2.1.2](https://github.com/kaliber5/ember-bootstrap/compare/2.1.1...2.1.2) (2018-09-26)

#### Bug Fixes

* **Button**: fixed empty title when button has Promise-based state and no state texts (`fulfillText` etc.). Thanks to [@andreasschacht](https://github.com/andreasschacht)

<a name="2.1.1"></a>
## [2.1.1](https://github.com/kaliber5/ember-bootstrap/compare/2.1.0...2.1.1) (2018-09-18)

#### Bug Fixes

* **Dropdown:** fixed actions on dropdown menu's children not being fired due to prematurely removing the menu from DOM (introduced in 2.1.0), closes [#660](https://github.com/kaliber5/ember-bootstrap/issues/660)

<a name="2.1.0"></a>
## [2.1.0](https://github.com/kaliber5/ember-bootstrap/compare/2.0.0...2.1.0) (2018-09-06)


#### Bug Fixes

* **Button:** reset should not change `state` multiple times in one runloop ([1e6e05d](https://github.com/kaliber5/ember-bootstrap/commit/1e6e05d))
* **Dropdown:** prevent missing popperContainer exception for dropdown with `renderInPlace=false` in tests ([c3668ae](https://github.com/kaliber5/ember-bootstrap/commit/c3668ae)), closes [#633](https://github.com/kaliber5/ember-bootstrap/issues/633)
* **Dropdown:** render menu lazily only when opening it. ([e4b6ffd](https://github.com/kaliber5/ember-bootstrap/commit/e4b6ffd))
* **Tooltip:** fix `calling set on destroyed element` issue for bs-tooltip. Thanks to [@brandynbenett](https://github.com/brandynbenett) ([263767b](https://github.com/kaliber5/ember-bootstrap/commit/263767b))


#### Features

* **Button:** bs-button yields state and shorthands. Thanks to [@jelhan](https://github.com/jelhan) ([59631d6](https://github.com/kaliber5/ember-bootstrap/commit/59631d6))
* **Dropdown:** dropdown actions are yielded. Thanks to [@sdhull](https://github.com/sdhull) ([db4d1ce](https://github.com/kaliber5/ember-bootstrap/commit/db4d1ce))
* **Dropdown:** optionally render BS3 dropdowns in a wormhole. Thanks to [@Techn1x](https://github.com/Techn1x) ([8cd3d82](https://github.com/kaliber5/ember-bootstrap/commit/8cd3d82))
* **Form:** yields isSubmitting state. Thanks to [@jelhan](https://github.com/jelhan) ([5be6974](https://github.com/kaliber5/ember-bootstrap/commit/5be6974))
* **Navbar:** yield toggleNavBar action. Thanks to [@sdhull](https://github.com/sdhull) ([7e9e0e0](https://github.com/kaliber5/ember-bootstrap/commit/7e9e0e0))


<a name="2.0.0"></a>
## [2.0.0](https://github.com/kaliber5/ember-bootstrap/compare/1.2.2...2.0.0) (2018-06-23)


#### Bug Fixes

* **Accordion:** BS4: update markup to match Bootstrap 4's default markup ([6ace8a9](https://github.com/kaliber5/ember-bootstrap/commit/6ace8a9))
* **Build:** also apply `whitelist`/`blacklist` based "tree shaking" to app tree (re-exports of addon tree) ([a8fa8d1](https://github.com/kaliber5/ember-bootstrap/commit/a8fa8d1)), closes [#472](https://github.com/kaliber5/ember-bootstrap/issues/472)
* **FormElement:** always show validation errors in BS4, including for e.g. input groups ([396d59e](https://github.com/kaliber5/ember-bootstrap/commit/396d59e)), closes [#578](https://github.com/kaliber5/ember-bootstrap/issues/578)
* **FormElement:** fix exception for destroyed elements. Thanks to @BartTK ([a3214f0](https://github.com/kaliber5/ember-bootstrap/commit/a3214f0))


#### Features

* **Setup:** make Bootstrap 4 the new default ([ee0767b](https://github.com/kaliber5/ember-bootstrap/commit/ee0767b))
* **Carousel:** support transition="slide" for BS4 carousels. Thanks to [@nbrookie](https://github.com/nbrookie) ([fa8550a](https://github.com/kaliber5/ember-bootstrap/commit/fa8550a)), closes [#591](https://github.com/kaliber5/ember-bootstrap/issues/591)
* set all transitions to 0 in testing mode to speed up test runs ([fc38c0b](https://github.com/kaliber5/ember-bootstrap/commit/fc38c0b)), closes [#595](https://github.com/kaliber5/ember-bootstrap/issues/595)
* **Tooltip/Popover:** yield `close` action to enable custom hiding behavior ([b901a92](https://github.com/kaliber5/ember-bootstrap/commit/b901a92)), closes [#475](https://github.com/kaliber5/ember-bootstrap/issues/475)


### BREAKING CHANGES

* **Setup:** If you are using Bootstrap 3 and you don't have `bootstrapVersion` explicitly in the bootstrap config of your
  `ember-cli-build.js`, then this change will implicitly switch to Bootstrap 4. In this case please run
  `ember g ember-bootstrap --bootstrapVersion=3` to fix it at version 3!
* **Build:** Support for node.js 4 has been dropped!


<a name="1.2.2"></a>
## [1.2.2](https://github.com/kaliber5/ember-bootstrap/compare/1.2.1...1.2.2) (2018-04-12)


#### Bug Fixes

* **Tooltip/Popover:** updated ember-popper, which fixes incompatibility with Ember 3.1 ([0d81cc3](https://github.com/kaliber5/ember-bootstrap/commit/0d81cc3))


#### Features

* **Dropdown:** in BS4 the dropdown menu can be rendered in a wormhole by setting `renderInPlace=false` to prevent clipping issues ([d0dcbb3](https://github.com/kaliber5/ember-bootstrap/commit/d0dcbb3)), closes [#561](https://github.com/kaliber5/ember-bootstrap/issues/561)



<a name="1.2.1"></a>
## [1.2.1](https://github.com/kaliber5/ember-bootstrap/compare/1.2.0...1.2.1) (2018-02-19)


#### Bug Fixes

* **Modal:** fix memory leak, caused by not removed event listener ([f979cf2](https://github.com/kaliber5/ember-bootstrap/commit/f979cf2))
* **Navbar:** removed the `align` property of the `nav-toggler` component for BS4 ([70a556b](https://github.com/kaliber5/ember-bootstrap/commit/70a556b))


#### Features

* **Nav:** yielded DropDown automatically is a `<li>`, no need to set tagName="li" anymore ([aaef6be](https://github.com/kaliber5/ember-bootstrap/commit/aaef6be))



<a name="1.2.0"></a>
## [1.2.0](https://github.com/kaliber5/ember-bootstrap/compare/1.1.0...1.2.0) (2018-01-19)


#### Bug Fixes

* **Modal:** submitting form in nested bs-modal-simple throws ([9b64553](https://github.com/kaliber5/ember-bootstrap/commit/9b64553)), closes [#533](https://github.com/kaliber5/ember-bootstrap/issues/533)
* **Navbar:** toggle button does not inherit from `bs-button` anymore, removing the extraneous `.btn`, `.btn-*` classes ([0cd00ea](https://github.com/kaliber5/ember-bootstrap/commit/0cd00ea)), closes [#531](https://github.com/kaliber5/ember-bootstrap/issues/531)
* **Tooltip/Popover:** fix `focus` trigger event for iOS ([83c219e](https://github.com/kaliber5/ember-bootstrap/commit/83c219e))


#### Features

* **Bootstrap 4:** uses now the recently released stable Bootstrap 4.0.0! 🎉 ([f3c6f7a](https://github.com/kaliber5/ember-bootstrap/commit/f3c6f7a))
  Bootstrap 4 support can now be considered stable and official!
  Make sure to update your dependencies if you used a pre-release version of Bootstrap 4 before, using `ember g ember-bootstrap`!



<a name="1.1.0"></a>
## [1.1.0](https://github.com/kaliber5/ember-bootstrap/compare/1.0.0...1.1.0) (2018-01-18)


#### Features

* **Carousel:** Added brand new `bs-carousel` component, with a native Ember implementation of Bootstrap's Carousels. Thanks to [@c410-f3r](https://github.com/c410-f3r), closes [#138](https://github.com/kaliber5/ember-bootstrap/issues/138)
* **Bootstrap 4:** added support for the latest 4.0.0-beta.3 release ([952ee5c](https://github.com/kaliber5/ember-bootstrap/commit/952ee5c))
* **Dropdown:** support dropright and dropleft variations for Bootstrap 4.0.0-beta.3 ([1538e34](https://github.com/kaliber5/ember-bootstrap/commit/1538e34)), closes [#517](https://github.com/kaliber5/ember-bootstrap/issues/517)
* **Form:** allow multiple form error messages. Thanks to [@c410-f3r](https://github.com/c410-f3r) ([35b27ca](https://github.com/kaliber5/ember-bootstrap/commit/35b27ca)), closes [#253](https://github.com/kaliber5/ember-bootstrap/issues/253)
* **Modal:** enable centered modal for Bootstrap 4.0.0-beta.3 ([5f04af9](https://github.com/kaliber5/ember-bootstrap/commit/5f04af9))
* **Modal:** Use the Glimmer `in-element` API ([4533ade](https://github.com/kaliber5/ember-bootstrap/commit/4533ade))



<a name="1.0.0"></a>
## [1.0.0](https://github.com/kaliber5/ember-bootstrap/compare/1.0.0-rc.5...1.0.0) (2017-12-19)


#### Bug Fixes

* **Accordion:** fix accordion items wrongly registering as childs on the (wrong) parent, e.g. on tab component. ([37fac1c](https://github.com/kaliber5/ember-bootstrap/commit/37fac1c))
* **Install:** remove usage of deprecated `nodeModulesPath` ember-cli property ([36444b6](https://github.com/kaliber5/ember-bootstrap/commit/36444b6)), closes [#506](https://github.com/kaliber5/ember-bootstrap/issues/506)



<a name="1.0.0-rc.5"></a>
## [1.0.0-rc.5](https://github.com/kaliber5/ember-bootstrap/compare/1.0.0-rc.4...1.0.0-rc.5) (2017-12-04)


#### Bug Fixes

* **FormElement:** fix conflicting usage of the `size` property for setting the Bootstrap size classes and the input's size attribute ([cdd2608](https://github.com/kaliber5/ember-bootstrap/commit/cdd2608)), closes [#492](https://github.com/kaliber5/ember-bootstrap/issues/492)
* **FormElement:** fix sizing classes for Bootstrap 4 ([78e160e](https://github.com/kaliber5/ember-bootstrap/commit/78e160e)), closes [#494](https://github.com/kaliber5/ember-bootstrap/issues/494)
* **Modal:** fix async callbacks throwing errors when component has already been destroyed. Thanks to [@larsklevan](https://github.com/larsklevan). ([5ffb806](https://github.com/kaliber5/ember-bootstrap/commit/5ffb806)), closes [#477](https://github.com/kaliber5/ember-bootstrap/issues/477)
* **Modal:** fix clicking on modal backdrop to close the modal on iOS ([5ce1645](https://github.com/kaliber5/ember-bootstrap/commit/5ce1645)), closes [#482](https://github.com/kaliber5/ember-bootstrap/issues/482)


#### Features

* **Modal:** customizable ModalSimple submit button type. Thanks to [@bgentry](https://github.com/bgentry) ([d45c5f2](https://github.com/kaliber5/ember-bootstrap/commit/d45c5f2)), closes [#232](https://github.com/kaliber5/ember-bootstrap/issues/232)
* **Modal:** does not render modal to DOM unless visible ([0eb41de](https://github.com/kaliber5/ember-bootstrap/commit/0eb41de))


### BREAKING CHANGES

* **FormElement:** to set the `size` attribute of a FormElement's `<input>` element you will have to use the `controlSize` property, instead of `size`, which is used to set Bootstrap classes for larger or smaller form elements.



<a name="1.0.0-rc.4"></a>
## [1.0.0-rc.4](https://github.com/kaliber5/ember-bootstrap/compare/1.0.0-rc.3...1.0.0-rc.4) (2017-11-08)


#### Bug Fixes

* **Build:** Update ember-popper to fix production build w/ sourcemaps ([db10cb4](https://github.com/kaliber5/ember-bootstrap/commit/db10cb4)), closes [#468](https://github.com/kaliber5/ember-bootstrap/issues/468)


#### Features

* **Bootstrap 4: Added support for the most recent Bootstrap 4.0.0-beta release!**
  The Bootstrap 4 beta release contained a lot of breaking changes compared to the alpha releases, which required a lot
  of updates to the markup generated by the various Ember components. Because of that, you cannot use this release of
  ember-bootstrap with Bootstrap 4.0.0-alpha. To make sure you have the right version of the `bootstrap` npm package
  installed, run `ember generate ember-bootstrap` after updating!


<a name="1.0.0-rc.3"></a>
## [1.0.0-rc.3](https://github.com/kaliber5/ember-bootstrap/compare/1.0.0-rc.2...1.0.0-rc.3) (2017-10-08)


#### Bug Fixes

* **Dropdown:** Close dropdowns during event capture phase. Thanks to [jeloba](https://github.com/jeloba) ([b220432](https://github.com/kaliber5/ember-bootstrap/commit/b220432))
* **Dropdown:** fix rendering in FastBoot w/ Ember 2.15 ([070a3ec](https://github.com/kaliber5/ember-bootstrap/commit/070a3ec))
* **Install:** downgrade findup-sync dependency to work around a Windows installation issue ([6dc9a39](https://github.com/kaliber5/ember-bootstrap/commit/6dc9a39))
* **Install:** lock in bootstrap 4 to alpha 6. Thanks to [@bgentry](https://github.com/bgentry) ([f514ac3](https://github.com/kaliber5/ember-bootstrap/commit/f514ac3))
* **Nav:** fixed 'You modified "active" twice on in a single render' exception when `nav.link-to` has dynamic link ([09e8fa7](https://github.com/kaliber5/ember-bootstrap/commit/09e8fa7))


#### Features

* **Browser support:** support for IE 9/10 has been dropped ([343865f](https://github.com/kaliber5/ember-bootstrap/commit/343865f))
* **Tooltip/Popover:** usage of ember-popper/popper.js replaces homegrown positioning logic ([0e76009](https://github.com/kaliber5/ember-bootstrap/commit/0e76009))


### BREAKING CHANGES

* **Browser support:** support for IE 9/10 has been dropped



<a name="1.0.0-rc.2"></a>
## [1.0.0-rc.2](https://github.com/kaliber5/ember-bootstrap/compare/1.0.0-rc.1...1.0.0-rc.2) (2017-08-24)


#### Bug Fixes

* **BS4:** Pin Bootstrap4 version to 4.0.0-alpha.6 until -beta issues have been fixed, see [#410](https://github.com/kaliber5/ember-bootstrap/issues/410) ([ad2dcee](https://github.com/kaliber5/ember-bootstrap/commit/ad2dcee))
* **Form:** assert valid `formLayout`. Thanks to [@donaldwasserman](https://github.com/donaldwasserman) ([c03bdf5](https://github.com/kaliber5/ember-bootstrap/commit/c03bdf5)), closes [#418](https://github.com/kaliber5/ember-bootstrap/issues/418)
* **Modal:** fixed Modals in IE9 by using polyfill for unsupported `classlist` ([5b90e44](https://github.com/kaliber5/ember-bootstrap/commit/5b90e44))
* **modal:** fix error in older browsers ([e18bc81](https://github.com/kaliber5/ember-bootstrap/commit/e18bc81)), closes [#395](https://github.com/kaliber5/ember-bootstrap/issues/395)


#### Features

* **Accordion:** enable setting custom class to accordion item body. Thanks to [@Techn1x](https://github.com/Techn1x) ([36646a7](https://github.com/kaliber5/ember-bootstrap/commit/36646a7)), closes [#404](https://github.com/kaliber5/ember-bootstrap/issues/404)
* **Install:** Use findHost function in included hook. Thanks to [@synaptiko](https://github.com/synaptiko) ([dfe2344](https://github.com/kaliber5/ember-bootstrap/commit/dfe2344))



<a name="1.0.0-rc.1"></a>
## [1.0.0-rc.1](https://github.com/kaliber5/ember-bootstrap/compare/1.0.0-beta.2...1.0.0-rc.1) (2017-07-26)


#### Features

* **Build:** add support for (explicit) tree shaking, removing unused components from build ([8852021](https://github.com/kaliber5/ember-bootstrap/commit/8852021)), closes [#140](https://github.com/kaliber5/ember-bootstrap/issues/140)
  See [Setup guide](http://www.ember-bootstrap.com/#/getting-started/setup) for instructions.
* **Button:** setting `bubble=true` will cause a click event to bubble up, even when the button has an `onClick` handler ([2a4cd24](https://github.com/kaliber5/ember-bootstrap/commit/2a4cd24))
* **Modal:** refactored visibility rendering of modals, making open modals render correctly in FastBoot ([565d805](https://github.com/kaliber5/ember-bootstrap/commit/565d805)), closes [#380](https://github.com/kaliber5/ember-bootstrap/issues/380)
* register as Ember library, showing addon version in console and Ember Inspector ([47cc7ef](https://github.com/kaliber5/ember-bootstrap/commit/47cc7ef))

#### Bug Fixes

* **Modal:** fix transitionend event listener removal, fixing occasional problems with modals. Thanks to [@lodrantl](https://github.com/lodrantl)


<a name="1.0.0-beta.2"></a>
## [1.0.0-beta.2](https://github.com/kaliber5/ember-bootstrap/compare/1.0.0-beta.1...1.0.0-beta.2) (2017-06-21)


#### Bug Fixes

* **Accordion:** add static CSS fix to enable clicking on whole header on iOS ([2a8fefe](https://github.com/kaliber5/ember-bootstrap/commit/2a8fefe)), closes [#355](https://github.com/kaliber5/ember-bootstrap/issues/355)
* **Button:** fix event bubbling for submit buttons. Event bubbling is prevented when a `onClick` action handler has been set ([89c575d](https://github.com/kaliber5/ember-bootstrap/commit/89c575d))
* **Button:** Stop event bubbling when clicked ([a2d123b](https://github.com/kaliber5/ember-bootstrap/commit/a2d123b)), closes [#347](https://github.com/kaliber5/ember-bootstrap/issues/347)
* **Dropdown:** Make dropdowns BS4 compliant ([b37c150](https://github.com/kaliber5/ember-bootstrap/commit/b37c150))
* **Form:** fixed various form classes for Bootstrap 4. Thanks to [@Rapid0o](https://github.com/Rapid0o) ([f487ecd](https://github.com/kaliber5/ember-bootstrap/commit/f487ecd)), closes [#336](https://github.com/kaliber5/ember-bootstrap/issues/336)
* **Modal:** Trigger submit on all forms in modal body. Thanks to [@Moxide](https://github.com/Moxide) ([b2b32b8](https://github.com/kaliber5/ember-bootstrap/commit/b2b32b8)), closes [#362](https://github.com/kaliber5/ember-bootstrap/issues/362)
* **Modal/Tooltip/Popover:** Updated ember-wormhole fixes FastBoot problems for Modals, Tooltips and Popovers ([19b8328](https://github.com/kaliber5/ember-bootstrap/commit/19b8328)), closes [#284](https://github.com/kaliber5/ember-bootstrap/issues/284)
* **Popover:** Fix scrollposition for FF - fixes [#357](https://github.com/kaliber5/ember-bootstrap/issues/357) ([ef97a62](https://github.com/kaliber5/ember-bootstrap/commit/ef97a62))
* **Tooltip/Popover:** fixed offset of arrow for subsequent displays ([0ed9042](https://github.com/kaliber5/ember-bootstrap/commit/0ed9042)), closes [#361](https://github.com/kaliber5/ember-bootstrap/issues/361)
* **Tooltip/Popover:** fixed positioning being slightly off ([3ba51b1](https://github.com/kaliber5/ember-bootstrap/commit/3ba51b1))
* **Tooltip/Popover:** Fixed removing event listeners of destroyed components ([33dfda7](https://github.com/kaliber5/ember-bootstrap/commit/33dfda7)), closes [#350](https://github.com/kaliber5/ember-bootstrap/issues/350)


#### Features

* **FormElement:** Add customWarning property to show warnings independently of validation. Thanks to [@elgordino](https://github.com/elgordino) ([540e233](https://github.com/kaliber5/ember-bootstrap/commit/540e233))
* **Navbar:** automatically collapse menu when clicking nav link on mobile ([2008884](https://github.com/kaliber5/ember-bootstrap/commit/2008884)), closes [#317](https://github.com/kaliber5/ember-bootstrap/issues/317)
* **Navbar:** expose public `collapsed` property, call onCollapse/onCollapsed and onExpand/onExpanded actions ([27f0da9](https://github.com/kaliber5/ember-bootstrap/commit/27f0da9))



<a name="1.0.0-beta.1"></a>
## [1.0.0-beta.1](https://github.com/kaliber5/ember-bootstrap/compare/1.0.0-alpha.12...v1.0.0-beta.1) (2017-06-05)


#### Bug Fixes

* **AccordionItem:** preventDefault click on title link. Thanks to [@dajk](https://github.com/dajk) ([78bb9e9](https://github.com/kaliber5/ember-bootstrap/commit/78bb9e9)), closes [#311](https://github.com/kaliber5/ember-bootstrap/issues/311)
* **Modal:** Fixed `onClick` dummy action. Thanks to [@dajk](https://github.com/dajk) ([76dadf2](https://github.com/kaliber5/ember-bootstrap/commit/76dadf2))
* **Setup:** Soften the build-time errors to warnings for non-standard configurations ([fec690e](https://github.com/kaliber5/ember-bootstrap/commit/fec690e)), closes [#322](https://github.com/kaliber5/ember-bootstrap/issues/322)


#### Features

* **jQuery:** Removed jQuery-dependency ([ac489e8](https://github.com/kaliber5/ember-bootstrap/commit/ac489e8)), closes [#300](https://github.com/kaliber5/ember-bootstrap/issues/300)


### BREAKING CHANGES

* **jQuery:** The `triggerElement` and `viewportSelector` properties of tooltips and popovers now expect a valid CSS Selector. If you used any jQuery specific non-standard selector features like `:eq()` for example, this needs to be refactored!



<a name="1.0.0-alpha.12"></a>
## [1.0.0-alpha.12](https://github.com/kaliber5/ember-bootstrap/compare/1.0.0-alpha.11...v1.0.0-alpha.12) (2017-04-26)


#### Features

* **AccordionItem:** yield title and body as contextual components for better customization. Thanks to [@dajk](https://github.com/dajk) ([8d09cdf](https://github.com/kaliber5/ember-bootstrap/commit/8d09cdf)), closes [#283](https://github.com/kaliber5/ember-bootstrap/issues/283)
* **Build:** Upgrade to ember-cli-babel@6 to enable new ember-cli targets feature ([cf9a77d](https://github.com/kaliber5/ember-bootstrap/commit/cf9a77d))



<a name="1.0.0-alpha.11"></a>
## [1.0.0-alpha.11](https://github.com/kaliber5/ember-bootstrap/compare/1.0.0-alpha.10...v1.0.0-alpha.11) (2017-04-21)


#### Features

* **FastBoot:** prepare for upcoming FastBoot 1.0 breaking changes. ember-bootstrap should now be compatible with pre and post 1.0 versions of FastBoot! ([7474e72](https://github.com/kaliber5/ember-bootstrap/commit/7474e72))
* **FormElement:** `helpText` allows you to add a block of help text next to your form control ([c23af92](https://github.com/kaliber5/ember-bootstrap/commit/c23af92)), closes [#169](https://github.com/kaliber5/ember-bootstrap/issues/169)
* **FormElement:** Added `options` and `optionLabelPath` properties to better support select-like control components ([271c52d](https://github.com/kaliber5/ember-bootstrap/commit/271c52d))



<a name="1.0.0-alpha.10"></a>
## [1.0.0-alpha.10](https://github.com/kaliber5/ember-bootstrap/compare/1.0.0-alpha.9...v1.0.0-alpha.10) (2017-04-13)


#### Bug Fixes

* **Install:** Fix dependency validator to allow having bootstrap in bower dependencies. Thanks to [Exelord](https://github.com/exelord).  ([2d5d254](https://github.com/kaliber5/ember-bootstrap/commit/2d5d254))


#### Features

* **Form:** form element yields control component for easier customization ([7fa354a](https://github.com/kaliber5/ember-bootstrap/commit/7fa354a))



<a name="1.0.0-alpha.9"></a>
## [1.0.0-alpha.9](https://github.com/kaliber5/ember-bootstrap/compare/1.0.0-alpha.8...v1.0.0-alpha.9) (2017-04-01)


#### Bug Fixes

* **Install:** Blueprint honor existing config ([#285](https://github.com/kaliber5/ember-bootstrap/issues/285)) ([030131e](https://github.com/kaliber5/ember-bootstrap/commit/030131e)), closes [#282](https://github.com/kaliber5/ember-bootstrap/issues/282)
* **Install:** Use configured `bootstrapVersion` if present ([e68d372](https://github.com/kaliber5/ember-bootstrap/commit/e68d372)), closes [#276](https://github.com/kaliber5/ember-bootstrap/issues/276)
* **Install:** Address the situation where `ember-cli-build.js` could not be edited, closes [#279](https://github.com/kaliber5/ember-bootstrap/issues/279)


#### Features

* **Info command:** added `ember bootstrap:info` command ([2c54d3f](https://github.com/kaliber5/ember-bootstrap/commit/2c54d3f))



<a name="1.0.0-alpha.8"></a>
## [1.0.0-alpha.8](https://github.com/kaliber5/ember-bootstrap/compare/1.0.0-alpha.7...v1.0.0-alpha.8) (2017-03-20)


#### Bug Fixes

* **Install:** fixed default options not being applied at addon installation, causing a `Bootstrap version must be 3 or 4` error ([1d753cb](https://github.com/kaliber5/ember-bootstrap/commit/1d753cb)), closes [#272](https://github.com/kaliber5/ember-bootstrap/issues/272)
* **Install:** fixed wrong config being added to `ember-cli-build.js` when no preprocessor was used ([63210bf](https://github.com/kaliber5/ember-bootstrap/commit/63210bf))
* **Navbar:** Use `fixed-top`, `fixed-bottom`, and `sticky-top` for BS4 for navbar `position` ([bf46b39](https://github.com/kaliber5/ember-bootstrap/commit/bf46b39)), closes [#269](https://github.com/kaliber5/ember-bootstrap/issues/269)



<a name="1.0.0-alpha.7"></a>
## [1.0.0-alpha.7](https://github.com/kaliber5/ember-bootstrap/compare/1.0.0-alpha.6...v1.0.0-alpha.7) (2017-03-19)


#### Bug Fixes

* **Install:** fixed missing dependency (`silent-error`) in package.json ([7f6cc7a](https://github.com/kaliber5/ember-bootstrap/commit/7f6cc7a))



<a name="1.0.0-alpha.6"></a>
## [1.0.0-alpha.6](https://github.com/kaliber5/ember-bootstrap/compare/1.0.0-alpha.5...v1.0.0-alpha.6) (2017-03-18)


#### Bug Fixes

* **Build:** fix build issue with ember-cli 2.12.0. Thanks to [@rwjblue](https://github.com/rwjblue) ([377edb6](https://github.com/kaliber5/ember-bootstrap/commit/377edb6))
* **Dropdown:** Dropdown with a `block=true` toggle button has 'dropdown' class instead of 'btn-group' ([5f9cd78](https://github.com/kaliber5/ember-bootstrap/commit/5f9cd78)), closes [#244](https://github.com/kaliber5/ember-bootstrap/issues/244)
* **FormElement:** shows automatic validation state only when validator addon is present ([#266](https://github.com/kaliber5/ember-bootstrap/issues/266)) ([c163e54](https://github.com/kaliber5/ember-bootstrap/commit/c163e54)), closes [#240](https://github.com/kaliber5/ember-bootstrap/issues/240)


#### Features

* **Installation:** Improved default blueprint (`ember g ember-bootstrap`) for addon installation. Installs only the necessary
  dependencies, based on your chosen Bootstrap version and optional CSS preprocessor. Introduces new options `--bootstrapVersion`
  to easily switch Bootstrap version (3/4) and `--preprocessor` to choose the CSS preprocessor (Sass/Less), including
  installation of the preprocessor addon itself if required. Also does not require Bower anymore!
  Find all details at the [Getting started](http://www.ember-bootstrap.com/#/getting-started/assets) guide.
  Thanks to [srvance](https://github.com/srvance)!
* **Dropdown:** Adds isOpen to dropdown template hash. Thanks to [@theroncross](https://github.com/theroncross) ([58abd4b](https://github.com/kaliber5/ember-bootstrap/commit/58abd4b)), closes [#251](https://github.com/kaliber5/ember-bootstrap/issues/251)



<a name="1.0.0-alpha.5"></a>
## [1.0.0-alpha.5](https://github.com/kaliber5/ember-bootstrap/compare/1.0.0-alpha.4...v1.0.0-alpha.5) (2017-02-27)


#### Features

* **Bootstrap 4:** experimental support for Bootstrap 4 added, thanks to the terrific work of [srvance](https://github.com/srvance). For instructions visit the [Getting started](http://www.ember-bootstrap.com/#/getting-started/bootstrap-4) guide. ([#206](https://github.com/kaliber5/ember-bootstrap/pull/206))
* **FormElement:** `customError` shows custom error message independent of the model's validation ([93e451a](https://github.com/kaliber5/ember-bootstrap/commit/93e451a))
* **Modal:** use separate components for modal header and close button to allow for better customization ([7ba6bc1](https://github.com/kaliber5/ember-bootstrap/commit/7ba6bc1))



<a name="1.0.0-alpha.4"></a>
## [1.0.0-alpha.4](https://github.com/kaliber5/ember-bootstrap/compare/1.0.0-alpha.3...v1.0.0-alpha.4) (2017-02-09)


#### Features

* **FormElement:** Add input as available event for showValidationOn. Thanks to elgordino ([#210](https://github.com/kaliber5/ember-bootstrap/issues/210)) ([b153864](https://github.com/kaliber5/ember-bootstrap/commit/b153864))
* **Modal:** container div for ember-wormhole renamed to `#ember-bootstrap-wormhole`, is added at build-time to index.html, not through initializer anymore ([9b4013a](https://github.com/kaliber5/ember-bootstrap/commit/9b4013a)), closes [#222](https://github.com/kaliber5/ember-bootstrap/issues/222)
* **Modal:** Fall back to not using fade transition in FastBoot by default, so FastBoot rendered app contains immediately visible modal ([b95aad9](https://github.com/kaliber5/ember-bootstrap/commit/b95aad9))



<a name="1.0.0-alpha.3"></a>
## [1.0.0-alpha.3](https://github.com/kaliber5/ember-bootstrap/compare/1.0.0-alpha.2...v1.0.0-alpha.3) (2017-01-21)


#### Features

* **FormElement:** supports most common HTML5 attributes ([3ef492c](https://github.com/kaliber5/ember-bootstrap/commit/3ef492c)), closes [#179](https://github.com/kaliber5/ember-bootstrap/issues/179)
* **FormGroup/FormElement:** supports control sizing through `size` property ([90ca70b](https://github.com/kaliber5/ember-bootstrap/commit/90ca70b)), closes [#202](https://github.com/kaliber5/ember-bootstrap/issues/202)
* **LESS:** when installing ember-bootstrap and ember-cli-less is present, an `@import` statement is automatically added to app.less, the static CSS is not imported (regardless of importBootstrapCSS setting) ([992b65f](https://github.com/kaliber5/ember-bootstrap/commit/992b65f))
* **NavItem:** calls onClick action ([5188c80](https://github.com/kaliber5/ember-bootstrap/commit/5188c80)), closes [#196](https://github.com/kaliber5/ember-bootstrap/issues/196)
* **SASS:** when installing ember-bootstrap and ember-cli-sass is present, the SASS port of Bootstrap 3 is installed and an `@import` statement is automatically added to app.sass ([5666a06](https://github.com/kaliber5/ember-bootstrap/commit/5666a06)), closes [#178](https://github.com/kaliber5/ember-bootstrap/issues/178)
* **SASS/LESS:** Add warnings when required dependencies are missing ([2d2ff5f](https://github.com/kaliber5/ember-bootstrap/commit/2d2ff5f))



<a name="1.0.0-alpha.2"></a>
## [1.0.0-alpha.2](https://github.com/kaliber5/ember-bootstrap/compare/v1.0.0-alpha.1...v1.0.0-alpha.2) (2017-01-10)


#### Bug Fixes

* **FormElement:** input elements also trigger on change event as well as on input event ([62600fc](https://github.com/kaliber5/ember-bootstrap/commit/62600fc))
* **Modal:** Fixed missing close button for header yielded by bs-modal ([1100e3f](https://github.com/kaliber5/ember-bootstrap/commit/1100e3f))



<a name="1.0.0-alpha.1"></a>
## [1.0.0-alpha.1](https://github.com/kaliber5/ember-bootstrap/compare/v1.0.0-alpha...v1.0.0-alpha.1) (2017-01-02)


#### Bug Fixes

* **Form:** Restore the label for a checkbox in vertical layout
* **Modal:** added guard to double invocation of show/hide methods ([eb63088](https://github.com/kaliber5/ember-bootstrap/commit/eb63088))


#### Features

* **Dropdown:** menu item component is yielded as a contextual component from DropdownMenu ([55e508f](https://github.com/kaliber5/ember-bootstrap/commit/55e508f))
* **Form:** FormGroup component is yielded as a contextual component from Form ([0941946](https://github.com/kaliber5/ember-bootstrap/commit/0941946)), closes [#186](https://github.com/kaliber5/ember-bootstrap/issues/186)
* **Nav:** added contextual link-to component ([8c7d2b5](https://github.com/kaliber5/ember-bootstrap/commit/8c7d2b5))



<a name="1.0.0-alpha"></a>
## [1.0.0-alpha](https://github.com/kaliber5/ember-bootstrap/compare/v0.11.3...v1.0.0-alpha) (2016-12-27)

#### Breaking Changes

Please note that the 1.0 release of ember-bootstrap will introduce several breaking changes to make use of modern Ember features, follow Data Down Actions Up (DDAU) best practises and to make its API consistent.
Most changes will fall into one of the following categories:

* Use contextual components for parent/child components
* Use one-way bindings for public properties to not violate DDAU
* renamed actions for consistency

Also ember-bootstrap 1.0 requires at least **Ember v2.3**!

See the following list for details.

#### Features

* **Accordion:** binding to `selected` property is one-way, thus preventing DDAU violations ([a44ec7d](https://github.com/kaliber5/ember-bootstrap/commit/a44ec7d))
* **Accordion:** uses contectual components for items. Fires `onChange` action. ([bbab0f4](https://github.com/kaliber5/ember-bootstrap/commit/bbab0f4))
* **Accordion:** yield `change` action for adding custom behaviour ([e8936cd](https://github.com/kaliber5/ember-bootstrap/commit/e8936cd))
* **Alert:** Binding to visible property is one-way only (DDAU) ([d3ab2f3](https://github.com/kaliber5/ember-bootstrap/commit/d3ab2f3))
* **Alert:** renamed `dismissedAction` to `onDismissed`. Added `onDismiss` action, that prevents hiding the alert automatically when it returns false ([8460af4](https://github.com/kaliber5/ember-bootstrap/commit/8460af4))
* **Alert:** renamed `dismissedAction` to `onDismissed`. Added `onDismiss` action, that prevents hiding the alert automatically when it returns false ([99a139b](https://github.com/kaliber5/ember-bootstrap/commit/99a139b))
* **Button:** removed `toggle` property, `active` state is not changed by button itself anymore (DDAU). Changed default action to `onClick` closure action with changed signature ([14cd0bf](https://github.com/kaliber5/ember-bootstrap/commit/14cd0bf))
* **ButtonGroup:** refactored to make use of contextual components, does not change `value` (DDAU) ([603c67d](https://github.com/kaliber5/ember-bootstrap/commit/603c67d))
* **Collapse:** renamed actions to onShow/onShown/onHide/onHidden ([9dad149](https://github.com/kaliber5/ember-bootstrap/commit/9dad149))
* **Dropdown:** refactored to make use of contextual components, added onShow and onHide actions ([ae4d2af](https://github.com/kaliber5/ember-bootstrap/commit/ae4d2af))
* **Form:** FormElement component is yielded as contextual component ([2509620](https://github.com/kaliber5/ember-bootstrap/commit/2509620))
* **Form:** renamed actions to onBefore/onSubmit/onInvalid ([e1397a1](https://github.com/kaliber5/ember-bootstrap/commit/e1397a1))
* **FormElement:** support readonly attribute. Thanks to basz ([dec8e8c](https://github.com/kaliber5/ember-bootstrap/commit/dec8e8c))
* **FormElement:** the existing block params `id`, `value` and `validation` are yielded as hash properties ([c353154](https://github.com/kaliber5/ember-bootstrap/commit/c353154))
* **FormElement:** uses one-way controls thus supporting DDAU pattern. Calls onChange action when input values have changed. Form component initializes FormElement with default action that updates the models property, but can be overriden. ([dda8e36](https://github.com/kaliber5/ember-bootstrap/commit/dda8e36))
* **Input:** The `bs-input` and `bs-textarea` components have been removed, as they were based on the basic Ember input helpers that allow only two-way bindings. Use simple `<input class="form-control">` elements instead if needed. The form elements yielded by `bs-form` wrap these for you, so use them whenever possible. ([3e7d81f](https://github.com/kaliber5/ember-bootstrap/commit/3e7d81f))
* **Modal:** added `transitionDuration` and `backdropTransitionDuration`. ([d49c79a](https://github.com/kaliber5/ember-bootstrap/commit/d49c79a)), closes [#78](https://github.com/kaliber5/ember-bootstrap/issues/78)
* **Modal:** Binding to open property is one-way only (DDAU) ([c3869c9](https://github.com/kaliber5/ember-bootstrap/commit/c3869c9))
* **Modal:** dropped `autoClose` property. Preventing automatically closing the modal can now be done by returning false from `onHide` ([1bffd84](https://github.com/kaliber5/ember-bootstrap/commit/1bffd84))
* **Modal:** refactored to use contextual components for header, footer and body ([c3d449e](https://github.com/kaliber5/ember-bootstrap/commit/c3d449e))
* **Modal:** Renamed actions to onShow/onShown/onHide/onHidden/onSubmit for consistency ([91ec078](https://github.com/kaliber5/ember-bootstrap/commit/91ec078))
* **Modal:** Splitted in `bs-modal-simple` for default markup and `bs-modal` for custom markup. This replaces the previous `header`, `body` and `footer` flags ([3ef2bf7](https://github.com/kaliber5/ember-bootstrap/commit/3ef2bf7))
* **Nav:** refactored to yield nav item as a contextual component ([da7ef45](https://github.com/kaliber5/ember-bootstrap/commit/da7ef45))
* **NavBar:** refactored to use contextual components. Thanks to [srvance](https://github.com/srvance) ([1f49c28](https://github.com/kaliber5/ember-bootstrap/commit/1f49c28))
* **Progress:** Progress bar component is yielded as contextual component ([a237379](https://github.com/kaliber5/ember-bootstrap/commit/a237379))
* **Select:** removed deprecated select component and FromElement with controlType="select" ([9f04445](https://github.com/kaliber5/ember-bootstrap/commit/9f04445))
* **Tab:** Binding to activeId property is one-way only (DDAU) ([2e3e44a](https://github.com/kaliber5/ember-bootstrap/commit/2e3e44a))
* **Tab:** refactored to yield tab pane as a contextual component. Changed default action to `onChange` ([0185589](https://github.com/kaliber5/ember-bootstrap/commit/0185589))
* **Tab:** returning false from `onChange` prevents changing the active tab (DDAU) ([3ac6225](https://github.com/kaliber5/ember-bootstrap/commit/3ac6225))



<a name"0.11.3"></a>
## 0.11.3 (2016-11-30)


#### Features

* **Modal:** support custom class ([2b23316b](https://github.com/kaliber5/ember-bootstrap/commit/2b23316b))
* **Tooltips:** support custom class. Thanks to rstudner ([7877c5df](https://github.com/kaliber5/ember-bootstrap/commit/7877c5df), closes [#161](https://github.com/kaliber5/ember-bootstrap/issues/161))


<a name"0.11.2"></a>
## 0.11.2 (2016-11-08)


#### Bug Fixes

* **ButtonGroup:** null value sync with child buttons. Thanks to apokinsocha ([f96ff45a](https://github.com/kaliber5/ember-bootstrap/commit/f96ff45a))
* **Modal:** fixed Modal not closing when setting open=false in Ember 1.13 ([f59b94da](https://github.com/kaliber5/ember-bootstrap/commit/f59b94da))


#### Features

* **Button:** Addition/support for title attribute on buttons. Thanks to basz ([3d630874](https://github.com/kaliber5/ember-bootstrap/commit/3d630874), closes [#148](https://github.com/kaliber5/ember-bootstrap/issues/148))


<a name"0.11.1"></a>
## 0.11.1 (2016-10-27)


#### Bug Fixes

* **Alert:** added missing alert-dismissible class ([9c8f5ace](https://github.com/kaliber5/ember-bootstrap/commit/9c8f5ace), closes [#146](https://github.com/kaliber5/ember-bootstrap/issues/146))


<a name"0.11.0"></a>
## 0.11.0 (2016-10-08)


#### Features

* **Tooltips:** Added support for tooltips and popovers ([25d16ccd](https://github.com/kaliber5/ember-bootstrap/commit/25d16ccd), closes [#7](https://github.com/kaliber5/ember-bootstrap/issues/7))


<a name"0.10.0"></a>
## 0.10.0 (2016-09-15)


#### Bug Fixes

* **Accordion:** fixed use of private parentView property, breaking tests in Ember 2.8 ([9d7584ed](https://github.com/kaliber5/ember-bootstrap/commit/9d7584ed))
* **Modal:**
  * fixed "You modified ... twice in a single render" deprecation/assertion ([cdd35ac3](https://github.com/kaliber5/ember-bootstrap/commit/cdd35ac3))
  * Modal is rendered in place when no wormhole container is found. Fixes modals in Fastboot ([c4184f29](https://github.com/kaliber5/ember-bootstrap/commit/c4184f29))
  * added fixes for Glimmer2, including workaround for ember-wormhole ([ce9a2c25](https://github.com/kaliber5/ember-bootstrap/commit/ce9a2c25))


#### Features

* **Form:** model is passed as parameter to default and before actions ([6c9282a7](https://github.com/kaliber5/ember-bootstrap/commit/6c9282a7), closes [#126](https://github.com/kaliber5/ember-bootstrap/issues/126))


#### Breaking Changes

* **Form:** the signature of the default action that is called when submitting the form has changed.
  The form's model is always the first parameter, with an optional validation result as the second parameter

  Before:

        submit(validationResult) { ... }

  After:

        submit(model, validationResult) { ... }

([6c9282a7](https://github.com/kaliber5/ember-bootstrap/commit/6c9282a7))


<a name"0.9.1"></a>
## 0.9.1 (2016-08-20)


#### Bug Fixes

* **Modal:** perform cleanup when removing an opened modal from DOM without waiting for transition. Thanks to [sukima](https://github.com/sukima) ([e863f71f](https://github.com/kaliber5/ember-bootstrap/commit/e863f71f))


#### Features

* **FormElement:** adds `showValidationOn` events. Thanks to [jelhan](https://github.com/jelhan) (#127) ([2eb7ac07](https://github.com/kaliber5/ember-bootstrap/commit/2eb7ac07))


<a name"0.9.0"></a>
## 0.9.0 (2016-08-13)


#### Bug Fixes

* **Dropdown:** removed data-toggle="dropdown" attribute to prevent clash if original bootstrap is present. ([bf44d272](https://github.com/kaliber5/ember-bootstrap/commit/bf44d272), closes [#115](https://github.com/kaliber5/ember-bootstrap/issues/115))
* **Form:** fixed novalidate attribute being a string value of "false" or "true" ([45db61dd](https://github.com/kaliber5/ember-bootstrap/commit/45db61dd))
* **General:**
  * fix Ember.Array.contains deprecation in Ember 2.8+ ([700802f0](https://github.com/kaliber5/ember-bootstrap/commit/700802f0))
  * fix Ember.Handlebars.SafeString deprecation in Ember 2.8+ ([09d5a245](https://github.com/kaliber5/ember-bootstrap/commit/09d5a245))


#### Features

* **AccordionItem:** Add expanded class name for accordion item. ([268bc0d3](https://github.com/kaliber5/ember-bootstrap/commit/268bc0d3))
* **Dropdown:** support "dropup" style ([f7813087](https://github.com/kaliber5/ember-bootstrap/commit/f7813087), closes [#114](https://github.com/kaliber5/ember-bootstrap/issues/114))
* **Navbar:** added set of components for creating navbars. Thanks to [srvance](https://github.com/srvance) for implementation ([6065a0b4](https://github.com/kaliber5/ember-bootstrap/commit/6065a0b4), closes [#48](https://github.com/kaliber5/ember-bootstrap/issues/48))


<a name"0.8.0"></a>
## 0.8.0 (2016-07-02)


#### Bug Fixes

* **ButtonGroup:** allow value 0 (Number) as valid value for a bs-button (#105). Thanks to [arohr](https://github.com/arohr) ([d770cf67](https://github.com/kaliber5/ember-bootstrap/commit/d770cf67))


#### Features

* **Nav:** added components bs-nav and bs-nav-item for bootstrap navs ([dc66fe7b](https://github.com/kaliber5/ember-bootstrap/commit/dc66fe7b))
* **Tab:** added components bs-tab and bs-tab-pane for dynamic tabs ([d3e2725b](https://github.com/kaliber5/ember-bootstrap/commit/d3e2725b))
* **FormElement:** support validations with warning messages (supported by ember-cp-validations 3.0 ([cd324d16](https://github.com/kaliber5/ember-bootstrap/commit/cd324d16))


<a name"0.7.3"></a>
## 0.7.3 (2016-06-22)


#### Bug Fixes

* **ComponentChildMixin:** this.nearestOfType() is not reliable in willDestroyElement hook. Thanks to [jelhan](https://github.com/jelhan) ([44a9fa0f](https://github.com/kaliber5/ember-bootstrap/commit/44a9fa0f), closes [#99](https://github.com/kaliber5/ember-bootstrap/issues/99))
* **Build:** import map file along with bootstrap-theme.css. Thanks to [williamherry](https://github.com/williamherry)
* **Form:** update showValidations on form elements wrapped by another component. Thanks to [jelhan](https://github.com/jelhan)

#### Features

* **FormElement:** adds support for invisible (sr-only) label. Thanks to [jelhan](https://github.com/jelhan) ([8419f35e](https://github.com/kaliber5/ember-bootstrap/commit/8419f35e))
* **FormElement:** yield validation state. Thanks to [jelhan](https://github.com/jelhan) ([5f28d1e1](https://github.com/kaliber5/ember-bootstrap/commit/5f28d1e1))
* **FormElement:** adjust position of feedback items if there is input group. Thanks to [jelhan](https://github.com/jelhan)


<a name"0.7.2"></a>
## 0.7.2 (2016-05-29)

#### Bug Fixes

* **Alert:** fixed fade out animation
* **FormElement:** fixed overriding form model by setting bs-form-element model. Thanks to [jelhan](https://github.com/jelhan)

#### Features

* **Fastboot:** Fixed breaking apps in Fastboot environment. Thanks to [openhouse](https://github.com/openhouse). Fastboot is now officially supported and automatically tested.
* **Button:** add support for returning a promise from a closure action to support automatic state change ([fb8fa1e3](https://github.com/kaliber5/ember-bootstrap/commit/fb8fa1e3), closes [#87](https://github.com/kaliber5/ember-bootstrap/issues/87))
* **Form:** adds support for novalidate attribute. Thanks to [jelhan](https://github.com/jelhan)

<a name"0.7.1"></a>
## 0.7.1 (2016-05-11)


#### Bug Fixes

* **FormElement:** fixed validation property dependent keys ([16903155](https://github.com/kaliber5/ember-bootstrap/commit/16903155))


#### Features

* **Less Import:** import Bootstrap's less assets simply by importing 'ember-bootstrap/bootstrap' in your app.less ([ab38b9d5](https://github.com/kaliber5/ember-bootstrap/commit/ab38b9d5), closes [#80](https://github.com/kaliber5/ember-bootstrap/issues/80))


<a name"0.7.0"></a>
## 0.7.0 (2016-04-02)

#### Bug Fixes

* **Config:** fix config loader, closes [#68](https://github.com/kaliber5/ember-bootstrap/issues/68). Thanks to [Offir Golan](https://github.com/offirgolan)

#### Features

* **Form/FormElement:** Added validation hooks for external validation addons. See the Breaking Changes. Thanks to [Offir Golan](https://github.com/offirgolan)
* **FormElement:** Support disabled property. Thanks to [oswaldoacauan](https://github.com/oswaldoacauan)
* **FormElement:** Support required property. Thanks to [Offir Golan](https://github.com/offirgolan)
* **Form:** Add before submit action. Thanks to [Offir Golan](https://github.com/offirgolan)

#### Breaking Changes

Direct support for [ember-validations](https://github.com/DockYard/ember-validations) for validations your
ember-bootstrap forms has been removed in favor of an API that supports adding support for specific validation libraries
through additional addons. If you rely on ember-validations then install this addon when upgrading ember-bootstrap to
enable support for it:
[ember-bootstrap-validations](https://github.com/kaliber5/ember-bootstrap-validations)

Additional support for [ember-cp-validations](https://github.com/offirgolan/ember-cp-validations) has been added by [Offir Golan](https://github.com/offirgolan) through [ember-bootstrap-cp-validations](https://github.com/offirgolan/ember-bootstrap-cp-validations)

<a name"0.6.4"></a>
## 0.6.4 (2016-03-07)


#### Bug Fixes

* **Modal:**
  * fixed autofocus feature for whormholed modals ([c3cec755](https://github.com/kaliber5/ember-bootstrap/commit/c3cec755))
  * Expose modal to contained components. Thanks to [bendemboski](https://github.com/bendemboski) ([7d26d07d](https://github.com/kaliber5/ember-bootstrap/commit/7d26d07d), closes [#58](https://github.com/kaliber5/ember-bootstrap/issues/58))
  * Make modal-closer mixin less brittle (refs #58). Thanks to [bendemboski](https://github.com/bendemboski) ([4d32b08a](https://github.com/kaliber5/ember-bootstrap/commit/4d32b08a))


#### Features

* **Modal:** Implement openAction (refs #55). Thanks to [bendemboski](https://github.com/bendemboski) ([ab713eef](https://github.com/kaliber5/ember-bootstrap/commit/ab713eef))


<a name"0.6.3"></a>
## 0.6.3 (2016-03-04)


#### Bug Fixes

* **Accordion:** Fix toggling accordion items. ([925ee7d6](https://github.com/kaliber5/ember-bootstrap/commit/925ee7d6), closes [#56](https://github.com/kaliber5/ember-bootstrap/issues/56))
* **Alert:**
  * Alert is initially hidden when visible=false ([10aa8870](https://github.com/kaliber5/ember-bootstrap/commit/10aa8870), closes [#61](https://github.com/kaliber5/ember-bootstrap/issues/61))
  * missing fade out animation when clicking close button ([11acbccd](https://github.com/kaliber5/ember-bootstrap/commit/11acbccd), closes [#59](https://github.com/kaliber5/ember-bootstrap/issues/59))


#### Features

* **Modal:** Implement autofocus support. Thanks to [bendemboski](https://github.com/bendemboski) ([10f6d71f](https://github.com/kaliber5/ember-bootstrap/commit/10f6d71f), closes [#55](https://github.com/kaliber5/ember-bootstrap/issues/55))


<a name"0.6.2"></a>
## 0.6.2 (2016-02-25)


#### Bug Fixes

* **Addon:** Remove hardcoding of `isDevelopingAddon`. Thanks to [@rwjblue](https://github.com/rwjblue) ([015fa5f](https://github.com/kaliber5/ember-bootstrap/commit/015fa5f)
* **Addon:** Allow using ember-bootstrap within another addon ([a2e5b29f](https://github.com/kaliber5/ember-bootstrap/commit/a2e5b29f), closes [#50](https://github.com/kaliber5/ember-bootstrap/issues/50))
* **Modal:** Patch emulateTransitionEnd to support andThen() waiting for transition ([ae787626](https://github.com/kaliber5/ember-bootstrap/commit/ae787626), closes [#53](https://github.com/kaliber5/ember-bootstrap/issues/53))


<a name"0.6.1"></a>
## 0.6.1 (2016-02-06)


#### Bug Fixes

* **FormElement:** changing formLayout on parent form now correctly updates bootstrap markup ([5ff1c870](https://github.com/kaliber5/ember-bootstrap/commit/5ff1c870), closes [#47](https://github.com/kaliber5/ember-bootstrap/issues/47))


#### Features

* **Alert:** add a dismissed action ([760a2db5](https://github.com/kaliber5/ember-bootstrap/commit/760a2db5)), closes [#45](https://github.com/kaliber5/ember-bootstrap/issues/45))
* **FormElement:** support custom controls ([641d96e7](https://github.com/kaliber5/ember-bootstrap/commit/641d96e7), closes [#46](https://github.com/kaliber5/ember-bootstrap/issues/46))


<a name"0.6.0"></a>
## 0.6.0 (2016-01-12)

#### Bug Fixes

* **FormElement:** Fixed select box for form layouts other than vertical, had wrong property assignments ([2c15ec2c](https://github.com/kaliber5/ember-bootstrap/commit/2c15ec2c))

#### Features

* **ProgressBar:** Added support for progress bars as native ember components
* **I18nSupport:** Removed I18nSupport mixin as this is not needed anymore with ember-i18n 4.x help ([a5ade3c1](https://github.com/kaliber5/ember-bootstrap/commit/a5ade3c1))


#### Breaking Changes

* If you rely on ember-bootstrap components to use the old ember-i18n TranslatableProperties mixin, you should update ember-i18n to the latest version and use the "t" helper to supply already translated strings to ember-bootstrap component properties in your templates.

([a5ade3c1](https://github.com/kaliber5/ember-bootstrap/commit/a5ade3c1))


<a name"0.5.1"></a>
## 0.5.1 (2016-01-04)


#### Bug Fixes

* **Modal:** closing a modal left backdrop element in DOM on IE9 ([0e24f351](https://github.com/kaliber5/ember-bootstrap/commit/0e24f351))
* Fixed bootstrap theme inclusion order, thanks to [huberts](https://github.com/huberts) ([PR#31](https://github.com/kaliber5/ember-bootstrap/pull/31))

#### Features

* **Modal:** implemented scrollbar layout adjustments when opening modals, like the original bootstrap.js modals ([3e28b099](https://github.com/kaliber5/ember-bootstrap/commit/3e28b099))


<a name"0.5.0"></a>
## 0.5.0 (2015-11-12)


#### Features

* **Modal:**
  * added bs-modal component and sub components for creating Bootstrap modal dialogs

<a name"0.4.1"></a>
## 0.4.1 (2015-10-31)

* **FormElement:**
  * Wire up <label> for attribute used in form-element component, thanks to [cyk](https://github.com/cyk) ([3ed081a](https://github.com/kaliber5/ember-bootstrap/commit/3ed081a400f8a83524339bb71eda2d027e01bc05))

<a name"0.4.0"></a>
## 0.4.0 (2015-09-22)

* **Collapse:**
  * added bs-collapse component for collapsible content ([794b52d5](https://github.com/kaliber5/ember-bootstrap/commit/794b52d5f6ad1c53e6a468590d69c269d33c1da5))
  * refactored bs-accordion-item to use bs-collapse internally ([58b0d868](https://github.com/kaliber5/ember-bootstrap/commit/58b0d868c58c2c5f29f6dcc99e1eccb357280b9e))

<a name"0.3.0"></a>
## 0.3.0 (2015-09-09)


#### Features

* **Accordion:**
  * added accordion components ([f2bbaca8](https://github.com/kaliber5/ember-bootstrap/commit/f2bbaca8))

<a name"0.2.0"></a>
## 0.2.0 (2015-08-14)


#### Features

* **Ember:** Updated components to be compatible with Ember 1.13 (thanks to [jesenko](https://github.com/jesenko)) and 2.0. *NOTE: Ember 1.13 is the minimum required version for ember-bootstrap 0.2.0 and above*
* **Tests:** Refactored all component tests to use the new integration test style
* **Select:** added Ember.Select replacement component ([19144085](https://github.com/kaliber5/ember-bootstrap/commit/19144085))

<a name"0.1.4"></a>
## 0.1.4 (2015-08-05)


#### Bug Fixes

* **Components.FormElement:** Wrong classes for horizontal layout forms (14) ([1caba612](https://github.com/kaliber5/ember-bootstrap/commit/1caba612))


<a name"0.1.3"></a>
## 0.1.3 (2015-07-07)


#### Bug Fixes

* **Ember:** Updated to Ember-cli 0.2.7, fixed deprecation warnings in Ember 1.13 ([1fc78c4](https://github.com/kaliber5/ember-bootstrap/commit/1fc78c41cfd4f7f72095825e14c813d62d772dae))
* **Ember:** Updated to Ember-cli 0.2.5 / Ember.js 1.12. Fixed test failures because of missi ([45e59f03](https://github.com/kaliber5/ember-bootstrap/commit/45e59f03))


#### Features

* **Form:** submitOnEnter submits the form when user presses enter, even if no submit button ([fcc9898b](https://github.com/kaliber5/ember-bootstrap/commit/fcc9898b))


<a name"0.1.2"></a>
## 0.1.2 (2015-04-22)

#### Features

* **I18n:** support for ember-i18n added: selected components support translateable properties

<a name"0.1.1"></a>
## 0.1.1 (2015-04-21)

#### Bug Fixes

* **FormGroup:** fixed wrong form group validation class in Ember 1.11 ([ff72909e](https://github.com/kaliber5/ember-bootstrap/commit/ff72909e))


<a name"0.1.0"></a>
## 0.1.0 (2015-04-17)

#### Features

New form classes to support creating powerful forms:

* **Form:** base form class
* **FormGroup:** component for Bootstrap form-group elements with validation rendering
* **FormElement:** extends FormGroup to implement automatic markup generation and model based validations

<a name"0.0.9"></a>
## 0.0.9 (2015-04-08)

#### Bug Fixes

* **ButtonGroup:**
  * initial value did not set active buttons properly

<a name"0.0.8"></a>
## 0.0.8 (2015-04-08)


#### Bug Fixes

* **ButtonGroup:**
  * fixed radio button being clicked twice to deactivate itself ([6175e12d](https://github.com/kaliber5/ember-bootstrap/commit/6175e12d))
  * fixed broken button group value added separate button page to dummy app ([2c2dafc0](https://github.com/kaliber5/ember-bootstrap/commit/2c2dafc0))
* **bower:** fixed missing bootstrap dependency in bower.json. Did not affect the host ember  ([5c00c2b9](https://github.com/kaliber5/ember-bootstrap/commit/5c00c2b9))

<a name"0.0.7"></a>
## 0.0.7 (2015-03-14)

#### Features

* **Dropdown:** new component for Bootstrap dropdowns

#### Misc

* Enhanced API docs, with custom theme
* Updated to ember-cli 0.2.0, ember.js 1.10

<a name"0.0.6"></a>
## 0.0.6 (2015-03-10)

* **Alert:** component for dismissible Bootstrap alerts

<a name"0.0.5"></a>
## 0.0.5 (2015-02-2)

* **ButtonGroup:** component for groups of Buttons, with radio and checkbox style toggling

<a name"0.0.4"></a>
## 0.0.4 (2015-01-25)

* Initial release
