"use client";

import { useId } from "react";

export type GarmentKind = "oversized" | "compression" | "joggers";
export const wardrobe = [
  { id: "oversized" as const, name: "The everyday oversized tee", short: "Oversized tee", category: "RELAXED ESSENTIALS", copy: "Room to move. Space to be you.", fit: "Dropped shoulders · relaxed drape", color: "#6e7560", colorName: "Sage", material: "Heavyweight cotton", note: "A wider silhouette, dropped shoulders, and a longer hem." },
  { id: "compression" as const, name: "The performance compression tee", short: "Compression tee", category: "SECOND-SKIN PERFORMANCE", copy: "Closer fit. Unrestricted movement.", fit: "Contoured waist · close fit", color: "#444744", colorName: "Graphite", material: "Stretch performance knit", note: "A close silhouette through the chest, waist, and sleeves." },
  { id: "joggers" as const, name: "The all-day training jogger", short: "Training joggers", category: "MADE FOR MOVEMENT", copy: "From your first rep to your last plan.", fit: "Easy through the thigh · tapered leg", color: "#a69782", colorName: "Stone", material: "Soft stretch weave", note: "Room through the hips and thighs with a tapered ankle." }
];

const bodyPath = "M181 96 Q180 109 171 117 L147 126 Q132 131 126 152 L111 211 L101 263 Q95 282 99 291 Q104 297 109 287 L115 266 L131 223 L148 181 L151 242 Q143 267 147 302 L154 371 L160 439 L157 465 Q152 476 157 480 L181 480 Q187 477 181 461 L181 428 L183 365 L193 303 L203 365 L205 428 L205 461 Q199 477 205 480 L230 480 Q235 477 229 465 L226 439 L232 371 L239 302 Q243 267 235 242 L238 181 L255 223 L271 266 L277 287 Q282 297 287 291 Q291 282 285 263 L275 211 L260 152 Q254 131 239 126 L215 117 Q206 109 205 96 Z";

export function BodyModel({ garment = "oversized", color = "#6e7560", scan = false, back = false, size = "M", chest = 98, height = 178 }: { garment?: GarmentKind; color?: string; scan?: boolean; back?: boolean; size?: string; chest?: number; height?: number }) {
  const id = useId().replace(/:/g, "");
  const safeChest = Math.min(160, Math.max(60, Number.isFinite(chest) ? chest : 98));
  const safeHeight = Math.min(210, Math.max(130, Number.isFinite(height) ? height : 178));
  const width = 1 + (safeChest - 98) / 300;
  const ease = ({ S: 0.95, M: 1, L: 1.045, XL: 1.09 }[size] ?? 1);
  const top = garment === "oversized" ? "M173 116 Q193 131 213 116 L246 125 Q259 128 264 144 L277 194 L246 206 L235 180 L240 269 Q195 281 146 269 L151 180 L140 206 L109 194 L122 144 Q127 128 140 125 Z" : "M173 117 Q193 132 213 117 L242 129 Q254 131 259 147 L266 175 L243 186 L235 163 L232 212 L238 254 Q193 263 148 254 L154 212 L151 163 L143 186 L120 175 L127 147 Q132 131 144 129 Z";
  const lower = garment === "joggers" ? "M150 245 Q193 253 236 245 L241 284 L230 378 L223 458 L204 458 L203 375 L193 302 L182 375 L182 458 L162 458 L153 378 L145 284 Z" : "M150 245 Q193 253 236 245 L238 286 L227 344 L200 344 L193 298 L184 344 L157 344 L146 286 Z";
  return <svg className={`body-model ${scan ? "model-scanning" : ""}`} viewBox="0 0 390 520" role="img" aria-label={`${back ? "Back" : "Front"} view of an illustrative body model ${scan ? "with a scan mesh" : `wearing ${garment} in size ${size}`} `}>
    <defs>
      <linearGradient id={`${id}-skin`} x1="0" x2="1"><stop stopColor="#a59c8e"/><stop offset=".3" stopColor="#e2d9cc"/><stop offset=".53" stopColor="#f1eade"/><stop offset=".78" stopColor="#c4baac"/><stop offset="1" stopColor="#91897e"/></linearGradient>
      <linearGradient id={`${id}-cloth`} x1="0" x2="1"><stop stopColor="#000" stopOpacity=".25"/><stop offset=".27" stopColor="#fff" stopOpacity=".08"/><stop offset=".5" stopColor="#fff" stopOpacity=".18"/><stop offset=".78" stopColor="#000" stopOpacity=".08"/><stop offset="1" stopColor="#000" stopOpacity=".28"/></linearGradient>
      <radialGradient id={`${id}-shadow`}><stop stopColor="#393d30" stopOpacity=".2"/><stop offset="1" stopColor="#393d30" stopOpacity="0"/></radialGradient>
      <clipPath id={`${id}-clip`}><path d={bodyPath}/><ellipse cx="193" cy="69" rx="25" ry="35"/></clipPath>
    </defs>
    <ellipse cx="195" cy="487" rx="125" ry="22" fill={`url(#${id}-shadow)`}/>
    <ellipse cx="195" cy="482" rx="137" ry="30" fill="none" stroke="#9a9e8b" strokeWidth=".6" opacity=".55"/>
    <g transform={`translate(${193 * (1 - width)} ${480 * (1 - safeHeight / 178)}) scale(${width} ${safeHeight / 178})`}>
      <path d={bodyPath} fill={`url(#${id}-skin)`}/>
      <ellipse cx="193" cy="69" rx="25" ry="35" fill={`url(#${id}-skin)`}/>
      <path d="M174 84 Q193 98 211 84 M177 111 Q193 121 209 111 M154 248 Q194 259 232 248 M193 257 L193 299" fill="none" stroke="#a39888" opacity=".35"/>
      {scan ? <g clipPath={`url(#${id}-clip)`} stroke="#718269" strokeWidth=".65" fill="none" opacity=".65">
        {Array.from({length: 39}, (_, i) => <path key={`h${i}`} d={`M80 ${28 + i * 12} Q193 ${55 + i * 11.4} 305 ${28 + i * 12}`}/>)}
        {Array.from({length: 22}, (_, i) => <path key={`v${i}`} d={`M${86 + i * 10} 20 Q${124 + i * 6.6} 246 ${86 + i * 10} 485`}/>)}
      </g> : <>
        <g transform={garment === "joggers" ? `translate(${193 * (1 - ease)} 0) scale(${ease} 1)` : undefined}><path d={lower} fill={garment === "joggers" ? color : "#55574f"}/><path d={lower} fill={`url(#${id}-cloth)`}/></g>
        <g transform={garment !== "joggers" ? `translate(${193 * (1 - ease)} 0) scale(${ease} 1)` : undefined}>
          <path d={top} fill={garment === "joggers" ? "#e4dfd3" : color}/>
          <path d={top} fill={`url(#${id}-cloth)`}/>
          <path d={back ? "M173 118 Q193 125 213 118" : "M173 118 Q193 145 213 118"} fill="none" stroke="#262d25" strokeWidth="3" opacity=".4"/>
          <path d="M154 154 Q161 180 155 216 M232 155 Q224 186 231 231 M163 231 L159 261 M223 236 L229 264" fill="none" stroke="#252c24" opacity=".18"/>
          {!back && <text x="214" y="158" fill="#fff" opacity=".65" fontSize="7" fontFamily="Arial">fvr.</text>}
        </g>
        {garment === "joggers" && <path d="M151 259 Q193 267 236 259 M193 260 L190 284 M196 260 L199 282 M157 274 L171 291 M231 274 L218 291" stroke="#403b32" opacity=".35" fill="none"/>}
      </>}
      {back && <path d="M193 45 L193 89" stroke="#9d9385" opacity=".2"/>}
    </g>
    {scan && <g className="scan-sweep"><path d="M75 234 H314" stroke="#667d54" strokeWidth="1.2"/><ellipse cx="194" cy="234" rx="119" ry="18" fill="#9da991" fillOpacity=".12" stroke="#819275" strokeWidth=".7"/></g>}
  </svg>;
}

export function GarmentArt({ kind, color }: { kind: GarmentKind; color: string }) {
  const id = useId().replace(/:/g, "");
  const d = kind === "joggers" ? "M91 35 Q130 42 169 35 L178 88 L162 217 L136 217 L132 111 L126 111 L122 217 L96 217 L82 88 Z" : kind === "oversized" ? "M105 48 Q130 65 155 48 L188 60 L219 112 L182 133 L169 112 L177 207 Q130 217 83 207 L91 112 L78 133 L41 112 L72 60 Z" : "M106 48 Q130 65 154 48 L183 61 L202 99 L174 114 L163 94 L158 145 L170 204 Q130 212 90 204 L102 145 L97 94 L86 114 L58 99 L77 61 Z";
  return <svg viewBox="0 0 260 250" role="img" aria-label={`${kind} garment illustration`}><defs><linearGradient id={id}><stop stopColor="#000" stopOpacity=".18"/><stop offset=".4" stopColor="#fff" stopOpacity=".15"/><stop offset="1" stopColor="#000" stopOpacity=".24"/></linearGradient></defs><ellipse cx="130" cy="224" rx="61" ry="7" fill="#252c24" opacity=".06"/><path d={d} fill={color}/><path d={d} fill={`url(#${id})`}/>{kind !== "joggers" ? <><path d="M106 50 Q130 83 154 50 M88 201 Q130 209 172 201" stroke="#20251d" opacity=".22" fill="none" strokeWidth="2"/><path d="M100 110 L106 180 M159 110 L153 184" stroke="#fff" opacity=".09" fill="none"/><text x="151" y="98" fontSize="8" fill="#fff" opacity=".6">fvr.</text></> : <path d="M91 44 Q130 50 169 44 M130 49 L126 75 M134 49 L137 74 M94 60 L110 81 M167 60 L150 81 M97 209 H121 M137 209 H163" stroke="#302d26" opacity=".3" fill="none"/>}</svg>;
}
