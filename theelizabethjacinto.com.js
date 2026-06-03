(function () {
  "use strict";

  var STYLE_ID = "site-credit-style";
  var CREDIT_HTML =
    'Powered by <a href="https://vxlnce.com/" target="_blank" rel="noopener noreferrer">Vexellence</a>';

  function ensureStyle() {
    if (document.getElementById(STYLE_ID)) return;
    var style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = [
      ".site-credit, .site-credit a {",
      "  font-family: var(--sans, system-ui, sans-serif);",
      "  font-size: 11px;",
      "  color: rgba(255, 255, 255, 0.45);",
      "  letter-spacing: 0.05em;",
      "  text-decoration: none;",
      "  text-transform: none;",
      "  margin: 0;",
      "}",
      ".site-credit a { transition: color 0.15s ease; }",
      ".site-credit a:hover { color: rgba(255, 255, 255, 0.78); }",
    ].join("\n");
    document.head.appendChild(style);
  }

  function findFooterBottom() {
    return document.querySelector("footer .footer-bottom");
  }

  function ensureCredit() {
    var footerBottom = findFooterBottom();
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
    ensureCredit();

    var observer = new MutationObserver(function () {
      ensureStyle();
      ensureCredit();
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
