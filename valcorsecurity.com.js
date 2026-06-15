(function () {
  var CREDIT_URL = "https://vxlnce.com/";
  var CREDIT_TEXT = "Vexellence";
  var LOG = "[valcorsec]";
  var POLL_MS = 200;
  var MAX_ATTEMPTS = 150; // ~30 seconds

  var intervalId = null;

  function stopPolling(reason) {
    if (intervalId !== null) {
      clearInterval(intervalId);
      intervalId = null;
      // console.log(LOG, "polling stopped:", reason);
    }
  }

  function insertCredit() {
    var headings = document.querySelectorAll("h3.elementor-heading-title");
    // console.log(LOG, "scan — headings found:", headings.length);

    for (var i = 0; i < headings.length; i++) {
      var text = (headings[i].textContent || "").trim();
      if (text.indexOf("Copyright") === -1) continue;

      // console.log(LOG, "Copyright heading found:", text);

      var container = headings[i].closest(".elementor-widget-container");
      if (!container) {
        // console.warn(LOG, "container not found yet, will retry");
        return false;
      }

      if (container.querySelector(".vxl-credit")) {
        // console.log(LOG, "already inserted");
        return true;
      }

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
      // console.log(LOG, "credit inserted successfully");
      return true;
    }

    // console.log(LOG, "Copyright heading not in DOM yet");
    return false;
  }

  function tryInsert(attempt) {
    // console.log(LOG, "attempt", attempt);

    if (insertCredit()) {
      stopPolling("success on attempt " + attempt);
      return true;
    }

    if (attempt >= MAX_ATTEMPTS) {
      stopPolling("max attempts reached");
      return false;
    }

    return false;
  }

  function startPolling() {
    if (intervalId !== null) return;

    // console.log(LOG, "starting poll every", POLL_MS, "ms");

    var attempt = 0;
    if (tryInsert(++attempt)) return;

    intervalId = setInterval(function () {
      tryInsert(++attempt);
    }, POLL_MS);
  }

  function boot() {
    // console.log(LOG, "boot — readyState:", document.readyState);
    startPolling();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }

  // Extra safety net after images/resources load
  window.addEventListener("load", function () {
    // console.log(LOG, "window load — final check");
    if (insertCredit()) stopPolling("success on window load");
  });
})();
