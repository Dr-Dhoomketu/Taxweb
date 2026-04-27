"use client"

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters."),
  mobileNumber: z.string().min(10, "Please enter a valid mobile number."),
  email: z.string().email("Please enter a valid email address."),
  serviceRequired: z.string().min(1, "Please select a service."),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function LeadForm({ onSuccess }: { onSuccess?: () => void }) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      mobileNumber: "",
      email: "",
      serviceRequired: "",
      message: "",
    },
  });

  function onSubmit(data: FormValues) {
    // In a real app, this would be an API call.
    console.log("Form submitted:", data);
    setIsSubmitted(true);
    if (onSuccess) {
      onSuccess();
    }
  }

  if (isSubmitted) {
    // TODO: Replace with the actual WhatsApp number
    const waNumber = "910000000000"; 
    const waText = encodeURIComponent("Hi, I registered on your website. Please assist.");
    const waLink = `https://wa.me/${waNumber}?text=${waText}`;

    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="py-12 px-6 bg-card text-card-foreground border border-border flex flex-col items-center justify-center text-center"
      >
        <h3 className="font-serif text-3xl mb-4 text-primary">Thank you.</h3>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto leading-relaxed">
          We have received your details and will contact you within one business day.
        </p>
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors uppercase tracking-widest text-sm font-medium"
        >
          Continue on WhatsApp
        </a>
      </motion.div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="uppercase tracking-widest text-xs text-muted-foreground">Full Name</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="John Doe" 
                    className="border-0 border-b border-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary bg-transparent text-lg" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="mobileNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="uppercase tracking-widest text-xs text-muted-foreground">Mobile Number</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="+91 00000 00000" 
                    type="tel"
                    className="border-0 border-b border-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary bg-transparent text-lg" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="uppercase tracking-widest text-xs text-muted-foreground">Email Address</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="john@example.com" 
                    type="email"
                    className="border-0 border-b border-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary bg-transparent text-lg" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="serviceRequired"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="uppercase tracking-widest text-xs text-muted-foreground">Service Required</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="border-0 border-b border-border rounded-none px-0 focus:ring-0 focus:border-primary bg-transparent text-lg shadow-none">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="rounded-none border-border bg-card">
                    <SelectItem value="Income Tax">Income Tax</SelectItem>
                    <SelectItem value="GST">GST</SelectItem>
                    <SelectItem value="Accounting">Accounting</SelectItem>
                    <SelectItem value="Business Setup">Business Setup</SelectItem>
                    <SelectItem value="TDS/TCS">TDS/TCS</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="uppercase tracking-widest text-xs text-muted-foreground">Message (Optional)</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Tell us a bit about your requirements..." 
                  className="border-0 border-b border-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary bg-transparent text-lg resize-none min-h-[100px]" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="pt-4">
          <Button 
            type="submit" 
            size="lg"
            className="w-full md:w-auto bg-primary text-primary-foreground hover:bg-primary/90 rounded-none uppercase tracking-widest text-sm font-medium px-12 py-6"
          >
            Send Enquiry
          </Button>
        </div>
      </form>
    </Form>
  );
}
