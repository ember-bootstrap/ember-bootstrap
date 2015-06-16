# ember-bootstrap-components

An [ember-cli](http://www.ember-cli.com) addon for using [Twitter Bootstrap](http://getbootstrap.com/) in Ember applications.

The addon includes the Bootstrap assets (CSS, Icons) in your project (can be disabled). On top of that, it provides a set of native Ember components (no use of Bootstrap JavaScript!).</p>

*See [kaliber5.github.io/ember-bootstrap/](http://kaliber5.github.io/ember-bootstrap/) for full documentation. or the original ember-bootstrap*

## What's added here?
This addon is a twist of the base ember-bootstrap addon, changed regarding the button and mainly adding the modal functionallty first deveopled under the original bootstrap-for-ember non cli addon and later on by me.
This includes the abillity to manually inject modals into the DOM, even multiple ones. Adding a ModalManager service and the support for creating buttons out of POJOs through proxy.

The Modal supports vertial middle through CSS only.

## Install in ember-cli application

In your application's directory:

    ember install ember-bootstrap-components
    
If you are using an ember-cli version prior to 0.1.5, use the following commands instead:    
    
    npm install --save-dev ember-bootstrap-components
    ember g ember-bootstrap-components

## Authors

[Simon Ihmig](https://github.com/simonihmig) @ [kaliber5](http://www.kaliber5.de)
[Dan Shapir](https://github.com/danshapir)

## Copyright and license

Code and documentation copyright 2015 kaliber5 GmbH
Added code copyright 2015 danshapir. Code released under [the MIT license](LICENSE).
