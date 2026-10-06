"use client";

import { useActionState } from "react";
import { submitContactForm, type ContactFormState } from "@/app/actions/contact";
import { services } from "@/data/services";
import { Marker } from "@/components/Marker";

const initialState: ContactFormState = { success: false };

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContactForm, initialState);

  if (state.success) {
    return (
      <Marker variant="brackets" dark className="p-8">
        <div className="text-center">
          <h3 className="font-headline text-2xl text-ink mb-3">
            Message sent.
          </h3>
          <p className="text-muted">
            We&apos;ll get back to you shortly — usually within a few hours.
          </p>
        </div>
      </Marker>
    );
  }

  return (
    <form action={formAction} className="space-y-6" noValidate>
      {/* 24/7 Prominent Banner */}
      <div className="mb-6 flex items-center justify-between border-b border-line-light pb-6">
        <div className="flex items-center gap-3">
          <div className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent"></span>
          </div>
          <span className="font-headline text-xl tracking-tight text-ink uppercase mt-1">
            Call / Text 24/7
          </span>
        </div>
        <span className="font-mono-label text-muted text-[10px] tracking-widest hidden sm:block">
          ALWAYS AVAILABLE
        </span>
      </div>

      {/* Name */}
      <div>
        <label htmlFor="contact-name" className="font-mono-label text-muted block mb-2">
          NAME
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          autoComplete="name"
          className="w-full border border-line-light bg-paper px-4 py-3 text-ink text-sm focus:border-accent focus:outline-none transition-colors"
          aria-describedby={state.errors?.name ? "name-error" : undefined}
        />
        {state.errors?.name && (
          <p id="name-error" className="mt-1 text-xs text-rec">
            {state.errors.name[0]}
          </p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="contact-phone" className="font-mono-label text-muted block mb-2">
          PHONE
        </label>
        <input
          id="contact-phone"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          className="w-full border border-line-light bg-paper px-4 py-3 text-ink text-sm focus:border-accent focus:outline-none transition-colors"
          aria-describedby={state.errors?.phone ? "phone-error" : undefined}
        />
        {state.errors?.phone && (
          <p id="phone-error" className="mt-1 text-xs text-rec">
            {state.errors.phone[0]}
          </p>
        )}
      </div>

      {/* Service */}
      <div>
        <label htmlFor="contact-service" className="font-mono-label text-muted block mb-2">
          SERVICE
        </label>
        <select
          id="contact-service"
          name="service"
          required
          className="w-full border border-line-light bg-paper px-4 py-3 text-ink text-sm focus:border-accent focus:outline-none transition-colors appearance-none"
          aria-describedby={state.errors?.service ? "service-error" : undefined}
        >
          <option value="">Select a service</option>
          {services.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.title}
            </option>
          ))}
          <option value="other">Other</option>
        </select>
        {state.errors?.service && (
          <p id="service-error" className="mt-1 text-xs text-rec">
            {state.errors.service[0]}
          </p>
        )}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="contact-message" className="font-mono-label text-muted block mb-2">
          MESSAGE
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          className="w-full border border-line-light bg-paper px-4 py-3 text-ink text-sm focus:border-accent focus:outline-none transition-colors resize-y"
          aria-describedby={state.errors?.message ? "message-error" : undefined}
        />
        {state.errors?.message && (
          <p id="message-error" className="mt-1 text-xs text-rec">
            {state.errors.message[0]}
          </p>
        )}
      </div>

      {/* Form-level error */}
      {state.errors?._form && (
        <p className="text-xs text-rec">{state.errors._form[0]}</p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isPending}
        className="inline-flex items-center gap-2 bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wider text-ink transition-colors hover:bg-accent/90 disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
      >
        {isPending ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}
