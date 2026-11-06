import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  CheckCircle2, 
  Phone, 
  FileText, 
  ShieldCheck, 
  Printer,
  Send,
  Check
} from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

export const AdmissionsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialTrack = searchParams.get('track') === 'womens' ? 'womens' : 'mens';

  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    applicantType: 'self', // self, family, case_manager, church
    applicantName: '',
    applicantPhone: '',
    applicantEmail: '',
    residentName: '',
    residentPhone: '',
    residentEmail: '',
    genderTrack: initialTrack, // mens, womens
    currentSobrietyDays: '',
    completedTreatment: 'yes',
    treatmentFacility: '',
    targetMoveInDate: '',
    employed: 'seeking',
    legalIssues: 'none',
    referralSource: '',
    personalNote: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
      window.scrollTo({ top: 300, behavior: 'smooth' });
    } else {
      setSubmitted(true);
      window.scrollTo({ top: 200, behavior: 'smooth' });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-16 py-12">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-phoenix-600/20 border border-phoenix-500/30 text-xs font-semibold text-phoenix-400">
          <FileText className="w-4 h-4 text-phoenix-500" />
          <span>Made for More Residence Intake</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Admissions & Resident Application
        </h1>
        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto">
          We welcome direct applicants, family referrals, treatment center case managers, and church partners to submit an online intake form.
        </p>
      </section>

      {/* Main Form & Criteria Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Interactive Intake Form */}
          <div className="lg:col-span-8 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl">
            {submitted ? (
              <div className="text-center py-12 space-y-6">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8" />
                </div>
                <h2 className="text-3xl font-extrabold text-white">Application Received!</h2>
                <p className="text-slate-300 max-w-md mx-auto text-sm leading-relaxed">
                  Thank you for submitting an intake application for the <strong>Made for More ({formData.genderTrack === 'mens' ? "Men's Track" : "Women's Track"})</strong> residence. Our intake coordinator will review this submission and contact you within 24 to 48 hours for a brief phone interview.
                </p>

                {/* Summary Box */}
                <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 text-left max-w-lg mx-auto text-xs space-y-2 text-slate-300">
                  <div className="text-sm font-bold text-white mb-2 pb-2 border-b border-slate-800">
                    Application Summary
                  </div>
                  <div><strong>Applicant:</strong> {formData.applicantName || 'Self'} ({formData.applicantPhone})</div>
                  <div><strong>Track:</strong> Made for More {formData.genderTrack === 'mens' ? "Men's Sober Living" : "Women's Sober Living"}</div>
                  <div><strong>Sobriety:</strong> {formData.currentSobrietyDays} days</div>
                  <div><strong>Target Move-in Date:</strong> {formData.targetMoveInDate || 'Immediate'}</div>
                  {formData.personalNote && (
                    <div className="pt-2 text-slate-400"><em>"{formData.personalNote}"</em></div>
                  )}
                </div>

                <div className="flex flex-wrap justify-center gap-4 pt-4">
                  <button
                    onClick={handlePrint}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print Application Copy</span>
                  </button>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setStep(1);
                    }}
                    className="px-5 py-2.5 rounded-xl bg-phoenix-600 hover:bg-phoenix-500 text-white text-xs font-semibold transition"
                  >
                    Submit Another Application
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleNext} className="space-y-8">
                {/* Stepper Indicator */}
                <div className="flex items-center justify-between pb-6 border-b border-slate-800 text-xs">
                  <div className={`flex items-center gap-2 font-semibold ${step >= 1 ? 'text-phoenix-400' : 'text-slate-500'}`}>
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 1 ? 'bg-phoenix-600 text-white' : 'bg-slate-800 text-slate-400'}`}>1</span>
                    <span>Applicant Info</span>
                  </div>
                  <div className={`h-0.5 flex-1 mx-4 ${step >= 2 ? 'bg-phoenix-600' : 'bg-slate-800'}`}></div>
                  <div className={`flex items-center gap-2 font-semibold ${step >= 2 ? 'text-phoenix-400' : 'text-slate-500'}`}>
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 2 ? 'bg-phoenix-600 text-white' : 'bg-slate-800 text-slate-400'}`}>2</span>
                    <span>Recovery & Track</span>
                  </div>
                  <div className={`h-0.5 flex-1 mx-4 ${step >= 3 ? 'bg-phoenix-600' : 'bg-slate-800'}`}></div>
                  <div className={`flex items-center gap-2 font-semibold ${step >= 3 ? 'text-phoenix-400' : 'text-slate-500'}`}>
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 3 ? 'bg-phoenix-600 text-white' : 'bg-slate-800 text-slate-400'}`}>3</span>
                    <span>Final Review</span>
                  </div>
                </div>

                {/* Step 1: Who is applying? */}
                {step === 1 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-bold text-white mb-1">Step 1: Contact Information</h2>
                      <p className="text-xs text-slate-400">Tell us about yourself and who this inquiry is for.</p>
                    </div>

                    <div className="space-y-3">
                      <label className="block text-xs font-medium text-slate-300">I am submitting this application as:</label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {[
                          { id: 'self', label: 'Myself (Applicant)' },
                          { id: 'family', label: 'Family Member' },
                          { id: 'case_manager', label: 'Case Manager' },
                          { id: 'church', label: 'Pastor / Church' },
                        ].map((item) => (
                          <button
                            type="button"
                            key={item.id}
                            onClick={() => setFormData({ ...formData, applicantType: item.id })}
                            className={`p-3 rounded-xl border text-xs font-semibold text-center transition ${
                              formData.applicantType === item.id
                                ? 'bg-phoenix-600/20 border-phoenix-500 text-white'
                                : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white'
                            }`}
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1">Your Full Name *</label>
                        <input
                          type="text"
                          required
                          name="applicantName"
                          value={formData.applicantName}
                          onChange={handleChange}
                          placeholder="e.g. John Doe"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-phoenix-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1">Phone Number *</label>
                        <input
                          type="tel"
                          required
                          name="applicantPhone"
                          value={formData.applicantPhone}
                          onChange={handleChange}
                          placeholder="(555) 000-0000"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-phoenix-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        name="applicantEmail"
                        value={formData.applicantEmail}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-phoenix-500"
                      />
                    </div>

                    {formData.applicantType !== 'self' && (
                      <div className="pt-2 border-t border-slate-800 space-y-4">
                        <span className="text-xs font-semibold text-amber-400 block">Prospective Resident Details</span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-medium text-slate-300 mb-1">Resident Full Name</label>
                            <input
                              type="text"
                              name="residentName"
                              value={formData.residentName}
                              onChange={handleChange}
                              placeholder="Name of individual seeking sober living"
                              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-phoenix-500"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-slate-300 mb-1">Resident Direct Phone (if available)</label>
                            <input
                              type="tel"
                              name="residentPhone"
                              value={formData.residentPhone}
                              onChange={handleChange}
                              placeholder="(555) 000-0000"
                              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-phoenix-500"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex justify-end pt-4">
                      <button
                        type="submit"
                        className="px-6 py-3 rounded-xl bg-phoenix-600 hover:bg-phoenix-500 text-white font-semibold text-xs tracking-wider uppercase transition"
                      >
                        Continue to Step 2 →
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 2: Recovery & Program Track */}
                {step === 2 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-bold text-white mb-1">Step 2: Recovery History & Housing Track</h2>
                      <p className="text-xs text-slate-400">Specify program track and current sobriety timeline.</p>
                    </div>

                    {/* Track Selection */}
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-2">Select Sober Living Track *</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <label
                          className={`p-4 rounded-2xl border cursor-pointer transition flex items-center justify-between ${
                            formData.genderTrack === 'mens'
                              ? 'bg-phoenix-600/20 border-phoenix-500 text-white'
                              : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              name="genderTrack"
                              value="mens"
                              checked={formData.genderTrack === 'mens'}
                              onChange={handleChange}
                              className="text-phoenix-600 focus:ring-phoenix-500"
                            />
                            <div>
                              <div className="font-bold text-sm">Made for More Men's Track</div>
                              <div className="text-xs text-slate-400">Dedicated men's sober living community</div>
                            </div>
                          </div>
                          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-800 text-phoenix-400">Level II</span>
                        </label>

                        <label
                          className={`p-4 rounded-2xl border cursor-pointer transition flex items-center justify-between ${
                            formData.genderTrack === 'womens'
                              ? 'bg-amber-600/20 border-amber-500 text-white'
                              : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              name="genderTrack"
                              value="womens"
                              checked={formData.genderTrack === 'womens'}
                              onChange={handleChange}
                              className="text-amber-600 focus:ring-amber-500"
                            />
                            <div>
                              <div className="font-bold text-sm">Made for More Women's Track</div>
                              <div className="text-xs text-slate-400">Dedicated women's sober living community</div>
                            </div>
                          </div>
                          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-800 text-amber-400">Level II</span>
                        </label>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1">Current Sobriety (Days / Weeks) *</label>
                        <input
                          type="text"
                          required
                          name="currentSobrietyDays"
                          value={formData.currentSobrietyDays}
                          onChange={handleChange}
                          placeholder="e.g. 14 days, 30 days, or completing detox"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-phoenix-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1">Target Move-in Date *</label>
                        <input
                          type="date"
                          name="targetMoveInDate"
                          value={formData.targetMoveInDate}
                          onChange={handleChange}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-phoenix-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1">Recently Completed Inpatient/IOP?</label>
                        <select
                          name="completedTreatment"
                          value={formData.completedTreatment}
                          onChange={handleChange}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-phoenix-500"
                        >
                          <option value="yes">Yes, currently in or recently completed</option>
                          <option value="no">No inpatient, transferring from outpatient</option>
                          <option value="detox_only">Detox only</option>
                          <option value="other">Other / Self-recovery</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1">Facility Name (if applicable)</label>
                        <input
                          type="text"
                          name="treatmentFacility"
                          value={formData.treatmentFacility}
                          onChange={handleChange}
                          placeholder="Name of center, hospital, or clinic"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-phoenix-500"
                        />
                      </div>
                    </div>

                    <div className="flex justify-between pt-4">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition"
                      >
                        ← Back to Step 1
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-3 rounded-xl bg-phoenix-600 hover:bg-phoenix-500 text-white font-semibold text-xs tracking-wider uppercase transition"
                      >
                        Continue to Step 3 →
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3: Review & Personal Note */}
                {step === 3 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-bold text-white mb-1">Step 3: Background & Personal Statement</h2>
                      <p className="text-xs text-slate-400">Share any additional context or goals for residency.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1">Employment / Income Status</label>
                        <select
                          name="employed"
                          value={formData.employed}
                          onChange={handleChange}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-phoenix-500"
                        >
                          <option value="seeking">Seeking employment (Need flexible job support)</option>
                          <option value="currently_employed">Currently employed full-time or part-time</option>
                          <option value="disability">SSI / SSDI / Disability income</option>
                          <option value="family_supported">Family or sponsor supported</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1">How Did You Hear About Us?</label>
                        <input
                          type="text"
                          name="referralSource"
                          value={formData.referralSource}
                          onChange={handleChange}
                          placeholder="Church, Ohio Recovery Housing, parole/probation, web..."
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-phoenix-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Personal Note / Why You Believe You Are "Made for More"
                      </label>
                      <textarea
                        rows={4}
                        name="personalNote"
                        value={formData.personalNote}
                        onChange={handleChange}
                        placeholder="Tell us a little about your heart for recovery, what challenges you are overcoming, or what you hope to achieve during your stay..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-phoenix-500"
                      />
                    </div>

                    {/* Agreement Check */}
                    <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-3">
                      <ShieldCheck className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                      <div className="text-xs text-slate-300 leading-relaxed">
                        I understand that <strong>Made for More</strong> is an alcohol- and illicit-drug-free Level II sober living residence adhering to NARR Standard 3.0 and Ohio Recovery Housing standards. Admission requires a willingness to participate in peer community, abide by house rules, and undergo random toxicology testing.
                      </div>
                    </div>

                    <div className="flex justify-between pt-4">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition"
                      >
                        ← Back to Step 2
                      </button>
                      <button
                        type="submit"
                        className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-phoenix-600 to-amber-600 hover:from-phoenix-500 hover:to-amber-500 text-white font-bold text-xs tracking-wider uppercase shadow-lg transition"
                      >
                        <Send className="w-4 h-4" />
                        <span>Submit Application Now</span>
                      </button>
                    </div>
                  </div>
                )}
              </form>
            )}
          </div>

          {/* Right Column: Admission Criteria & Guidelines */}
          <div className="lg:col-span-4 space-y-6">
            {/* Criteria Box */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4">
              <div className="flex items-center gap-2.5 text-amber-400">
                <ShieldCheck className="w-5 h-5" />
                <h3 className="text-base font-bold text-white">Residency Eligibility</h3>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Age 18+ with a primary commitment to sobriety</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Substance-free at move-in (detox completed or negative screening)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Willingness to attend 12-step or faith-based recovery meetings</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Participation in house chores and weekly community meetings</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Agreement with the "Earn While You Heal" work/vocational model</span>
                </li>
              </ul>
            </div>

            {/* Assistance / Referral Helpline */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-850 border border-phoenix-500/30 rounded-3xl p-6 space-y-3">
              <h3 className="text-base font-bold text-white">Have Questions First?</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                If you are a case manager coordinating bed availability or a family member with specific questions, call our intake line directly:
              </p>
              <div className="pt-1">
                <a
                  href={`tel:${siteConfig.contact.phone.replace(/[^0-9]/g, '')}`}
                  className="inline-flex items-center gap-2 text-phoenix-400 hover:text-phoenix-300 font-bold text-sm"
                >
                  <Phone className="w-4 h-4" />
                  <span>{siteConfig.contact.phoneFormatted}</span>
                </a>
                <div className="text-[11px] text-slate-400 mt-1">
                  Email: <a href={`mailto:${siteConfig.contact.email}`} className="text-slate-300 underline">{siteConfig.contact.email}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
