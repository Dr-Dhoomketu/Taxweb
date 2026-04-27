"use client"

import { motion } from "framer-motion";
import Link from "next/link";
import { BusinessSetupMotif, OrnamentalDivider } from "@/components/ui/svg-draw";

export default function BusinessSetup() {
  return (
    <div className="flex-1 pb-32">
      <section className="pt-24 md:pt-32 px-4 md:px-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="uppercase tracking-[0.2em] text-xs font-semibold text-secondary mb-6 block">
            04 — Business Setup
          </span>
          <h1 className="font-serif text-5xl md:text-6xl text-primary tracking-tight mb-8">
            Business Setup.
          </h1>
          <p className="text-xl text-muted-foreground mb-16 leading-relaxed">
            The structure you choose for your business dictates its legal obligations, tax liabilities, and capacity for growth. We help you choose correctly and handle the entire incorporation process.
          </p>

          <div className="mb-16 w-48 h-48 mx-auto md:mx-0">
             <BusinessSetupMotif />
          </div>

          <div className="mb-12">
            <OrnamentalDivider />
          </div>

          <div className="space-y-12">
            {[
              { title: "Proprietorship", desc: "Quick and compliant registration for solo founders looking for the simplest operational structure." },
              { title: "Partnership / LLP", desc: "Drafting of partnership deeds and full registration of Limited Liability Partnerships for businesses with multiple owners." },
              { title: "Private Limited", desc: "Complete incorporation services under the Companies Act, including Director Identification Numbers (DIN), Digital Signatures (DSC), and MOA/AOA drafting." },
              { title: "MSME (Udyam)", desc: "Registration for Micro, Small, and Medium Enterprises to ensure you can access government benefits, subsidies, and priority sector lending." }
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
        <h3 className="font-serif text-3xl md:text-4xl text-primary mb-8 tracking-tight">Starting a new venture?</h3>
        <Link href="/contact" className="inline-block bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 uppercase tracking-widest text-sm font-medium transition-colors group relative overflow-hidden">
          <span className="relative z-10 group-hover:translate-x-1 transition-transform">Request a Consultation</span>
          <span className="absolute left-0 pl-3 opacity-0 group-hover:opacity-100 transition-opacity z-10">&rarr;</span>
        </Link>
      </section>
    </div>
  );
}
