(function () {
  var config = null;
  var messageListenerBound = false;

  function init(nextConfig) {
    config = Object.assign(
      {
        appUrl: "https://fitvr.com",
        apiUrl: "https://api.fitvr.com",
        mode: "modal",
        theme: "dark"
      },
      nextConfig || {}
    );
    bindButtons(document);
    bindRecommendationMessages();
  }

  function bindButtons(root) {
    var scope = root || document;
    var buttons = scope.querySelectorAll("[data-fitvr-product-id]");
    buttons.forEach(function (button) {
      if (button.dataset.fitvrBound === "true") return;
      button.dataset.fitvrBound = "true";
      button.addEventListener("click", function () {
        open({ productId: button.dataset.fitvrProductId });
      });
    });
  }

  function open(options) {
    if (!config) {
      throw new Error("FitVR.init must be called before opening the widget.");
    }

    var productId = options.productId;
    var variantId = options.variantId || "";
    var profileMode = options.profileMode || "temporary";
    var overlay = document.createElement("div");
    overlay.setAttribute("data-fitvr-overlay", "true");
    overlay.style.position = "fixed";
    overlay.style.inset = "0";
    overlay.style.zIndex = "2147483647";
    overlay.style.background = "rgba(0,0,0,0.84)";
    overlay.style.backdropFilter = "blur(14px)";
    overlay.style.display = "grid";
    overlay.style.placeItems = "center";
    overlay.style.padding = "16px";

    var frame = document.createElement("iframe");
    frame.title = "Fit.VR virtual fitting";
    frame.allow = "camera; fullscreen; xr-spatial-tracking";
    frame.src =
      config.appUrl +
      "/try-on?brandId=" +
      encodeURIComponent(config.brandId) +
      "&productId=" +
      encodeURIComponent(productId) +
      "&variantId=" +
      encodeURIComponent(variantId) +
      "&profileMode=" +
      encodeURIComponent(profileMode) +
      "&theme=" +
      encodeURIComponent(config.theme);
    frame.style.width = config.mode === "fullscreen" ? "100%" : "min(1180px, 100%)";
    frame.style.height = config.mode === "fullscreen" ? "100%" : "min(840px, 100%)";
    frame.style.border = "1px solid rgba(255,255,255,0.16)";
    frame.style.borderRadius = "8px";
    frame.style.background = "#050606";

    var close = document.createElement("button");
    close.type = "button";
    close.textContent = "Close";
    close.style.position = "fixed";
    close.style.top = "16px";
    close.style.right = "16px";
    close.style.border = "1px solid rgba(255,255,255,0.18)";
    close.style.borderRadius = "8px";
    close.style.padding = "10px 14px";
    close.style.background = "#b7ff3c";
    close.style.color = "#000";
    close.style.fontWeight = "700";
    close.addEventListener("click", function () {
      overlay.remove();
    });

    overlay.appendChild(frame);
    overlay.appendChild(close);
    document.body.appendChild(overlay);
  }

  function bindRecommendationMessages() {
    if (messageListenerBound) return;
    messageListenerBound = true;
    window.addEventListener("message", function (event) {
      var payload = event.data || {};
      if (
        payload.type !== "fitvr:recommendation" ||
        !payload.recommendation ||
        !config ||
        typeof config.onRecommendation !== "function"
      ) {
        return;
      }

      config.onRecommendation(payload.recommendation);
    });
  }

  window.FitVR = {
    init: init,
    bindButtons: bindButtons,
    open: open
  };
})();
