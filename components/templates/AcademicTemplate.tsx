import React from 'react';
import { ResumeData } from '../../types';
import { Mail, Phone, MapPin, Linkedin } from 'lucide-react';

export default function AcademicTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="p-10 font-serif text-gray-900 max-w-full h-full text-sm">
      {/* Header */}
      <header className="text-center mb-6">
        <h1 className="text-3xl font-normal uppercase tracking-widest mb-2">{data.fullName}</h1>
        <p className="text-lg italic text-gray-600 mb-3">{data.jobTitle}</p>
        <div className="flex justify-center items-center gap-4 text-xs text-gray-700">
          <div className="flex items-center gap-1"><Phone size={10}/> {data.phone}</div>
          <div className="flex items-center gap-1"><Mail size={10}/> {data.email}</div>
          <div className="flex items-center gap-1"><Linkedin size={10}/> {data.linkedin}</div>
        </div>
      </header>

      <hr className="border-gray-300 mb-6" />

      {/* Summary */}
      <section className="mb-6">
        <h3 className="font-bold uppercase tracking-wide text-xs text-gray-500 mb-2">Executive Summary</h3>
        <p className="leading-relaxed">{data.summary}</p>
      </section>

      {/* Experience */}
      <section className="mb-6">
        <h3 className="font-bold uppercase tracking-wide text-xs text-gray-500 mb-3">Professional Experience</h3>
        <div className="space-y-5">
          {data.experience.map((exp) => (
            <div key={exp.id}>
              <div className="flex justify-between font-bold text-base">
                <span>{exp.role}</span>
                <span>{exp.startDate} – {exp.endDate}</span>
              </div>
              <div className="italic text-gray-600 mb-1">{exp.company}</div>
              <div className="pl-4 border-l border-gray-300 text-gray-700 leading-tight space-y-1">
                 {exp.description.split('\n').map((line, i) => (
                   line.trim() ? <p key={i}>- {line.replace(/^[•-]\s*/, '')}</p> : null
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Two Column Layout for Education and Skills */}
      <div className="grid grid-cols-2 gap-8">
        <section>
          <h3 className="font-bold uppercase tracking-wide text-xs text-gray-500 mb-3">Education</h3>
          {data.education.map(edu => (
            <div key={edu.id} className="mb-3">
               <div className="font-bold">{edu.degree}</div>
               <div>{edu.school}</div>
               <div className="text-xs text-gray-500">{edu.year}</div>
            </div>
          ))}
        </section>

        <section>
          <h3 className="font-bold uppercase tracking-wide text-xs text-gray-500 mb-3">Skills & Tools</h3>
          <div className="flex flex-wrap gap-2">
            {data.skills.split(',').map((skill, i) => (
               <span key={i} className="bg-gray-100 px-2 py-1 rounded text-xs border border-gray-200">{skill.trim()}</span>
            ))}
          </div>
        </section>
      </div>
      
      {/* Footer Note */}
      <div className="mt-8 pt-4 border-t border-gray-100 text-center text-xs text-gray-400">
        References available upon request
      </div>
    </div>
  );
}