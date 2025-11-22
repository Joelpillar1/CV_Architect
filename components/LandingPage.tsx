import React from 'react';
import { LayoutTemplate, ArrowRight, Check, Star } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

const HighlightTag = ({ text, className = '' }: { text: string; className?: string }) => (
  <div className={`inline-block bg-brand-green/80 px-2 py-0.5 relative z-10 shadow-sm ${className}`}>
    <span className="text-xs font-bold uppercase tracking-wider text-brand-dark">{text}</span>
  </div>
);

const YesItem = ({ text }: { text: string }) => (
  <div className="flex items-center gap-4 text-lg text-gray-800 border-b border-gray-100 py-3">
    <div className="bg-brand-dark text-white rounded-full w-6 h-6 flex items-center justify-center shrink-0">
      <Check size={16} />
    </div>
    <span className="flex-1 font-medium">{text}</span>
    <span className="bg-yellow-300 text-yellow-800 text-xs font-bold px-2 py-1 rounded-md transform rotate-3">YES!</span>
  </div>
);

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-white font-sans text-brand-dark leading-relaxed">
      
      {/* 1. Navbar */}
      <nav className="w-full bg-white/90 backdrop-blur-md py-5 px-6 md:px-10 flex justify-between items-center max-w-7xl mx-auto border-b border-gray-100 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-dark rounded-lg flex items-center justify-center">
            <LayoutTemplate className="w-4 h-4 text-brand-green" />
          </div>
          <span className="text-xl font-bold tracking-tight">CV Architect</span>
        </div>
        <div className="flex items-center gap-6">
           <a href="#features" className="text-sm font-medium hover:underline text-gray-600">Features</a>
           <a href="#pricing" className="text-sm font-medium hover:underline text-gray-600">Pricing</a>
           <button onClick={onGetStarted} className="text-sm font-medium hover:underline text-gray-600">Sign in</button>
           <button onClick={onGetStarted} className="bg-brand-green hover:bg-brand-greenHover text-brand-dark px-5 py-2.5 rounded-full font-bold text-sm transition-all shadow-sm">
             Sign up free
           </button>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <header className="pt-20 pb-24 px-6 text-center max-w-5xl mx-auto">
        <div className="mx-auto mb-12 w-full max-w-xl">
          <div className="aspect-video bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-center relative p-8">
            <span className="text-gray-400 font-medium text-sm">[Illustration: Resume Chaos vs. Calm]</span>
            <div className="absolute -top-4 -left-4 text-center">
              <p className="text-sm font-bold">DID I USE THE RIGHT KEYWORDS?</p>
            </div>
            <div className="absolute -bottom-4 -right-4 text-center">
               <p className="text-sm font-bold">IS THE FORMATTING RIGHT?</p>
            </div>
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight text-brand-dark">
          Wrestling with resumes?
        </h1>
        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-8 leading-tight text-brand-dark">
          It doesn't have to be this hard.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 text-left text-lg text-gray-700 max-w-4xl mx-auto mt-12">
          <div>
            <p className="mb-4">
              There are lots of ways to write a CV. And there's plenty of software promising to help. You’ve probably tried some. Yet, here you are.
            </p>
            <p>
              Unfortunately, most resume builders are either overwhelming, inadequate, bewildering, or chaotic. You know?
            </p>
          </div>
          <div>
            <p className="mb-4">
              CV Architect is famously <strong>no-nonsense, effective, and reliable.</strong> It's designed for professionals who need to get noticed. Over 30 pages of testimonials detail how things run better on CV Architect.
            </p>
            <p>
              So, we invite you to poke around, watch the video below, and <button onClick={onGetStarted} className="text-brand-dark underline font-bold">try CV Architect for free</button>. We'd be honored to have you as a customer. Thank you.
            </p>
          </div>
        </div>
      </header>

      {/* 3. Walkthrough Section */}
      <section className="py-24 px-6 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
           <HighlightTag text="Hit play to see how CV Architect is different" className="transform -rotate-2 mb-4" />
           <div className="w-full aspect-video bg-gray-100 rounded-xl border border-gray-200 flex items-center justify-center mb-20">
              <span className="text-gray-400 font-medium">[ Video Walkthrough Placeholder ]</span>
           </div>
           
           <h2 className="text-4xl font-bold mb-4 text-brand-dark">Let’s walk through it.</h2>
           <h3 className="text-2xl font-bold mb-6 text-brand-dark">10 seconds after you sign up, clarity sets in.</h3>
           <p className="text-lg text-gray-600 max-w-3xl mb-12">
             The home screen organizes your resumes, templates, and job targets in one place. It’s your calm, comfortable, simple starting point every morning.
           </p>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
             <div>
               <HighlightTag text="What's my week look like?" />
               <div className="mt-2 w-full aspect-square bg-gray-50 border border-gray-200 rounded-lg p-4 flex justify-center items-center">
                  <span className="text-gray-300 text-sm">[Calendar View]</span>
               </div>
             </div>
             <div>
               <HighlightTag text="Which projects am I on?" />
                <div className="mt-2 w-full aspect-square bg-gray-50 border border-gray-200 rounded-lg p-4 flex justify-center items-center">
                  <span className="text-gray-300 text-sm">[Dashboard View]</span>
               </div>
             </div>
           </div>
           <p className="text-lg text-gray-600 mt-12">
            Each person gets their own home screen... They'll only see their own assignments and events. And you can keep important projects close at hand by pinning them to the top.
           </p>
        </div>
      </section>

      {/* 4. Feature Sections */}
      <section id="features" className="py-24 px-6 space-y-24 border-t border-gray-100 max-w-6xl mx-auto">
        {/* Templates */}
        <div>
          <h2 className="text-3xl font-bold mb-4">Templates get you started — and keep your content — organized.</h2>
          <p className="text-lg text-gray-600 mb-12">A template is where your skills, history, and achievements are organized. CV Architect holds everything together in one tidy, predictably structured place.</p>
          <HighlightTag text="A template page organizes everything" />
          <div className="mt-2 w-full aspect-[16/10] bg-gray-50 border border-gray-200 rounded-lg p-4 flex items-center justify-center">
            <span className="text-gray-400">[ Template Gallery Screenshot ]</span>
          </div>
        </div>

        {/* AI Analysis */}
        <div>
          <h2 className="text-3xl font-bold mb-4">AI gives you confidence to hold your resume accountable.</h2>
          <p className="text-lg text-gray-600 mb-12">CV Architect’s AI reports aren't abstract scores — they're real, actionable feedback on how well your resume matches a job description.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <HighlightTag text="What's missing?" />
              <div className="mt-2 w-full aspect-square bg-gray-50 border border-gray-200 rounded-lg p-4 flex items-center justify-center"><span className="text-gray-300 text-sm">[Missing Keywords]</span></div>
            </div>
            <div>
              <HighlightTag text="What's actually happening?" />
              <div className="mt-2 w-full aspect-square bg-gray-50 border border-gray-200 rounded-lg p-4 flex items-center justify-center"><span className="text-gray-300 text-sm">[ATS Match Score]</span></div>
            </div>
          </div>
        </div>

        {/* Live Preview */}
        <div>
          <h2 className="text-3xl font-bold mb-4">Visualizations are for seeing, not squinting.</h2>
          <p className="text-lg text-gray-600 mb-12">The Live Preview and Page Break tools help you clearly see where your resume really stands. Notice progress at a glance, know reality in an instant.</p>
          <HighlightTag text="How far along are we?" />
          <div className="mt-2 w-full aspect-[16/7] bg-gray-50 border border-gray-200 rounded-lg p-4 flex items-center justify-center">
            <span className="text-gray-400">[Live Preview Screenshot]</span>
          </div>
        </div>
      </section>

      {/* 5. "The answer is YES!" Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
           <h2 className="text-4xl font-extrabold mb-6 text-brand-dark">The answer is <span className="bg-brand-green px-2 text-brand-dark transform -rotate-1 inline-block">YES!</span></h2>
           <p className="text-xl text-gray-600 mb-12">Can software be simple, straightforward, and easy, yet powerfully full-featured? With CV Architect the answer is absolutely YES!</p>
           <div className="space-y-3">
              <YesItem text="Can I prevent my resume from being rejected by ATS?" />
              <YesItem text="Can I link up notes from Google Docs or Notion?" />
              <YesItem text="Can I see my entire resume on a single screen?" />
              <YesItem text="Can I create unlimited versions for different jobs?" />
              <YesItem text="Can I change my template with a single click?" />
              <YesItem text="Can I download a pixel-perfect PDF every time?" />
              <YesItem text="Can I see exactly how my resume will break across pages?" />
              <YesItem text="Can I easily reference an old version from a year ago?" />
              <YesItem text="Can I use AI to improve my bullet points?" />
              <YesItem text="Can I keep all my job application assets in one place?" />
           </div>
        </div>
      </section>

      {/* 6. Final CTA / Pricing */}
      <section id="pricing" className="py-32 px-6 bg-white border-t border-gray-100 text-center">
         <h2 className="text-4xl font-bold mb-6 text-brand-dark">Give CV Architect a try.</h2>
         <p className="text-xl text-gray-500 mb-10 max-w-xl mx-auto">See for yourself. It’s free to sign up and get started. No credit card up front. It takes 60 seconds.</p>
         <button 
           onClick={onGetStarted}
           className="bg-brand-green hover:bg-brand-greenHover text-brand-dark px-10 py-4 rounded-full font-bold text-xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all"
         >
           Give CV Architect a try
         </button>
         <p className="text-sm text-gray-400 mt-4">Join 10,000+ professionals who got hired faster.</p>
      </section>

      {/* 7. Footer */}
      <footer className="bg-gray-50 py-16 px-6 text-sm text-gray-500">
         <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8">
            <div>
                <h4 className="font-bold text-brand-dark mb-4">Product</h4>
                <ul className="space-y-3">
                    <li><a href="#" className="hover:underline">Tour</a></li>
                    <li><a href="#" className="hover:underline">Pricing</a></li>
                    <li><a href="#" className="hover:underline">Templates</a></li>
                    <li><a href="#" className="hover:underline">Security</a></li>
                </ul>
            </div>
            <div>
                <h4 className="font-bold text-brand-dark mb-4">Company</h4>
                <ul className="space-y-3">
                    <li><a href="#" className="hover:underline">About</a></li>
                    <li><a href="#" className="hover:underline">Blog</a></li>
                    <li><a href="#" className="hover:underline">Jobs</a></li>
                </ul>
            </div>
            <div>
                <h4 className="font-bold text-brand-dark mb-4">Resources</h4>
                <ul className="space-y-3">
                    <li><a href="#" className="hover:underline">Help Center</a></li>
                    <li><a href="#" className="hover:underline">Contact Us</a></li>
                    <li><a href="#" className="hover:underline">Guides</a></li>
                </ul>
            </div>
            <div>
                <h4 className="font-bold text-brand-dark mb-4">Legal</h4>
                <ul className="space-y-3">
                    <li><a href="#" className="hover:underline">Privacy</a></li>
                    <li><a href="#" className="hover:underline">Terms</a></li>
                </ul>
            </div>
             <div>
                <h4 className="font-bold text-brand-dark mb-4">Connect</h4>
                <ul className="space-y-3">
                    <li><a href="#" className="hover:underline">Twitter</a></li>
                    <li><a href="#" className="hover:underline">LinkedIn</a></li>
                </ul>
            </div>
         </div>
         <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-200 text-center text-xs">
            &copy; 2025 CV Architect, LLC. All rights reserved.
         </div>
      </footer>
    </div>
  );
}