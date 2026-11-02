"use client";

import { useActionState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { submitContactForm, type ContactFormState } from "@/app/actions/contact";
import { services } from "@/data/services";
import { Marker } from "@/components/Marker";
import { usePathname } from "next/navigation";
import { trackConversion, getServiceFromPath } from "@/lib/tracking";

const ReCAPTCHA = dynamic(() => import("react-google-recaptcha"), {
  ssr: false,
});

const initialState: ContactFormState = { success: false };

interface ContactFormProps {
  source?: "contact-page" | "cctv-page";
  defaultService?: "laptop-repair" | "mobile-repair" | "cctv-installation" | "other";
  id?: string;
  className?: string;
}

export function ContactForm({
  source = "contact-page",
  defaultService = "cctv-installation",
  id,
  className = "",
}: ContactFormProps) {
  const [state, formAction, isPending] = useActionState(
    submitContactForm,
    initialState
  );
  const hasFiredLead = useRef(false);
  const pathname = usePathname();
  const isCctvQuote = source === "cctv-page";

  useEffect(() => {
    if (state.success && !hasFiredLead.current) {
      hasFiredLead.current = true;
      trackConversion({
        event: "quote_form_submit",
        location: "form",
        page_path: pathname || "",
        service: isCctvQuote ? "cctv" : getServiceFromPath(pathname || ""),
      });
    }
  }, [state.success, pathname, isCctvQuote]);

  if (state.success) {
    return (
      <Marker variant="brackets" dark className="p-8">
        <div className="text-center py-4">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent/20 text-ink">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-ink"
              aria-hidden="true"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h3 className="font-headline text-2xl text-ink mb-3">
            {isCctvQuote ? "Quote Request Received" : "Message sent."}
          </h3>
          <p className="text-muted text-sm max-w-md mx-auto">
            {isCctvQuote
              ? "Thank you! We'll review your details and be in touch promptly to arrange your free site survey."
              : "Thank you! We'll get back to you shortly."}
          </p>
          <div className="mt-6 pt-6 border-t border-line-light">
            <p className="text-xs text-muted mb-2">Need an answer right away?</p>
            <a
              href="tel:+447777168239"
              onClick={() =>
                trackConversion({
                  event: "call_click",
                  location: "form",
                  page_path: pathname || "",
                  service: isCctvQuote ? "cctv" : getServiceFromPath(pathname || ""),
                })
              }
              className="font-mono-label text-ink hover:text-accent font-bold inline-flex items-center gap-1.5"
            >
              Call 07777168239 (24/7)
            </a>
          </div>
        </div>
      </Marker>
    );
  }

  return (
    <form
      id={id}
      action={formAction}
      className={`space-y-6 ${className}`}
      noValidate
    >
      {/* Hidden lead source */}
      <input type="hidden" name="source" value={source} />

      {/* Honeypot field for bot protection (hidden from humans) */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="b_website">Leave this field blank</label>
        <input
          id="b_website"
          type="text"
          name="b_website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

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
        <label
          htmlFor={`${source}-name`}
          className="font-mono-label text-muted block mb-2"
        >
          NAME <span className="text-rec">*</span>
        </label>
        <input
          id={`${source}-name`}
          name="name"
          type="text"
          required
          autoComplete="name"
          placeholder="e.g. John Smith"
          className="w-full border border-line-light bg-paper px-4 py-3 text-ink text-sm focus:border-accent focus:outline-none transition-colors"
          aria-describedby={state.errors?.name ? `${source}-name-error` : undefined}
        />
        {state.errors?.name && (
          <p id={`${source}-name-error`} className="mt-1 text-xs text-rec">
            {state.errors.name[0]}
          </p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label
          htmlFor={`${source}-phone`}
          className="font-mono-label text-muted block mb-2"
        >
          PHONE <span className="text-rec">*</span>
        </label>
        <input
          id={`${source}-phone`}
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          placeholder="e.g. 07777 123456"
          className="w-full border border-line-light bg-paper px-4 py-3 text-ink text-sm focus:border-accent focus:outline-none transition-colors"
          aria-describedby={state.errors?.phone ? `${source}-phone-error` : undefined}
        />
        {state.errors?.phone && (
          <p id={`${source}-phone-error`} className="mt-1 text-xs text-rec">
            {state.errors.phone[0]}
          </p>
        )}
      </div>

      {/* CCTV-Specific fields */}
      {isCctvQuote ? (
        <>
          <input type="hidden" name="service" value="cctv-installation" />

          {/* Postcode */}
          <div>
            <label
              htmlFor="quote-postcode"
              className="font-mono-label text-muted block mb-2"
            >
              POSTCODE (FOR SITE SURVEY) <span className="text-rec">*</span>
            </label>
            <input
              id="quote-postcode"
              name="postcode"
              type="text"
              required
              autoComplete="postal-code"
              placeholder="e.g. MK14 6BG"
              className="w-full border border-line-light bg-paper px-4 py-3 text-ink text-sm focus:border-accent focus:outline-none transition-colors uppercase"
              aria-describedby={
                state.errors?.postcode ? "quote-postcode-error" : undefined
              }
            />
            {state.errors?.postcode && (
              <p id="quote-postcode-error" className="mt-1 text-xs text-rec">
                {state.errors.postcode[0]}
              </p>
            )}
          </div>

          {/* Property Type */}
          <div>
            <span className="font-mono-label text-muted block mb-2">
              PROPERTY TYPE <span className="text-rec">*</span>
            </span>
            <div className="grid grid-cols-2 gap-3">
              <label className="flex items-center gap-2 border border-line-light p-3 bg-paper cursor-pointer hover:border-accent transition-colors">
                <input
                  type="radio"
                  name="propertyType"
                  value="Home"
                  defaultChecked
                  className="accent-accent"
                />
                <span className="text-sm font-medium text-ink">Home</span>
              </label>
              <label className="flex items-center gap-2 border border-line-light p-3 bg-paper cursor-pointer hover:border-accent transition-colors">
                <input
                  type="radio"
                  name="propertyType"
                  value="Business"
                  className="accent-accent"
                />
                <span className="text-sm font-medium text-ink">Business</span>
              </label>
            </div>
            {state.errors?.propertyType && (
              <p className="mt-1 text-xs text-rec">
                {state.errors.propertyType[0]}
              </p>
            )}
          </div>

          {/* Number of cameras (optional) */}
          <div>
            <label
              htmlFor="quote-cameras"
              className="font-mono-label text-muted block mb-2"
            >
              NUMBER OF CAMERAS (OPTIONAL)
            </label>
            <select
              id="quote-cameras"
              name="cameraCount"
              defaultValue=""
              className="w-full border border-line-light bg-paper px-4 py-3 text-ink text-sm focus:border-accent focus:outline-none transition-colors"
            >
              <option value="">Select camera range (optional)</option>
              <option value="1-2">1–2 Cameras</option>
              <option value="3-4">3–4 Cameras</option>
              <option value="5-8">5–8 Cameras</option>
              <option value="Not sure">Not sure yet (confirm at survey)</option>
            </select>
          </div>

          {/* Optional message */}
          <div>
            <label
              htmlFor="quote-message"
              className="font-mono-label text-muted block mb-2"
            >
              MESSAGE OR REQUIREMENTS (OPTIONAL)
            </label>
            <textarea
              id="quote-message"
              name="message"
              rows={3}
              placeholder="e.g. Driveway and rear garden coverage, detached house."
              className="w-full border border-line-light bg-paper px-4 py-3 text-ink text-sm focus:border-accent focus:outline-none transition-colors resize-y"
              aria-describedby={
                state.errors?.message ? "quote-message-error" : undefined
              }
            />
            {state.errors?.message && (
              <p id="quote-message-error" className="mt-1 text-xs text-rec">
                {state.errors.message[0]}
              </p>
            )}
          </div>
        </>
      ) : (
        /* Standard /contact fields */
        <>
          {/* Service */}
          <div>
            <label
              htmlFor={`${source}-service`}
              className="font-mono-label text-muted block mb-2"
            >
              SERVICE
            </label>
            <select
              id={`${source}-service`}
              name="service"
              defaultValue={defaultService}
              required
              className="w-full border border-line-light bg-paper px-4 py-3 text-ink text-sm focus:border-accent focus:outline-none transition-colors appearance-none"
              aria-describedby={
                state.errors?.service ? `${source}-service-error` : undefined
              }
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
              <p id={`${source}-service-error`} className="mt-1 text-xs text-rec">
                {state.errors.service[0]}
              </p>
            )}
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor={`${source}-message`}
              className="font-mono-label text-muted block mb-2"
            >
              MESSAGE
            </label>
            <textarea
              id={`${source}-message`}
              name="message"
              required
              rows={5}
              className="w-full border border-line-light bg-paper px-4 py-3 text-ink text-sm focus:border-accent focus:outline-none transition-colors resize-y"
              aria-describedby={
                state.errors?.message ? `${source}-message-error` : undefined
              }
            />
            {state.errors?.message && (
              <p id={`${source}-message-error`} className="mt-1 text-xs text-rec">
                {state.errors.message[0]}
              </p>
            )}
          </div>
        </>
      )}

      {/* Form-level error */}
      {state.errors?._form && (
        <p className="text-xs text-rec">{state.errors._form[0]}</p>
      )}

      {/* ReCAPTCHA */}
      <div className="flex justify-start">
        {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ? (
          <ReCAPTCHA sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY} />
        ) : (
          <div className="text-sm text-rec p-3 border border-rec/30 bg-rec/10">
            ReCAPTCHA configuration is missing. Please add
            NEXT_PUBLIC_RECAPTCHA_SITE_KEY to your environment variables.
          </div>
        )}
      </div>

      {/* Submit button */}
      <button
        type="submit"
        disabled={isPending}
        className="inline-flex items-center gap-2 bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wider text-ink transition-colors hover:bg-accent/90 disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 cursor-pointer"
      >
        {isPending
          ? "Sending..."
          : isCctvQuote
          ? "Request Free Quote"
          : "Send message"}
      </button>

      {/* Note: Prefer to talk? Call 07777168239 */}
      <div className="pt-4 border-t border-line-light">
        <p className="text-xs text-muted">
          Prefer to talk? Call{" "}
          <a
            href="tel:+447777168239"
            onClick={() =>
              trackConversion({
                event: "call_click",
                location: "form",
                page_path: pathname || "",
                service: isCctvQuote ? "cctv" : getServiceFromPath(pathname || ""),
              })
            }
            className="font-bold text-ink hover:text-accent underline underline-offset-2 transition-colors font-mono"
          >
            07777168239
          </a>
        </p>
      </div>
    </form>
  );
}
