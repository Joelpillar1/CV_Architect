import React, { useState } from 'react';
import { TemplateType, ResumeData } from '../types';
import { ArrowRight, Crown, Eye, X, LayoutTemplate } from 'lucide-react';
import ResumePreview from './ResumePreview';

interface TemplatesProps {
  onSelect: (template: TemplateType) => void;
  data: ResumeData;
}

export default function Templates({ onSelect, data }: TemplatesProps) {
  const [previewTemplate, setPreviewTemplate] = useState<TemplateType | null>(null);

  const templates: { id: TemplateType; name: string; description: string; bg: string }[] = [
    { 
      id: 'vanguard', 
      name: "The Vanguard", 
      description: "A modern, clean, and highly scannable layout perfect for tech and design roles.",
      bg: "bg-[#F8F8F8]"
    }
  ];
  
  const renderMiniPreview = (type: TemplateType) => {
    const BasePaper = ({ children, className = "" }: { children?: React.ReactNode, className?: string }) => (
       <div className={`w-full h-full bg-white shadow-lg rounded-sm p-5 flex flex-col opacity-90 group-hover:scale-[1.02] group-hover:opacity-100 transition-all duration-500 origin-top relative z-10 ${className}`}>
         {children}
       </div>
    );

    switch (type) {
      case 'vanguard':
        return (
          <BasePaper className="items-center">
            <div className="h-4 w-1/2 bg-brand-dark rounded-sm mb-1" />
            <div className="h-2 w-1/4 bg-gray-300 rounded-sm mb-3" />
            <div className="w-full h-px bg-gray-200 mb-2" />
            <div className="w-full h-px bg-gray-200 mb-4" />
             <div className="w-full text-left space-y-3">
                <div className="h-2 w-1/3 bg-gray-400 rounded-sm" />
                <div className="h-1.5 w-full bg-gray-100 rounded-sm" />
                <div className="h-1.5 w-3/4 bg-gray-100 rounded-sm" />
             </div>
          </BasePaper>
        );
      default:
        return <BasePaper><div></div></BasePaper>;
    }
  };

  return (
    <div className="p-8 md:p-12 h-full overflow-y-auto bg-brand-bg relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-brand-dark tracking-tight mb-4">Select your design.</h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto font-light">
            Every template is precision-engineered for ATS systems and human delight. 
            Choose the structure that fits your story.
          </p>
        </div>

        <div className="pb-20">
          {templates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {templates.map((template) => (
                <div 
                  key={template.id}
                  className="group relative bg-white rounded-2xl shadow-soft border border-brand-border hover:shadow-float hover:-translate-y-2 transition-all duration-500 cursor-pointer overflow-hidden flex flex-col"
                >
                  <div className={`aspect-[210/297] ${template.bg} relative overflow-hidden p-8 transition-colors duration-500`}>
                    {renderMiniPreview(template.id)}
                    <div className="absolute top-4 right-4 z-20 bg-brand-dark/90 backdrop-blur-sm text-brand-green text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1.5 uppercase tracking-wider border border-brand-dark">
                      <Crown size={10} className="fill-brand-green" />
                      Premium
                    </div>
                    <div className="absolute inset-0 z-30 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-brand-dark/10 backdrop-blur-[2px]">
                       <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex flex-col items-center gap-3">
                         <button 
                            onClick={() => onSelect(template.id)}
                            className="bg-brand-green hover:bg-brand-greenHover text-brand-dark px-8 py-3.5 rounded-xl font-bold shadow-xl hover:shadow-2xl transition-all flex items-center gap-2"
                         >
                           Use Template <ArrowRight size={18} />
                         </button>
                         <button 
                            onClick={(e) => { e.stopPropagation(); setPreviewTemplate(template.id); }}
                            className="flex items-center gap-2 text-white font-medium text-sm hover:text-brand-green transition-colors bg-black/40 px-4 py-2 rounded-full backdrop-blur-md hover:bg-black/60"
                         >
                            <Eye size={14} /> Preview Design
                         </button>
                       </div>
                    </div>
                  </div>
                  <div className="p-8 bg-white relative z-30 flex-1 flex flex-col justify-between border-t border-gray-50">
                    <div>
                      <div className="flex justify-between items-center mb-3">
                         <h3 className="text-xl font-bold text-brand-dark">{template.name}</h3>
                      </div>
                      <p className="text-sm text-gray-500 leading-relaxed font-medium">{template.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 px-6 bg-white rounded-2xl border border-dashed border-gray-200">
              <div className="w-16 h-16 mx-auto bg-brand-secondary rounded-full flex items-center justify-center mb-6">
                <LayoutTemplate className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-brand-dark">No Templates Available</h3>
              <p className="text-gray-500 mt-2 max-w-md mx-auto">
                It looks like there are no templates to display right now. New designs are coming soon!
              </p>
            </div>
          )}
        </div>
      </div>

      {previewTemplate && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <div className="absolute inset-0 bg-brand-dark/80 backdrop-blur-md transition-opacity" onClick={() => setPreviewTemplate(null)} />
            <div className="relative w-full max-w-6xl h-full max-h-[90vh] bg-brand-bg rounded-2xl shadow-2xl flex flex-col overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 shrink-0 z-10 shadow-sm">
                    <div>
                        <h3 className="text-xl font-bold text-brand-dark">Template Preview</h3>
                        <p className="text-sm text-gray-500 hidden md:block">See how your content looks in the {previewTemplate} design.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button 
                            onClick={() => setPreviewTemplate(null)}
                            className="p-2 text-gray-400 hover:text-brand-dark hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <X size={24} />
                        </button>
                        <button 
                            onClick={() => { if(previewTemplate) onSelect(previewTemplate); }}
                            className="bg-brand-green hover:bg-brand-greenHover text-brand-dark px-6 py-2 rounded-lg font-bold shadow-lg transition-all"
                        >
                            Use This Template
                        </button>
                    </div>
                </div>
                
                <div className="flex-1 overflow-y-auto p-8 bg-[#525659] flex justify-center relative">
                    <div className="scale-75 md:scale-90 origin-top transition-transform shadow-2xl">
                        {previewTemplate && <ResumePreview data={data} template={previewTemplate} />}
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
}