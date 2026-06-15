(function () {
  var CREDIT_URL = "https://vxlnce.com/";
  var CREDIT_TEXT = "Vexellence";

  function updateCopyrightYear(el) {
    el.textContent = el.textContent.replace(/\d{4}/, new Date().getFullYear());
  }

  function insertCredit(copyrightEl) {
    var container = copyrightEl.closest(".elementor-widget-container");
    if (!container || container.querySelector(".vxl-credit")) return;
    var p = document.createElement("p");
    p.className = "vxl-credit";
    p.style.cssText = "margin:6px 0 0;font-size:0.75em;opacity:0.65;";
    p.innerHTML =
      'Powered by <a href="' +
      CREDIT_URL +
      '" target="_blank" rel="noopener noreferrer" style="color:inherit;text-decoration:none;">' +
      CREDIT_TEXT +
      "</a>";
    container.appendChild(p);
  }

  function run() {
    var headings = document.querySelectorAll("h3.elementor-heading-title");
    for (var i = 0; i < headings.length; i++) {
      if (headings[i].textContent.indexOf("Copyright") !== -1) {
        updateCopyrightYear(headings[i]);
        insertCredit(headings[i]);
        return;
      }
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run, { once: true });
  } else {
    run();
  }
})();
