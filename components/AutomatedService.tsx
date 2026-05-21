// components/AutomatedService.tsx
import Section from "./layout/Section";
import { Calendar, Mail, Repeat, CheckCircle2 } from "lucide-react";

export default function AutomatedService() {
  return (
    <div className="bg-stone-100 border-t border-stone-200">
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* LEFT: Content */}
          <div className="flex flex-col justify-center">
            <span className="text-amber-700 uppercase text-xs font-bold mb-6 block">
              Set It & Forget It
            </span>

            <h2 className="font-serif text-4xl mb-10 text-stone-900">
              Automated Annual Service
            </h2>

            <p className="text-stone-600 mb-12 text-lg leading-relaxed">
              Our service runs automatically every year. Even if it slips your mind, we&apos;ll execute
              your scheduled deliveries and send confirmation emails beforehand, so you never miss 
              an important occasion.
            </p>

            <div className="space-y-10">
              <div className="flex gap-4 items-start">
                <div className="shrink-0 w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <Repeat className="w-6 h-6 text-amber-700" />
                </div>
                <div>
                  <h3 className="font-serif text-xl mb-3 text-stone-900">Annual Automation</h3>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    Your scheduled deliveries repeat automatically each year without any action needed from you.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="shrink-0 w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <Mail className="w-6 h-6 text-amber-700" />
                </div>
                <div>
                  <h3 className="font-serif text-xl mb-3 text-stone-900">Proactive Reminders</h3>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    We send confirmation emails before each delivery, giving you peace of mind and a chance to make any changes.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="shrink-0 w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-amber-700" />
                </div>
                <div>
                  <h3 className="font-serif text-xl mb-3 text-stone-900">Never Miss a Moment</h3>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    Life gets busy, but your relationships don&apos;t have to suffer. We ensure your gifts are delivered on time, every time.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Email Notification Preview */}
          <div className="relative space-y-6">
            <div className="bg-white rounded-lg shadow-xl border-4 border-stone-200 overflow-hidden">
              {/* Email Header */}
              <div className="bg-stone-50 border-b border-stone-200 px-6 py-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                    <Mail className="w-5 h-5 text-amber-700" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-stone-900">Tyohar</p>
                    <p className="text-xs text-stone-500">noreply@tyohar.gifts</p>
                  </div>
                </div>
              </div>
              
              {/* Email Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <h3 className="font-serif text-lg text-stone-900">Upcoming Delivery Confirmation</h3>
                </div>
                
                <div className="space-y-3 text-sm text-stone-600">
                  <p>Hi there,</p>
                  <p>Your annual Diwali gift delivery is scheduled for <span className="font-semibold text-stone-900">November 8, 2026</span>.</p>
                  
                  <div className="bg-amber-50 border-l-4 border-amber-700 p-3 my-4">
                    <p className="text-xs font-semibold text-amber-900 mb-1">Delivery Details:</p>
                    <p className="text-xs text-stone-700">Premium Diwali Hamper to Mumbai, Maharashtra</p>
                  </div>
                  
                  <p className="text-xs text-stone-500 italic">No action needed. We&apos;ll handle everything automatically.</p>
                </div>
              </div>
            </div>
            
            {/* GIF */}
            <div className="rounded-lg overflow-hidden shadow-lg border-4 border-stone-200">
              <img 
                src="/happy-fam.gif" 
                alt="Happy family receiving gifts" 
                className="w-full h-auto"
              />
            </div>
            
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-amber-200 rounded-full opacity-50 -z-10"></div>
          </div>

        </div>
      </Section>
    </div>
  );
}

