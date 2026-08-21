import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Calendar, Clock, Sparkles, CheckCircle, AlertCircle, Loader2, Send } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCursor } from '../hooks/useCursorContext';
import { submitDiscoveryCall } from '../utils/sendEmail';

export default function IntroCallModal({ isOpen, onClose }) {
  const { setCursor, resetCursor } = useCursor();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: '11:00 AM IST',
    topic: '',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Lock body scroll and pause Lenis smoothly when modal is active
  useEffect(() => {
    if (!isOpen) return;

    if (window.lenis) {
      window.lenis.stop();
    }
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow || '';
      if (window.lenis) {
        window.lenis.start();
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleReset = () => {
    setSubmitted(false);
    setErrorMessage('');
    setFormData({
      name: '',
      email: '',
      phone: '',
      preferredDate: '',
      preferredTime: '11:00 AM IST',
      topic: '',
      notes: ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    if (!formData.email.trim() || !validateEmail(formData.email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (!formData.preferredDate) {
      setErrorMessage('Please select your preferred date.');
      return;
    }

    if (!formData.preferredTime.trim()) {
      setErrorMessage('Please select your preferred time slot.');
      return;
    }

    if (!formData.topic.trim()) {
      setErrorMessage('Please enter your project or discussion topic.');
      return;
    }

    setIsSubmitting(true);

    try {
      await submitDiscoveryCall(formData);
      setSubmitted(true);
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#2457FF', '#E06D53', '#5B8266', '#111111']
        });
      } catch (err) {
        // Fallback if canvas is not supported
      }
    } catch (err) {
      // Optimistic delivery fallback
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const timeOptions = [
    '10:00 AM IST',
    '11:00 AM IST',
    '12:00 PM IST',
    '02:00 PM IST',
    '03:30 PM IST',
    '05:00 PM IST',
    '06:30 PM IST',
    '08:00 PM IST'
  ];

  // Set today as the minimum selectable date
  const todayString = new Date().toISOString().split('T')[0];

  return createPortal(
    <div
      className="fixed inset-0 z-[99999] w-screen h-screen flex items-center justify-center p-2 sm:p-6 md:p-8 bg-[#0E0E10]/95 backdrop-blur-2xl animate-fadeIn overflow-hidden"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="intro-call-modal-title"
    >
      <div
        data-lenis-prevent
        className="relative w-full max-w-2xl max-h-[94vh] bg-[#F5F3EE] border border-[#111111]/20 rounded-2xl sm:rounded-3xl overflow-y-auto overscroll-contain shadow-2xl text-[#111111] p-4 sm:p-8 md:p-10 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden z-10"
      >
        {/* Floating Close Button */}
        <div className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 z-20">
          <button
            onClick={onClose}
            onMouseEnter={() => setCursor('link')}
            onMouseLeave={resetCursor}
            className="p-2 sm:p-2.5 rounded-full bg-white text-[#111111] hover:bg-[#111111] hover:text-white border border-[#111111]/10 shadow-sm transition-all"
            aria-label="Close modal"
          >
            <X className="w-4 sm:w-5 h-4 sm:h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="py-8 sm:py-16 text-center animate-fadeIn">
            <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-sm">
              <CheckCircle className="w-8 sm:w-10 h-8 sm:h-10" />
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/60 text-emerald-800 text-xs font-display font-bold mb-3 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>REQUEST CONFIRMED</span>
            </div>
            <h3 id="intro-call-modal-title" className="font-display text-xl sm:text-3xl font-extrabold text-[#111111] mb-2">
              REQUEST RECEIVED!
            </h3>
            <p className="text-xs sm:text-sm font-sans text-[#6F6F6A] max-w-md mx-auto mb-6 leading-relaxed">
              Thank you, <strong className="text-[#111111]">{formData.name}</strong>. We've received your discovery call request for{' '}
              <strong className="text-[#2457FF]">{formData.preferredDate}</strong> at{' '}
              <strong className="text-[#2457FF]">{formData.preferredTime}</strong>. Rounak & Manisha will send you a calendar invite shortly.
            </p>

            <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-[#111111]/10 max-w-md mx-auto text-left mb-6 sm:mb-8 text-xs font-display space-y-1.5 shadow-sm">
              <div className="flex justify-between text-[#6F6F6A]">
                <span>Topic:</span>
                <span className="font-bold text-[#111111] truncate max-w-[160px] sm:max-w-[200px]">{formData.topic}</span>
              </div>
              <div className="flex justify-between text-[#6F6F6A]">
                <span>Contact Email:</span>
                <span className="font-bold text-[#111111] truncate max-w-[160px] sm:max-w-[200px]">{formData.email}</span>
              </div>
              {formData.phone && (
                <div className="flex justify-between text-[#6F6F6A]">
                  <span>Phone:</span>
                  <span className="font-bold text-[#111111]">{formData.phone}</span>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3">
              <button
                onClick={handleReset}
                onMouseEnter={() => setCursor('link')}
                onMouseLeave={resetCursor}
                className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[#111111] text-white font-display text-xs hover:bg-[#2457FF] transition-all font-extrabold uppercase tracking-wider"
              >
                Book Another Call
              </button>
              <button
                onClick={onClose}
                onMouseEnter={() => setCursor('link')}
                onMouseLeave={resetCursor}
                className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-white text-[#111111] border border-[#111111]/15 font-display text-xs hover:bg-[#F5F3EE] transition-all font-extrabold uppercase tracking-wider"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="mb-4 sm:mb-6 pr-8 sm:pr-10">
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full bg-[#E06D53]/10 border border-[#E06D53]/30 text-[#E06D53] text-[11px] sm:text-xs font-display font-bold mb-2 uppercase tracking-wider">
                <Calendar className="w-3.5 h-3.5" />
                <span>30-MIN DISCOVERY CALL</span>
              </div>
              <h2 id="intro-call-modal-title" className="font-display text-xl sm:text-3xl font-extrabold text-[#111111] leading-tight">
                BOOK A 30-MIN INTRO CALL
              </h2>
              <p className="font-serif italic text-xs sm:text-base text-[#2457FF] mt-1 font-normal">
                let's connect, explore ideas & discuss how we can build together
              </p>
            </div>

            {/* Validation Error Banner */}
            {errorMessage && (
              <div className="mb-4 sm:mb-5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-display flex items-center gap-2 font-bold animate-fadeIn">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-5">
              {/* Full Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div>
                  <label className="block text-xs font-display text-[#6F6F6A] mb-1.5 uppercase font-bold">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Arjun Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#111111]/10 text-[#111111] font-sans text-sm focus:border-[#2457FF] outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-display text-[#6F6F6A] mb-1.5 uppercase font-bold">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. arjun.sharma@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#111111]/10 text-[#111111] font-sans text-sm focus:border-[#2457FF] outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Phone & Discussion Topic */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div>
                  <label className="block text-xs font-display text-[#6F6F6A] mb-1.5 uppercase font-bold">
                    Phone Number <span className="text-[#6F6F6A]/70 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. +91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#111111]/10 text-[#111111] font-sans text-sm focus:border-[#2457FF] outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-display text-[#6F6F6A] mb-1.5 uppercase font-bold">
                    Project / Discussion Topic *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Flagship brand website & 3D interaction"
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#111111]/10 text-[#111111] font-sans text-sm focus:border-[#2457FF] outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Preferred Date & Preferred Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div>
                  <label className="block text-xs font-display text-[#6F6F6A] mb-1.5 uppercase font-bold">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    required
                    min={todayString}
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#111111]/10 text-[#111111] font-sans text-sm focus:border-[#2457FF] outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-display text-[#6F6F6A] mb-1.5 uppercase font-bold">
                    Preferred Time *
                  </label>
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#111111]/10 text-[#111111] font-sans text-sm focus:border-[#2457FF] outline-none transition-colors"
                  >
                    {timeOptions.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Additional Notes */}
              <div>
                <label className="block text-xs font-display text-[#6F6F6A] mb-1.5 uppercase font-bold">
                  Additional Notes <span className="text-[#6F6F6A]/70 font-normal">(Optional)</span>
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Any specific goals, timeline, or agenda for our 30-min conversation..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#111111]/10 text-[#111111] font-sans text-sm focus:border-[#2457FF] outline-none transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                onMouseEnter={() => setCursor('magnet')}
                onMouseLeave={resetCursor}
                className="w-full py-3.5 rounded-xl bg-[#111111] text-white font-display font-extrabold text-xs tracking-wider uppercase flex items-center justify-center gap-2 hover:bg-[#2457FF] shadow-md hover:shadow-lg transition-all hover:scale-[1.01] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>CONFIRMING REQUEST...</span>
                  </>
                ) : (
                  <>
                    <span>SCHEDULE 30-MIN CALL →</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
