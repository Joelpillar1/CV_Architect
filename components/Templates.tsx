import React from 'react';
import { TemplateType } from '../types';
import { Check, ArrowRight } from 'lucide-react';

interface TemplatesProps {
  onSelect: (template: TemplateType) => void;
}

export default function Templates({ onSelect }: TemplatesProps) {
  const templates: { id: TemplateType; name: string; description: string; bg: string }[] = [
    { 
      id: 'modern', 
      name: "The Modernist", 
      description: "Clean, sans-serif typography with bold headers. Best for tech and creative roles.",
      bg: "bg-[#F0F4F8]"
    },
    { 
      id: 'classic', 
      name: "The Professional", 
      description: "Timeless serif fonts and structured layout. Perfect for corporate, legal, and finance.",
      bg: "bg-[#F5F5F0]"
    },
    { 
      id: 'academic', 
      name: "Academic Scholar", 
      description: "Content-dense layout focused on research, publications, and detailed history.",
      bg: "bg-[#ECFDF5]"
    },
    { 
      id: 'executive', 
      name: "Strategic Executive", 
      description: "High-level overview with emphasized skills section and strategic highlights.",
      bg: "bg-[#F3E8FF]"
    },
    { 
      id: 'minimal', 
      name: "Pure Minimal", 
      description: "Maximum whitespace, simplified structure. Let your content speak for itself.",
      bg: "bg-[#FFF1F2]"
    }
  ];

  return (
    <div className="p-8 md:p-12 h-full overflow-y-auto bg-brand-bg">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-brand-dark tracking-tight mb-4">Select your design.</h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto font-light">
            Every template is precision-engineered for ATS systems and human delight. 
            Choose the structure that fits your story.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pb-20">
          {templates.map((template) => (
            <div 
              key={template.id}
              onClick={() => onSelect(template.id)}
              className="group relative bg-white rounded-2xl shadow-soft border border-brand-border hover:shadow-float hover:-translate-y-2 transition-all duration-500 cursor-pointer overflow-hidden flex flex-col"
            >
              {/* Abstract Preview */}
              <div className={`aspect-[210/297] ${template.bg} relative overflow-hidden p-8 transition-colors duration-500`}>
                <div className="w-full h-full bg-white shadow-lg rounded-sm p-6 opacity-90 group-hover:scale-[1.02] group-hover:opacity-100 transition-all duration-500 origin-top relative z-10">
                    <div className="h-4 w-1/2 bg-brand-dark/80 rounded-sm mb-6"></div>
                    <div className="h-2 w-full bg-gray-100 rounded-sm mb-2"></div>
                    <div className="h-2 w-3/4 bg-gray-100 rounded-sm mb-8"></div>
                    
                    <div className="h-3 w-1/4 bg-gray-300 rounded-sm mb-3"></div>
                    <div className="space-y-2.5 mb-6">
                        {[1,2,3].map(i => <div key={i} className="h-1.5 w-full bg-gray-100 rounded-sm"></div>)}
                    </div>
                    <div className="h-3 w-1/4 bg-gray-300 rounded-sm mb-3"></div>
                    <div className="space-y-2.5">
                        {[1,2,3,4].map(i => <div key={i} className="h-1.5 w-full bg-gray-100 rounded-sm"></div>)}
                    </div>
                </div>
                
                {/* Button Overlay */}
                <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-brand-dark/5 backdrop-blur-[1px]">
                   <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 bg-brand-green text-brand-dark px-8 py-3 rounded-full font-semibold shadow-xl flex items-center gap-2">
                     Use Template <ArrowRight size={16} />
                   </div>
                </div>
              </div>
              
              <div className="p-8 bg-white relative z-30 flex-1 flex flex-col justify-between">
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
      </div>
    </div>
  );
}