import React, { useEffect, useRef, useState } from 'react';
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
  const sourceRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  // We use a key to force re-render when data changes, triggering the effect
  const [renderKey, setRenderKey] = useState(0);

  useEffect(() => {
    setRenderKey(prev => prev + 1);
  }, [data, template]);

  // This effect handles the "DOM Projection" logic
  useEffect(() => {
    if (!sourceRef.current || !targetRef.current) return;

    const sourceContainer = sourceRef.current;
    const targetContainer = targetRef.current;
    
    // Clear previous pages
    targetContainer.innerHTML = '';

    // Constants for A4 Page (in pixels at 96 DPI)
    // A4 is 210mm x 297mm.
    // At 96 DPI, 297mm is approx 1123px.
    const PAGE_HEIGHT_PX = 1123; 
    // The actual content limit should be safe enough.
    // If we assume p-12 (48px), effective height is less.
    // We'll use scrollHeight of the page container to detect overflow.

    const createPage = (pageIndex: number) => {
        const page = document.createElement('div');
        // Match the Tailwind classes for a page
        // We use min-h to allow measurement, but in practice we split before it grows too much.
        // For printing, we want clean breaks.
        page.className = 'w-[210mm] min-h-[297mm] bg-white shadow-2xl mb-8 p-12 relative mx-auto print:shadow-none print:mb-0 print:break-after-page print:min-h-0';
        page.setAttribute('data-page', pageIndex.toString());
        return page;
    };

    let currentPageIndex = 0;
    let currentPage = createPage(currentPageIndex);
    targetContainer.appendChild(currentPage);

    // Convert HTMLCollection to Array to iterate safely
    const nodes = Array.from(sourceContainer.children) as HTMLElement[];

    nodes.forEach((node) => {
      // Clone the node to project it into the page
      const clone = node.cloneNode(true) as HTMLElement;
      currentPage.appendChild(clone);
      
      // Check if we exceeded height
      // We use a threshold slightly less than full A4 height to avoid cutting off bottom margin too tight
      // 1122px is 297mm approx.
      if (currentPage.scrollHeight > 1122) {
         // Remove the node we just added because it caused overflow
         currentPage.removeChild(clone);
         
         // Create new page
         currentPageIndex++;
         currentPage = createPage(currentPageIndex);
         targetContainer.appendChild(currentPage);
         
         // Append node to new page
         currentPage.appendChild(clone);
      }
    });
  }, [renderKey]);

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
    <div className="w-full flex justify-center">
        {/* Hidden Source - Rendered off-screen to measure height */}
        <div ref={sourceRef} className="fixed -left-[9999px] top-0 w-[210mm] bg-white p-12 invisible pointer-events-none">
            {renderTemplate()}
        </div>

        {/* Target - Where pages are projected */}
        <div ref={targetRef} className="flex flex-col items-center w-full transform transition-transform duration-300" />
    </div>
  );
}