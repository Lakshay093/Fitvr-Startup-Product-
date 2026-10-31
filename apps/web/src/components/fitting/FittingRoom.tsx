"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Camera, Check, CheckCircle2, ChevronRight, CircleHelp, Download, Info, Layers3, LockKeyhole, RotateCcw, Ruler, Scan, ShieldCheck, Smartphone, Trash2 } from "lucide-react";
import { BodyModel, GarmentArt, wardrobe, type GarmentKind } from "./BodyModel";

type Profile = { height: number; chest: number; waist: number; hips: number; inseam: number };
const sample: Profile = { height: 178, chest: 98, waist: 82, hips: 98, inseam: 80 };
const fields: { key: keyof Profile; label: string; min: number; max: number }[] = [
  { key: "height", label: "Height", min: 130, max: 210 }, { key: "chest", label: "Chest", min: 60, max: 160 },
  { key: "waist", label: "Waist", min: 45, max: 160 }, { key: "hips", label: "Hips", min: 60, max: 170 }, { key: "inseam", label: "Inseam", min: 45, max: 110 }
];

export function FittingRoom() {
  const [step, setStep] = useState(0);
  const [method, setMethod] = useState<"demo" | "manual">("demo");
  const [profile, setProfile] = useState<Profile>(sample);
  const [consent, setConsent] = useState(false);
  const [availability, setAvailability] = useState(false);
  const [progress, setProgress] = useState<number | null>(null);
  const [garment, setGarment] = useState<GarmentKind>("oversized");
  const [size, setSize] = useState("M");
  const [color, setColor] = useState("#6e7560");
  const [back, setBack] = useState(false);
  const [mesh, setMesh] = useState(false);
  const [saved, setSaved] = useState(false);
  const [cameraStatus, setCameraStatus] = useState<"off" | "loading" | "on">("off");
  const [error, setError] = useState("");
  const video = useRef<HTMLVideoElement>(null);
  const stream = useRef<MediaStream | null>(null);
  const cameraRequest = useRef(0);
  const heading = useRef<HTMLHeadingElement>(null);
  const product = wardrobe.find(item => item.id === garment)!;

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const item = wardrobe.find(item => item.id === params.get("garment"));
    if (item) { setGarment(item.id); setColor(item.color); }
    if (params.get("mode") === "demo") setStep(2);
    return () => { cameraRequest.current++; stream.current?.getTracks().forEach(track => track.stop()); };
  }, []);

  useEffect(() => {
    if (progress === null) return;
    if (progress >= 100) { setProgress(null); setStep(1); return; }
    const timer = window.setTimeout(() => setProgress(progress + 5), 120);
    return () => window.clearTimeout(timer);
  }, [progress]);

  useEffect(() => { if (step > 0) heading.current?.focus(); }, [step]);

  function stopCamera() {
    cameraRequest.current++;
    stream.current?.getTracks().forEach(track => track.stop());
    stream.current = null;
    if (video.current) video.current.srcObject = null;
    setCameraStatus("off");
  }
  async function startCamera() {
    setError("");
    if (!consent) { setError("Please allow camera preview using the checkbox first."); return; }
    if (!navigator.mediaDevices?.getUserMedia) { setError("Camera preview is unavailable here. Open over HTTPS or continue with the sample profile."); return; }
    const request = ++cameraRequest.current;
    setCameraStatus("loading");
    try {
      const media = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" }, audio: false });
      if (request !== cameraRequest.current) { media.getTracks().forEach(track => track.stop()); return; }
      stream.current = media;
      if (video.current) { video.current.srcObject = media; await video.current.play(); }
      if (request !== cameraRequest.current) { media.getTracks().forEach(track => track.stop()); return; }
      setCameraStatus("on");
    } catch {
      if (request !== cameraRequest.current) return;
      stream.current?.getTracks().forEach(track => track.stop());
      stream.current = null;
      setCameraStatus("off");
      setError("We couldn’t open the camera. Check your browser permission, or continue with the demo or your measurements.");
    }
  }
  function reset() {
    stopCamera(); setStep(0); setProgress(null); setConsent(false); setProfile(sample); setMethod("demo"); setSaved(false); setError(""); setMesh(false); setAvailability(false);
  }
  function download() {
    const file = new Blob([JSON.stringify({ source: method === "demo" ? "sample-profile" : "manual-measurements", units: "cm", measurements: profile, garment, size, color, note: "Illustrative preview; not a LiDAR scan or verified fit recommendation." }, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(file); const a = document.createElement("a"); a.href = url; a.download = "fitvr-profile.json"; a.click(); window.setTimeout(() => URL.revokeObjectURL(url), 1000); setSaved(true);
  }
  return <div className="fitting-room">
    <div className="room-topline"><Link href="/" className="text-link"><ArrowLeft size={15}/> Back to the experience</Link><span><LockKeyhole size={13}/> Private session · no account needed</span></div>
    <div className="room-heading"><div><p className="eyebrow">THE FITVR STUDIO</p><h1 ref={heading} tabIndex={-1}>{step === 0 ? "It starts with you." : step === 1 ? "Meet your body profile." : "Your fit. Your way."}</h1><p>{step === 0 ? "Create a profile, then explore how different silhouettes look." : step === 1 ? "A few dimensions. A whole new perspective." : "Explore the shape, the colour, and the little details."}</p></div><ol className="room-steps" aria-label="Fitting progress">{["Your body", "Your profile", "Your wardrobe"].map((label,index) => <li key={label} className={index === step ? "current" : index < step ? "complete" : ""} aria-current={index === step ? "step" : undefined}><span>{index < step ? <Check size={13}/> : `0${index + 1}`}</span>{label}</li>)}</ol></div>
    {step === 0 ? <div className="setup-layout">
      <div className="setup-preview">
        <div className="stage-top"><span><Scan size={14}/> FULL-BODY PERSPECTIVE</span><span className="subtle-pill">{cameraStatus === "on" ? "CAMERA ONLY" : "ILLUSTRATION"}</span></div>
        <video ref={video} muted playsInline className={`alignment-video ${cameraStatus === "on" ? "visible" : ""}`} aria-label="Live camera alignment preview"/>
        <BodyModel scan/>
        {progress !== null ? <div className="scan-progress" role="status"><span>Playing sample scan · {progress}%</span><progress max={100} value={progress}/><button className="text-link" onClick={() => setProgress(null)}>Cancel demo</button></div> : <div className="alignment-caption"><span className="scan-corner"/><p>{cameraStatus === "on" ? "Keep your whole body in frame." : "A new perspective on your proportions."}</p><small>{cameraStatus === "on" ? "Alignment preview only. No depth captured or video recorded." : "Sample body mesh · not a scan of you"}</small></div>}
      </div>
      <div className="setup-panel">
        <div className="eyebrow"><Smartphone size={14}/> YOUR BODY, IN EVERY DIMENSION</div><h2>First, find your starting point.</h2><p>Full-body LiDAR capture is the next step for FitVR. For now, explore a sample body or use your measurements.</p>
        <button className="device-check" onClick={() => setAvailability(!availability)} aria-expanded={availability}><span><Scan size={20}/><span><strong>Scan with your phone</strong><small>Check LiDAR availability</small></span></span><ChevronRight size={18}/></button>
        {availability && <div className="inline-notice" role="status"><Info size={18}/><p><strong>Native scanner not connected yet.</strong> LiDAR capture needs a supported device and a native capture app. This browser demo cannot read your LiDAR sensor. You can explore the sample or enter measurements below.</p></div>}
        <div className="method-tabs" role="group" aria-label="Profile method"><button disabled={progress !== null} className={method === "demo" ? "active" : ""} aria-pressed={method === "demo"} onClick={() => { setMethod("demo"); setProfile(sample); }}>Explore a sample</button><button disabled={progress !== null} className={method === "manual" ? "active" : ""} aria-pressed={method === "manual"} onClick={() => setMethod("manual")}>Use my measurements</button></div>
        {method === "demo" ? <div className="demo-method"><span className="small-icon"><Layers3 size={20}/></span><div><h3>Take a look around.</h3><p>Try a sample profile and switch between oversized, compression, and tapered fits.</p></div></div> : <p className="form-intro">Measure around the fullest part of your chest and hips, your natural waist, and your inside leg. All values are in centimetres.</p>}
        <form onSubmit={event => { event.preventDefault(); stopCamera(); setMesh(false); if (method === "demo") { setProfile(sample); setProgress(0); } else setStep(1); }}>
          {method === "manual" && <div className="measurement-fields">{fields.map(field => <label key={field.key}>{field.label}<div><input required type="number" min={field.min} max={field.max} step="0.1" value={Number.isNaN(profile[field.key]) ? "" : profile[field.key]} onChange={event => setProfile({ ...profile, [field.key]: event.target.valueAsNumber })}/><span>cm</span></div></label>)}</div>}
          <button className="button button-dark full-width" disabled={progress !== null} type="submit">{method === "demo" ? "Explore sample scan" : "Create my profile"}<ArrowRight size={17}/></button>
        </form>
        <details className="camera-option"><summary><Camera size={15}/> Preview your camera framing <span>+</span></summary><p>Use your rear camera to explore full-body framing. This does not capture a body scan.</p><label className="consent-line"><input type="checkbox" checked={consent} onChange={event => { setConsent(event.target.checked); if (!event.target.checked) stopCamera(); }}/><span>Allow a live camera preview. No recording or upload.</span></label><button className="button button-outline full-width" disabled={!consent || cameraStatus === "loading"} onClick={cameraStatus === "on" ? stopCamera : startCamera}>{cameraStatus === "on" ? "Stop camera" : cameraStatus === "loading" ? "Opening camera…" : "Open camera preview"}<Camera size={15}/></button></details>
        {error && <p className="inline-error" role="alert">{error}</p>}
        <p className="session-note"><ShieldCheck size={14}/> Your measurements stay in this session.</p>
      </div>
    </div> : step === 1 ? <div className="profile-layout"><div className="profile-figure"><div className="stage-top"><span>BODY PROFILE / 01</span><span className="subtle-pill">{method === "demo" ? "SAMPLE DATA" : "MANUAL INPUT"}</span></div><BodyModel scan chest={profile.chest} height={profile.height}/></div><div className="profile-panel"><span className="small-icon"><CheckCircle2 size={23}/></span><h2>{method === "demo" ? "Your sample profile is ready." : "Your measurements are ready."}</h2><p>{method === "demo" ? "These are example measurements. You can edit them before trying on a garment." : "Review your measurements before you explore the wardrobe."}</p><form onSubmit={event => { event.preventDefault(); setStep(2); }}>{fields.map(field => <label className="profile-row" key={field.key}><span>{field.label}</span><span><input aria-label={field.label} type="number" min={field.min} max={field.max} step="0.1" required value={Number.isNaN(profile[field.key]) ? "" : profile[field.key]} onChange={event => { setMethod("manual"); setProfile({ ...profile, [field.key]: event.target.valueAsNumber }); }}/><small>cm</small></span></label>)}<div className="inline-notice"><Info size={16}/><p>The model is a simplified illustration. It is not a reconstructed body scan.</p></div><button className="button button-dark full-width" type="submit">Find your next favourite <ArrowRight size={17}/></button></form><button className="text-link profile-back" onClick={() => setStep(0)}><ArrowLeft size={14}/> Back to setup</button></div></div> : <div className="studio-layout">
      <aside className="wardrobe-rail"><p className="tiny-label">THE DEMO COLLECTION</p><h2>Your wardrobe</h2><div className="wardrobe-items">{wardrobe.map(item => <button key={item.id} className={`wardrobe-item ${garment === item.id ? "selected" : ""}`} aria-pressed={garment === item.id} onClick={() => { setGarment(item.id); setColor(item.color); setMesh(false); setSaved(false); }}><div><GarmentArt kind={item.id} color={item.color}/></div><span><strong>{item.short}</strong><small>{item.material}</small></span>{garment === item.id && <Check size={14}/>}</button>)}</div><div className="rail-profile"><Ruler size={17}/><div><strong>{method === "demo" ? "Sample body profile" : "Your body profile"}</strong><span>{profile.height} cm · {profile.chest} cm chest</span></div><button className="text-link" onClick={() => setStep(1)}>Edit</button></div></aside>
      <div className="studio-canvas"><div className="stage-top"><span><span className="status-dot"/> {mesh ? "BODY MESH" : "VIRTUAL FITTING"}</span><button className="icon-button" title="Reset view" aria-label="Reset view" onClick={() => { setBack(false); setMesh(false); setSize("M"); setColor(product.color); }}><RotateCcw size={15}/></button></div><span className="canvas-watermark" aria-hidden>your<br/>fit.</span><BodyModel garment={garment} color={color} scan={mesh} back={back} size={size} chest={profile.chest} height={profile.height}/><div className="view-controls" role="group" aria-label="Model view"><button className={!back && !mesh ? "active" : ""} aria-pressed={!back && !mesh} onClick={() => { setBack(false); setMesh(false); }}>Front</button><button className={back && !mesh ? "active" : ""} aria-pressed={back && !mesh} onClick={() => { setBack(true); setMesh(false); }}>Back</button><button className={mesh ? "active" : ""} aria-pressed={mesh} onClick={() => setMesh(!mesh)}><Scan size={13}/> Mesh</button></div><p className="canvas-disclaimer">Illustrative silhouette · not a fabric simulation</p></div>
      <aside className="garment-panel"><p className="eyebrow">{product.category}</p><h2>{product.name}</h2><p>{product.material}</p><div className="garment-divider"/><div className="control-heading"><strong>Colour</strong><span>{color === "#6e7560" ? "Sage" : color === "#444744" ? "Graphite" : "Stone"}</span></div><div className="swatches" role="group" aria-label="Garment colour">{[{value:"#6e7560",name:"Sage"},{value:"#444744",name:"Graphite"},{value:"#a69782",name:"Stone"}].map(item => <button key={item.value} style={{ background: item.value }} aria-label={item.name} aria-pressed={color === item.value} className={color === item.value ? "selected" : ""} onClick={() => { setColor(item.value); setSaved(false); }}>{color === item.value && <Check size={14}/>}</button>)}</div><div className="control-heading"><strong>Explore a size</strong><span>Sample sizing</span></div><div className="size-options" role="group" aria-label="Garment size">{["S", "M", "L", "XL"].map(item => <button key={item} className={size === item ? "selected" : ""} aria-pressed={size === item} onClick={() => { setSize(item); setSaved(false); }}>{item}</button>)}</div><div className="fit-observation"><Layers3 size={19}/><strong>{garment === "oversized" ? "A little more room." : garment === "compression" ? "A little closer to you." : "An easy kind of everyday."}</strong><p>{product.note}</p><span>Viewing {size} · {back ? "back" : "front"} silhouette</span></div><details className="size-note"><summary><CircleHelp size={14}/> What does this preview show?</summary><p>Sizes change the illustrated garment width. This is a demo collection without verified brand size charts. It does not predict garment pressure, real drape, or your recommended size.</p></details><button className="button button-dark full-width" onClick={download}><Download size={15}/>{saved ? "Download again" : "Download this look"}</button><p className="download-status" role="status">{saved ? "Your look and profile were exported as JSON." : "Saves your selections and measurements as a file."}</p></aside>
    </div>}
    <div className="room-bottom"><span><ShieldCheck size={15}/> {method === "demo" ? "Sample profile" : "Manual measurements"} · nothing uploaded</span>{step > 0 && <button className="text-link" onClick={reset}><Trash2 size={14}/> Clear session & start again</button>}<Link href="/privacy">Privacy & your data <ArrowUpRight size={13}/></Link></div>
  </div>;
}
