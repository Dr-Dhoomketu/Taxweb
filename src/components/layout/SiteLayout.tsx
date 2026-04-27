"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { LeadFormModal } from "@/components/forms/LeadFormModal";
import { Menu, X } from "lucide-react";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { PageIntro } from "@/components/ui/page-intro";

export function SiteLayout({ children }: { children: React.ReactNode }) {
  const location = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { href: "/services", label: "Services" },
    { href: "/about", label: "About" },
    { href: "/#process", label: "Process" },
    { href: "/#testimonials", label: "Testimonials" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <PageIntro>
      <div className="min-h-[100dvh] flex flex-col selection:bg-secondary/20 selection:text-secondary">
        <CustomCursor />
        {/* Navbar */}
        <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
          <div className="mx-auto max-w-7xl px-4 md:px-8 h-16 md:h-20 flex items-center justify-between">
            <Link href="/" className="font-serif text-xl md:text-2xl text-foreground tracking-tight">
              ShishirPandey.in
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = location === link.href || (link.href !== "/" && location?.startsWith(link.href) && !link.href.includes('#'));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-sm tracking-wide transition-colors hover:text-primary ${
                      isActive ? "text-primary font-medium" : "text-muted-foreground"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="h-0.5 bg-primary mt-0.5"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
              <LeadFormModal triggerClassName="bg-primary text-primary-foreground hover:bg-primary/90 px-5 py-2.5 text-sm uppercase tracking-widest font-medium transition-colors" />
            </nav>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 text-primary"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </header>

        {/* Mobile Nav Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed inset-x-0 top-16 z-40 bg-background border-b border-border/50 shadow-sm md:hidden"
            >
              <nav className="flex flex-col p-4 gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-lg font-serif text-primary py-2 border-b border-border/20 last:border-0"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-4">
                  <LeadFormModal triggerClassName="w-full bg-primary text-primary-foreground hover:bg-primary/90 px-5 py-3 text-sm uppercase tracking-widest font-medium transition-colors" />
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Breadcrumbs */}
        {location !== "/" && (
          <div className="bg-muted/10 border-b border-border/50">
            <div className="mx-auto max-w-7xl px-4 md:px-8 py-3">
              <nav className="flex items-center text-sm text-muted-foreground gap-2 overflow-x-auto whitespace-nowrap hide-scrollbar">
                <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                {(location || "").split('/').filter(x => x).map((value, index, array) => {
                  const to = `/${array.slice(0, index + 1).join('/')}`;
                  const label = value.charAt(0).toUpperCase() + value.slice(1).replace(/-/g, ' ');
                  return (
                    <span key={to} className="flex items-center gap-2">
                      <span className="opacity-50">/</span>
                      {index === array.length - 1 ? (
                        <span className="text-foreground font-medium">{label}</span>
                      ) : (
                        <Link href={to} className="hover:text-primary transition-colors">{label}</Link>
                      )}
                    </span>
                  );
                })}
              </nav>
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 flex flex-col">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t border-border/50 py-12 md:py-16 mt-auto">
          <div className="mx-auto max-w-7xl px-4 md:px-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="max-w-xs">
              <Link href="/" className="font-serif text-2xl text-foreground block mb-2">
                ShishirPandey.in
              </Link>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Simplifying Tax, GST, and Compliance for individuals and businesses across India.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-x-8 gap-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-primary hover:text-secondary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="mx-auto max-w-7xl px-4 md:px-8 mt-12 pt-8 border-t border-border/30 text-xs text-muted-foreground flex flex-col items-center gap-4">
            <svg viewBox="0 0 40 20" className="w-10 h-5 text-primary/30" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <path d="M 5 10 C 15 5, 25 15, 35 10" />
            </svg>
            <div className="flex flex-col md:flex-row justify-between items-center w-full gap-2">
              <p>© {new Date().getFullYear()} ShishirPandey.in. All rights reserved.</p>
              <p>Based in India · Serving clients PAN India</p>
            </div>
          </div>
        </footer>
      </div>
    </PageIntro>
  );
}
