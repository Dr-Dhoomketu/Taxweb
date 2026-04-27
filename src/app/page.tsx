"use client"

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useScrollFade } from "@/hooks/use-scroll-fade";
import { Menu, X } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { HeroRupeeMark, ProcessFlowScene, WhyChooseUsMarks } from "@/components/ui/svg-draw";
import { Slider } from "@/components/ui/slider";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { LeadFormModal } from "@/components/forms/LeadFormModal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

function calculateTax(income: number, regime: 'old' | 'new') {
  // Simplified tax calculation logic for Indian slabs (approximate)
  let tax = 0;
  if (regime === 'new') {
    if (income <= 300000) tax = 0;
    else if (income <= 600000) tax = (income - 300000) * 0.05;
    else if (income <= 900000) tax = 15000 + (income - 600000) * 0.10;
    else if (income <= 1200000) tax = 45000 + (income - 900000) * 0.15;
    else if (income <= 1500000) tax = 90000 + (income - 1200000) * 0.20;
    else tax = 150000 + (income - 1500000) * 0.30;
    
    // Rebate under 87A for new regime
    if (income <= 700000) tax = 0;
  } else {
    // Old regime (simplified without deductions for baseline)
    if (income <= 250000) tax = 0;
    else if (income <= 500000) tax = (income - 250000) * 0.05;
    else if (income <= 1000000) tax = 12500 + (income - 500000) * 0.20;
    else tax = 112500 + (income - 1000000) * 0.30;
    
    if (income <= 500000) tax = 0;
  }
  return Math.round(tax + (tax * 0.04)); // including 4% cess
}

function formatINR(amount: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

export default function Home() {
  const isLoaded = useScrollFade();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  
  const [income, setIncome] = useState([1200000]);
  const [regime, setRegime] = useState<'old'|'new'>('new');
  
  const taxAmount = useMemo(() => calculateTax(income[0], regime), [income, regime]);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    if (prefersReducedMotion) return;
    const handleMouseMove = (e: MouseEvent) => {
      // Very slight parallax
      const x = (e.clientX / window.innerWidth - 0.5) * 15;
      const y = (e.clientY / window.innerHeight - 0.5) * 15;
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [prefersReducedMotion]);

  const [activeSection, setActiveSection] = useState("");
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { threshold: 0.5 });
    
    document.querySelectorAll("section[id]").forEach(section => {
      observer.observe(section);
    });
    
    return () => observer.disconnect();
  }, []);

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "About", href: "#about" },
    { name: "Process", href: "#process" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <div className="flex flex-col font-sans text-foreground selection:bg-primary/10">
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className={`relative max-w-7xl mx-auto px-6 pt-32 pb-24 transition-all duration-700 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 relative z-10">
              {/* Parallax flourish behind text */}
              {!prefersReducedMotion && (
                <motion.div 
                  className="absolute -z-10 text-muted/30"
                  animate={{ x: mousePos.x, y: mousePos.y }}
                  transition={{ type: "spring", stiffness: 50, damping: 20 }}
                  style={{ top: "-10%", left: "-10%", width: "120%", height: "120%" }}
                >
                  <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round">
                    <path d="M 0 100 C 50 0, 150 200, 200 100" className="opacity-20" />
                    <path d="M 20 120 C 70 20, 130 180, 180 80" className="opacity-10" />
                  </svg>
                </motion.div>
              )}
              
              <h1 className="text-5xl md:text-7xl font-semibold font-serif tracking-tight leading-tight text-foreground mb-6">
                Simplifying Tax & Compliance for Individuals & Businesses
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-12 tracking-wide font-medium font-sans">
                Income Tax <span className="mx-2 font-light opacity-50">|</span> GST <span className="mx-2 font-light opacity-50">|</span> Accounting <span className="mx-2 font-light opacity-50">|</span> Setup <span className="mx-2 font-light opacity-50">|</span> TDS
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <Button asChild size="lg" className="rounded-none px-8 h-14 text-base bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200 group overflow-hidden relative">
                  <a href="#contact">
                    <span className="relative z-10 group-hover:translate-x-1 transition-transform duration-300">Get Free Consultation</span>
                    <span className="absolute left-0 pl-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">&rarr;</span>
                  </a>
                </Button>
                <Button asChild variant="ghost" size="lg" className="rounded-none px-8 h-14 text-base hover:bg-transparent text-foreground transition-all duration-200 group relative">
                  <a href="#services">
                    View Services
                    <span className="absolute bottom-3 left-8 right-8 h-px bg-primary scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300"></span>
                  </a>
                </Button>
              </div>
            </div>
            
            <div className="lg:col-span-6 relative">
              <HeroRupeeMark />
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-7xl mx-auto px-6"><hr className="border-border/50" /></div>

        {/* Services Section */}
        <section id="services" className="max-w-7xl mx-auto px-6 py-24 scroll-mt-20">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight mb-16">Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
            <div className="group">
              <h3 className="text-lg font-serif font-semibold text-primary mb-3">Income Tax Filing</h3>
              <p className="text-muted-foreground leading-relaxed">Strategic tax planning and accurate ITR filing for individuals and corporate entities.</p>
            </div>
            <div className="group">
              <h3 className="text-lg font-serif font-semibold text-primary mb-3">GST Registration & Returns</h3>
              <p className="text-muted-foreground leading-relaxed">End-to-end GST compliance, from initial registration to regular monthly and annual filings.</p>
            </div>
            <div className="group">
              <h3 className="text-lg font-serif font-semibold text-primary mb-3">Accounting & Bookkeeping</h3>
              <p className="text-muted-foreground leading-relaxed">Meticulous financial record-keeping ensuring your business is always audit-ready.</p>
            </div>
            <div className="group">
              <h3 className="text-lg font-serif font-semibold text-primary mb-3">Business Setup & Registration</h3>
              <p className="text-muted-foreground leading-relaxed">Complete incorporation services for Private Limited, LLP, Partnership, and Proprietorship firms.</p>
            </div>
            <div className="group">
              <h3 className="text-lg font-serif font-semibold text-primary mb-3">TDS/TCS Compliance</h3>
              <p className="text-muted-foreground leading-relaxed">Timely deduction, payment, and return filing to ensure complete regulatory adherence.</p>
            </div>
          </div>
        </section>

        {/* Mid-page Lead CTA Strip */}
        <section className="border-y border-border/50 py-16 bg-muted/20">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-6">Not sure which service fits your situation?</h3>
            <LeadFormModal 
              triggerText="Get Free Consultation"
              triggerClassName="inline-flex h-12 items-center justify-center rounded-none bg-primary px-8 text-base font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
          </div>
        </section>

        {/* About Snapshot Section */}
        <section id="about" className="max-w-7xl mx-auto px-6 py-24 scroll-mt-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
            <div>
              <span className="uppercase tracking-widest text-xs font-semibold text-secondary mb-4 block">About the practice</span>
              <h2 className="font-serif text-3xl md:text-4xl text-foreground font-semibold tracking-tight leading-tight">A practice built on clarity, not jargon.</h2>
            </div>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>We believe that financial compliance shouldn't be a source of anxiety. Our goal is to provide transparent, accurate, and timely services so you can focus on what matters most—growing your business or securing your personal finances.</p>
              <p>With years of experience navigating the intricacies of Indian tax law and corporate structuring, we offer a partnership based on trust, rigorous attention to detail, and a deep understanding of your unique long-term goals.</p>
              <Link href="/about" className="inline-block font-medium text-primary hover:text-primary/80 transition-colors mt-4 relative group">
                Read more about us &rarr;
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </div>
          </div>
        </section>

        {/* Marquee */}
        <div className="w-full overflow-hidden border-y border-border/50 py-6 bg-background relative">
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10"></div>
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10"></div>
          <motion.div 
            className="whitespace-nowrap flex"
            animate={prefersReducedMotion ? {} : { x: [0, -1000] }}
            transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
          >
            <span className="font-serif italic text-2xl text-muted/60 px-4">
              ITR &nbsp;·&nbsp; GSTR-1 &nbsp;·&nbsp; GSTR-3B &nbsp;·&nbsp; Form 16 &nbsp;·&nbsp; TDS &nbsp;·&nbsp; Section 80C &nbsp;·&nbsp; LLP &nbsp;·&nbsp; MSME &nbsp;·&nbsp; Bookkeeping &nbsp;·&nbsp; Reconciliation &nbsp;·&nbsp; Notice Handling &nbsp;·&nbsp; Advance Tax &nbsp;·&nbsp; 
              ITR &nbsp;·&nbsp; GSTR-1 &nbsp;·&nbsp; GSTR-3B &nbsp;·&nbsp; Form 16 &nbsp;·&nbsp; TDS &nbsp;·&nbsp; Section 80C &nbsp;·&nbsp; LLP &nbsp;·&nbsp; MSME &nbsp;·&nbsp; Bookkeeping &nbsp;·&nbsp; Reconciliation &nbsp;·&nbsp; Notice Handling &nbsp;·&nbsp; Advance Tax &nbsp;·&nbsp; 
            </span>
          </motion.div>
        </div>

        {/* Why Choose Us Section */}
        <section id="why-us" className="bg-secondary/5 relative">
          <div className="max-w-7xl mx-auto px-6 py-24 scroll-mt-20">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight mb-16">Why Choose Us</h2>
            <div className="flex flex-col md:flex-row justify-between gap-12">
              <div className="flex-1">
                <h3 className="font-serif text-xl font-medium text-foreground mb-3 flex items-center gap-2">
                  <WhyChooseUsMarks type="quill" /> Direct access
                </h3>
                <p className="text-muted-foreground">Work directly with a chartered accountant, not an endless chain of junior associates.</p>
              </div>
              <div className="flex-1">
                <h3 className="font-serif text-xl font-medium text-foreground mb-3 flex items-center gap-2">
                  <WhyChooseUsMarks type="burst" /> Transparent pricing
                </h3>
                <p className="text-muted-foreground">Clear, upfront professional fees with zero hidden charges or last-minute surprises.</p>
              </div>
              <div className="flex-1">
                <h3 className="font-serif text-xl font-medium text-foreground mb-3 flex items-center gap-2">
                  <WhyChooseUsMarks type="checkmark" /> Punctual execution
                </h3>
                <p className="text-muted-foreground">Your filings are completed accurately and submitted well before regulatory deadlines.</p>
              </div>
              <div className="flex-1">
                <h3 className="font-serif text-xl font-medium text-foreground mb-3 flex items-center gap-2">
                  <WhyChooseUsMarks type="flourish" /> Decades of experience
                </h3>
                <p className="text-muted-foreground">Deep, practical knowledge of navigating the complexities of Indian tax and compliance law.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Tax Savings Estimator */}
        <section className="max-w-4xl mx-auto px-6 py-24 border-b border-border/50">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-semibold tracking-tight mb-4">Quick Tax Estimator</h2>
            <p className="text-muted-foreground">Get a quick view of your indicative tax liability.</p>
          </div>
          
          <div className="flex flex-col gap-10">
            <div className="flex flex-col items-center gap-6">
              <ToggleGroup type="single" value={regime} onValueChange={(v) => v && setRegime(v as 'old'|'new')} className="bg-muted/30 p-1">
                <ToggleGroupItem value="new" className="rounded-none px-6 data-[state=on]:bg-background data-[state=on]:shadow-sm">New Regime</ToggleGroupItem>
                <ToggleGroupItem value="old" className="rounded-none px-6 data-[state=on]:bg-background data-[state=on]:shadow-sm">Old Regime</ToggleGroupItem>
              </ToggleGroup>
              
              <div className="w-full max-w-lg space-y-4">
                <div className="flex justify-between items-center text-sm font-medium text-muted-foreground uppercase tracking-widest">
                  <span>Annual Income</span>
                  <span className="text-foreground">{formatINR(income[0])}</span>
                </div>
                <Slider 
                  value={income} 
                  onValueChange={setIncome} 
                  min={300000} 
                  max={5000000} 
                  step={50000} 
                  className="py-4"
                />
              </div>
            </div>
            
            <div className="text-center space-y-4">
              <div className="font-serif text-5xl md:text-6xl text-primary font-medium tracking-tight">
                {formatINR(taxAmount)}
              </div>
              <p className="text-sm text-muted-foreground">
                Indicative under FY 2024-25 slabs — final figures vary by deductions.
              </p>
              <div className="pt-4">
                <LeadFormModal 
                  triggerText="Talk to us about optimizing this →"
                  triggerClassName="font-serif italic text-lg text-primary hover:text-primary/80 transition-colors"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section id="process" className="max-w-7xl mx-auto px-6 py-24 scroll-mt-20">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight mb-16 text-center">Our Process</h2>
          
          <div className="mb-16">
            <ProcessFlowScene />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              { num: "01", title: "Reach out", desc: "Contact us with your specific requirements." },
              { num: "02", title: "Consultation", desc: "A brief consultation to assess your exact needs." },
              { num: "03", title: "Execution", desc: "Our team handles necessary documentation." },
              { num: "04", title: "Completion", desc: "Receive regular updates and stay stress-free." }
            ].map((step, i) => (
              <div key={i} className="flex-1">
                <h3 className="font-serif text-xl font-medium text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="border-y border-border/50 bg-background py-24 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight mb-16 text-center">What our clients say</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
              <div className="pt-6 border-t border-border">
                <div className="text-4xl text-primary font-serif leading-none mb-4">"</div>
                <p className="text-lg font-serif italic text-foreground leading-relaxed mb-6">He filed our GST returns and ITRs without a single hiccup for three years running. Calm, precise, on time.</p>
                <div>
                  <p className="font-medium text-foreground">Aarav S.</p>
                  <p className="text-sm text-muted-foreground">Founder, D2C apparel brand</p>
                </div>
              </div>
              <div className="pt-6 border-t border-border">
                <div className="text-4xl text-primary font-serif leading-none mb-4">"</div>
                <p className="text-lg font-serif italic text-foreground leading-relaxed mb-6">Got my notice handled in 48 hours. Direct line to him, zero runaround. Worth every rupee of the fee.</p>
                <div>
                  <p className="font-medium text-foreground">Priya K.</p>
                  <p className="text-sm text-muted-foreground">Salaried professional</p>
                </div>
              </div>
              <div className="pt-6 border-t border-border">
                <div className="text-4xl text-primary font-serif leading-none mb-4">"</div>
                <p className="text-lg font-serif italic text-foreground leading-relaxed mb-6">Helped us incorporate our LLP, set up books, and stay GST-compliant from day one. Real partner, not a vendor.</p>
                <div>
                  <p className="font-medium text-foreground">Vikram R.</p>
                  <p className="text-sm text-muted-foreground">Co-founder, SaaS startup</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-7xl mx-auto px-6"><hr className="border-border/50 hidden" /></div>

        {/* FAQ Section */}
        <section className="max-w-3xl mx-auto px-6 py-24">
          <h2 className="font-serif text-3xl font-semibold tracking-tight mb-8 text-center">Common Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="border-border/50">
              <AccordionTrigger className="font-serif text-lg text-foreground hover:text-primary">Do I need to file an ITR if my income is below the exemption limit?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                While not always mandatory, filing a nil return is highly recommended. It serves as proof of income for visas, loans, and helps carry forward certain losses.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border-border/50">
              <AccordionTrigger className="font-serif text-lg text-foreground hover:text-primary">What's the difference between the old and new tax regimes?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                The old regime offers various deductions (like 80C, HRA) but higher slab rates. The new regime has lower slab rates but removes most deductions. We help you calculate which is better for your specific case.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border-border/50">
              <AccordionTrigger className="font-serif text-lg text-foreground hover:text-primary">When is GST registration mandatory?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                Registration is generally mandatory if your annual turnover exceeds ₹40 lakhs for goods (₹20 lakhs for services). E-commerce operators and inter-state suppliers must register regardless of turnover.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4" className="border-border/50">
              <AccordionTrigger className="font-serif text-lg text-foreground hover:text-primary">How quickly do you respond to enquiries?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                We guarantee a response within one business day for all new enquiries and priority support for our retained clients.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5" className="border-border/50">
              <AccordionTrigger className="font-serif text-lg text-foreground hover:text-primary">Do you work with clients outside Mumbai?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                Yes. We serve clients PAN India digitally, ensuring seamless communication and document sharing without the need for in-person visits.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        {/* Contact Section */}
        <section id="contact" className="max-w-7xl mx-auto px-6 py-32 scroll-mt-20 flex flex-col lg:flex-row gap-16 lg:gap-24 border-t border-border/50">
          <div className="flex-1">
            <h2 className="font-serif text-4xl md:text-5xl font-semibold tracking-tight mb-6">Need Help with Tax or GST?</h2>
            <p className="text-xl text-muted-foreground mb-12">
              Request a free consultation. We will review your current compliance status and propose a clear path forward.
            </p>
            
            <div className="space-y-6 text-muted-foreground">
              <div>
                <span className="block text-sm font-medium text-foreground uppercase tracking-widest mb-1">Email</span>
                <a href="mailto:info@shishirpandey.in" className="text-lg hover:text-primary transition-colors">info@shishirpandey.in</a>
              </div>
              <div>
                <span className="block text-sm font-medium text-foreground uppercase tracking-widest mb-1">Phone</span>
                <a href="tel:+919993512608" className="text-lg hover:text-primary transition-colors">+91 99935 12608</a>
              </div>
              <div className="pt-4 border-t border-border/50">
                <p className="text-sm">Based in India · Serving clients PAN India</p>
              </div>
            </div>
          </div>

          <div className="flex-1 bg-card border border-border p-8 md:p-12 shadow-sm">
            {formSubmitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 animate-in fade-in zoom-in duration-500">
                <div className="w-16 h-16 bg-primary/5 text-primary rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-serif text-2xl font-semibold mb-2 text-primary">Thank you.</h3>
                <p className="text-muted-foreground mb-8">We have received your details and will contact you within one business day.</p>
                <a
                  href={`https://wa.me/919993512608?text=${encodeURIComponent("Hi, I registered on your website. Please assist.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors uppercase tracking-widest text-sm font-medium rounded-none"
                >
                  Continue on WhatsApp
                </a>
              </div>
            ) : (
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  setFormSubmitted(true);
                }} 
                className="space-y-6"
              >
                <div className="space-y-2">
                  <Label htmlFor="name" className="uppercase tracking-widest text-xs text-muted-foreground">Full Name</Label>
                  <Input id="name" required className="border-0 border-b border-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary bg-transparent text-lg h-12" placeholder="Jane Doe" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="uppercase tracking-widest text-xs text-muted-foreground">Email Address</Label>
                    <Input id="email" type="email" required className="border-0 border-b border-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary bg-transparent text-lg h-12" placeholder="jane@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="uppercase tracking-widest text-xs text-muted-foreground">Phone Number</Label>
                    <Input id="phone" type="tel" required className="border-0 border-b border-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary bg-transparent text-lg h-12" placeholder="+91 00000 00000" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="service" className="uppercase tracking-widest text-xs text-muted-foreground">Service of Interest</Label>
                  <select 
                    id="service" 
                    required 
                    defaultValue=""
                    className="flex h-12 w-full items-center justify-between border-0 border-b border-border bg-transparent px-0 py-2 text-lg ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-0 focus:border-primary disabled:cursor-not-allowed disabled:opacity-50 rounded-none appearance-none"
                  >
                    <option value="" disabled>Select a service...</option>
                    <option value="income-tax">Income Tax Filing</option>
                    <option value="gst">GST Registration & Returns</option>
                    <option value="accounting">Accounting & Bookkeeping</option>
                    <option value="business-setup">Business Setup & Registration</option>
                    <option value="tds-tcs">TDS/TCS Compliance</option>
                    <option value="other">Other / General Consultation</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="uppercase tracking-widest text-xs text-muted-foreground">Brief Message</Label>
                  <Textarea 
                    id="message" 
                    required 
                    className="border-0 border-b border-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary bg-transparent text-lg min-h-[80px] resize-none" 
                    placeholder="Tell us a bit about your business and compliance needs..." 
                  />
                </div>

                <Button type="submit" size="lg" className="w-full rounded-none h-14 text-sm uppercase tracking-widest bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200">
                  Send Enquiry
                </Button>
              </form>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
