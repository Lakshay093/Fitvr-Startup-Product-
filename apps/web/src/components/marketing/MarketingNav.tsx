"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ArrowUpRight, Menu, Scan, X } from "lucide-react";

export function MarketingNav() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  return <header className="site-header">
    <div className="site-nav fit-container">
      <Link href="/" className="wordmark" aria-label="FitVR home"><Scan aria-hidden />fit<span>vr</span><sup>®</sup></Link>
      <nav className={`nav-links ${open ? "is-open" : ""}`} aria-label="Main navigation">
        {[{ label: "The experience", href: "/" }, { label: "How it works", href: "/#how-it-works" }, { label: "The wardrobe", href: "/#wardrobe" }].map(item => <Link key={item.label} href={item.href} onClick={() => setOpen(false)} aria-current={item.href === path ? "page" : undefined}>{item.label}</Link>)}
        <Link className="nav-brand" href="/dashboard">For brands <ArrowUpRight size={13} /></Link>
      </nav>
      <div className="nav-actions"><Link className="button button-dark button-small" href="/try-on">Enter fitting room <ArrowUpRight size={15} /></Link><button className="menu-toggle icon-button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button></div>
    </div>
  </header>;
}
