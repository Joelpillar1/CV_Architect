import React, { useState } from 'react';
import { ResumeData, TemplateType } from '../types';
import { ChevronLeft, Maximize2, Minimize2, Download, Printer } from 'lucide-react';
import FormSection from './FormSection';
import ResumePreview from './ResumePreview';

interface EditorProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
  template: TemplateType;
  onBack: () => void;
}

export default function Editor({ data, onChange, template, onBack }: EditorProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <div className="flex h-full relative bg-brand-bg">
      {/* Left Panel: Input Forms */}
      <div className={`
        bg-white border-r border-brand-border overflow-y-auto transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
        ${isFullscreen ? 'w-0 opacity-0 overflow-hidden transform -translate-x-10' : 'w-full md:w-1/2 lg:w-5/12'}
        no-print z-10
      `}>
        <div className="px-8 py-6 sticky top-0 bg-white/80 backdrop-blur-xl z-10 border-b border-brand-border flex items-center justify-between">
          <button onClick={onBack} className="flex items-center text-gray-500 hover:text-brand-dark transition-colors group">
            <div className="bg-brand-secondary p-2 rounded-full mr-3 group-hover:bg-gray-200 transition-colors">
              <ChevronLeft size={16} />
            </div>
            <span className="text-sm font-semibold">Back</span>
          </button>
          <div className="flex items-center gap-2">
             <div className="w-2 h-2 bg-brand-green rounded-full animate-pulse"></div>
             <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Auto-saving</div>
          </div>
        </div>
        
        <div className="p-8 pb-32">
           <div className="mb-8">
             <h2 className="text-2xl font-bold text-brand-dark mb-2">Edit Content</h2>
             <p className="text-gray-500 text-sm">Refine the details that define your career.</p>
           </div>
           <FormSection data={data} onChange={onChange} />
        </div>
      </div>

      {/* Right Panel: Real-time Preview */}
      <div className={`
        bg-brand-secondary overflow-y-auto relative flex flex-col items-center transition-all duration-500
        ${isFullscreen ? 'w-full' : 'hidden md:flex md:w-1/2 lg:w-7/12'}
        print-only
      `}>
        {/* Toolbar */}
        <div className="sticky top-6 z-20 bg-brand-dark/90 backdrop-blur-md text-white rounded-full shadow-2xl px-6 py-3 mb-8 flex gap-6 items-center no-print transform hover:scale-105 transition-transform duration-300">
           <span className="text-xs font-bold uppercase tracking-widest text-brand-green">Preview</span>
           <div className="w-px h-4 bg-white/20"></div>
           
           <button onClick={() => setIsFullscreen(!isFullscreen)} className="text-white/70 hover:text-white transition-colors" title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}>
             {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
           </button>
           
           <button onClick={() => window.print()} className="text-white/70 hover:text-brand-green transition-colors" title="Print / Download PDF">
             <Download size={18} />
           </button>
        </div>

        {/* Resume Container */}
        <div className="resume-page w-full max-w-[210mm] min-h-[297mm] bg-white shadow-2xl mb-20 transition-transform duration-300 origin-top print:shadow-none print:mb-0 print:transform-none">
          <ResumePreview data={data} template={template} />
        </div>
      </div>
    </div>
  );
}