import React, { useEffect, useRef, useState } from 'react';
import { ResumeData, TemplateType } from '../types';
import VanguardTemplate from './templates/VanguardTemplate';


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

    // Helper to create a blank page
    const createPage = (pageIndex: number) => {
        const page = document.createElement('div');
        // Note: We use min-height for visual consistency, but we calculate overflow based on actual content height.
        // For the logic to work, we initially let it be auto-height.
        page.className = 'resume-page w-[210mm] bg-white shadow-2xl mb-8 p-12 relative mx-auto print:shadow-none print:mb-0 print:break-after-page origin-top';
        page.setAttribute('data-page', pageIndex.toString());
        return page;
    };

    let currentPageIndex = 0;
    let currentPage = createPage(currentPageIndex);
    targetContainer.appendChild(currentPage);

    // A4 height in px at 96dpi is approx 1122.5px.
    // We subtract a safety buffer for the bottom margin.
    const A4_CONTENT_LIMIT = 1080; // Slightly less than 1123 to prevent edge clipping

    // Convert HTMLCollection to Array to iterate safely
    const nodes = Array.from(sourceContainer.children) as HTMLElement[];

    nodes.forEach((node) => {
      // Clone the node to project it into the page
      const clone = node.cloneNode(true) as HTMLElement;
      currentPage.appendChild(clone);
      
      // Check if the page is overflowing
      if (currentPage.scrollHeight > A4_CONTENT_LIMIT) {
         // Only break if this isn't the *only* item on the page.
         // If it's the only item and it's huge, let it overflow (better than infinite loop or disappearing).
         if (currentPage.childElementCount > 1) {
             // Remove the node we just added
             currentPage.removeChild(clone);
             
             // Create a new page
             currentPageIndex++;
             currentPage = createPage(currentPageIndex);
             targetContainer.appendChild(currentPage);
             
             // Add the node to the new page
             currentPage.appendChild(clone);
         }
      }
    });

    // Post-processing: Ensure all pages have the visual look of A4
    const pages = Array.from(targetContainer.children) as HTMLElement[];
    pages.forEach(page => {
       page.style.minHeight = '297mm';
    });

  }, [renderKey]);

  // Dynamic Font Application
  const containerStyle = {
    fontFamily: data.font || 'Inter, sans-serif',
    fontSize: `${data.fontSize || 12.5}px`,
    lineHeight: '1.5',
  };

  const renderTemplate = () => {
      try {
        switch (template) {
            case 'vanguard': return <VanguardTemplate data={data} />;
            default: return <VanguardTemplate data={data} />;
        }
      } catch (e) {
          console.error("Template rendering error:", e);
          return <div className="text-red-500 p-4">Error loading template. Please refresh.</div>;
      }
  };

  return (
    <div className="w-full flex justify-center relative">
        {/* Hidden Source - Rendered off-screen to measure height */}
        <div 
            ref={sourceRef} 
            style={{ 
                ...containerStyle,
                position: 'absolute',
                top: 0,
                left: '-9999px',
                width: '210mm',
                background: 'white',
                padding: '48px', // Match p-12
                visibility: 'hidden',
                pointerEvents: 'none'
            }}
        >
            {renderTemplate()}
        </div>

        {/* Target - Where pages are projected */}
        <div ref={targetRef} className="flex flex-col items-center w-full" style={containerStyle} />
    </div>
  );
}