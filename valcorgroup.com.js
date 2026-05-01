(function () {
  var STYLE_ID = "site-credit-style";
  var CREDIT_HTML = 'Powered by <a href="https://vxlnce.com/" target="_blank" rel="noopener noreferrer">Vexellence</a>';

  function ensureStyle() {
    if (document.getElementById(STYLE_ID)) return;
    var style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = [
      ".site-credit, .site-credit a {",
      "  font-family: var(--font-mono);",
      "  font-size: var(--font-mono-small);",
      "  color: var(--color-fg-muted);",
      "  letter-spacing: 0.05em;",
      "  text-decoration: none;",
      "}",
      ".site-credit a { transition: color var(--transition-fast); }",
      ".site-credit a:hover { color: var(--color-fg-secondary); }"
    ].join("\n");
    document.head.appendChild(style);
  }

  function ensureCredit() {
    var footerBottom = document.querySelector("footer .footer-bottom");
    if (!footerBottom) return;
    var credit = footerBottom.querySelector(".site-credit");
    if (!credit) {
      credit = document.createElement("p");
      credit.className = "site-credit";
      var legal = footerBottom.querySelector(".footer-legal");
      if (legal) footerBottom.insertBefore(credit, legal);
      else footerBottom.appendChild(credit);
    }
    if (credit.innerHTML.indexOf("vxlnce.com") === -1) {
      credit.innerHTML = CREDIT_HTML;
    }
  }

  function init() {
    ensureStyle();
    // Observe from the document level to catch body and footer insertion
    var observer = new MutationObserver(function () {
      ensureStyle();
      ensureCredit();
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
    // Initial check
    ensureCredit();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
