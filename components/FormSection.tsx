import React from 'react';
import { ResumeData, Experience, Education } from '../types';
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

interface FormSectionProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

export default function FormSection({ data, onChange }: FormSectionProps) {
  
  const handleChange = (field: keyof ResumeData, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const handleExperienceChange = (index: number, field: keyof Experience, value: string) => {
    const newExp = [...data.experience];
    newExp[index] = { ...newExp[index], [field]: value };
    handleChange('experience', newExp);
  };

  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      company: '',
      role: '',
      startDate: '',
      endDate: '',
      description: ''
    };
    handleChange('experience', [newExp, ...data.experience]);
  };

  const removeExperience = (id: string) => {
    handleChange('experience', data.experience.filter(e => e.id !== id));
  };

  return (
    <div className="space-y-12">
      {/* Personal Info */}
      <section className="animate-fadeIn">
        <div className="flex items-center mb-6">
           <div className="w-1 h-6 bg-brand-green mr-3 rounded-full"></div>
           <h3 className="text-lg font-bold text-brand-dark tracking-tight">Personal Details</h3>
        </div>
        <div className="grid grid-cols-1 gap-6">
          <Input label="Full Name" value={data.fullName} onChange={v => handleChange('fullName', v)} placeholder="e.g. Steve Jobs" />
          <Input label="Job Title" value={data.jobTitle} onChange={v => handleChange('jobTitle', v)} placeholder="e.g. Product Designer" />
          <div className="grid grid-cols-2 gap-6">
            <Input label="Email" value={data.email} onChange={v => handleChange('email', v)} />
            <Input label="Phone" value={data.phone} onChange={v => handleChange('phone', v)} />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <Input label="LinkedIn" value={data.linkedin} onChange={v => handleChange('linkedin', v)} />
            <Input label="Location" value={data.location} onChange={v => handleChange('location', v)} />
          </div>
          <div>
             <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-widest">Professional Summary</label>
             <textarea 
               className="w-full rounded-xl border-gray-200 border bg-brand-bg/50 shadow-sm focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 p-4 text-sm min-h-[120px] transition-all duration-200 outline-none resize-none"
               value={data.summary}
               onChange={e => handleChange('summary', e.target.value)}
               placeholder="Briefly describe your professional background..."
             />
          </div>
        </div>
      </section>

      {/* Experience */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <div className="w-1 h-6 bg-brand-green mr-3 rounded-full"></div>
            <h3 className="text-lg font-bold text-brand-dark tracking-tight">Experience</h3>
          </div>
          <button onClick={addExperience} className="text-brand-green hover:text-brand-greenHover text-sm font-bold flex items-center gap-1 transition-colors bg-brand-green/10 px-3 py-1.5 rounded-lg hover:bg-brand-green/20">
            <Plus size={16} /> Add
          </button>
        </div>
        <div className="space-y-6">
          {data.experience.map((exp, index) => (
            <div key={exp.id} className="bg-white p-6 rounded-2xl border border-brand-border shadow-sm hover:shadow-md transition-all duration-300 relative group">
              <button onClick={() => removeExperience(exp.id)} className="absolute top-4 right-4 text-gray-300 hover:text-red-500 transition-colors p-2">
                <Trash2 size={16} />
              </button>
              <div className="grid grid-cols-1 gap-5">
                <Input label="Company" value={exp.company} onChange={v => handleExperienceChange(index, 'company', v)} />
                <Input label="Role" value={exp.role} onChange={v => handleExperienceChange(index, 'role', v)} />
                <div className="grid grid-cols-2 gap-5">
                  <Input label="Start" placeholder="Jan 2022" value={exp.startDate} onChange={v => handleExperienceChange(index, 'startDate', v)} />
                  <Input label="End" placeholder="Present" value={exp.endDate} onChange={v => handleExperienceChange(index, 'endDate', v)} />
                </div>
                <div>
                   <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-widest">Description</label>
                   <textarea 
                     className="w-full rounded-xl border-gray-200 border bg-brand-bg/50 shadow-sm focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 p-4 text-sm min-h-[100px] transition-all duration-200 outline-none resize-none"
                     value={exp.description}
                     onChange={e => handleExperienceChange(index, 'description', e.target.value)}
                     placeholder="• Achieved X by doing Y..."
                   />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

       {/* Skills & Certs */}
       <section>
        <div className="flex items-center mb-6">
           <div className="w-1 h-6 bg-brand-green mr-3 rounded-full"></div>
           <h3 className="text-lg font-bold text-brand-dark tracking-tight">Skills & Additional</h3>
        </div>
        <div className="space-y-6">
           <div>
             <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-widest">Technical Skills</label>
             <textarea 
               className="w-full rounded-xl border-gray-200 border bg-brand-bg/50 shadow-sm focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 p-4 text-sm transition-all duration-200 outline-none"
               value={data.skills}
               onChange={e => handleChange('skills', e.target.value)}
               placeholder="Java, React, Leadership..."
             />
           </div>
           <div>
             <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-widest">Certifications</label>
             <textarea 
               className="w-full rounded-xl border-gray-200 border bg-brand-bg/50 shadow-sm focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 p-4 text-sm transition-all duration-200 outline-none"
               value={data.certifications}
               onChange={e => handleChange('certifications', e.target.value)}
             />
           </div>
        </div>
      </section>
    </div>
  );
}

const Input = ({ label, value, onChange, placeholder }: { label: string, value: string, onChange: (v: string) => void, placeholder?: string }) => (
  <div>
    <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-widest">{label}</label>
    <input 
      type="text"
      className="w-full rounded-xl border-gray-200 border bg-brand-bg/50 shadow-sm focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 px-4 py-3 text-sm text-brand-dark placeholder-gray-400 transition-all duration-200 outline-none"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
    />
  </div>
);