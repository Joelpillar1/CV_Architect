import React from 'react';
import { ResumeData } from '../../types';

export default function ModernTemplate({ data }: { data: ResumeData }) {
  return (
    <>
      <header className="mb-8 border-b-2 border-gray-900 pb-6 break-inside-avoid">
        <h1 className="text-4xl font-bold uppercase tracking-tight text-gray-900 mb-2">{data.fullName}</h1>
        <p className="text-lg font-medium text-gray-600 uppercase tracking-wider mb-4">{data.jobTitle}</p>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
           <span>{data.location}</span>
           <span className="text-gray-300">|</span>
           <span>{data.email}</span>
           <span className="text-gray-300">|</span>
           <span>{data.phone}</span>
           <span className="text-gray-300">|</span>
           <span>{data.linkedin}</span>
        </div>
      </header>

      <section className="mb-8 break-inside-avoid">
        <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Summary</h2>
        <p className="text-gray-700 leading-relaxed">{data.summary}</p>
      </section>
      
      {data.keyAchievements && (
        <section className="mb-8 break-inside-avoid">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Key Achievements</h2>
            <div className="text-gray-700 leading-relaxed space-y-2 pl-4 border-l-4 border-gray-100">
                 {data.keyAchievements.split('\n').map((line, i) => (
                    line.trim() && <p key={i}>{line}</p>
                 ))}
            </div>
        </section>
      )}

      <h2 className="text-xl font-bold uppercase tracking-wider border-b border-gray-300 pb-2 mb-6 break-inside-avoid">Experience</h2>
      
      {data.experience.map((exp) => (
        <div key={exp.id} className="mb-8 break-inside-avoid">
          <div className="flex justify-between items-baseline mb-1">
            <h3 className="font-bold text-lg text-gray-900">{exp.company}</h3>
            <span className="text-sm text-gray-500 italic">{exp.startDate} {exp.endDate ? `– ${exp.endDate}` : ''}</span>
          </div>
          <p className="text-gray-700 font-medium mb-3">{exp.role}</p>
          <div className="text-gray-600 leading-relaxed whitespace-pre-line pl-4 border-l-2 border-gray-100 text-justify">
            {exp.description}
          </div>
        </div>
      ))}

      <h2 className="text-xl font-bold uppercase tracking-wider border-b border-gray-300 pb-2 mb-6 mt-2 break-inside-avoid">Education & Certifications</h2>
      {data.education.map(edu => (
        <div key={edu.id} className="mb-4 break-inside-avoid">
            <div className="flex justify-between">
            <span className="font-bold">{edu.school}</span>
            <span className="text-sm italic text-gray-500">{edu.year}</span>
            </div>
            <p className="text-gray-700">{edu.degree}</p>
        </div>
      ))}
      
      <div className="mt-6 mb-8 break-inside-avoid">
           <span className="font-bold block mb-2 text-sm uppercase tracking-wider text-gray-500">Certifications</span>
           <p className="text-gray-700">{data.certifications}</p>
      </div>

      <section className="break-inside-avoid">
        <h2 className="text-xl font-bold uppercase tracking-wider border-b border-gray-300 pb-2 mb-4">Technical Skills</h2>
        <p className="leading-relaxed text-gray-700">
          {data.skills.split(',').map((skill, i) => (
            <span key={i} className="inline-block bg-gray-100 px-2 py-1 rounded mr-2 mb-2 border border-gray-200 text-sm">
              {skill.trim()}
            </span>
          ))}
        </p>
      </section>
    </>
  );
}