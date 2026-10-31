"use client";

import { Camera, Expand, Move3D, Rotate3D, ShieldCheck, VideoOff } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useFitStore } from "@/lib/use-fit-store";

type CameraState = "idle" | "requesting" | "active" | "denied";
type GarmentMode = "upper" | "lower" | "outfit";
type ViewMode = "front" | "side" | "movement";

export function CameraFittingStudio({
  consentAccepted
}: {
  consentAccepted: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [cameraState, setCameraState] = useState<CameraState>("idle");
  const [garmentMode, setGarmentMode] = useState<GarmentMode>("upper");
  const [viewMode, setViewMode] = useState<ViewMode>("front");
  const recommendation = useFitStore((state) => state.recommendation);
  const movementAverage = recommendation?.movementTests.length
    ? Math.round(
        recommendation.movementTests.reduce((total, test) => total + test.score, 0) /
          recommendation.movementTests.length
      )
    : 82;

  async function startCamera() {
    if (!consentAccepted) {
      setCameraState("denied");
      return;
    }

    setCameraState("requesting");

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setCameraState("active");
    } catch {
      setCameraState("denied");
    }
  }

  function stopCamera() {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    setCameraState("idle");
  }

  useEffect(() => {
    return () => stopCamera();
  }, []);

  return (
    <div className="surface overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#dce3d3] p-5">
        <div>
          <p className="metric text-xs">CAMERA AR FITTING</p>
          <h2 className="mt-2 text-xl font-semibold">Live garment overlay</h2>
        </div>
        <div className="flex gap-2">
          <button
            className="inline-flex min-h-10 items-center gap-2 rounded-[10px] bg-[#d9e6c7] px-3 text-sm font-semibold text-black disabled:cursor-not-allowed disabled:opacity-50"
            disabled={cameraState === "active" || cameraState === "requesting"}
            onClick={startCamera}
            type="button"
          >
            <Camera className="size-4" aria-hidden />
            {cameraState === "requesting" ? "Requesting" : "Start"}
          </button>
          <button
            className="rounded-[10px] border border-[#dce3d3] p-2 text-[#46543a] disabled:cursor-not-allowed disabled:opacity-50"
            disabled={cameraState !== "active"}
            onClick={stopCamera}
            type="button"
            title="Stop camera"
          >
            <VideoOff className="size-5" aria-hidden />
          </button>
        </div>
      </div>

      <div className="grid gap-0 xl:grid-cols-[1fr_280px]">
        <div className="relative aspect-[4/5] min-h-[520px] bg-black md:aspect-video">
          <video
            ref={videoRef}
            className="h-full w-full scale-x-[-1] object-cover opacity-80"
            muted
            playsInline
          />
          {cameraState !== "active" ? (
            <div className="absolute inset-0 grid place-items-center bg-[#f8f8f3] p-6 text-center">
              <div className="max-w-sm">
                <ShieldCheck className="mx-auto size-10 text-[#697f51]" aria-hidden />
                <h3 className="mt-4 text-xl font-semibold">Consent-gated camera</h3>
                <p className="mt-2 text-sm text-[#748068]">
                  Fit.VR processes the camera stream in-browser for the MVP.
                </p>
              </div>
            </div>
          ) : null}
          <GarmentOverlay garmentMode={garmentMode} viewMode={viewMode} />
          <div className="absolute left-4 top-4 rounded-[10px] border border-[#b6c9a0]/30 bg-black/60 px-3 py-2 text-xs text-[#526b39] backdrop-blur">
            {cameraState === "active" ? "landmark lock 74%" : "camera idle"}
          </div>
          <div className="absolute bottom-4 left-4 right-4 grid gap-2 sm:grid-cols-3">
            <button
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-[10px] border border-[#dce3d3] bg-black/60 px-3 text-sm"
              onClick={() => setViewMode("front")}
              type="button"
            >
              <Expand className="size-4" aria-hidden />
              Front
            </button>
            <button
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-[10px] border border-[#dce3d3] bg-black/60 px-3 text-sm"
              onClick={() => setViewMode("side")}
              type="button"
            >
              <Rotate3D className="size-4" aria-hidden />
              Side
            </button>
            <button
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-[10px] border border-[#dce3d3] bg-black/60 px-3 text-sm"
              onClick={() => setViewMode("movement")}
              type="button"
            >
              <Move3D className="size-4" aria-hidden />
              Move
            </button>
          </div>
        </div>

        <aside className="border-t border-[#dce3d3] p-5 xl:border-l xl:border-t-0">
          <p className="text-sm text-[#748068]">Garment layer</p>
          <div className="mt-3 grid grid-cols-3 gap-2 xl:grid-cols-1">
            {(["upper", "lower", "outfit"] as const).map((mode) => (
              <button
                key={mode}
                className={`min-h-10 rounded-[10px] border px-3 text-sm capitalize ${garmentMode === mode ? "border-[#b6c9a0] bg-[#d9e6c7] text-black" : "border-[#dce3d3] text-[#292d26]"}`}
                onClick={() => setGarmentMode(mode)}
                type="button"
              >
                {mode}
              </button>
            ))}
          </div>
          <div className="mt-6 rounded-[10px] border border-[#dce3d3] bg-[#f1f3eb] p-4">
            <p className="text-xs text-[#748068]">Recommendation</p>
            <p className="mt-2 text-3xl font-semibold">
              {recommendation?.recommendedSize ?? "L"}
            </p>
            <p className="mt-2 text-sm text-[#748068]">
              {recommendation?.expectedFit ?? "Athletic compression"}
            </p>
          </div>
          <div className="mt-4 rounded-[10px] border border-[#dce3d3] bg-[#f1f3eb] p-4">
            <p className="text-xs text-[#748068]">Movement comfort</p>
            <p className="mt-2 text-2xl font-semibold text-[#697f51]">
              {movementAverage}%
            </p>
            <p className="mt-2 text-sm text-[#748068]">
              {recommendation
                ? `${recommendation.fitStatus} with ${recommendation.returnRiskLevel} return risk.`
                : "Squat and shoulder flexion checks are ready for pose landmarks."}
            </p>
          </div>
          <div className="mt-4 grid gap-2">
            {(recommendation?.movementTests ?? []).slice(0, 5).map((test) => (
              <div
                key={test.key}
                className="rounded-[10px] border border-[#dce3d3] bg-[#f7f9f2] p-3"
              >
                <div className="flex items-center justify-between gap-3 text-sm">
                  <span>{test.label}</span>
                  <span
                    className={
                      test.status === "pass"
                        ? "text-[#697f51]"
                        : test.status === "caution"
                          ? "text-[#a27a36]"
                          : "text-[#b85b57]"
                    }
                  >
                    {test.score}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}

function GarmentOverlay({
  garmentMode,
  viewMode
}: {
  garmentMode: GarmentMode;
  viewMode: ViewMode;
}) {
  const movementClass = viewMode === "movement" ? "animate-pulse" : "";
  const sideClass = viewMode === "side" ? "scale-x-75" : "";

  return (
    <div className="pointer-events-none absolute inset-0 grid place-items-center">
      <div className={`relative h-[72%] w-[46%] max-w-[360px] transition ${sideClass}`}>
        {(garmentMode === "upper" || garmentMode === "outfit") && (
          <div
            className={`scanline absolute left-1/2 top-[7%] h-[45%] w-[82%] -translate-x-1/2 rounded-[10px] border border-[#b6c9a0]/70 bg-[#d9e6c7]/18 shadow-[0_0_36px_rgba(183,255,60,0.18)] ${movementClass}`}
          >
            <div className="absolute left-[-18%] top-[18%] h-[34%] w-[24%] rotate-[-14deg] rounded-[10px] border border-[#b4cbbd]/60 bg-[#d8e9df]/12" />
            <div className="absolute right-[-18%] top-[18%] h-[34%] w-[24%] rotate-[14deg] rounded-[10px] border border-[#b4cbbd]/60 bg-[#d8e9df]/12" />
          </div>
        )}
        {(garmentMode === "lower" || garmentMode === "outfit") && (
          <div className={`absolute left-1/2 top-[50%] h-[42%] w-[62%] -translate-x-1/2 ${movementClass}`}>
            <div className="absolute left-[8%] h-full w-[35%] rounded-[10px] border border-[#ffb13b]/70 bg-[#ecdfc8]/14" />
            <div className="absolute right-[8%] h-full w-[35%] rounded-[10px] border border-[#ffb13b]/70 bg-[#ecdfc8]/14" />
          </div>
        )}
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[#d8e9df]/50" />
      </div>
    </div>
  );
}
