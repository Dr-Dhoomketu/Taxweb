"use client"

import { motion } from "framer-motion";
import Link from "next/link";

export default function About() {
  return (
    <div className="flex-1 pb-32">
      <section className="pt-24 md:pt-32 px-4 md:px-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="uppercase tracking-[0.2em] text-xs font-semibold text-secondary mb-6 block">
            The Practice
          </span>
          <h1 className="font-serif text-5xl md:text-6xl text-primary tracking-tight mb-12">
            About Shishir Pandey.
          </h1>
          
          <div className="space-y-8 text-lg md:text-xl text-muted-foreground leading-relaxed">
            <p>
              Operating out of India, Shishir Pandey is a Chartered Accountant dedicated to bringing clarity, precision, and strategic foresight to the financial affairs of serious individuals and growing businesses.
            </p>
            <p>
              In a landscape often characterized by opaque processes and complex regulatory hurdles, our practice stands on the principle of transparency. We believe that compliance should never be a source of anxiety. Instead, it should serve as a quiet, robust foundation upon which you can confidently build your business.
            </p>
          </div>

          <div className="my-16 md:my-24 py-12 border-y border-border/50 text-center">
            <h2 className="font-serif text-3xl md:text-4xl text-primary italic leading-tight max-w-2xl mx-auto">
              "We treat every client's books with the same care and rigor, ensuring peace of mind and strategic advantage."
            </h2>
          </div>

          <div className="space-y-8 text-lg md:text-xl text-muted-foreground leading-relaxed">
            <p>
              With years of experience navigating the intricacies of Indian tax law, GST regulations, and corporate structuring, we offer more than just routine filing. We offer a partnership. Whether you are a sole proprietor taking your first steps or an established enterprise looking to streamline operations, we provide the meticulous attention your financials demand.
            </p>
            <p>
              Our approach is highly personalized. You work directly with a senior professional who understands the specific nuances of your situation, ensuring that every piece of advice is tailored to your long-term goals.
            </p>
          </div>

          <div className="mt-24">
            <h2 className="font-serif text-2xl text-primary mb-8 tracking-tight">At a glance</h2>
            <div className="flex flex-col border-t border-border/50">
              <div className="flex flex-col sm:flex-row justify-between py-6 border-b border-border/50 gap-2">
                <span className="uppercase tracking-widest text-xs font-semibold text-muted-foreground">Years in practice</span>
                <span className="font-serif text-xl text-foreground">Multiple Years</span>
              </div>
              <div className="flex flex-col sm:flex-row justify-between py-6 border-b border-border/50 gap-2">
                <span className="uppercase tracking-widest text-xs font-semibold text-muted-foreground">Clients Served</span>
                <span className="font-serif text-xl text-foreground">Hundreds PAN India</span>
              </div>
              <div className="flex flex-col sm:flex-row justify-between py-6 border-b border-border/50 gap-2">
                <span className="uppercase tracking-widest text-xs font-semibold text-muted-foreground">Core Focus</span>
                <span className="font-serif text-xl text-foreground">Tax, GST, Compliance</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="mt-32 px-4 md:px-8 border-t border-border/50 pt-24 text-center">
        <h3 className="font-serif text-3xl md:text-4xl text-primary mb-8 tracking-tight">Ready to discuss your requirements?</h3>
        <Link href="/contact" className="inline-block bg-secondary text-secondary-foreground hover:bg-secondary/90 px-8 py-4 uppercase tracking-widest text-sm font-medium transition-colors">
          Get in touch
        </Link>
      </section>
    </div>
  );
}
