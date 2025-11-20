'use client';

import { useState } from 'react';

interface NewsletterSignupProps {
  isArabic?: boolean;
  compact?: boolean;
}

export default function NewsletterSignup({ isArabic = false, compact = false }: NewsletterSignupProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, name }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage(isArabic ? 'شكراً لاشتراكك!' : 'Thank you for subscribing!');
        setEmail('');
        setName('');
      } else {
        setStatus('error');
        setMessage(data.error || (isArabic ? 'حدث خطأ. يرجى المحاولة مرة أخرى.' : 'An error occurred. Please try again.'));
      }
    } catch (error) {
      setStatus('error');
      setMessage(isArabic ? 'حدث خطأ. يرجى المحاولة مرة أخرى.' : 'An error occurred. Please try again.');
    }

    setTimeout(() => {
      setStatus('idle');
      setMessage('');
    }, 5000);
  };

  if (compact) {
    // Compact version for footer
    return (
      <div className="w-full max-w-lg mx-auto">
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex gap-2">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 px-3 py-2 text-sm border border-white/20 bg-white/10 text-white placeholder:text-white/60 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent"
              placeholder={isArabic ? 'بريدك الإلكتروني' : 'Your email'}
              dir="ltr"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="px-6 py-2 text-sm bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900 font-semibold rounded-lg hover:brightness-105 disabled:opacity-50 disabled:cursor-not-allowed transition-all whitespace-nowrap"
            >
              {status === 'loading'
                ? (isArabic ? 'إرسال...' : 'Sending...')
                : (isArabic ? 'اشترك' : 'Subscribe')}
            </button>
          </div>

          {message && (
            <div
              className={`p-2 rounded-lg text-center text-sm font-medium ${
                status === 'success' ? 'bg-green-500/20 text-green-100 border border-green-400/30' : 'bg-red-500/20 text-red-100 border border-red-400/30'
              }`}
            >
              {message}
            </div>
          )}
        </form>
      </div>
    );
  }

  // Regular version for pages
  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
            {isArabic ? 'الاسم (اختياري)' : 'Name (optional)'}
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 bg-white text-slate-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder={isArabic ? 'أدخل اسمك' : 'Enter your name'}
            dir={isArabic ? 'rtl' : 'ltr'}
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
            {isArabic ? 'البريد الإلكتروني *' : 'Email Address *'}
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 bg-white text-slate-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder={isArabic ? 'أدخل بريدك الإلكتروني' : 'Enter your email address'}
            dir="ltr"
          />
        </div>

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full px-6 py-3 bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900 font-semibold rounded-lg hover:brightness-105 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
        >
          {status === 'loading'
            ? (isArabic ? 'جاري الإرسال...' : 'Subscribing...')
            : (isArabic ? 'اشترك في النشرة' : 'Subscribe to Newsletter')}
        </button>

        {message && (
          <div
            className={`p-3 rounded-lg text-center font-medium ${
              status === 'success' ? 'bg-green-100 text-green-800 border border-green-300' : 'bg-red-100 text-red-800 border border-red-300'
            }`}
          >
            {message}
          </div>
        )}
      </form>
    </div>
  );
}
