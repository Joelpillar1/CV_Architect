import React from 'react';

export const Settings = () => {
  return (
    <div className="p-8 md:p-12 max-w-5xl mx-auto bg-brand-bg">
      <h2 className="text-4xl font-bold text-brand-dark tracking-tight mb-10">Settings</h2>
      
      <div className="bg-white shadow-soft rounded-2xl border border-brand-border overflow-hidden mb-8">
        <div className="p-8 border-b border-brand-border">
          <h3 className="text-xl font-bold text-brand-dark">Profile Information</h3>
          <p className="text-sm text-gray-500 mt-1 font-medium">Update your account's profile information and email address.</p>
        </div>
        <div className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div>
               <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-widest">First Name</label>
               <input type="text" className="w-full rounded-xl border-gray-200 border bg-brand-bg/30 px-4 py-3 text-brand-dark focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none transition-all" defaultValue="Abdullahi" />
             </div>
             <div>
               <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-widest">Last Name</label>
               <input type="text" className="w-full rounded-xl border-gray-200 border bg-brand-bg/30 px-4 py-3 text-brand-dark focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none transition-all" defaultValue="Aishat" />
             </div>
          </div>
          <div>
             <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-widest">Email Address</label>
             <input type="email" className="w-full rounded-xl border-gray-200 border bg-brand-bg/30 px-4 py-3 text-brand-dark focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none transition-all" defaultValue="aishataabdullahi595@gmail.com" />
          </div>
          
          <div className="pt-4">
              <button className="bg-brand-dark text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-gray-800 transition-colors shadow-lg">Save Changes</button>
          </div>
        </div>
      </div>

       <div className="bg-white shadow-soft rounded-2xl border border-brand-border overflow-hidden">
        <div className="p-8 border-b border-brand-border">
          <h3 className="text-xl font-bold text-brand-dark">Subscription</h3>
          <p className="text-sm text-gray-500 mt-1 font-medium">Manage your subscription plan and billing methods.</p>
        </div>
        <div className="p-8">
          <div className="flex items-center justify-between p-6 bg-brand-secondary rounded-xl border border-brand-border">
             <div>
               <p className="font-bold text-brand-dark text-lg">Pro Plan</p>
               <p className="text-sm text-gray-500">$12.00/month • Renews on Oct 24, 2025</p>
             </div>
             <button className="text-brand-dark hover:text-brand-green font-bold text-sm transition-colors">Manage billing</button>
          </div>
        </div>
      </div>
    </div>
  );
};