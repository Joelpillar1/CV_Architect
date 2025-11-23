import React, { useState } from 'react';
import { ResumeData, TemplateType } from '../types';
import { ChevronLeft, Maximize2, Minimize2, Download, User, Briefcase, GraduationCap, Award, Layout as LayoutIcon, Target, CheckCircle } from 'lucide-react';
import FormSection from './FormSection';
import ResumePreview from './ResumePreview';

interface EditorProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
  template: TemplateType;
  onTemplateChange: (template: TemplateType) => void;
  onBack: () => void;
  onSaveAsTemplate: () => void;
}

export type EditorTab = 'personal' | 'education' | 'experience' | 'achievements' | 'design' | 'job-match';

export default function Editor({ data, onChange, template, onTemplateChange, onBack, onSaveAsTemplate }: EditorProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeTab, setActiveTab] = useState<EditorTab>('personal');

  return (
    <div className="flex h-full w-full relative bg-brand-bg">
      {/* Left Panel: Input Tabs & Forms */}
      <div className={`
        bg-white border-r border-brand-border overflow-hidden flex flex-col transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
        ${isFullscreen ? 'w-0 opacity-0 transform -translate-x-10' : 'w-full md:w-1/2 lg:w-5/12'}
        no-print z-10
      `}>
        {/* Navigation Header */}
        <div className="px-6 py-4 border-b border-brand-border bg-white flex items-center justify-between shrink-0">
           <button onClick={onBack} className="flex items-center text-gray-500 hover:text-brand-dark transition-colors gap-2 px-3 py-2 rounded-lg hover:bg-gray-100">
              <ChevronLeft size={18} />
              <span className="font-bold text-sm">Dashboard</span>
           </button>
           <div className="flex items-center gap-3">
             <div className="flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 rounded-full border border-green-100">
               <CheckCircle size={12} />
               <span className="text-[10px] font-bold uppercase tracking-wide">Saved</span>
             </div>
           </div>
        </div>

        {/* Tabs Scroll Area */}
        <div className="px-6 pt-4 pb-0 border-b border-brand-border bg-white overflow-x-auto no-scrollbar">
           <div className="flex space-x-6 min-w-max">
             <TabButton id="personal" label="Personal" icon={<User size={16}/>} active={activeTab === 'personal'} onClick={setActiveTab} />
             <TabButton id="education" label="Edu & Skills" icon={<GraduationCap size={16}/>} active={activeTab === 'education'} onClick={setActiveTab} />
             <TabButton id="experience" label="Experience" icon={<Briefcase size={16}/>} active={activeTab === 'experience'} onClick={setActiveTab} />
             <TabButton id="achievements" label="Achievements" icon={<Award size={16}/>} active={activeTab === 'achievements'} onClick={setActiveTab} />
             <TabButton id="job-match" label="Job Match" icon={<Target size={16}/>} active={activeTab === 'job-match'} onClick={setActiveTab} />
             <div className="w-px h-6 bg-gray-200 self-center mx-2"></div>
             <TabButton id="design" label="Design" icon={<LayoutIcon size={16}/>} active={activeTab === 'design'} onClick={setActiveTab} />
           </div>
        </div>
        
        {/* Form Content Area */}
        <div className="flex-1 overflow-y-auto p-8 pb-32 bg-[#FAFAFA]">
           <FormSection 
              activeTab={activeTab} 
              data={data} 
              onChange={onChange} 
              currentTemplate={template}
              onTemplateChange={onTemplateChange}
              onSaveAsTemplate={onSaveAsTemplate}
            />
        </div>
      </div>

      {/* Right Panel: Real-time Preview */}
      <div className={`
        bg-[#E5E7EB] overflow-y-auto relative flex flex-col items-center transition-all duration-500
        ${isFullscreen ? 'w-full' : 'hidden md:flex md:w-1/2 lg:w-7/12'}
        print-only
      `}>
        {/* Floating Toolbar */}
        <div className="sticky top-6 z-50 bg-brand-dark/90 backdrop-blur-md text-white rounded-full shadow-2xl px-6 py-3 mb-8 flex gap-5 items-center no-print transform hover:scale-105 transition-transform duration-300 border border-white/10">
           <span className="text-[10px] font-bold uppercase tracking-widest text-brand-green">Live Preview</span>
           <div className="w-px h-4 bg-white/20"></div>
           
           <button onClick={() => setIsFullscreen(!isFullscreen)} className="text-white/70 hover:text-white transition-colors" title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}>
             {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
           </button>
           
           <button onClick={() => window.print()} className="text-white/70 hover:text-brand-green transition-colors" title="Download PDF">
             <Download size={18} />
           </button>
        </div>

        {/* Resume Preview Container (Self-paginating) */}
        <div className="w-full flex justify-center pb-20 print:pb-0">
          <ResumePreview data={data} template={template} />
        </div>
      </div>
    </div>
  );
}

const TabButton = ({ id, label, icon, active, onClick }: { id: EditorTab, label: string, icon: React.ReactNode, active: boolean, onClick: (t: EditorTab) => void }) => (
  <button 
    onClick={() => onClick(id)}
    className={`flex items-center gap-2 pb-4 border-b-2 transition-all duration-300 text-sm font-medium ${
      active 
        ? 'border-brand-green text-brand-dark' 
        : 'border-transparent text-gray-400 hover:text-gray-600 hover:border-gray-200'
    }`}
  >
    <span className={active ? 'text-brand-green' : ''}>{icon}</span>
    {label}
  </button>
);