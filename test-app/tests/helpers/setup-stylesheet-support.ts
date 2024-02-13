import type { CustomTestContext } from '.';

export default function ({ beforeEach, afterEach }: NestedHooks) {
  const styleSheet: CSSStyleSheet = Array.prototype.slice
    .call(document.styleSheets)
    .find((sheet) => sheet.href.indexOf('test-support.css') !== -1);
  let numberOfInsertedRules: number;

  beforeEach(function (this: CustomTestContext) {
    numberOfInsertedRules = 0;

    this.insertCSSRule = function (rule: string) {
      styleSheet.insertRule(rule, styleSheet.cssRules.length);
      numberOfInsertedRules++;
    };
  });

  afterEach(function () {
    // since we insert the rules at the end of the stylesheet, we could safely
    // remove the same amount of rules from the end as we have inserted
    for (let i = 1; i <= numberOfInsertedRules; i++) {
      styleSheet.deleteRule(styleSheet.cssRules.length - 1);
    }
  });
}
