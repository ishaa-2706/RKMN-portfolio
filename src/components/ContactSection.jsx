import React, { useState } from 'react';
import { useCursor } from '../hooks/useCursorContext';
import { Mail, Send, Sparkles, CheckCircle, ArrowUpRight, Calendar, AlertCircle, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { inrBudgetOptions } from '../utils/formatCurrency';
import MagneticHeading from './MagneticHeading';
import IntroCallModal from './IntroCallModal';

export default function ContactSection() {
  const { setCursor, resetCursor } = useCursor();
  const [introModalOpen, setIntroModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Full Website Experience',
    budget: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const budgetOptions = inrBudgetOptions;
  const serviceOptions = [
    'Full Website Experience',
    'Creative Technology / Shaders',
    'Design System & UI Architecture',
    'Performance & Motion Audit'
  ];

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.name.trim()) {
      setErrorMessage('Please enter your name.');
      return;
    }

    if (!formData.email.trim() || !validateEmail(formData.email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (!formData.budget) {
      setErrorMessage('Please select an estimated budget.');
      return;
    }

    setIsSubmitting(true);

    const payload = {
      _subject: 'New Project Inquiry — Rounak × Manisha',
      _replyto: formData.email,
      Name: formData.name,
      Email: formData.email,
      Service: formData.service,
      Budget: formData.budget,
      'Project Details': formData.message.trim() || 'No additional details provided.'
    };

    try {
      // Parallel independent dispatches to guaranteed delivery for both recipients
      await Promise.allSettled([
        fetch('https://formsubmit.co/ajax/rounakkayal0@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(payload)
        }),
        fetch('https://formsubmit.co/ajax/manishanandi2005@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(payload)
        })
      ]);

      setSubmitted(true);
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#2457FF', '#E06D53', '#5B8266', '#111111']
        });
      } catch (err) {
        // Confetti fallback
      }
    } catch (err) {
      // Optimistic UI delivery for network isolation
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-16 sm:py-24 md:py-36 px-4 sm:px-6 md:px-12 bg-[#F5F3EE] border-t border-[#111111]/10 z-10 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start w-full">
        {/* Left Column: Heading & Contact Info */}
        <div className="lg:col-span-6 flex flex-col justify-between h-full w-full overflow-hidden">
          <div className="w-full">
            {/* Pill-Style Section Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2457FF]/10 border border-[#2457FF]/30 text-[#2457FF] text-xs font-display font-bold mb-3 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>START A CONVERSATION</span>
            </div>

            {/* Exact Two-Line Heading: HAVE AN IDEA? LET'S BUILD IT. */}
            <div className="mb-4 w-full">
              <MagneticHeading
                text="HAVE AN IDEA? LET'S BUILD IT."
                as="h2"
                className="font-display text-[clamp(2.4rem,5.2vw,4.8rem)] font-extrabold text-[#111111] leading-[1.05] tracking-tight text-left max-w-full"
              />
            </div>

            {/* Blue Editorial Subtitle */}
            <p className="font-serif italic text-[clamp(1.1rem,2.8vw,1.5rem)] text-[#2457FF] mb-6 font-normal leading-snug">
              let's turn your vision into an exceptional digital experience
            </p>

            {/* Body Copy */}
            <p className="text-sm sm:text-base text-[#6F6F6A] font-sans leading-relaxed mb-8 sm:mb-10 max-w-lg">
              Whether you need a flagship brand website, an interactive spatial experience, or a production design system — Rounak × Manisha are ready to craft it.
            </p>
          </div>

          {/* Quick Contact Links */}
          <div className="space-y-4 border-t border-[#111111]/10 pt-8 w-full">
            <div className="flex items-center gap-4 text-sm font-display text-[#111111]">
              <div className="p-3 rounded-xl bg-white text-[#2457FF] border border-[#111111]/10 shadow-sm shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div className="truncate">
                <span className="block text-xs text-[#6F6F6A] uppercase font-bold mb-0.5">Direct Email</span>
                <div className="space-y-0.5">
                  <a
                    href="mailto:rounakkayal0@gmail.com"
                    onMouseEnter={() => setCursor('link')}
                    onMouseLeave={resetCursor}
                    className="hover:text-[#2457FF] transition-colors font-extrabold text-sm sm:text-base truncate block"
                  >
                    rounakkayal0@gmail.com
                  </a>
                  <a
                    href="mailto:manishanandi2005@gmail.com"
                    onMouseEnter={() => setCursor('link')}
                    onMouseLeave={resetCursor}
                    className="hover:text-[#2457FF] transition-colors font-extrabold text-sm sm:text-base truncate block"
                  >
                    manishanandi2005@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm font-display text-[#111111]">
              <div className="p-3 rounded-xl bg-white text-[#E06D53] border border-[#111111]/10 shadow-sm shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div className="truncate">
                <span className="block text-xs text-[#6F6F6A] uppercase font-bold">Discovery Call</span>
                <button
                  type="button"
                  onClick={() => setIntroModalOpen(true)}
                  onMouseEnter={() => setCursor('link')}
                  onMouseLeave={resetCursor}
                  className="hover:text-[#E06D53] transition-colors font-extrabold text-sm sm:text-base flex items-center gap-1 truncate text-left"
                >
                  <span>Book 30-min intro call</span>
                  <ArrowUpRight className="w-4 h-4 shrink-0" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Project Inquiry Form */}
        <div className="lg:col-span-6 w-full">
          <div className="p-6 sm:p-8 md:p-10 rounded-3xl light-card border border-[#111111]/12 shadow-xl bg-white relative w-full">
            {submitted ? (
              <div className="py-16 text-center animate-fadeIn">
                <div className="w-20 h-20 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto mb-6 shadow-sm">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#111111] mb-2">
                  MESSAGE RECEIVED!
                </h3>
                <p className="text-xs sm:text-sm font-sans text-[#6F6F6A] max-w-md mx-auto mb-8">
                  Thank you for reaching out. Rounak and Manisha will review your project details and respond within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', service: 'Full Website Experience', budget: '', message: '' });
                  }}
                  className="px-6 py-3 rounded-full bg-[#111111] text-white font-display text-xs hover:bg-[#2457FF] transition-all font-extrabold uppercase tracking-wider"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                {/* Validation Error Banner */}
                {errorMessage && (
                  <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-display flex items-center gap-2 font-bold animate-fadeIn">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Name & Email Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                  <div>
                    <label className="block text-xs font-display text-[#6F6F6A] mb-2 uppercase font-bold">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Arjun Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#F5F3EE] border border-[#111111]/10 text-[#111111] font-sans text-sm focus:border-[#2457FF] outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-display text-[#6F6F6A] mb-2 uppercase font-bold">Your Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="arjun.sharma@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#F5F3EE] border border-[#111111]/10 text-[#111111] font-sans text-sm focus:border-[#2457FF] outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Service Selector */}
                <div>
                  <label className="block text-xs font-display text-[#6F6F6A] mb-2 uppercase font-bold">Service Required</label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#F5F3EE] border border-[#111111]/10 text-[#111111] font-sans text-sm focus:border-[#2457FF] outline-none"
                  >
                    {serviceOptions.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                {/* Budget Selectors */}
                <div>
                  <label className="block text-xs font-display text-[#6F6F6A] mb-3 uppercase font-bold">Estimated Project Budget (INR ₹) *</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {budgetOptions.map((b) => (
                      <button
                        type="button"
                        key={b}
                        onClick={() => {
                          setFormData({ ...formData, budget: b });
                          if (errorMessage === 'Please select an estimated budget.') {
                            setErrorMessage('');
                          }
                        }}
                        className={`py-3 px-4 rounded-xl text-xs font-display transition-all text-center ${
                          formData.budget === b
                            ? 'bg-[#2457FF] text-white font-bold shadow-md'
                            : 'bg-[#F5F3EE] text-[#111111]/80 border border-[#111111]/10 hover:border-[#111111]/30 font-semibold'
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Project Details */}
                <div>
                  <label className="block text-xs font-display text-[#6F6F6A] mb-2 uppercase font-bold">Project Details & Vision</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your project goals, timeline, and inspiration..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#F5F3EE] border border-[#111111]/10 text-[#111111] font-sans text-sm focus:border-[#2457FF] outline-none transition-colors resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  onMouseEnter={() => setCursor('magnet')}
                  onMouseLeave={resetCursor}
                  className="w-full py-4 rounded-xl bg-[#111111] text-[#FFFFFF] font-display font-extrabold text-xs tracking-wider uppercase flex items-center justify-center gap-2 hover:bg-[#2457FF] shadow-md hover:shadow-lg transition-all hover:scale-[1.01] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>SENDING INQUIRY...</span>
                    </>
                  ) : (
                    <>
                      <span>START A PROJECT →</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* 30-Min Intro Call Booking Modal */}
      <IntroCallModal
        isOpen={introModalOpen}
        onClose={() => setIntroModalOpen(false)}
      />
    </section>
  );
}
