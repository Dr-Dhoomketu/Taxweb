"use client"

import { motion, useReducedMotion, Variants } from "framer-motion";

const draw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (custom: number = 0) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { delay: custom * 0.2, type: "spring", duration: 1.5, bounce: 0 },
      opacity: { delay: custom * 0.2, duration: 0.1 }
    }
  })
};

// 1. Hero Rupee Mark — ₹ glyph in serif, primary blue, with construction guides
export function HeroRupeeMark() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="relative w-full aspect-square max-w-[520px] mx-auto flex items-center justify-center">
      {/* Soft radial halo behind */}
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,_hsl(var(--muted))_0%,_transparent_65%)] opacity-60 pointer-events-none" />

      {/* Construction-line backdrop */}
      <svg className="absolute inset-0 w-full h-full text-muted-foreground/30 pointer-events-none" viewBox="0 0 400 400" fill="none" stroke="currentColor">
        <motion.circle
          cx="200" cy="200" r="180"
          strokeDasharray="4 8" strokeWidth="1"
          initial={prefersReducedMotion ? { pathLength: 1, opacity: 0.5 } : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ duration: 1.4, ease: "easeOut", delay: 0.2 }}
        />
        <motion.circle
          cx="200" cy="200" r="120"
          strokeDasharray="2 6" strokeWidth="1"
          initial={prefersReducedMotion ? { pathLength: 1, opacity: 0.35 } : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.35 }}
          transition={{ duration: 1.4, ease: "easeOut", delay: 0.4 }}
        />
        <motion.path
          d="M 20 200 L 380 200 M 200 20 L 200 380"
          strokeDasharray="4 8" strokeWidth="1"
          initial={prefersReducedMotion ? { pathLength: 1, opacity: 0.3 } : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.3 }}
          transition={{ duration: 1.4, ease: "easeOut", delay: 0.6 }}
        />
      </svg>

      {/* Outer accent ring */}
      <motion.svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 400 400" fill="none"
        initial={prefersReducedMotion ? { opacity: 0.4 } : { opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 0.8, delay: 0.9 }}
      >
        <circle cx="200" cy="200" r="160" className="stroke-secondary" strokeWidth="1.5" fill="none" />
      </motion.svg>

      {/* Minted-coin corner ticks */}
      <svg className="absolute inset-0 w-full h-full text-secondary pointer-events-none" viewBox="0 0 400 400" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <motion.g
          initial={prefersReducedMotion ? { opacity: 0.6 } : { opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 0.6, delay: 1.1 }}
        >
          <path d="M 92 92 L 108 108" />
          <path d="M 308 92 L 292 108" />
          <path d="M 92 308 L 108 292" />
          <path d="M 308 308 L 292 292" />
        </motion.g>
      </svg>

      {/* The ₹ glyph itself — actual Unicode rendered in a font with a proper ₹ */}
      <motion.span
        aria-label="Indian rupee symbol"
        className="relative z-10 text-primary leading-none select-none"
        style={{
          fontFamily:
            '"Noto Sans", "Inter", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          fontSize: "clamp(240px, 42vw, 400px)",
          fontWeight: 300,
          letterSpacing: "-0.02em",
          fontFeatureSettings: '"lnum"',
        }}
        initial={prefersReducedMotion ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      >
        ₹
      </motion.span>

      {/* Ambient breathing dot on the outer ring */}
      {!prefersReducedMotion && (
        <motion.div
          className="absolute top-[10%] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-secondary"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: [0.8, 1.4, 0.8], opacity: [0, 0.7, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        />
      )}
    </div>
  );
}

// 2. Process Flow Scene
export function ProcessFlowScene() {
  const prefersReducedMotion = useReducedMotion();
  const variants = prefersReducedMotion ? { hidden: { opacity: 1, pathLength: 1 }, visible: { opacity: 1, pathLength: 1 } } : draw;

  return (
    <svg viewBox="0 0 1000 250" className="w-full h-auto text-primary" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {/* Winding Path */}
      <motion.path 
        d="M 150 125 C 250 50, 350 200, 400 125 C 450 50, 600 200, 650 125 C 700 50, 800 200, 900 125" 
        variants={variants} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}
        strokeDasharray="6 12" className="stroke-muted-foreground" 
      />

      {/* Node 1: Consultation (Speech Bubbles) */}
      <motion.g variants={variants} custom={2} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
        <path d="M 80 100 A 30 25 0 1 1 80 150 Q 70 160 60 160 Q 75 145 75 135 A 30 25 0 0 1 80 100 Z" className="fill-background" />
        <path d="M 110 80 A 35 30 0 1 1 110 140 Q 100 150 90 150 Q 105 135 105 125 A 35 30 0 0 1 110 80 Z" className="fill-background opacity-80" />
        <path d="M 120 100 L 140 100 M 115 110 L 145 110" />
        <text x="130" y="190" textAnchor="middle" className="font-serif text-sm stroke-none fill-primary">Consultation</text>
      </motion.g>

      {/* Node 2: Document Submission (Papers) */}
      <motion.g variants={variants} custom={4} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
        <path d="M 370 90 L 410 85 L 430 135 L 390 140 Z" className="fill-background" />
        <path d="M 380 100 L 420 95 L 440 145 L 400 150 Z" className="fill-background" />
        <path d="M 390 115 L 420 110 M 395 125 L 425 120 M 400 135 L 415 133" />
        <path d="M 390 90 C 385 85, 395 80, 400 85 L 395 100" className="stroke-secondary" />
        <text x="410" y="190" textAnchor="middle" className="font-serif text-sm stroke-none fill-primary">Submission</text>
      </motion.g>

      {/* Node 3: Processing (Calculator) */}
      <motion.g variants={variants} custom={6} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
        <rect x="620" y="80" width="60" height="80" rx="4" className="fill-background" />
        <rect x="630" y="90" width="40" height="20" rx="2" />
        <text x="665" y="105" textAnchor="end" className="font-serif text-[10px] stroke-none fill-primary">₹</text>
        <circle cx="635" cy="125" r="2" />
        <circle cx="650" cy="125" r="2" />
        <circle cx="665" cy="125" r="2" />
        <circle cx="635" cy="135" r="2" />
        <circle cx="650" cy="135" r="2" />
        <circle cx="665" cy="135" r="2" />
        <circle cx="635" cy="145" r="2" />
        <circle cx="650" cy="145" r="2" />
        <circle cx="665" cy="145" r="2" />
        <text x="650" y="190" textAnchor="middle" className="font-serif text-sm stroke-none fill-primary">Processing</text>
      </motion.g>

      {/* Node 4: Completion (Stamp) */}
      <motion.g variants={variants} custom={8} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
        <circle cx="890" cy="125" r="30" className="stroke-secondary fill-background" />
        <circle cx="890" cy="125" r="26" className="stroke-secondary stroke-[1]" strokeDasharray="2 4" />
        <path d="M 875 125 L 885 135 L 905 110" className="stroke-secondary" strokeWidth="3" />
        <text x="890" y="190" textAnchor="middle" className="font-serif text-sm stroke-none fill-primary">Completion</text>
      </motion.g>

      {/* Travelling INR Token (One shot) */}
      {!prefersReducedMotion && (
        <motion.g
          initial={{ opacity: 0 }}
          whileInView={{ opacity: [0, 1, 1, 0] }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 4, ease: "easeInOut", delay: 2.5 }}
        >
          <motion.circle 
            r="12" 
            className="fill-secondary stroke-none"
            initial={{ offsetDistance: "0%" }}
            whileInView={{ offsetDistance: "100%" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 4, ease: "easeInOut", delay: 2.5 }}
            style={{ offsetPath: "path('M 150 125 C 250 50, 350 200, 400 125 C 450 50, 600 200, 650 125 C 700 50, 800 200, 900 125')" }}
          />
          <motion.text 
            className="text-[12px] font-serif stroke-none fill-secondary-foreground" 
            textAnchor="middle" dominantBaseline="middle"
            initial={{ offsetDistance: "0%" }}
            whileInView={{ offsetDistance: "100%" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 4, ease: "easeInOut", delay: 2.5 }}
            style={{ offsetPath: "path('M 150 125 C 250 50, 350 200, 400 125 C 450 50, 600 200, 650 125 C 700 50, 800 200, 900 125')" }}
          >
            ₹
          </motion.text>
        </motion.g>
      )}
    </svg>
  );
}

// 3. Service Page Motifs
export function IncomeTaxMotif() {
  const prefersReducedMotion = useReducedMotion();
  const variants = prefersReducedMotion ? { hidden: { opacity: 1, pathLength: 1 }, visible: { opacity: 1, pathLength: 1 } } : draw;

  return (
    <svg viewBox="0 0 200 200" className="w-full h-full text-primary" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <motion.g variants={variants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <rect x="40" y="30" width="100" height="140" rx="4" />
        <path d="M 40 60 L 140 60" />
        <text x="90" y="50" textAnchor="middle" className="font-serif text-sm stroke-none fill-primary">ITR</text>
        <path d="M 50 80 L 110 80 M 50 100 L 130 100 M 50 120 L 90 120 M 50 140 L 120 140" className="opacity-50" />
        {/* Pen */}
        <path d="M 160 40 L 170 50 L 130 150 L 120 150 L 120 140 Z" />
        <path d="M 160 40 L 165 30 L 170 50" />
        <path d="M 125 145 L 127 147" />
      </motion.g>
    </svg>
  );
}

export function GstMotif() {
  const prefersReducedMotion = useReducedMotion();
  const variants = prefersReducedMotion ? { hidden: { opacity: 1, pathLength: 1 }, visible: { opacity: 1, pathLength: 1 } } : draw;

  return (
    <svg viewBox="0 0 200 200" className="w-full h-full text-primary" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <motion.g variants={variants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <path d="M 50 30 L 150 30 L 150 170 L 140 160 L 130 170 L 120 160 L 110 170 L 100 160 L 90 170 L 80 160 L 70 170 L 60 160 L 50 170 Z" />
        <path d="M 60 60 L 140 60 M 60 80 L 140 80 M 60 100 L 140 100 M 60 120 L 100 120" className="opacity-50" />
        <path d="M 110 140 L 140 140 M 110 145 L 140 145" />
        {/* GST Stamp */}
        <circle cx="120" cy="110" r="18" className="stroke-secondary opacity-80 transform -rotate-12 origin-center" />
        <text x="120" y="114" textAnchor="middle" className="font-serif text-[10px] font-bold stroke-none fill-secondary transform -rotate-12 origin-center opacity-80">GST</text>
      </motion.g>
    </svg>
  );
}

export function AccountingMotif() {
  const prefersReducedMotion = useReducedMotion();
  const variants = prefersReducedMotion ? { hidden: { opacity: 1, pathLength: 1 }, visible: { opacity: 1, pathLength: 1 } } : draw;

  return (
    <svg viewBox="0 0 200 200" className="w-full h-full text-primary" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <motion.g variants={variants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        {/* Ledger Book */}
        <path d="M 30 70 L 100 90 L 170 70 L 100 50 Z" />
        <path d="M 30 80 L 100 100 L 170 80" />
        <path d="M 100 50 L 100 100" />
        <path d="M 50 67 L 90 78 M 60 76 L 90 84 M 110 78 L 150 67 M 110 84 L 140 76" className="opacity-50" />
        {/* Pencil across */}
        <path d="M 40 110 L 150 40 L 155 45 L 45 115 Z" className="fill-background" />
        <path d="M 40 110 L 30 115 L 45 115 Z" className="fill-foreground stroke-foreground" />
      </motion.g>
    </svg>
  );
}

export function BusinessSetupMotif() {
  const prefersReducedMotion = useReducedMotion();
  const variants = prefersReducedMotion ? { hidden: { opacity: 1, pathLength: 1 }, visible: { opacity: 1, pathLength: 1 } } : draw;

  return (
    <svg viewBox="0 0 200 200" className="w-full h-full text-primary" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <motion.g variants={variants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <path d="M 50 160 L 150 160 L 150 60 L 100 40 L 50 60 Z" />
        <path d="M 40 160 L 160 160" />
        <rect x="70" y="110" width="30" height="50" />
        <rect x="110" y="80" width="30" height="30" />
        <path d="M 110 95 L 140 95 M 125 80 L 125 110" />
        <rect x="70" y="70" width="30" height="20" />
        <text x="85" y="84" textAnchor="middle" className="font-serif text-[10px] stroke-none fill-primary">Co.</text>
        {/* Little plant */}
        <path d="M 140 160 L 140 150 M 140 150 C 135 145, 135 145, 140 140 C 145 145, 145 145, 140 150" className="stroke-secondary" />
      </motion.g>
    </svg>
  );
}

export function TdsMotif() {
  const prefersReducedMotion = useReducedMotion();
  const variants = prefersReducedMotion ? { hidden: { opacity: 1, pathLength: 1 }, visible: { opacity: 1, pathLength: 1 } } : draw;

  return (
    <svg viewBox="0 0 200 200" className="w-full h-full text-primary" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <motion.g variants={variants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <rect x="40" y="30" width="120" height="140" rx="2" />
        <rect x="50" y="40" width="100" height="120" rx="1" className="opacity-50" />
        {/* Ribbon */}
        <path d="M 120 130 L 140 160 L 150 155 L 160 160 L 140 130 Z" className="fill-secondary stroke-secondary opacity-90" />
        <circle cx="130" cy="120" r="12" className="fill-background stroke-secondary" />
        <text x="130" y="124" textAnchor="middle" className="font-serif text-[10px] font-bold stroke-none fill-secondary">₹</text>
        <path d="M 60 60 L 100 60 M 60 75 L 130 75 M 60 90 L 110 90" className="opacity-50" />
      </motion.g>
    </svg>
  );
}

// 4. Why Choose Us Marks
export function WhyChooseUsMarks({ type, className }: { type: 'burst' | 'flourish' | 'checkmark' | 'quill', className?: string }) {
  const prefersReducedMotion = useReducedMotion();
  const variants = prefersReducedMotion ? { hidden: { opacity: 1, pathLength: 1 }, visible: { opacity: 1, pathLength: 1 } } : draw;

  return (
    <svg viewBox="0 0 40 40" className={`w-6 h-6 inline-block text-secondary ${className}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {type === 'burst' && (
        <motion.g variants={variants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <path d="M 20 5 L 20 12 M 20 28 L 20 35 M 5 20 L 12 20 M 28 20 L 35 20 M 10 10 L 15 15 M 25 25 L 30 30 M 10 30 L 15 25 M 25 10 L 30 15" />
        </motion.g>
      )}
      {type === 'flourish' && (
        <motion.g variants={variants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <path d="M 5 20 C 15 5, 25 35, 35 20" />
        </motion.g>
      )}
      {type === 'checkmark' && (
        <motion.g variants={variants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <path d="M 10 20 L 18 28 L 30 10" />
        </motion.g>
      )}
      {type === 'quill' && (
        <motion.g variants={variants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <path d="M 30 10 C 30 10, 20 15, 15 25 L 10 35 C 10 35, 15 30, 20 25 C 25 20, 30 10, 30 10 Z" />
          <path d="M 18 20 L 22 24" />
        </motion.g>
      )}
    </svg>
  );
}

// 5. Divider
export function OrnamentalDivider() {
  const prefersReducedMotion = useReducedMotion();
  const variants = prefersReducedMotion ? { hidden: { opacity: 1, pathLength: 1 }, visible: { opacity: 1, pathLength: 1 } } : draw;

  return (
    <svg viewBox="0 0 200 20" className="w-full h-8 text-primary/30 mx-auto" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <motion.g variants={variants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }}>
        <path d="M 20 10 L 80 10" />
        <circle cx="90" cy="10" r="2" className="fill-currentColor" />
        <circle cx="100" cy="10" r="3" className="fill-currentColor" />
        <circle cx="110" cy="10" r="2" className="fill-currentColor" />
        <path d="M 120 10 L 180 10" />
      </motion.g>
    </svg>
  );
}
