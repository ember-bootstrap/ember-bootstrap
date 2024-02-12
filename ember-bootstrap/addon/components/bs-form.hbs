{{! @glint-nocheck }}
{{!-- template-lint-disable no-invalid-interactive --}}
<form
  novalidate={{this.hasValidator}}
  class={{this.layoutClass}}
  ...attributes
  {{on "keypress" this.handleKeyPress}}
  {{on "submit" this.handleSubmit}}
  {{create-ref "formElement"}}
>
  {{yield
    (hash
      element=(component (ensure-safe-component (bs-default @elementComponent (component "bs-form/element")))
        model=this.model
        formLayout=this.formLayout
        horizontalLabelGridClass=this.horizontalLabelGridClass
        showAllValidations=this.showAllValidations
        _disabled=@disabled
        _readonly=@readonly
        onChange=this.elementChanged
        _onChange=this.resetSubmissionState
      )
      isSubmitting=this.isSubmitting
      isSubmitted=this.isSubmitted
      isRejected=this.isRejected
      model=this.model
      resetSubmissionState=this.resetSubmissionState
      submit=this.doSubmit
      submitButton=(component (ensure-safe-component (bs-default @submitButtonComponent (component "bs-button")))
        type="primary"
        state=this.submitButtonState
        _disabled=this.isSubmitting
        attrTypePrivateWorkaround="submit"
      )
    )
  }}
</form>
