import React, { useLayoutEffect, useRef } from 'react';
import { ResumeData, TemplateType } from '../types';
import VanguardTemplate from './templates/VanguardTemplate';


interface ResumePreviewProps {
  data: ResumeData;
  template: TemplateType;
}

export default function ResumePreview({ data, template }: ResumePreviewProps) {
  const sourceRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);

  // useLayoutEffect is critical here. It runs synchronously after DOM mutations but before the browser paints.
  // This prevents any flicker or flash of un-paginated content when data changes.
  useLayoutEffect(() => {
    if (!sourceRef.current || !targetRef.current) return;

    const sourceContainer = sourceRef.current;
    const targetContainer = targetRef.current;
    
    // Clear previous pages to start fresh
    targetContainer.innerHTML = '';

    // Helper to create a blank page element
    const createPage = (pageIndex: number) => {
        const page = document.createElement('div');
        // We set the A4 dimensions and styling for each page.
        // The print styles in index.html will handle how these translate to PDF.
        page.className = 'resume-page w-[210mm] bg-white shadow-2xl mb-8 p-12 relative mx-auto print:shadow-none print:mb-0 print:break-after-page origin-top';
        page.setAttribute('data-page', pageIndex.toString());
        return page;
    };

    let currentPageIndex = 0;
    let currentPage = createPage(currentPageIndex);
    targetContainer.appendChild(currentPage);

    // A4 height in pixels at 96dpi is ~1123px.
    // With p-12 (48px) top/bottom padding, available content height is ~1027px.
    // We use a safe limit to trigger a page break.
    const A4_CONTENT_LIMIT = 1080;

    // Get all top-level elements from the hidden source resume
    const nodes = Array.from(sourceContainer.children) as HTMLElement[];

    nodes.forEach((node) => {
      // Clone the node to move it into the visible pages
      const clone = node.cloneNode(true) as HTMLElement;
      currentPage.appendChild(clone);
      
      // Check if adding this node caused the page to overflow
      if (currentPage.scrollHeight > A4_CONTENT_LIMIT) {
         // To prevent an infinite loop (if a single item is taller than a page),
         // we only create a new page if the current page already had other content.
         if (currentPage.childElementCount > 1) {
             // It overflowed, so remove the node from this page...
             currentPage.removeChild(clone);
             
             // ...create a new page...
             currentPageIndex++;
             currentPage = createPage(currentPageIndex);
             targetContainer.appendChild(currentPage);
             
             // ...and add the node to the new page.
             currentPage.appendChild(clone);
         }
      }
    });

    // Final pass: Ensure all pages have the full A4 visual height, even if not full of content.
    const pages = Array.from(targetContainer.children) as HTMLElement[];
    pages.forEach(page => {
       page.style.minHeight = '297mm';
    });

  }, [data, template]); // This effect runs directly whenever data or template changes.

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
        {/* Hidden Source Container: React renders here first for measurement */}
        <div 
            ref={sourceRef} 
            style={{ 
                ...containerStyle,
                position: 'absolute',
                top: 0,
                left: '-9999px', // Rendered off-screen
                width: '210mm',
                background: 'white',
                padding: '48px', // Match p-12 for accurate measurement
                visibility: 'hidden',
                pointerEvents: 'none'
            }}
        >
            {renderTemplate()}
        </div>

        {/* Visible Target Container: The useLayoutEffect populates this with paginated content */}
        <div ref={targetRef} className="flex flex-col items-center w-full" style={containerStyle} />
    </div>
  );
}