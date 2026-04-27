"use client"

import { motion } from "framer-motion";
import { LeadForm } from "@/components/forms/LeadForm";

export default function Contact() {
  return (
    <div className="flex-1 pb-32">
      <section className="pt-24 md:pt-32 px-4 md:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 md:mb-24"
        >
          <span className="uppercase tracking-[0.2em] text-xs font-semibold text-secondary mb-6 block">
            Contact
          </span>
          <h1 className="font-serif text-5xl md:text-6xl text-primary tracking-tight mb-8">
            Get in touch.
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
            Tell us a little about your situation. We respond within one business day.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-4 order-2 lg:order-1"
          >
            <div className="space-y-12">
              <div>
                <p className="uppercase tracking-widest text-xs font-semibold text-muted-foreground mb-3">Email</p>
                <a href="mailto:hello@shishirpandey.in" className="text-xl text-primary hover:text-secondary transition-colors">hello@shishirpandey.in</a>
              </div>
              
              <div>
                <p className="uppercase tracking-widest text-xs font-semibold text-muted-foreground mb-3">Phone</p>
                <a href="tel:+910000000000" className="text-xl text-primary hover:text-secondary transition-colors block mb-2">+91 00000 00000</a>
                {/* TODO: Replace with the actual WhatsApp number */}
                <a href="https://wa.me/910000000000" target="_blank" rel="noopener noreferrer" className="text-sm font-medium tracking-wide text-secondary hover:underline">
                  Message on WhatsApp &rarr;
                </a>
              </div>
              
              <div>
                <p className="uppercase tracking-widest text-xs font-semibold text-muted-foreground mb-3">Location</p>
                <p className="text-xl text-primary leading-snug">Based in India<br/><span className="text-muted-foreground">Serving clients PAN India</span></p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-8 order-1 lg:order-2 bg-card p-8 md:p-12 border border-border"
          >
            <LeadForm />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
