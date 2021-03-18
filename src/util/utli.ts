export function getStyleValue(selector: string, style: any): unknown {
  const selector_compare = selector.toLowerCase();
  const selector_compare2 =
    selector_compare.substr(0, 1) === "."
      ? selector_compare.substr(1)
      : "." + selector_compare;

  for (var i = 0; i < document.styleSheets.length; i++) {
    var mysheet = document.styleSheets[i];
    var myrules = mysheet.cssRules ? mysheet.cssRules : mysheet.rules;

    for (var j = 0; j < myrules.length; j++) {
      const rule = myrules[j];

      if (rule instanceof CSSStyleRule && rule.selectorText) {
        var check = rule.selectorText.toLowerCase();
        switch (check) {
          case selector_compare:
          case selector_compare2:
            return rule.style[style];
        }
      }
    }
  }
}
