```(function () {
    var CREDIT_URL = "https://vxlnce.com/";
    var CREDIT_TEXT = "Vexellence";
    function insertCredit() {
      var headings = document.querySelectorAll("h3.elementor-heading-title");
      for (var i = 0; i < headings.length; i++) {
        if (headings[i].textContent.indexOf("Copyright") !== -1) {
          var container = headings[i].closest(".elementor-widget-container");
          if (!container || container.querySelector(".vxl-credit")) return true;
          var p = document.createElement("p");
          p.className = "vxl-credit";
          p.style.cssText = "margin:6px 0 0;font-size:0.75em;opacity:0.65;";
          p.innerHTML =
            'Powered by <a href="' +
            CREDIT_URL +
            '" target="_blank" rel="noopener noreferrer" 
  style="color:inherit;text-decoration:none;">' +
            CREDIT_TEXT +
            "</a>";
          container.appendChild(p);
          return true;
        }
      }
      return false;
    }
    function start() {
      if (insertCredit()) return;
      var footer = document.getElementById("site-footer");
      var target = footer || document.body;
      var observer = new MutationObserver(function () {
        if (insertCredit()) observer.disconnect();
      });
      observer.observe(target, { childList: true, subtree: true });
    }
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", start, { once: true });
    } else {
      start();
    }
  })();```

