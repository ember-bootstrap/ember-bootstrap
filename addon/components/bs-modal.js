import Ember from 'ember';

export default Ember.Component.extend(Ember.Evented, {
    // Bootstrap Modal Manager Service
    bootstrapModalManager: Ember.inject.service(),

    classNames: ['modal'],
    classNameBindings: ['fade', 'isVis:in', 'vertical:modal-dialog-center', 'class'],
    attributeBindings: ['role', 'aria-labelledby', 'isAriaHidden:aria-hidden', "ariaLabelledBy:aria-labelledby"],
    isAriaHidden: (function() {
      return "" + (this.get('isVisible'));
    }).property('isVisible'),
    dialogStyle: (function() {
      Ember.run.scheduleOnce('afterRender', this, function() {
        if (this.$()) {
          return this.$().find('.modal-dialog').css('z-index', this.get('zindex'));
        }
      });
    }).observes('zindex'),
    dialogVerticalStyle: (function() {
      if (this.get('vertical')) {
        Ember.run.scheduleOnce('afterRender', this, function() {
          var marginHeight;
          if (this.$()) {
            marginHeight = this.$('.modal-dialog').height() / 2;
            return this.$().find('.modal-dialog').css('margin-top', '-' + marginHeight + 'px');
          }
        });
      }
    }).observes('vertical').on('didInsertElement'),
    backdropStyle: (function() {
      return ("z-index: " + (this.get('zindex') - 2) + ";").htmlSafe();
    }).property('zindex'),
    modalBackdrop: '<div class="modal-backdrop fade in"></div>',
    role: 'dialog',
    footerViews: [],
    backdrop: true,
    title: null,
    isVisible: false,
    manual: false,
    isVis: false,
    fullSizeButtons: false,
    fade: true,
    vertical: false,
    zindex: 1000,
    keyClose: true,
    didInsertElement: function() {
      var name;
      this._super();
      this.setupBinders();
      name = this.get('name');
      Ember.assert("Modal name is required for modal view " + (this.get('elementId')), this.get('name'));
      if (name == null) {
        name = this.get('elementId');
      }
      Ember.run.scheduleOnce('afterRender', this, function() {
        this.get('bootstrapModalManager').add(name, this);
        this.dialogStyle();
        if (this.manual) {
          return this.show();
        }
      });
    },
    becameVisible: function() {
      return Ember.$('body').addClass('modal-open');
    },
    becameHidden: function() {
      return Ember.$('body').removeClass('modal-open');
    },
    appendBackdrop: function() {
      var parentElement;
      parentElement = this.$().parent();
      return this._backdrop = Ember.$(this.modalBackdrop).appendTo(parentElement);
    },
    show: function() {
      this.set('isVisible', true);
      Ember.run.later(this, (function() {
        this.set('isVis', true);
      }), 15);
    },
    hide: function() {
      if (this.get('isDestroyed') || this.get('isDestroying')) {
        return;
      }
      this.set('isVis', false);
      if (this.get('fade')) {
        Ember.run.later(this, (function() {
          if (this.get('isDestroyed') || this.get('isDestroying')) {
            return;
          }
          this.set('isVisible', false);
        }), 300);
      } else {
        this.set('isVisible', false);
      }
      return false;
    },
    toggle: function() {
      return this.toggleProperty('isVisible');
    },
    click: function(event) {
      var target, targetDismiss;
      target = $(event.target);
      targetDismiss = target.attr("data-dismiss");
      if (targetDismiss === 'modal') {
        // If it's the header close icon
        if (target.hasClass('close') && target.parent().hasClass('modal-header')) {
          // If a button is marked as close we should call it to make sure the close action is made
          var cancelButton = this.get('footerButtons').findBy('cancel', true);
          if (Ember.isPresent(cancelButton)) {
            this.get('targetObject').send(cancelButton.get('action'))
          }
        }
        return this.close();
      }
    },
    keyPressed: function(event) {
      if (event.keyCode === 27 && this.get('keyClose') && this.get('zindex') === this.get('bootstrapModalManager').get('zindex')) {
        // If a button is marked as close we should call it to make sure the close action is made
        var cancelButton = this.get('footerButtons').findBy('cancel', true);
        if (Ember.isPresent(cancelButton)) {
          this.get('targetObject').send(cancelButton.get('action'))
        }
        return this.close(event);
      }
    },
    close: function(event) {
      if (this.get('isDestroyed') || this.get('isDestroying')) {
        return;
      }
      this.set('isVis', false);
      if (this.get('fade')) {
        return Ember.run.later(this, (function() {
          if (this.get('isDestroyed') || this.get('isDestroying')) {
            return;
          }
          if (this.get('manual')) {
            this.destroy();
          } else {
            this.set('isVisible', false);
          }
          this.trigger('closed', this);
        }), 300);
      } else {
        if (this.get('manual')) {
          this.destroy();
        } else {
          this.set('isVisible', false);
        }
        return this.trigger('closed', this);
      }
    },
    willDestroyElement: function() {
      var name;
      Ember.$('body').removeClass('modal-open');
      this.removeHandlers();
      name = this.get('name');
      if (name == null) {
        name = this.get('elementId');
      }
      this.get('bootstrapModalManager').remove(name, this);
      if (this._backdrop) {
        return this._backdrop.remove();
      }
    },
    removeHandlers: function() {
      return $(window.document).unbind("keyup", this._keyUpHandler);
    },
    setupBinders: function() {
      var handler,
        _this = this;
      handler = function(event) {
        return _this.keyPressed(event);
      };
      $(window.document).bind("keyup", handler);
      return this._keyUpHandler = handler;
    }
  });
