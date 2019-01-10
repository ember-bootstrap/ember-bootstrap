export default function({ beforeEach, afterEach }) {
  let styleSheet = [...document.styleSheets].find((sheet) => sheet.href.includes('test-support.css'));
  let numberOfInsertedRules;

  beforeEach(function() {
    numberOfInsertedRules = 0;

    this.insertCSSRule = function(rule) {
      styleSheet.insertRule(rule, styleSheet.length);
      numberOfInsertedRules++;
    };
  });

  afterEach(function() {
    // since we insert the rules at the end of the stylesheet, we could safely
    // remove the same amount of rules from the end as we have inserted
    for (let i = 1; i <= numberOfInsertedRules; i++) {
      styleSheet.deleteRule(styleSheet.length);
    }
  });
}
