import React, { useState } from 'react';
import { 
  Heart, 
  Church, 
  Briefcase, 
  CheckCircle2, 
  Send,
  Building2
} from 'lucide-react';

export const PartnerPage: React.FC = () => {
  const [partnerType, setPartnerType] = useState('church');
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    phone: '',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="space-y-20 py-12">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-semibold text-amber-400">
          <Heart className="w-4 h-4 text-amber-500 fill-amber-500/20" />
          <span>Shared Vision & Kingdom Collaboration</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Partner with Life Recovery Society
        </h1>
        <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
          Our vision is to build a replicable, self-sustaining Biblical model of partnership between non-profits, for-profits, churches, government, and communities to rescue addicts and restore families.
        </p>
      </section>

      {/* 4 Partnership Channels */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Channel 1: Churches */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4 hover:border-phoenix-500/40 transition">
            <div className="w-12 h-12 rounded-2xl bg-phoenix-600/20 text-phoenix-400 flex items-center justify-center border border-phoenix-500/30">
              <Church className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Churches & Ministries</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Connect residents with loving spiritual families, provide volunteer mentors, host recovery meetings, and provide home-cooked community dinners.
            </p>
            <ul className="text-xs text-slate-400 space-y-2 pt-2 border-t border-slate-800">
              <li>• Adopt-a-resident spiritual mentorship</li>
              <li>• Welcome Sunday transportation</li>
              <li>• Celebrate Recovery & Bible study partner</li>
            </ul>
          </div>

          {/* Channel 2: Employers */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4 hover:border-amber-500/40 transition">
            <div className="w-12 h-12 rounded-2xl bg-amber-600/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <Briefcase className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Ethical Employers</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Offer flexible employment, trade apprenticeships, and second chances to motivated men and women committed to rebuilding their financial dignity.
            </p>
            <ul className="text-xs text-slate-400 space-y-2 pt-2 border-t border-slate-800">
              <li>• Flexible shifts around recovery meetings</li>
              <li>• Vocational mentorship & skill training</li>
              <li>• Reliable, drug-screened team members</li>
            </ul>
          </div>

          {/* Channel 3: Community & Donors */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4 hover:border-emerald-500/40 transition">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Donors & Sponsors</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Fund initial intake bed scholarships for individuals leaving jail or treatment with zero resources, furnishing rooms, and expanding houses.
            </p>
            <ul className="text-xs text-slate-400 space-y-2 pt-2 border-t border-slate-800">
              <li>• 100% tax-deductible charitable impact</li>
              <li>• Direct resident scholarship assistance</li>
              <li>• Residence capital & furnishings fund</li>
            </ul>
          </div>

          {/* Channel 4: Civic & Treatment Partners */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4 hover:border-blue-500/40 transition">
            <div className="w-12 h-12 rounded-2xl bg-blue-600/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Agencies & Clinics</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Seamlessly bridge inpatient detoxification or outpatient clinical treatment into a certified Level II recovery residence in Ohio.
            </p>
            <ul className="text-xs text-slate-400 space-y-2 pt-2 border-t border-slate-800">
              <li>• NARR Standard 3.0 aligned referral path</li>
              <li>• Direct case manager communication</li>
              <li>• Ohio Recovery Housing compliance</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Giving & Sponsorship Opportunities */}
      <section className="bg-slate-950 py-16 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              Support the Mission
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Resident Bed Scholarships & Sponsorship
            </h2>
            <p className="text-slate-400 text-sm">
              Your financial partnership directly covers move-in costs, drug testing supplies, and initial living expenses while a resident secures employment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-8 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Welcome Kit Sponsor</div>
                <div className="text-3xl font-extrabold text-white mb-2">$75 <span className="text-sm font-normal text-slate-400">one-time</span></div>
                <p className="text-xs text-slate-300 leading-relaxed mb-6">
                  Provides a brand new set of bed linens, towels, toiletries, Bible, recovery workbook, and groceries for an incoming resident.
                </p>
              </div>
              <a
                href="#partner-form"
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold text-center border border-slate-700 block transition"
              >
                Sponsor a Welcome Kit
              </a>
            </div>

            <div className="bg-slate-900/90 border-2 border-phoenix-500/60 rounded-2xl p-8 flex flex-col justify-between relative shadow-xl">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-phoenix-600 text-white text-[10px] font-bold uppercase tracking-wider">
                Most Needed
              </div>
              <div>
                <div className="text-xs font-bold text-phoenix-400 uppercase tracking-wider mb-2">Partial Bed Scholarship</div>
                <div className="text-3xl font-extrabold text-white mb-2">$350 <span className="text-sm font-normal text-slate-400">/ resident</span></div>
                <p className="text-xs text-slate-300 leading-relaxed mb-6">
                  Subsidizes the initial two-week stay for a resident transitioning from detox or incarceration before their first paycheck arrives.
                </p>
              </div>
              <a
                href="#partner-form"
                className="w-full py-2.5 rounded-xl bg-phoenix-600 hover:bg-phoenix-500 text-white text-xs font-bold text-center block shadow transition"
              >
                Sponsor a Partial Scholarship
              </a>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-8 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">Full Monthly Sponsorship</div>
                <div className="text-3xl font-extrabold text-white mb-2">$850 <span className="text-sm font-normal text-slate-400">/ month</span></div>
                <p className="text-xs text-slate-300 leading-relaxed mb-6">
                  Fully funds an entire month of sober living, toxicology testing, peer leadership, and vocational coaching for a resident in need.
                </p>
              </div>
              <a
                href="#partner-form"
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-semibold text-center border border-slate-700 block transition"
              >
                Fund a Full Month Bed
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Partner Inquiry Form */}
      <section id="partner-form" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Connect with Our Partnership Team
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Let us know how your church, business, or family would like to collaborate.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 rounded-2xl bg-emerald-950/40 border border-emerald-900 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h3 className="text-xl font-bold text-white">Thank You for Reaching Out!</h3>
              <p className="text-xs text-slate-300 max-w-md mx-auto">
                We have received your partnership inquiry and will be in touch shortly to discuss next steps.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-2">I Represent a:</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: 'church', label: 'Church / Ministry' },
                    { id: 'employer', label: 'Business / Employer' },
                    { id: 'donor', label: 'Donor / Sponsor' },
                    { id: 'volunteer', label: 'Volunteer / Mentor' },
                  ].map((item) => (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => setPartnerType(item.id)}
                      className={`p-3 rounded-xl border text-xs font-semibold text-center transition ${
                        partnerType === item.id
                          ? 'bg-amber-600/20 border-amber-500 text-white'
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
                  <label className="block text-xs font-medium text-slate-300 mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Pastor / Manager / Individual"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Organization / Church Name</label>
                  <input
                    type="text"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    placeholder="Name of church, company, or ministry"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="partner@example.org"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="(555) 000-0000"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">How Would You Like to Partner?</label>
                <textarea
                  rows={4}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Share details on your church ministry, open job opportunities for residents, or how you wish to support..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-600 to-phoenix-600 hover:from-amber-500 hover:to-phoenix-500 text-white font-bold text-xs tracking-wider uppercase shadow-lg transition"
              >
                <Send className="w-4 h-4" />
                <span>Submit Partnership Inquiry</span>
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
