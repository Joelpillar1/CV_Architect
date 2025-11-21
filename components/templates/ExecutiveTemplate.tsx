import React from 'react';
import { ResumeData } from '../../types';

export default function ExecutiveTemplate({ data }: { data: ResumeData }) {
  // Executive Template is harder to split because of the grid layout.
  // We will have to simplify the structure for pagination: 
  // Top Header, then sequential sections. The sidebar look is hard to maintain across pages nicely without complex logic.
  // We will refactor to a single column layout that LOOKS executive, or handle the grid within sections.
  // For robust pagination, 2-column layouts often need to be split into top-level rows.
  
  return (
    <>
      <div className="flex justify-between items-end border-b-4 border-gray-900 pb-4 mb-8 break-inside-avoid">
        <div>
          <h1 className="text-5xl font-extrabold tracking-tight text-gray-900">{data.fullName.split(' ')[0]} <span className="text-gray-500">{data.fullName.split(' ').slice(1).join(' ')}</span></h1>
          <p className="text-xl font-medium text-blue-700 mt-1">{data.jobTitle}</p>
        </div>
        <div className="text-right text-sm text-gray-600 space-y-1">
          <p>{data.email}</p>
          <p>{data.phone}</p>
          <p>{data.location}</p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Profile</h2>
        <p className="text-gray-700 leading-relaxed text-justify">{data.summary}</p>
      </section>

      {data.keyAchievements && (
        <section className="mb-8 break-inside-avoid">
        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Key Achievements</h2>
        <div className="text-gray-700 leading-relaxed space-y-2 bg-blue-50 p-5 rounded-lg border border-blue-100">
                {data.keyAchievements.split('\n').map((line, i) => (
                line.trim() && <p key={i}>{line}</p>
                ))}
        </div>
        </section>
      )}

      <div className="mb-6">
        <h2 className="text-sm font