import React, { useState } from 'react';
import { ResumeData, Experience, Education, TemplateType } from '../types';
import { Plus, Trash2, LayoutTemplate, Check, Type as TypeIcon, Sparkles, Loader2, Target, Tag, Bookmark } from 'lucide-react';
import { EditorTab } from './Editor';
import { GoogleGenAI, Type } from "@google/genai";

interface FormSectionProps {
  activeTab: EditorTab;
  data: ResumeData;
  onChange: (data: ResumeData) => void;
  currentTemplate: TemplateType;
  onTemplateChange: (t: TemplateType) => void;
  onSaveAsTemplate: () => void;
}

export default function FormSection({ activeTab, data, onChange, currentTemplate, onTemplateChange, onSaveAsTemplate }: FormSectionProps) {
  const [isOptimizing, setIsOptimizing] = useState(false);
  
  const handleChange = (field: keyof ResumeData, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const handleExperienceChange = (index: number, field: keyof Experience, value: any) => {
    const newExp = [...data.experience];
    newExp[index] = { ...newExp[index], [field]: value };
    handleChange('experience', newExp);
  };
  
  const handleEducationChange = (index: number, field: keyof Education, value: string) => {
      const newEdu = [...data.education];
      newEdu[index] = { ...newEdu[index], [field]: value };
      handleChange('education', newEdu);
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

  const addEducation = () => {
      const newEdu: Education = {
          id: Date.now().toString(),
          school: '',
          degree: '',
          year: ''
      };
      handleChange('education', [newEdu, ...data.education]);
  };

  const removeExperience = (id: string) => {
    handleChange('experience', data.experience.filter(e => e.id !== id));
  };
  
  const removeEducation = (id: string) => {
      handleChange('education', data.education.filter(e => e.id !== id));
  };

  const handleOptimize = async () => {
    if (!data.jobDescription) return;
    
    setIsOptimizing(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const prompt = `
        You are an expert Resume Optimizer and ATS specialist. 
        
        Input Data:
        Current Resume: ${JSON.stringify({
          summary: data.summary,
          experience: data.experience,
          skills: data.skills,
          keyAchievements: data.keyAchievements
        })}
        
        Target Job Description: 
        ${data.jobDescription}

        Task:
        Rewrite the 'summary', 'experience' (description fields), 'skills', and 'keyAchievements' of the resume to maximize the match with the Job Description.
        
        Follow these 7 rules strictly:
        1. Correct any spelling, grammar, or punctuation errors.
        2. Tailor content specifically to the Job Description.
        3. Integrate keywords from the Job Description naturally.
        4. Replace underwhelming statements with impactful ones.
        5. Rewrite the Professional Summary to be keyword-rich, summarizing experience, skills, and achievements relevant to the role.
        6. Start bullet points with strong action verbs (e.g., Achieved, Led, Implemented, Resolved, Increased, Developed, Spearheaded, Generated, Optimized).
        7. Update the Skills section with industry-specific keywords from the Job Description.

        Return the response in strict JSON format. Preserve the original experience IDs.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              summary: { type: Type.STRING },
              skills: { type: Type.STRING },
              keyAchievements: { type: Type.STRING },
              experience: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    company: { type: Type.STRING },
                    role: { type: Type.STRING },
                    startDate: { type: Type.STRING },
                    endDate: { type: Type.STRING },
                    description: { type: Type.STRING },
                  }
                }
              }
            }
          }
        }
      });

      if (response.text) {
        const optimizedData = JSON.parse(response.text);
        
        onChange({
          ...data,
          summary: optimizedData.summary || data.summary,
          skills: optimizedData.skills || data.skills,
          keyAchievements: optimizedData.keyAchievements || data.keyAchievements,
          experience: optimizedData.experience || data.experience,
        });
      }

    } catch (error) {
      console.error("Optimization failed:", error);
      alert("Failed to optimize resume. Please try again.");
    } finally {
      setIsOptimizing(false);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'personal':
        return (
          <div className="space-y-6 animate-fadeIn">
            <div className="mb-6">
               <h2 className="text-2xl font-bold text-brand-dark">Personal Details</h2>
               <p className="text-gray-500 text-sm">The foundation of your professional identity.</p>
            </div>
            <Input label="Full Name" value={data.fullName} onChange={v => handleChange('fullName', v)} placeholder="e.g. Steve Jobs" />
            <Input label="Job Title" value={data.jobTitle} onChange={v => handleChange('jobTitle', v)} placeholder="e.g. Product Designer" />
            <div className="grid grid-cols-2 gap-6">
              <Input label="Email" value={data.email} onChange={v => handleChange('email', v)} />
              <Input label="Phone" value={data.phone} onChange={v => handleChange('phone', v)} />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <Input label="LinkedIn" value={data.linkedin} onChange={v => handleChange('linkedin', v)} placeholder="linkedin.com/in/username" />
              <Input label="@ Handle (Optional)" value={data.atHandle || ''} onChange={v => handleChange('atHandle', v)} placeholder="@username"/>
            </div>
            <div>
               <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-widest">Professional Summary</label>
               <textarea 
                 className="w-full rounded-xl border-gray-200 border bg-white shadow-sm focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 p-4 text-sm min-h-[140px] transition-all duration-200 outline-none resize-none"
                 value={data.summary}
                 onChange={e => handleChange('summary', e.target.value)}
                 placeholder="Briefly describe your professional background..."
               />
            </div>
          </div>
        );

      case 'experience':
        return (
          <div className="space-y-6 animate-fadeIn">
             <div className="flex justify-between items-center mb-6">
              <div>
                 <h2 className="text-2xl font-bold text-brand-dark">Experience</h2>
                 <p className="text-gray-500 text-sm">Your professional journey.</p>
              </div>
              <button onClick={addExperience} className="text-brand-green hover:text-brand-greenHover text-sm font-bold flex items-center gap-1 transition-colors bg-brand-green/10 px-4 py-2 rounded-lg hover:bg-brand-green/20">
                <Plus size={16} /> Add Role
              </button>
            </div>
            {data.experience.map((exp, index) => (
              <div key={exp.id} className="bg-white p-6 rounded-2xl border border-brand-border shadow-sm hover:shadow-md transition-all duration-300 relative group">
                <button onClick={() => removeExperience(exp.id)} className="absolute top-4 right-4 text-gray-300 hover:text-red-500 transition-colors p-2">
                  <Trash2 size={16} />
                </button>
                <div className="grid grid-cols-1 gap-5">
                  <Input label="Company" value={exp.company} onChange={v => handleExperienceChange(index, 'company', v)} />
                  <Input label="Role" value={exp.role} onChange={v => handleExperienceChange(index, 'role', v)} />
                  <div className="grid grid-cols-2 gap-5">
                    <MonthInput label="Start Date" value={exp.startDate} onChange={v => handleExperienceChange(index, 'startDate', v)} />
                    <MonthInput label="End Date" value={exp.endDate} onChange={v => handleExperienceChange(index, 'endDate', v)} disabled={exp.endDate === 'Present'} />
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id={`current-${exp.id}`}
                      checked={exp.endDate === 'Present'}
                      onChange={(e) => {
                        const newEndDate = e.target.checked ? 'Present' : '';
                        handleExperienceChange(index, 'endDate', newEndDate);
                      }}
                      className="h-4 w-4 rounded border-gray-300 text-brand-green focus:ring-brand-green"
                    />
                    <label htmlFor={`current-${exp.id}`} className="ml-2 block text-sm text-gray-700">
                      I currently work here
                    </label>
                  </div>
                  <div>
                     <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-widest">Description</label>
                     <textarea 
                       className="w-full rounded-xl border-gray-200 border bg-gray-50/50 shadow-sm focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 p-4 text-sm min-h-[100px] transition-all duration-200 outline-none resize-none"
                       value={exp.description}
                       onChange={e => handleExperienceChange(index, 'description', e.target.value)}
                       placeholder="• Achieved X by doing Y..."
                     />
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'education':
        return (
          <div className="space-y-8 animate-fadeIn">
             <div className="flex justify-between items-center">
                <div>
                   <h2 className="text-2xl font-bold text-brand-dark">Education</h2>
                   <p className="text-gray-500 text-sm">Academic background.</p>
                </div>
                <button onClick={addEducation} className="text-brand-green hover:text-brand-greenHover text-sm font-bold flex items-center gap-1 transition-colors bg-brand-green/10 px-4 py-2 rounded-lg hover:bg-brand-green/20">
                  <Plus size={16} /> Add School
                </button>
             </div>
             <div className="space-y-6">
                 {data.education.map((edu, index) => (
                    <div key={edu.id} className="bg-white p-6 rounded-2xl border border-brand-border shadow-sm hover:shadow-md transition-all duration-300 relative group">
                        <button onClick={() => removeEducation(edu.id)} className="absolute top-4 right-4 text-gray-300 hover:text-red-500 transition-colors p-2">
                          <Trash2 size={16} />
                        </button>
                        <div className="grid grid-cols-1 gap-5">
                            <Input label="School / University" value={edu.school} onChange={v => handleEducationChange(index, 'school', v)} />
                            <Input label="Degree / Major" value={edu.degree} onChange={v => handleEducationChange(index, 'degree', v)} />
                            <Input label="Graduation Year" value={edu.year} onChange={v => handleEducationChange(index, 'year', v)} placeholder="2019" />
                        </div>
                    </div>
                 ))}
             </div>

             <div className="pt-6 border-t border-gray-200">
                 <div className="mb-6">
                     <h2 className="text-xl font-bold text-brand-dark">Skills & Certifications</h2>
                     <p className="text-gray-500 text-sm">Showcase your toolkit.</p>
                 </div>
                 <div className="space-y-6">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-widest">Technical Skills</label>
                        <textarea 
                        className="w-full rounded-xl border-gray-200 border bg-white shadow-sm focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 p-4 text-sm transition-all duration-200 outline-none min-h-[100px]"
                        value={data.skills}
                        onChange={e => handleChange('skills', e.target.value)}
                        placeholder="Java, React, Leadership, Public Speaking..."
                        />
                        <p className="text-xs text-gray-400 mt-2">Separate skills with commas.</p>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-widest">Certifications</label>
                        <textarea 
                        className="w-full rounded-xl border-gray-200 border bg-white shadow-sm focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 p-4 text-sm transition-all duration-200 outline-none min-h-[80px]"
                        value={data.certifications}
                        onChange={e => handleChange('certifications', e.target.value)}
                        />
                    </div>
                 </div>
             </div>
          </div>
        );
      
      case 'achievements':
        return (
          <div className="space-y-6 animate-fadeIn">
             <div className="mb-6">
               <h2 className="text-2xl font-bold text-brand-dark">Key Achievements</h2>
               <p className="text-gray-500 text-sm">Stand out with quantifiable successes.</p>
             </div>
             <div>
               <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-widest">Key Achievements</label>
               <div className="relative">
                 <textarea 
                   className="w-full rounded-xl border-gray-200 border bg-white shadow-sm focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 p-6 text-sm min-h-[300px] transition-all duration-200 outline-none leading-relaxed"
                   value={data.keyAchievements || ''}
                   onChange={e => handleChange('keyAchievements', e.target.value)}
                   placeholder="• Built and managed partnership pipelines that consistently drove trading activity...&#10;• Strengthened brand visibility by...&#10;• Drove affiliate growth..."
                 />
                 <div className="absolute top-4 right-4 text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded border border-gray-100">Markdown Supported</div>
               </div>
             </div>
             <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-sm text-blue-800">
               <strong>Tip:</strong> Use bullet points (•) to separate achievements. Focus on numbers (%, $) to make impact clear.
             </div>
          </div>
        );

      case 'design':
        const templates: { id: TemplateType; name: string }[] = [
            { id: 'vanguard', name: 'The Vanguard' },
        ];

        const fonts = [
           { name: 'Helvetica', value: 'Helvetica, Arial, sans-serif' },
           { name: 'Georgia', value: 'Georgia, serif' },
           { name: 'Cambria', value: 'Cambria, Georgia, serif' },
           { name: 'Arial', value: 'Arial, Helvetica, sans-serif' },
           { name: 'Calibri', value: '"Calibri", "Segoe UI", sans-serif' },
           { name: 'Times New Roman', value: '"Times New Roman", Times, serif' },
        ];

        return (
            <div className="space-y-8 animate-fadeIn pb-20">
                 <div>
                   <h2 className="text-2xl font-bold text-brand-dark mb-1">Design & Layout</h2>
                   <p className="text-gray-500 text-sm">Customize the visual language of your resume.</p>
                 </div>
                 
                 <div>
                   <h3 className="font-bold text-sm text-gray-900 mb-4 uppercase tracking-wider flex items-center gap-2">
                      <LayoutTemplate size={16} /> Template Structure
                   </h3>
                   <div className="grid grid-cols-1 gap-3">
                       {templates.map((t) => (
                           <button
                             key={t.id}
                             onClick={() => onTemplateChange(t.id)}
                             className={`flex items-center p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                                 currentTemplate === t.id 
                                 ? 'border-brand-green bg-green-50/30 shadow-md' 
                                 : 'border-gray-100 bg-white hover:border-gray-200 hover:bg-gray-50'
                             }`}
                           >
                               <div className={`w-10 h-10 rounded-lg mr-4 flex items-center justify-center transition-colors ${currentTemplate === t.id ? 'bg-brand-green text-brand-dark' : 'bg-gray-100 text-gray-400'}`}>
                                   <LayoutTemplate size={20} />
                               </div>
                               <div className="flex-1">
                                   <div className="font-bold text-sm text-brand-dark">{t.name}</div>
                               </div>
                               {currentTemplate === t.id && <Check size={20} className="text-brand-green" />}
                           </button>
                       ))}
                   </div>
                 </div>
                 
                 <div className="pt-6 border-t border-gray-200">
                     <h3 className="font-bold text-sm text-gray-900 mb-4 uppercase tracking-wider flex items-center gap-2">
                       <TypeIcon size={16} /> Typography
                     </h3>
                     
                     <div className="space-y-6">
                        <div>
                          <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-widest">Font Family</label>
                          <div className="grid grid-cols-2 gap-3">
                            {fonts.map((f) => (
                               <button 
                                 key={f.name}
                                 onClick={() => handleChange('font', f.value)}
                                 className={`px-4 py-3 rounded-lg border text-sm text-left transition-all ${
                                    data.font === f.value 
                                    ? 'border-brand-green bg-brand-green/10 text-brand-dark ring-1 ring-brand-green' 
                                    : 'border-gray-200 bg-white hover:bg-gray-50 text-gray-600'
                                 }`}
                                 style={{ fontFamily: f.value }}
                               >
                                 {f.name}
                               </button>
                            ))}
                          </div>
                        </div>

                        <div>
                           <div className="flex justify-between items-center mb-2">
                             <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest">Font Size</label>
                             <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded text-gray-600">{data.fontSize}pt</span>
                           </div>
                           <input 
                             type="range" 
                             min="10" 
                             max="16" 
                             step="0.5"
                             value={data.fontSize || 12.5}
                             onChange={(e) => handleChange('fontSize', parseFloat(e.target.value))}
                             className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-green"
                           />
                           <div className="flex justify-between mt-1 text-[10px] text-gray-400 font-medium uppercase tracking-widest">
                             <span>Compact</span>
                             <span>Readable</span>
                             <span>Large</span>
                           </div>
                        </div>
                     </div>
                 </div>

                 <div className="pt-6 border-t border-gray-200">
                     <h3 className="font-bold text-sm text-gray-900 mb-4 uppercase tracking-wider flex items-center gap-2">
                       <Tag size={16} /> Save & Tag
                     </h3>
                     <div className="bg-white p-6 rounded-2xl border border-brand-border shadow-sm">
                        <Input 
                            label="Template Tag" 
                            value={data.currentTag || ''} 
                            onChange={v => handleChange('currentTag', v)} 
                            placeholder="e.g. For Senior Roles"
                        />
                        <p className="text-xs text-gray-400 mt-2 mb-4">Add a tag to easily identify this version in "My Templates".</p>
                        <button 
                            onClick={onSaveAsTemplate}
                            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold shadow-lg transition-all duration-300 bg-brand-dark text-white hover:bg-gray-800"
                        >
                            <Bookmark size={16} /> Save as New Template
                        </button>
                     </div>
                 </div>
            </div>
        );

      case 'job-match':
        return (
           <div className="space-y-6 animate-fadeIn">
             <div className="mb-6">
               <h2 className="text-2xl font-bold text-brand-dark">Job Match Optimization</h2>
               <p className="text-gray-500 text-sm">Paste the job description below. Our AI will reconstruct your resume to perfectly align with the requirements.</p>
             </div>
             
             <div>
                <label className="block text-xs font-bold text-brand-dark mb-2 uppercase tracking-widest">Target Job Description</label>
                <textarea 
                  className="w-full rounded-xl border-gray-200 border bg-white shadow-sm focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 p-4 text-sm min-h-[200px] transition-all duration-200 outline-none"
                  value={data.jobDescription || ''}
                  onChange={e => handleChange('jobDescription', e.target.value)}
                  placeholder="Paste the full job description here..."
                />
             </div>

             <div className="flex items-center justify-end">
                 <button 
                   onClick={handleOptimize}
                   disabled={!data.jobDescription || isOptimizing}
                   className={`
                     flex items-center gap-2 px-6 py-3 rounded-xl font-bold shadow-lg transition-all duration-300
                     ${!data.jobDescription || isOptimizing 
                       ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                       : 'bg-brand-green hover:bg-brand-greenHover text-brand-dark hover:shadow-xl hover:-translate-y-1'}
                   `}
                 >
                   {isOptimizing ? <Loader2 size={18} className="animate-spin"/> : <Sparkles size={18} />}
                   {isOptimizing ? 'Optimizing...' : 'Analyze & Optimize Resume'}
                 </button>
             </div>

             <div className="bg-white rounded-xl border border-brand-border p-6 shadow-sm animate-fadeIn">
                 <h3 className="font-bold text-brand-dark mb-4 flex items-center gap-2">
                   <Target size={18} className="text-brand-green" />
                   Optimization Protocol
                 </h3>
                 <ul className="space-y-3 text-sm text-gray-600">
                    {[
                      "Corrects spelling, grammar, and punctuation.",
                      "Tailors professional summary to the specific role.",
                      "Injects high-value keywords from the job description.",
                      "Upgrades weak verbs to powerful action words (e.g., Spearheaded).",
                      "Matches skills section to industry requirements."
                    ].map((rule, i) => (
                      <li key={i} className="flex items-start gap-2">
                         <Check size={14} className="text-brand-green mt-0.5 shrink-0" />
                         <span>{rule}</span>
                      </li>
                    ))}
                 </ul>
             </div>
           </div>
        );

      default:
        return null;
    }
  };

  return renderContent();
}

const Input = ({ label, value, onChange, placeholder, type = 'text', disabled = false }: { label: string, value: string, onChange: (v: string) => void, placeholder?: string, type?: string, disabled?: boolean }) => (
  <div>
    <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-widest">{label}</label>
    <input 
      type={type}
      className="w-full rounded-xl border-gray-200 border bg-white shadow-sm focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 px-4 py-3 text-sm text-brand-dark placeholder-gray-400 transition-all duration-200 outline-none disabled:bg-gray-100 disabled:text-gray-400"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
    />
  </div>
);

const MonthInput = ({ label, value, onChange, disabled = false }: { label: string, value: string, onChange: (v: string) => void, disabled?: boolean }) => (
    <div>
      <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-widest">{label}</label>
      <input 
        type="month"
        className="w-full rounded-xl border-gray-200 border bg-white shadow-sm focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 px-4 py-3 text-sm text-brand-dark placeholder-gray-400 transition-all duration-200 outline-none disabled:bg-gray-100 disabled:text-gray-400"
        value={value === 'Present' ? '' : value}
        onChange={e => onChange(e.target.value)}
        disabled={disabled}
      />
    </div>
);