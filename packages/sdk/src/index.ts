export type FitVRConfig = {
  brandId: string;
  apiKey?: string;
  apiUrl?: string;
  appUrl?: string;
  mode?: "modal" | "fullscreen";
  theme?: "dark" | "light";
  onRecommendation?: (event: FitVRRecommendationEvent) => void;
};

export type FitVRRecommendationEvent = {
  productId: string;
  recommendedSize: string;
  bestSize: string;
  alternativeSize?: string;
  confidence: number;
  fitConfidence?: number;
  overallFitScore?: number;
  fitStatus?: string;
  returnRiskLevel?: "low" | "medium" | "high";
  areaAnalysis?: {
    area: string;
    status: string;
    score: number;
    message?: string;
  }[];
  movementTests?: {
    key: string;
    label: string;
    score: number;
    status: string;
  }[];
};

let activeConfig: FitVRConfig | null = null;
let messageListenerBound = false;

export function init(config: FitVRConfig) {
  activeConfig = {
    apiUrl: "https://api.fitvr.com",
    appUrl: "https://fitvr.com",
    mode: "modal",
    theme: "dark",
    ...config
  };

  bindButtons();
  bindRecommendationMessages();
}

export function bindButtons(root: ParentNode = document) {
  root.querySelectorAll<HTMLElement>("[data-fitvr-product-id]").forEach((button) => {
    if (button.dataset.fitvrBound === "true") {
      return;
    }

    button.dataset.fitvrBound = "true";
    button.addEventListener("click", () => {
      const productId = button.dataset.fitvrProductId;
      if (productId) {
        open({ productId });
      }
    });
  });
}

export function open({
  productId,
  variantId,
  profileMode = "temporary"
}: {
  productId: string;
  variantId?: string;
  profileMode?: "guest" | "temporary" | "saved_profile" | "multi_profile";
}) {
  if (!activeConfig) {
    throw new Error("FitVR.init must be called before opening the widget.");
  }

  const overlay = document.createElement("div");
  overlay.setAttribute("data-fitvr-overlay", "true");
  overlay.style.position = "fixed";
  overlay.style.inset = "0";
  overlay.style.zIndex = "2147483647";
  overlay.style.background = "rgba(0,0,0,0.84)";
  overlay.style.backdropFilter = "blur(14px)";
  overlay.style.display = "grid";
  overlay.style.placeItems = "center";
  overlay.style.padding = "16px";

  const frame = document.createElement("iframe");
  frame.title = "Fit.VR virtual fitting";
  frame.allow = "camera; fullscreen; xr-spatial-tracking";
  frame.src = `${activeConfig.appUrl}/try-on?brandId=${encodeURIComponent(activeConfig.brandId)}&productId=${encodeURIComponent(productId)}&variantId=${encodeURIComponent(variantId ?? "")}&profileMode=${encodeURIComponent(profileMode)}&theme=${activeConfig.theme}`;
  frame.style.width = activeConfig.mode === "fullscreen" ? "100%" : "min(1180px, 100%)";
  frame.style.height = activeConfig.mode === "fullscreen" ? "100%" : "min(840px, 100%)";
  frame.style.border = "1px solid rgba(255,255,255,0.16)";
  frame.style.borderRadius = "8px";
  frame.style.background = "#050606";

  const close = document.createElement("button");
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
  close.addEventListener("click", () => overlay.remove());

  overlay.append(frame, close);
  document.body.appendChild(overlay);
}

function bindRecommendationMessages() {
  if (messageListenerBound || typeof window === "undefined") {
    return;
  }

  messageListenerBound = true;
  window.addEventListener("message", (event) => {
    const payload = event.data as
      | { type?: string; recommendation?: FitVRRecommendationEvent }
      | undefined;

    if (payload?.type !== "fitvr:recommendation" || !payload.recommendation) {
      return;
    }

    activeConfig?.onRecommendation?.(payload.recommendation);
  });
}

export const FitVR = {
  init,
  bindButtons,
  open
};

declare global {
  interface Window {
    FitVR?: typeof FitVR;
  }
}

if (typeof window !== "undefined") {
  window.FitVR = FitVR;
}
