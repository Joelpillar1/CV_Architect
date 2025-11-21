import React, { useState } from 'react';
import { Layout, FileText, Settings as SettingsIcon, Home, ChevronRight, Menu, X } from 'lucide-react';
import { ResumeData, INITIAL_DATA, TemplateType } from './types';
import Editor from './components/Editor';
import Overview from './components/Overview';
import Templates from './components/Templates';
import { Settings } from './components/Settings';

enum View {
  OVERVIEW = 'OVERVIEW',
  TEMPLATES = 'TEMPLATES',
  EDITOR = 'EDITOR',
  SETTINGS = 'SETTINGS',
}

export default function App() {
  const [currentView, setCurrentView] = useState<View>(View.OVERVIEW);
  const [resumeData, setResumeData] = useState<ResumeData>(INITIAL_DATA);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>('modern');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleTemplateSelect = (template: TemplateType) => {
    setSelectedTemplate(template);
    setCurrentView(View.EDITOR);
  };

  const renderContent = () => {
    switch (currentView) {
      case View.OVERVIEW:
        return <Overview onCreateNew={() => setCurrentView(View.TEMPLATES)} />;
      case View.TEMPLATES:
        return <Templates onSelect={handleTemplateSelect} />;
      case View.EDITOR:
        return (
          <Editor 
            data={resumeData} 
            onChange={setResumeData} 
            template={selectedTemplate}
            onTemplateChange={setSelectedTemplate}
            onBack={() => setCurrentView(View.TEMPLATES)}
          />
        );
      case View.SETTINGS:
        return <Settings />;
      default:
        return <Overview onCreateNew={() => setCurrentView(View.TEMPLATES)} />;
    }
  };

  // Editor View has a completely different layout (no sidebar)
  if (currentView === View.EDITOR) {
    return (
       <div className="h-screen w-screen overflow-hidden bg-brand-bg font-sans text-brand-dark">
          {renderContent()}
       </div>
    );
  }

  // Standard Dashboard Layout
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-brand-bg font-sans text-brand-dark">
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-brand-dark/20 backdrop-blur-sm z-40 md:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:relative z-50 h-full w-72 bg-brand-bg border-r border-brand-border transform transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1)
        ${isMobileMenuOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full md:translate-x-0'}
        no-print flex flex-col
      `}>
        <div className="p-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-brand-dark rounded-lg flex items-center justify-center shadow-lg shadow-brand-dark/20">
              <FileText className="w-4 h-4 text-brand-green" />
            </div>
            <h1 className="text-lg font-bold tracking-tight text-brand-dark">CV Architect</h1>
          </div>
          <button 
            onClick={() => setIsMobileMenuOpen(false)} 
            className="md:hidden p-1 rounded-full hover:bg-gray-200 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="px-4 space-y-1 flex-1">
          <SidebarItem 
            icon={<Home size={18} />} 
            label="Overview" 
            active={currentView === View.OVERVIEW} 
            onClick={() => { setCurrentView(View.OVERVIEW); setIsMobileMenuOpen(false); }} 
          />
          <SidebarItem 
            icon={<Layout size={18} />} 
            label="Templates" 
            active={currentView === View.TEMPLATES} 
            onClick={() => { setCurrentView(View.TEMPLATES); setIsMobileMenuOpen(false); }} 
          />
          <SidebarItem 
            icon={<SettingsIcon size={18} />} 
            label="Settings" 
            active={currentView === View.SETTINGS} 
            onClick={() => { setCurrentView(View.SETTINGS); setIsMobileMenuOpen(false); }} 
          />
        </nav>

        <div className="p-6 border-t border-brand-border bg-brand-secondary/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-brand-dark text-brand-green flex items-center justify-center font-bold text-sm shadow-sm">
              AA
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-brand-dark truncate">Abdullahi A.</p>
              <p className="text-xs text-gray-500 truncate">Pro Plan Member</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full w-full relative overflow-hidden bg-brand-bg">
        <header className="h-20 flex items-center justify-between px-8 no-print shrink-0 bg-brand-bg/80 backdrop-blur-md z-10">
          <div className="flex items-center gap-4">
            <button 
              className="md:hidden p-2 text-brand-dark hover:bg-gray-100 rounded-md"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
            <div className="flex items-center text-sm text-gray-400">
              <span className="hover:text-brand-dark cursor-pointer transition-colors" onClick={() => setCurrentView(View.OVERVIEW)}>Home</span>
              <ChevronRight size={14} className="mx-2" />
              <span className="font-medium text-brand-dark capitalize">{currentView.toLowerCase()}</span>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-hidden relative">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

const SidebarItem = ({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group font-medium text-sm ${
      active 
        ? 'bg-white text-brand-dark shadow-soft' 
        : 'text-gray-500 hover:bg-white/50 hover:text-brand-dark'
    }`}
  >
    {React.cloneElement(icon as React.ReactElement, { 
      className: `transition-colors duration-300 ${active ? 'text-brand-green' : 'text-gray-400 group-hover:text-brand-dark'}` 
    })}
    <span>{label}</span>
    {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-green shadow-[0_0_8px_rgba(112,224,152,0.6)]" />}
  </button>
);