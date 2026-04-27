"use client"

import { motion } from "framer-motion";
import Link from "next/link";
import { GstMotif, OrnamentalDivider } from "@/components/ui/svg-draw";

export default function Gst() {
  return (
    <div className="flex-1 pb-32">
      <section className="pt-24 md:pt-32 px-4 md:px-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="uppercase tracking-[0.2em] text-xs font-semibold text-secondary mb-6 block">
            02 — GST
          </span>
          <h1 className="font-serif text-5xl md:text-6xl text-primary tracking-tight mb-8">
            GST Services.
          </h1>
          <p className="text-xl text-muted-foreground mb-16 leading-relaxed">
            Goods and Services Tax compliance is an ongoing, monthly commitment. We provide end-to-end management so you can focus on operations without fear of non-compliance.
          </p>

          <div className="mb-16 w-48 h-48 mx-auto md:mx-0">
             <GstMotif />
          </div>

          <div className="mb-12">
            <OrnamentalDivider />
          </div>

          <div className="space-y-12">
            {[
              { title: "Registration", desc: "Seamless handling of the entire GST registration process, ensuring correct categorization and prompt issuance of your GSTIN." },
              { title: "Return Filing", desc: "Accurate preparation and filing of GSTR-1, GSTR-3B, GSTR-9, and other periodic returns well before deadlines." },
              { title: "Reconciliation", desc: "Meticulous matching of your purchase registers with GSTR-2A/2B to ensure you claim every rupee of eligible Input Tax Credit." },
              { title: "Notice Handling", desc: "Expert drafting of replies to GST notices, audit representations, and resolution of mismatches with the department." }
            ].map((item, i) => (
              <motion.div 
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="border-t border-border/50 pt-6"
              >
                <h3 className="font-serif text-2xl text-primary mb-3">{item.title}</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="mt-32 px-4 md:px-8 bg-card py-24 text-center border-y border-border/50">
        <h3 className="font-serif text-3xl md:text-4xl text-primary mb-8 tracking-tight">Need assistance with GST?</h3>
        <Link href="/contact" className="inline-block bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 uppercase tracking-widest text-sm font-medium transition-colors group relative overflow-hidden">
          <span className="relative z-10 group-hover:translate-x-1 transition-transform">Request a Consultation</span>
          <span className="absolute left-0 pl-3 opacity-0 group-hover:opacity-100 transition-opacity z-10">&rarr;</span>
        </Link>
      </section>
    </div>
  );
}
