"use client"

import { motion } from "framer-motion";
import Link from "next/link";
import { IncomeTaxMotif, OrnamentalDivider } from "@/components/ui/svg-draw";

export default function IncomeTax() {
  return (
    <div className="flex-1 pb-32">
      <section className="pt-24 md:pt-32 px-4 md:px-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="uppercase tracking-[0.2em] text-xs font-semibold text-secondary mb-6 block">
            01 — Income Tax
          </span>
          <h1 className="font-serif text-5xl md:text-6xl text-primary tracking-tight mb-8">
            Income Tax Services.
          </h1>
          <p className="text-xl text-muted-foreground mb-16 leading-relaxed">
            Navigating the complexities of Indian tax law requires precision. We ensure that your tax filings are accurate, timely, and optimized for your specific financial situation.
          </p>

          <div className="mb-16 w-48 h-48 mx-auto md:mx-0">
             <IncomeTaxMotif />
          </div>

          <div className="mb-12">
            <OrnamentalDivider />
          </div>

          <div className="space-y-12">
            {[
              { title: "ITR Filing", desc: "Meticulous preparation and submission of Income Tax Returns for individuals, professionals, and corporate entities." },
              { title: "Tax Planning", desc: "Strategic advice to legally minimize your tax liability and optimize your financial structure for the upcoming fiscal year." },
              { title: "Advance Tax", desc: "Accurate calculation and timely payment of advance tax installments to avoid penal interest." },
              { title: "Notice Handling", desc: "Professional representation and clear, legally sound responses to income tax notices, assessments, and appeals." }
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
        <h3 className="font-serif text-3xl md:text-4xl text-primary mb-8 tracking-tight">Need assistance with your Income Tax?</h3>
        <Link href="/contact" className="inline-block bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 uppercase tracking-widest text-sm font-medium transition-colors group relative overflow-hidden">
          <span className="relative z-10 group-hover:translate-x-1 transition-transform">Request a Consultation</span>
          <span className="absolute left-0 pl-3 opacity-0 group-hover:opacity-100 transition-opacity z-10">&rarr;</span>
        </Link>
      </section>
    </div>
  );
}
