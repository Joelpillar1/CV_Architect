import React from 'react';
import { ResumeData } from '../../types';
import { Mail, Phone, Linkedin } from 'lucide-react';

export default function AcademicTemplate({ data }: { data: ResumeData }) {
  return (
    <>
      {/* Header */}
      <header className="text-center mb-8 break-inside-avoid">
        <h1 className="text-3xl font-normal uppercase tracking-[0.2em] mb-3 text-gray-900">{data.fullName}</h1>
        <p className="text-lg italic text-gray-600 mb-4 font-serif">{data.jobTitle}</p>
        <div className="flex justify-center items-center gap-6 text-xs text-gray-600 tracking-widest uppercase">
          <div className="flex items-center gap-2"><Phone size={12}/> {data.phone}</div>
          <div className="flex items-center gap-2"><Mail size={12}/> {data.email}</div>
          <div className="flex items-center gap-2"><Linkedin size={12}/> {data.linkedin}</div>
        </div>
      </header>

      <hr className="border-gray-300 mb-8" />

      {/* Summary */}
      <section className="mb-8 break-inside-avoid">
        <h3 className="font-bold uppercase tracking-widest text-xs text-gray-400 mb-3">Executive Summary</h3>
        <p className="leading-relaxed text-gray-800 text-justify">{data.summary}</p>
      </section>
      
       {/* Achievements */}
      {data.keyAchievements && (
        <section className="mb-8 break-inside-avoid">
          <h3 className="font-bold uppercase tracking-widest text-xs text-gray-400 mb-3">Key Research & Achievements</h3>
          <div className="text-gray-800 space-y-2 text-justify">
             {data.keyAchievements.split('\n').map((line, i) => (
                line.trim() && <p key={i} className="pl-4 border-l-2 border-gray-200">{line.replace(/^[•-]\s*/, '')}</p>
             ))}
          </div>
        </section>
      )}

      {/* Experience */}
      <h3 className="font-bold uppercase tracking-widest text-xs text-gray-400 mb-6 break-inside-avoid">Professional Experience</h3>
      <div className="space-y-8 mb-8">
        {data.experience.map((exp) => (
        <div key={exp.id} className="break-inside-avoid">
            <div className="flex justify-between font-bold text-base text-gray-900 mb-1">
            <span>{exp.role}</span>
            <span>{exp.startDate} – {exp.endDate}</span>
            </div>
            <div className="italic text-gray-600 mb-2 font-serif">{exp.company}</div>
            <div className="pl-4 border-l border-gray-200 text-gray-800 leading-relaxed space-y-1 text-justify">
                {exp.description.split('\n').map((line, i) => (
                line.trim() ? <p key={i}>- {line.replace(/^[•-]\s*/, '')}</p> : null
            ))}
            </div>
        </div>
        ))}
      </div>

      {/* Education */}
      <section className="mb-8 break-inside-avoid">
          <h3 className="font-bold uppercase tracking-widest text-xs text-gray-400 mb-4">Education</h3>
          <div className="grid grid-cols-1 gap-4">
            {data.education.map(edu => (
              <div key={edu.id} className="flex justify-between items-baseline border-b border-gray-100 pb-2">
                 <div>
                    <div className="font-bold text-gray-900">{edu.degree}</div>
                    <div className="font-serif text-gray-600 italic">{edu.school}</div>
                 </div>
                 <div className="text-sm text-gray-500">{edu.year}</div>
              </div>
            ))}
          </div>
      </section>

      {/* Skills */}
      <section className="break-inside-avoid">
          <h3 className="font-bold uppercase tracking-widest text-xs text-gray-400 mb-4">Skills & Tools</h3>
          <div className="flex flex-wrap gap-2">
            {data.skills.split(',').map((skill, i) => (
               <span key={i} className="bg-gray-50 px-3 py-1.5 rounded-sm text-sm border border-gray-200 text-gray-700">{skill.trim()}</span>
            ))}
          </div>
      </section>
      
      {/* Footer Note */}
      <div className="mt-12 pt-6 border-t border-gray-100 text-center text-xs text-gray-400 break-inside-avoid font-serif italic">
        Detailed academic history and references available upon request
      </div>
    </>
  );
}