import React, { useState } from 'react';
import { Layout, FileText, Settings as SettingsIcon, Home, ChevronRight, ChevronLeft, Menu, X, LogOut } from 'lucide-react';
import { ResumeData, INITIAL_DATA, TemplateType } from './types';
import Editor from './components/Editor';
import Overview from './components/Overview';
import Templates from './components/Templates';
import { Settings } from './components/Settings';
import LandingPage from './components/LandingPage';

enum View {
  LANDING = 'LANDING',
  OVERVIEW = 'OVERVIEW',
  TEMPLATES = 'TEMPLATES',
  EDITOR = 'EDITOR',
  SETTINGS = 'SETTINGS',
}

export default function App() {
  // Initial view is now LANDING
  const [currentView, setCurrentView] = useState<View>(View.LANDING);
  const [resumeData, setResumeData] = useState<ResumeData>(INITIAL_DATA);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>('vanguard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleTemplateSelect = (template: TemplateType) => {
    setSelectedTemplate(template);
    setCurrentView(View.EDITOR);
  };

  // Handle login/signup simulation by moving to the dashboard
  const handleGetStarted = () => {
    setCurrentView(View.OVERVIEW);
  };

  const handleLogout = () => {
    setCurrentView(View.LANDING);
  };

  const renderContent = () => {
    switch (currentView) {
      case View.LANDING:
        return <LandingPage onGetStarted={handleGetStarted} />;
      case View.OVERVIEW:
        return <Overview onCreateNew={() => setCurrentView(View.TEMPLATES)} />;
      case View.TEMPLATES:
        return <Templates onSelect={handleTemplateSelect} data={resumeData} />;
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
        return <LandingPage onGetStarted={handleGetStarted} />;
    }
  };

  // Landing Page View (Full Screen, no sidebar)
  if (currentView === View.LANDING) {
     return (
        <div className="min-h-screen w-full bg-brand-bg">
           {renderContent()}
        </div>
     );
  }

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
        fixed md:relative z-50 h-full bg-brand-bg border-r border-brand-border transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1)
        ${isMobileMenuOpen ? 'translate-x-0 shadow-2xl w-72' : '-translate-x-full md:translate-x-0'}
        ${isSidebarCollapsed ? 'md:w-20' : 'md:w-72'}
        no-print flex flex-col
      `}>
        {/* Collapse Toggle (Desktop Only) */}
        <button 
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="hidden md:flex absolute -right-3 top-10 bg-white border border-brand-border p-1.5 rounded-full shadow-sharp text-gray-400 hover:text-brand-green hover:border-brand-green transition-all duration-300 z-50"
        >
            {isSidebarCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>

        <div className={`p-6 flex items-center ${isSidebarCollapsed ? 'justify-center' : 'justify-between'}`}>
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-8 h-8 bg-brand-dark rounded-lg flex items-center justify-center shadow-lg shadow-brand-dark/20 shrink-0">
              <FileText className="w-4 h-4 text-brand-green" />
            </div>
            <h1 className={`text-lg font-bold tracking-tight text-brand-dark whitespace-nowrap transition-opacity duration-300 ${isSidebarCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
              CV Architect
            </h1>
          </div>
          <button 
            onClick={() => setIsMobileMenuOpen(false)} 
            className="md:hidden p-1 rounded-full hover:bg-gray-200 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="px-3 space-y-2 flex-1 mt-4">
          <SidebarItem 
            icon={<Home size={20} />} 
            label="Overview" 
            active={currentView === View.OVERVIEW} 
            collapsed={isSidebarCollapsed}
            onClick={() => { setCurrentView(View.OVERVIEW); setIsMobileMenuOpen(false); }} 
          />
          <SidebarItem 
            icon={<Layout size={20} />} 
            label="Templates" 
            active={currentView === View.TEMPLATES} 
            collapsed={isSidebarCollapsed}
            onClick={() => { setCurrentView(View.TEMPLATES); setIsMobileMenuOpen(false); }} 
          />
          <SidebarItem 
            icon={<SettingsIcon size={20} />} 
            label="Settings" 
            active={currentView === View.SETTINGS} 
            collapsed={isSidebarCollapsed}
            onClick={() => { setCurrentView(View.SETTINGS); setIsMobileMenuOpen(false); }} 
          />
        </nav>

        <div className="p-4 border-t border-brand-border bg-brand-secondary/30">
          <div className={`flex items-center gap-3 ${isSidebarCollapsed ? 'flex-col space-y-3' : 'justify-between'}`}>
            <div className={`flex items-center gap-3 w-full ${isSidebarCollapsed ? 'justify-center' : ''}`}>
              <div className="w-10 h-10 rounded-full bg-brand-dark text-brand-green flex items-center justify-center font-bold text-sm shadow-sm shrink-0">
                JO
              </div>
              <div className={`flex-1 min-w-0 ${isSidebarCollapsed ? 'hidden' : ''}`}>
                <p className="text-sm font-semibold text-brand-dark truncate">Joel O.</p>
                <p className="text-xs text-gray-500 truncate">Pro Plan Member</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              title="Logout"
              className={`flex items-center gap-2 p-2 rounded-lg text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors text-sm font-semibold ${isSidebarCollapsed ? 'w-full justify-center' : ''}`}
            >
              <LogOut size={16} />
              <span className={isSidebarCollapsed ? 'hidden' : ''}>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full w-full relative overflow-hidden bg-brand-bg transition-all duration-500">
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

const SidebarItem = ({ icon, label, active, collapsed, onClick }: { icon: React.ReactNode, label: string, active: boolean, collapsed: boolean, onClick: () => void }) => (
  <button
    onClick={onClick}
    title={collapsed ? label : undefined}
    className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300 group font-medium text-sm relative
      ${active ? 'bg-white text-brand-dark shadow-soft' : 'text-gray-500 hover:bg-white/50 hover:text-brand-dark'}
      ${collapsed ? 'justify-center' : ''}
    `}
  >
    {React.cloneElement(icon as React.ReactElement<any>, { 
      className: `transition-colors duration-300 shrink-0 ${active ? 'text-brand-green' : 'text-gray-400 group-hover:text-brand-dark'}` 
    })}
    
    <span className={`whitespace-nowrap transition-all duration-300 ${collapsed ? 'w-0 opacity-0 hidden' : 'w-auto opacity-100'}`}>
      {label}
    </span>
    
    {active && !collapsed && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-green shadow-[0_0_8px_rgba(112,224,152,0.6)]" />}
    {active && collapsed && <div className="absolute right-2 top-2 w-1.5 h-1.5 rounded-full bg-brand-green shadow-[0_0_8px_rgba(112,224,152,0.6)]" />}
  </button>
);