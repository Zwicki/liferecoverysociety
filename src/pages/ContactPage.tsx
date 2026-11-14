import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  ShieldAlert, 
  Send, 
  CheckCircle2,
  ExternalLink,
  Globe
} from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'general',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="space-y-16 py-12">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-300">
          <Phone className="w-4 h-4 text-phoenix-500" />
          <span>Get in Touch</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Contact Life Recovery Society
        </h1>
        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto">
          Reach out with questions about Made for More sober living, resident admissions, church partnerships, or general inquiries.
        </p>
      </section>

      {/* Main Grid: Contact Form + Organization Details */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-xl">
            <h2 className="text-2xl font-bold text-white mb-2">Send Us a Direct Message</h2>
            <p className="text-xs text-slate-400 mb-6">
              Our team usually responds within 24 hours on business days.
            </p>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-emerald-950/40 border border-emerald-900 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h3 className="text-xl font-bold text-white">Message Sent Successfully!</h3>
                <p className="text-xs text-slate-300 max-w-md mx-auto">
                  Thank you for reaching out to Life Recovery Society. A member of our leadership or intake team will contact you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-phoenix-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="jane@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-phoenix-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="(555) 000-0000"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-phoenix-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Subject</label>
                    <select
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-phoenix-500"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="admissions">Resident Admissions / Bed Availability</option>
                      <option value="partnership">Church / Business Partnership</option>
                      <option value="donation">Donations & Sponsorship</option>
                      <option value="volunteer">Volunteering / Mentorship</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Message *</label>
                  <textarea
                    rows={5}
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="How can we assist you today?..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-phoenix-500"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-phoenix-600 hover:bg-phoenix-500 text-white font-semibold text-xs tracking-wider uppercase transition shadow-lg"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Info & Helplines */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5">
              <h3 className="text-xl font-bold text-white">Direct Contacts</h3>
              
              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-phoenix-600/20 text-phoenix-400 border border-phoenix-500/30">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-medium">Email Inquiries</div>
                    <a href={`mailto:${siteConfig.contact.email}`} className="text-white font-semibold hover:text-phoenix-400 transition">
                      {siteConfig.contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-amber-600/20 text-amber-400 border border-amber-500/30">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-medium">Toll-Free Phone</div>
                    <a href={`tel:${siteConfig.contact.phone.replace(/[^0-9]/g, '')}`} className="text-white font-semibold hover:text-amber-400 transition">
                      {siteConfig.contact.phoneFormatted}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-medium">Service Region</div>
                    <div className="text-white font-semibold">Chillicothe & Ross County, Ohio</div>
                    <div className="text-xs text-slate-400 mt-0.5">Physical residence address provided upon approved admission interview</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Chillicothe & Ross County Community Resources Directory */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-850 border border-amber-500/40 rounded-3xl p-6 sm:p-8 space-y-4 shadow-lg">
              <div className="flex items-center gap-2.5 text-amber-400">
                <Globe className="w-6 h-6 text-amber-400" />
                <h3 className="text-lg font-bold text-white">Local Community Resources</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Looking for food assistance, healthcare clinics, housing support, emergency shelters, or family services in Chillicothe and Ross County?
              </p>
              
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                <div className="text-sm font-bold text-white flex items-center justify-between">
                  <span>Chillicothe Community Resources</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">Ross County Directory</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {siteConfig.communityResources.description}
                </p>
                <div className="pt-2">
                  <a
                    href={siteConfig.communityResources.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-phoenix-600 hover:from-amber-500 hover:to-phoenix-500 text-white font-bold text-xs shadow transition"
                  >
                    <span>Visit chillicothecommunityresources.com</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* 24/7 Crisis Hotline Card */}
            <div className="bg-gradient-to-br from-red-950/70 to-slate-950 border border-red-900/80 rounded-3xl p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2.5 text-red-400">
                <ShieldAlert className="w-6 h-6" />
                <h3 className="text-lg font-bold text-white">Immediate 24/7 Crisis Resources</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                If you or someone you know is in immediate mental health crisis, experiencing severe withdrawal symptoms, or feeling suicidal, please contact emergency support immediately:
              </p>
              
              <div className="space-y-2.5 text-xs text-slate-200">
                <div className="p-3 rounded-xl bg-slate-950/80 border border-red-900/50">
                  <strong className="text-white block text-sm">988 Suicide & Crisis Lifeline</strong>
                  <span>Call or text <strong>988</strong> free and confidential 24/7</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/80 border border-red-900/50">
                  <strong className="text-white block text-sm">Ohio CareLine</strong>
                  <span>Call <strong>1-800-720-9616</strong> (24/7 emotional support from OhioMHAS)</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/80 border border-red-900/50">
                  <strong className="text-white block text-sm">Crisis Text Line</strong>
                  <span>Text <strong>HOME</strong> to <strong>741741</strong></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
