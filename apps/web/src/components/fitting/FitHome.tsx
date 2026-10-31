"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, Check, ChevronRight, Fingerprint, Layers3, MoveUpRight, Scan, ShieldCheck, Smartphone } from "lucide-react";
import { MarketingNav } from "@/components/marketing/MarketingNav";
import { BodyModel, GarmentArt, wardrobe, type GarmentKind } from "./BodyModel";

export function FitHome() {
  const [garment, setGarment] = useState<GarmentKind>("oversized");
  const [scan, setScan] = useState(false);
  const product = wardrobe.find(item => item.id === garment)!;
  return <main className="fit-home">
    <MarketingNav />
    <section className="hero fit-container">
      <div className="hero-copy">
        <div className="eyebrow"><span className="status-dot"/> THE NEXT DIMENSION OF FIT</div>
        <h1>Good style.<br/>Great fit.<br/><span>All you.</span></h1>
        <p>Your body. Your proportions. Your fitting room.<br className="desktop-break"/> Discover how clothes could look on you,<br className="desktop-break"/> before they become yours.</p>
        <div className="hero-ctas"><Link href="/try-on" className="button button-dark">Find your fit <ArrowUpRight size={18}/></Link><Link href="/try-on?mode=demo" className="text-link">Explore the demo <ArrowRight size={16}/></Link></div>
        <div className="hero-caption"><Smartphone size={16}/><span>Designed for mobile LiDAR body scanning</span></div>
        <a className="scroll-link" href="#how-it-works"><span><ArrowDown size={14}/></span> A little less guessing. A lot more you.</a>
      </div>
      <div className="hero-stage">
        <div className="stage-top"><span><span className="status-dot"/> YOUR DIGITAL FITTING ROOM</span><span className="subtle-pill">CONCEPT PREVIEW</span></div>
        <div className="stage-watermark" aria-hidden>made<br/>for you.</div>
        <div className="hero-model"><BodyModel garment={garment} color={product.color} scan={scan}/></div>
        <div className="measurement-tag"><span className="tiny-label">BODY PROFILE</span><strong>Uniquely yours.</strong><span><Check size={12}/> Full-body perspective</span></div>
        <div className="fit-tag"><span className="tiny-label">{scan ? "BODY MESH" : "THE SILHOUETTE"}</span><strong>{scan ? "Every dimension." : product.short}</strong><span>{scan ? "Illustrative scan preview" : product.fit}</span></div>
        <div className="stage-mode" role="group" aria-label="Preview mode"><button className={scan ? "active" : ""} onClick={() => setScan(true)} aria-pressed={scan}><Scan size={14}/> Body mesh</button><button className={!scan ? "active" : ""} onClick={() => setScan(false)} aria-pressed={!scan}><Layers3 size={14}/> Try-on</button></div>
        <div className="stage-bottom"><div><span className="tiny-label">EXPLORE A DIFFERENT FIT</span><div className="garment-tabs" role="group" aria-label="Preview garment">{wardrobe.map(item => <button key={item.id} className={garment === item.id ? "active" : ""} aria-pressed={garment === item.id} onClick={() => { setGarment(item.id); setScan(false); }}>{item.short}<ChevronRight size={13}/></button>)}</div></div><Link href={`/try-on?mode=demo&garment=${garment}`} className="round-link" aria-label="Open this garment in fitting room"><ArrowUpRight/></Link></div>
      </div>
    </section>
    <div className="promise-strip fit-container"><span><Scan size={18}/> One body. Every dimension.</span><span><Layers3 size={18}/> See the silhouette. Feel the difference.</span><span><ShieldCheck size={18}/> Your body data stays yours.</span></div>
    <section id="how-it-works" className="how-section fit-container">
      <div className="section-heading"><div><p className="eyebrow">LESS FRICTION. MORE CONFIDENCE.</p><h2>From your phone<br/>to your perfect fit.</h2></div><p>Just you, your phone, and a new way to try things on.<br/>A fitting experience built around your whole body.</p></div>
      <div className="steps-grid">
        <article><div className="step-heading"><span>01 / SCAN</span><Scan/></div><h3>Start with you.</h3><p>A guided full-body scan with your LiDAR-enabled phone is the foundation for your digital body profile.</p><span className="step-note">Native mobile capture · coming next</span></article>
        <article><div className="step-heading"><span>02 / DISCOVER</span><Fingerprint/></div><h3>Meet your dimensions.</h3><p>Bring your proportions into one place. Review your measurements and find the shapes that work for you.</p><span className="step-note">Your profile, on your terms</span></article>
        <article><div className="step-heading"><span>03 / TRY ON</span><Layers3/></div><h3>Make it your own.</h3><p>Go oversized. Keep it close. Find your everyday. Explore different garments, colours, and silhouettes.</p><Link href="/try-on?mode=demo" className="text-link">Try the interactive preview <ArrowUpRight size={14}/></Link></article>
      </div>
    </section>
    <section id="wardrobe" className="wardrobe-section fit-container">
      <div className="section-heading"><div><p className="eyebrow">DIFFERENT STYLES. THE SAME YOU.</p><h2>A fit for every version of you.</h2></div><Link href="/try-on?mode=demo" className="text-link">Step into the wardrobe <ArrowUpRight size={16}/></Link></div>
      <div className="product-grid">{wardrobe.map((item, index) => <Link href={`/try-on?mode=demo&garment=${item.id}`} className="product-card" key={item.id}><div className={`product-art product-art-${index}`}><span className="product-number">0{index + 1}</span><span className="product-badge">DEMO COLLECTION</span><GarmentArt kind={item.id} color={item.color}/><span className="product-action">Try it on <ArrowUpRight size={16}/></span></div><div className="product-info"><span className="tiny-label">{item.category}</span><h3>{item.short}<MoveUpRight size={17}/></h3><p>{item.copy}</p><div className="product-colors"><i style={{background:item.color}}/><i style={{background:"#d8d0bf"}}/><i style={{background:"#424640"}}/><span>Explore colour & fit</span></div></div></Link>)}</div>
    </section>
    <section className="privacy-band fit-container"><div className="privacy-symbol"><Fingerprint size={62} strokeWidth={1}/></div><div><p className="eyebrow">PERSONAL BY DESIGN</p><h2>Your shape. Your space.<br/>Your say.</h2><p>Try the demo without an account. Enter measurements only when you choose. This fitting preview keeps your profile in memory and clears it when you reload.</p><Link href="/privacy" className="text-link">Explore your data controls <ArrowUpRight size={16}/></Link></div><div className="privacy-note"><ShieldCheck size={23}/><p>A little peace of mind<br/>looks good on everyone.</p></div></section>
    <section className="faq-section fit-container"><div><p className="eyebrow">A FEW THINGS TO KNOW</p><h2>Before you step in.</h2></div><div className="faqs">{[
      ["How will the full-body scan work?", "The planned mobile experience uses a supported phone’s rear LiDAR sensor to capture depth as someone moves around you. A guided capture will turn that data into a body model. Native capture and body reconstruction are not connected to this web preview yet."],
      ["Can I try it without a LiDAR phone?", "Yes. Explore the sample profile or enter your own measurements in the fitting room. You can also use the camera alignment preview. A regular camera preview does not perform a LiDAR scan."],
      ["Is this exactly how the clothes will fit?", "This version illustrates garment silhouettes and size changes. It is not a photorealistic try-on or a fabric simulation. Accurate fit will require your reconstructed body mesh, real garment assets, and each brand’s size and material data."]
    ].map(([q,a]) => <details key={q}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}</div></section>
    <footer className="site-footer fit-container"><Link href="/" className="wordmark">fit<span>vr</span><sup>®</sup></Link><p>A fitting room, built around you.</p><div><Link href="/privacy">Privacy</Link><Link href="/docs">Developers</Link><Link href="/dashboard">For brands <ArrowUpRight size={12}/></Link></div><span>© {new Date().getFullYear()} FitVR</span></footer>
  </main>;
}
