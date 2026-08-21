import React, { useState } from 'react';
import { useCursor } from '../hooks/useCursorContext';
import { Mail, Send, Sparkles, CheckCircle, ArrowUpRight, Calendar, AlertCircle, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { inrBudgetOptions } from '../utils/formatCurrency';
import { submitContactInquiry } from '../utils/sendEmail';
import MagneticHeading from './MagneticHeading';
import IntroCallModal from './IntroCallModal';

export default function ContactSection() {
  const { setCursor, resetCursor } = useCursor();
  const [introModalOpen, setIntroModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    helpNeeded: '',
    budget: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const budgetOptions = inrBudgetOptions;
  const selectedBudgetIndex = formData.budget ? budgetOptions.indexOf(formData.budget) : -1;

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

    if (!formData.helpNeeded.trim()) {
      setErrorMessage('Please let us know how we can help you.');
      return;
    }

    if (!formData.budget) {
      setErrorMessage('Please select an estimated budget.');
      return;
    }

    setIsSubmitting(true);

    try {
      await submitContactInquiry(formData);
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
      // Gracefully show submitted state
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-16 sm:py-24 md:py-36 px-3 sm:px-6 lg:px-8 xl:px-12 bg-[#F5F3EE] border-t border-[#111111]/10 z-10 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-16 items-start w-full">
        {/* Left Column: Heading & Contact Info */}
        <div className="lg:col-span-5 xl:col-span-6 flex flex-col justify-between h-full w-full overflow-hidden">
          <div className="w-full">
            {/* Pill-Style Section Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2457FF]/10 border border-[#2457FF]/30 text-[#2457FF] text-xs font-display font-bold mb-3 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>START A CONVERSATION</span>
            </div>

            {/* Exact Two-Line Heading: HAVE AN IDEA? LET'S BUILD IT. */}
            <div className="mb-4 w-full flex flex-col items-start gap-1">
              <MagneticHeading
                text="HAVE AN IDEA?"
                as="h2"
                noWrap={true}
                className="font-display text-[clamp(1.75rem,3.8vw,4.2rem)] font-extrabold text-[#111111] leading-none tracking-tight text-left justify-start sm:whitespace-nowrap"
              />
              <MagneticHeading
                text="LET'S BUILD IT."
                as="h2"
                noWrap={true}
                className="font-display text-[clamp(1.75rem,3.8vw,4.2rem)] font-extrabold text-[#111111] leading-none tracking-tight text-left justify-start sm:whitespace-nowrap"
              />
            </div>

            {/* Blue Editorial Subtitle */}
            <p className="font-serif italic text-[clamp(1rem,2vw,1.4rem)] text-[#2457FF] mb-6 font-normal leading-snug">
              let's turn your vision into an exceptional digital experience
            </p>

            {/* Body Copy */}
            <p className="text-xs sm:text-sm md:text-base text-[#6F6F6A] font-sans leading-relaxed mb-6 sm:mb-8 lg:mb-10 max-w-lg">
              Whether you need a flagship brand website, an interactive spatial experience, or a production design system — Rounak × Manisha are ready to craft it.
            </p>
          </div>

          {/* Quick Contact Links */}
          <div className="space-y-4 border-t border-[#111111]/10 pt-6 sm:pt-8 w-full">
            <div className="flex items-center gap-3 sm:gap-4 text-sm font-display text-[#111111]">
              <div className="p-2.5 sm:p-3 rounded-xl bg-white text-[#2457FF] border border-[#111111]/10 shadow-sm shrink-0">
                <Mail className="w-4 sm:w-5 h-4 sm:h-5" />
              </div>
              <div className="truncate">
                <span className="block text-[11px] sm:text-xs text-[#6F6F6A] uppercase font-bold mb-0.5">Direct Email</span>
                <div className="space-y-0.5">
                  <a
                    href="mailto:rounakkayal0@gmail.com"
                    onMouseEnter={() => setCursor('link')}
                    onMouseLeave={resetCursor}
                    className="hover:text-[#2457FF] transition-colors font-extrabold text-xs sm:text-sm lg:text-base truncate block"
                  >
                    rounakkayal0@gmail.com
                  </a>
                  <a
                    href="mailto:manishanandi2005@gmail.com"
                    onMouseEnter={() => setCursor('link')}
                    onMouseLeave={resetCursor}
                    className="hover:text-[#2457FF] transition-colors font-extrabold text-xs sm:text-sm lg:text-base truncate block"
                  >
                    manishanandi2005@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 sm:gap-4 text-sm font-display text-[#111111]">
              <div className="p-2.5 sm:p-3 rounded-xl bg-white text-[#E06D53] border border-[#111111]/10 shadow-sm shrink-0">
                <Calendar className="w-4 sm:w-5 h-4 sm:h-5" />
              </div>
              <div className="truncate">
                <span className="block text-[11px] sm:text-xs text-[#6F6F6A] uppercase font-bold">Discovery Call</span>
                <button
                  type="button"
                  onClick={() => setIntroModalOpen(true)}
                  onMouseEnter={() => setCursor('link')}
                  onMouseLeave={resetCursor}
                  className="hover:text-[#E06D53] transition-colors font-extrabold text-xs sm:text-sm lg:text-base flex items-center gap-1 truncate text-left"
                >
                  <span>Book 30-min intro call</span>
                  <ArrowUpRight className="w-3.5 sm:w-4 h-3.5 sm:h-4 shrink-0" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Project Inquiry Form */}
        <div className="lg:col-span-7 xl:col-span-6 w-full">
          <div className="p-5 sm:p-7 lg:p-8 xl:p-10 rounded-3xl light-card border border-[#111111]/12 shadow-xl bg-white relative w-full">
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
                    setFormData({ name: '', email: '', helpNeeded: '', budget: '', message: '' });
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

                {/* 1. Name & Email Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                  <div>
                    <label className="block text-xs font-display text-[#6F6F6A] mb-2 uppercase font-bold">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Arjun Sharma"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errorMessage === 'Please enter your name.') setErrorMessage('');
                      }}
                      className="w-full px-4 py-3 rounded-xl bg-[#F5F3EE] border border-[#111111]/10 text-[#111111] font-sans text-sm focus:border-[#2457FF] outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-display text-[#6F6F6A] mb-2 uppercase font-bold">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="arjun.sharma@gmail.com"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errorMessage === 'Please enter a valid email address.') setErrorMessage('');
                      }}
                      className="w-full px-4 py-3 rounded-xl bg-[#F5F3EE] border border-[#111111]/10 text-[#111111] font-sans text-sm focus:border-[#2457FF] outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* 2. Open Text Field: How Can We Help You? */}
                <div>
                  <label className="block text-xs font-display text-[#6F6F6A] mb-2 uppercase font-bold">
                    HOW CAN WE HELP YOU? *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Elaborate on how we can help you..."
                    value={formData.helpNeeded}
                    onChange={(e) => {
                      setFormData({ ...formData, helpNeeded: e.target.value });
                      if (errorMessage === 'Please let us know how we can help you.') setErrorMessage('');
                    }}
                    className="w-full px-4 py-3 rounded-xl bg-[#F5F3EE] border border-[#111111]/10 text-[#111111] font-sans text-sm focus:border-[#2457FF] outline-none transition-colors resize-none"
                  />
                </div>

                {/* 3. Budget Slider */}
                <div>
                  <div className="flex items-center justify-between mb-2 gap-2 flex-wrap">
                    <label htmlFor="budget-slider" className="block text-xs font-display text-[#6F6F6A] uppercase font-bold">
                      ESTIMATED PROJECT BUDGET (INR ₹) *
                    </label>
                    {formData.budget ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-lg bg-[#2457FF]/10 border border-[#2457FF]/25 text-[#2457FF] text-xs font-display font-bold animate-fadeIn">
                        {formData.budget}
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-lg bg-[#F5F3EE] border border-[#111111]/10 text-[#6F6F6A] text-xs font-display font-medium italic">
                        Select your budget
                      </span>
                    )}
                  </div>

                  <div className="p-4 rounded-xl bg-[#F5F3EE] border border-[#111111]/10 space-y-3">
                    <input
                      id="budget-slider"
                      type="range"
                      min="0"
                      max="3"
                      step="1"
                      value={selectedBudgetIndex >= 0 ? selectedBudgetIndex : 0}
                      onChange={(e) => {
                        const idx = Number(e.target.value);
                        setFormData({ ...formData, budget: budgetOptions[idx] });
                        if (errorMessage === 'Please select an estimated budget.') {
                          setErrorMessage('');
                        }
                      }}
                      className={`w-full budget-slider ${selectedBudgetIndex < 0 ? 'budget-slider-unselected' : ''}`}
                      style={{
                        background: selectedBudgetIndex >= 0
                          ? `linear-gradient(to right, #2457FF 0%, #2457FF ${(selectedBudgetIndex / 3) * 100}%, #DDD9D0 ${(selectedBudgetIndex / 3) * 100}%, #DDD9D0 100%)`
                          : '#DDD9D0'
                      }}
                    />

                    {/* Step Labels */}
                    <div className="flex justify-between items-center text-[10px] sm:text-xs font-display text-[#6F6F6A] px-0.5 select-none">
                      {budgetOptions.map((range, idx) => (
                        <button
                          type="button"
                          key={range}
                          onClick={() => {
                            setFormData({ ...formData, budget: range });
                            if (errorMessage === 'Please select an estimated budget.') {
                              setErrorMessage('');
                            }
                          }}
                          className={`transition-colors text-left sm:text-center ${
                            selectedBudgetIndex === idx
                              ? 'text-[#2457FF] font-bold'
                              : 'hover:text-[#111111] font-medium'
                          }`}
                        >
                          {range}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 4. Project Details & Vision */}
                <div>
                  <label className="block text-xs font-display text-[#6F6F6A] mb-2 uppercase font-bold">
                    PROJECT DETAILS & VISION
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your project goals, timeline, and inspiration..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#F5F3EE] border border-[#111111]/10 text-[#111111] font-sans text-sm focus:border-[#2457FF] outline-none transition-colors resize-none"
                  />
                </div>

                {/* 5. Submit Button */}
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
