"use client"

import { motion } from "framer-motion";
import Link from "next/link";

const services = [
  { num: "01", title: "Income Tax", desc: "Strategic planning, seamless filing, and expert handling of notices for individuals and corporate entities.", slug: "income-tax", items: ["ITR Filing", "Tax Planning", "Advance Tax", "Notice Handling"] },
  { num: "02", title: "GST", desc: "End-to-end GST compliance, from initial registration to regular monthly and annual filings.", slug: "gst", items: ["Registration", "Return Filing", "Reconciliation", "Notice Handling"] },
  { num: "03", title: "Accounting", desc: "Meticulous bookkeeping and clear financial reporting ensuring your business is always audit-ready.", slug: "accounting", items: ["Bookkeeping", "Bank Reconciliation", "Financial Reports"] },
  { num: "04", title: "Business Setup", desc: "Foundational structure and complete incorporation services for your new enterprise.", slug: "business-setup", items: ["Proprietorship", "Partnership / LLP", "Private Limited", "MSME"] },
  { num: "05", title: "TDS / TCS", desc: "Accurate calculation, timely return filing, and complete regulatory adherence.", slug: "tds-tcs", items: ["Filing", "Calculation", "Form 16/16A", "Notices"] },
];

export default function ServicesIndex() {
  return (
    <div className="flex-1 pb-32">
      <section className="pt-24 md:pt-32 px-4 md:px-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="uppercase tracking-[0.2em] text-xs font-semibold text-secondary mb-6 block">
            Practice Areas
          </span>
          <h1 className="font-serif text-5xl md:text-6xl text-primary tracking-tight mb-8">
            Services.
          </h1>
          <p className="text-xl text-muted-foreground mb-16 leading-relaxed">
            We provide comprehensive financial, taxation, and compliance services tailored to the unique needs of individuals and businesses operating in India.
          </p>

          <div className="space-y-4">
            {services.map((service, i) => (
              <motion.div 
                key={service.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="group border-t border-border/50 pt-8 pb-4 relative transition-all"
              >
                <Link href={`/services/${service.slug}`} className="block group/link">
                  <div className="flex flex-col md:flex-row gap-4 md:gap-12 items-start md:items-baseline">
                    <span className="font-serif text-2xl text-muted-foreground/50 w-12 shrink-0">{service.num}</span>
                    <div className="flex-1">
                      <h2 className="font-serif text-3xl md:text-4xl text-foreground group-hover/link:text-primary transition-colors mb-2 flex items-center gap-4">
                        {service.title}
                        <span className="opacity-0 group-hover/link:opacity-100 group-hover/link:translate-x-1 transition-all duration-300 text-primary text-2xl">&rarr;</span>
                      </h2>
                      <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] lg:grid-rows-[1fr] transition-[grid-template-rows] duration-300">
                        <div className="overflow-hidden">
                          <p className="text-lg text-muted-foreground mt-2 leading-relaxed max-w-2xl">{service.desc}</p>
                          <p className="font-serif text-primary/80 mt-4 italic">
                            {service.items.join(" · ")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
}
