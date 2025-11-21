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
  const [isReady, setIsReady] = useState(false);

  // This effect handles the "DOM Projection" logic
  useEffect(() => {
    if (!sourceRef.current || !targetRef.current) return;

    const sourceContainer = sourceRef.current;
    const targetContainer = targetRef.current;
    
    // Clear previous pages
    targetContainer.innerHTML = '';

    // Constants for A4 Page (in pixels at 96 DPI)
    // A4 height is 297mm approx 1122px. 
    // We use a slightly smaller safety height to account for padding/margins.
    const PAGE_HEIGHT_PX = 1122; 
    const PADDING_Y_PX = 96; // 48px top + 48px bottom (p-12 equivalent)
    const CONTENT_HEIGHT_PX = PAGE_HEIGHT_PX - PADDING_Y_PX;

    let currentPage = createPage();
    let currentHeight = 0;
    targetContainer.appendChild(currentPage);

    // Convert HTMLCollection to Array to iterate safely
    const nodes = Array.from(sourceContainer.children);

    nodes.forEach((node) => {
      // Clone the node to project it into the page
      const clone = node.cloneNode(true) as HTMLElement;
      
      // Temporarily append to measure
      currentPage.querySelector('.page-content')?.appendChild(clone);
      const nodeHeight = clone.offsetHeight;
      const styles = window.getComputedStyle(clone);
      const marginTop = parseFloat(styles.marginTop);
      const marginBottom = parseFloat(styles.marginBottom);
      const totalNodeHeight = nodeHeight + marginTop + marginBottom;

      // Check if element fits
      if (currentHeight + totalNodeHeight > CONTENT_HEIGHT_PX) {
        // If it doesn't fit, remove it from current page
        currentPage.querySelector('.page-content')?.removeChild(clone);
        
        // Create new page
        currentPage = createPage();
        targetContainer.appendChild(currentPage);
        currentHeight = 0;
        
        // Append to new page
        currentPage.querySelector('.page-content')?.appendChild(clone);
      }
      
      currentHeight += totalNodeHeight;
    });
    
    setIsReady(true);

  }, [data, template]);

  const createPage = () => {
    const page = document.createElement('div');
    page.className = "resume-page bg-white shadow-2xl mb-8 mx-auto overflow-hidden relative print:shadow-none print:mb-0 print:mx-0";
    page.style.width = '210mm';
    page.style.minHeight = '297mm';
    // We handle padding via an inner container to make height calc easier
    page.innerHTML = `<div class="page-content p-12 h-full w-full"></div>`;
    return page;
  };

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
    <div className="flex flex-col items-center w-full h-full">
        {/* 
            Hidden Source Container 
            This renders the React Component Tree. We project this DOM into the pages below.
        */}
        <div 
            ref={sourceRef} 
            className="absolute opacity-0 pointer-events-none -z-10 w-[210mm] bg-white p-12"
            style={{ 
                fontFamily: data.font || 'inherit', 
                fontSize: data.fontSize ? `${data.fontSize}pt` : 'inherit'
            }}
        >
            {renderTemplate()}
        </div>

        {/* 
            Visible Target Container
            This receives the paginated DOM nodes.
        */}
        <div 
            ref={targetRef} 
            className="w-full flex flex-col items-center print:block"
            style={{ 
                fontFamily: data.font || 'inherit', 
                fontSize: data.fontSize ? `${data.fontSize}pt` : 'inherit'
            }}
        />
    </div>
  );
}