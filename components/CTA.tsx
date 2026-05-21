"use client";

import { useState } from "react";
import { AlertCircle, CheckCircle2, ChevronDown, Loader2 } from "lucide-react";
import Section from "./layout/Section";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type SubmitState =
  | { name: "idle" }
  | { name: "submitting" }
  | { name: "success"; id: string; storage: string }
  | { name: "error"; message: string };

export default function CTA() {
  const [formData, setFormData] = useState({
    email: "",
    countryCode: "+91",
    phone: "",
  });
  const [submitState, setSubmitState] = useState<SubmitState>({ name: "idle" });

  const validateForm = () => {
    const email = formData.email.trim();
    const phone = formData.phone.trim();

    if (!email) {
      return "Enter an email address.";
    }

    if (!EMAIL_PATTERN.test(email)) {
      return "Enter a valid email address.";
    }

    if (!phone) {
      return "";
    }

    const digits = phone.replace(/\D/g, "");

    if (digits.length < 7 || digits.length > 15) {
      return "Enter a valid mobile number.";
    }

    return "";
  };

  const clearError = () => {
    if (submitState.name === "error") {
      setSubmitState({ name: "idle" });
    }
  };

  const handleSubmit = async () => {
    const validationError = validateForm();

    if (validationError) {
      setSubmitState({ name: "error", message: validationError });
      return;
    }

    setSubmitState({ name: "submitting" });

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          source: "Landing waitlist CTA",
        }),
      });

      const result = (await res.json()) as {
        id?: string;
        storage?: string;
        error?: string;
      };

      if (!res.ok) {
        setSubmitState({
          name: "error",
          message: result.error || "Could not save your waitlist spot.",
        });
        return;
      }

      if (!result.id || !result.storage) {
        setSubmitState({
          name: "error",
          message: "Waitlist response was missing its confirmation details.",
        });
        return;
      }

      setSubmitState({
        name: "success",
        id: result.id,
        storage: result.storage,
      });
      setFormData({ email: "", countryCode: "+91", phone: "" });
    } catch (error) {
      console.error("waitlist request failed", {
        step: "submit-waitlist-form",
        input: formData,
        error,
      });
      setSubmitState({
        name: "error",
        message: "Could not reach the waitlist service. Try again in a moment.",
      });
    }
  };

  return (
    <div
      id="waitlist"
      className="bg-[#2D2D2D] w-full py-3 px-6 border-t border-stone-700"
    >
      <Section>
        <div className="max-w-7xl mx-auto flex flex-col xl:flex-row items-center justify-between gap-8">
          <div className="text-white max-w-md text-center xl:text-left">
            <h3 className="font-serif text-2xl mb-1">Join the Waitlist</h3>
            <p className="text-stone-400 text-sm">
              Save your launch spot. We will capture it in the waitlist log instantly.
            </p>
          </div>

          {submitState.name === "success" ? (
            <div className="bg-green-900/20 border border-green-800 text-green-100 px-8 py-4 rounded w-full xl:w-auto flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 shrink-0 text-green-400" />
              <div>
                <p className="font-bold text-sm">You are on the list.</p>
                <p className="text-xs opacity-80">
                  Confirmation {submitState.id.slice(0, 8)} saved to{" "}
                  {submitState.storage}.
                </p>
              </div>
            </div>
          ) : (
            <div className="w-full xl:w-auto">
              <div className="flex flex-col md:flex-row gap-3 w-full xl:w-auto items-stretch">
                <input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(event) => {
                    setFormData({ ...formData, email: event.target.value });
                    clearError();
                  }}
                  className="bg-white px-4 py-3 min-w-[220px] text-sm h-[48px] text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-600"
                  aria-label="Email address"
                  aria-invalid={submitState.name === "error"}
                />

                <div className="relative pb-8 md:pb-0">
                  <div className="flex bg-white h-[48px]">
                    <div className="relative border-r border-gray-200 h-full">
                      <select
                        value={formData.countryCode}
                        onChange={(event) =>
                          setFormData({
                            ...formData,
                            countryCode: event.target.value,
                          })
                        }
                        className="appearance-none pl-4 pr-8 py-3 text-sm font-bold h-full bg-transparent text-stone-900 focus:outline-none cursor-pointer"
                        aria-label="Country code"
                      >
                        <option value="+91">IN +91</option>
                        <option value="+1">US +1</option>
                        <option value="+971">AE +971</option>
                        <option value="+44">GB +44</option>
                        <option value="+61">AU +61</option>
                        <option value="+966">SA +966</option>
                        <option value="+65">SG +65</option>
                        <option value="+60">MY +60</option>
                        <option value="+965">KW +965</option>
                        <option value="+974">QA +974</option>
                        <option value="+968">OM +968</option>
                        <option value="+973">BH +973</option>
                      </select>
                      <ChevronDown className="w-3 h-3 absolute right-2 top-1/2 -translate-y-1/2 text-stone-500 pointer-events-none" />
                    </div>

                    <input
                      type="tel"
                      placeholder="Mobile Number"
                      value={formData.phone}
                      onChange={(event) => {
                        setFormData({ ...formData, phone: event.target.value });
                        clearError();
                      }}
                      className="px-4 py-3 w-full text-sm h-full text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-600"
                      aria-label="Mobile number optional"
                    />
                  </div>
                  <span className="absolute -bottom-5 md:hidden left-0 right-0 text-stone-400 text-xs text-center">
                    (Optional)
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={submitState.name === "submitting"}
                  className="bg-[#F3EDE7] text-[#2D2D2D] px-8 py-3 uppercase text-xs font-bold tracking-widest hover:bg-amber-100 transition-all whitespace-nowrap shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 h-[48px] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center min-w-[140px]"
                >
                  {submitState.name === "submitting" ? (
                    <Loader2 className="w-4 h-4 animate-spin" aria-label="Saving" />
                  ) : (
                    "Join Waitlist"
                  )}
                </button>
              </div>

              {submitState.name === "error" && (
                <div
                  className="mt-3 flex items-start gap-2 text-sm text-red-100"
                  role="alert"
                >
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-300" />
                  <p>{submitState.message}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </Section>
    </div>
  );
}
