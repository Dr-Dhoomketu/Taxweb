"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LeadForm } from "./LeadForm";
import { useState } from "react";

export function LeadFormModal({ 
  triggerClassName,
  triggerText = "Get Free Consultation"
}: { 
  triggerClassName?: string;
  triggerText?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className={triggerClassName}>
        {triggerText}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] p-0 gap-0 border-border bg-background rounded-none shadow-2xl">
        <div className="p-8 md:p-12">
          <DialogHeader className="mb-8">
            <DialogTitle className="font-serif text-3xl md:text-4xl text-primary font-normal tracking-tight">
              Request a Consultation
            </DialogTitle>
            <DialogDescription className="text-muted-foreground text-base mt-2">
              Tell us a little about your situation. We respond within one business day.
            </DialogDescription>
          </DialogHeader>
          <LeadForm />
        </div>
      </DialogContent>
    </Dialog>
  );
}
