import React from 'react';
import { SavedTemplate, TemplateType } from '../types';
import { ArrowRight, Bookmark, LayoutTemplate, Plus } from 'lucide-react';

interface MyTemplatesProps {
  templates: SavedTemplate[];
  onLoadTemplate: (template: SavedTemplate) => void;
}

export default function MyTemplates({ templates, onLoadTemplate }: MyTemplatesProps) {
  
  const getBaseTemplateName = (base: TemplateType) => {
    switch (base) {
      case 'vanguard': return 'The Vanguard';
      default: return 'Custom';
    }
  };

  return (
    <div className="p-8 md:p-12 h-full overflow-y-auto bg-brand-bg">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <h2 className="text-4xl font-bold text-brand-dark tracking-tight mb-3">My Templates</h2>
            <p className="text-gray-500 text-lg font-light">
              Your personalized collection of resumes. Ready to be adapted and deployed.
            </p>
          </div>
        </div>

        <div>
          {templates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {templates.map((template) => (
                <div 
                  key={template.id}
                  className="group relative bg-white rounded-2xl shadow-soft border border-brand-border hover:shadow-float hover:-translate-y-2 transition-all duration-500 cursor-pointer overflow-hidden flex flex-col"
                >
                  <div className="aspect-[210/297] bg-brand-secondary relative overflow-hidden p-8 transition-colors duration-500">
                    {/* Mini Preview Placeholder */}
                    <div className="w-full h-full bg-white shadow-lg rounded-sm p-5 flex flex-col opacity-90 group-hover:opacity-100 transition-all duration-500">
                       <div className="h-4 w-1/2 bg-brand-dark rounded-sm mb-1" />
                       <div className="h-2 w-1/4 bg-gray-300 rounded-sm mb-3" />
                       <div className="w-full h-px bg-gray-200 mb-4" />
                       <div className="h-2 w-1/3 bg-gray-400 rounded-sm mb-2" />
                       <div className="h-1.5 w-full bg-gray-100 rounded-sm" />
                       <div className="h-1.5 w-3/4 bg-gray-100 rounded-sm" />
                    </div>

                    <div className="absolute top-4 right-4 z-20 bg-brand-green/90 backdrop-blur-sm text-brand-dark text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1.5 uppercase tracking-wider border border-brand-green">
                      <Bookmark size={10} className="fill-brand-dark" />
                      {template.tag}
                    </div>
                    
                    <div className="absolute inset-0 z-30 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-brand-dark/10 backdrop-blur-[2px]">
                       <button 
                          onClick={() => onLoadTemplate(template)}
                          className="bg-brand-dark hover:bg-gray-800 text-white px-8 py-3.5 rounded-xl font-bold shadow-xl hover:shadow-2xl transition-all flex items-center gap-2"
                       >
                         Use Template <ArrowRight size={18} />
                       </button>
                    </div>
                  </div>
                  
                  <div className="p-8 bg-white relative z-30">
                    <h3 className="text-xl font-bold text-brand-dark">{template.tag}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed font-medium mt-1">
                      Based on <span className="font-semibold text-gray-500">{getBaseTemplateName(template.baseTemplate)}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 px-6 bg-white rounded-2xl border border-dashed border-gray-200">
              <div className="w-16 h-16 mx-auto bg-brand-secondary rounded-full flex items-center justify-center mb-6">
                <Bookmark className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-brand-dark">No Saved Templates</h3>
              <p className="text-gray-500 mt-2 max-w-md mx-auto">
                Go to the editor, perfect your resume, and use the "Save as New Template" feature in the Design tab to start building your library.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}