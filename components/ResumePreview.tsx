import React from 'react';
import { ResumeData, TemplateType } from '../types';
import ModernTemplate from './templates/ModernTemplate';
import ClassicTemplate from './templates/ClassicTemplate';
import AcademicTemplate from './templates/AcademicTemplate';
import ExecutiveTemplate from './templates/ExecutiveTemplate';
import MinimalTemplate from './templates/MinimalTemplate';

interface ResumePreviewProps {
  data: ResumeData;
  template: TemplateType;
}

export default function ResumePreview({ data, template }: ResumePreviewProps) {
  const renderTemplate = () => {
    switch (template) {
      case 'modern': return <ModernTemplate data={data} />;
      case 'classic': return <ClassicTemplate data={data} />;
      case 'academic': return <AcademicTemplate data={data} />;
      case 'executive': return <ExecutiveTemplate data={data} />;
      case 'minimal': return <MinimalTemplate data={data} />;
      default: return <ModernTemplate data={data} />;
    }
  };

  return (
    <div className="w-full h-full bg-white text-gray-900 overflow-hidden">
      {renderTemplate()}
    </div>
  );
}