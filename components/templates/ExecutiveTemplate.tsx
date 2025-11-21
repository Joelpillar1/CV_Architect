import React from 'react';
import { ResumeData } from '../../types';

export default function ExecutiveTemplate({ data }: { data: ResumeData }) {
  return (
    <>
      <div className="flex justify-between items-end border-b-4 border-gray-900 pb-6 mb-8 break-inside-avoid">
        <div>
          <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 uppercase">{data.fullName.split(' ')[0]} <span className="text-gray-400">{data.fullName.split(' ').slice(1).join(' ')}</span></h1>
          <p className="text-xl font-bold text-brand-green mt-2 tracking-wide">{data.jobTitle}</p>
        </div>
        <div className="text-right text-sm text-gray-600 space-y-1 font-medium">
          <p>{data.email}</p>
          <p>{data.phone}</p>
          <p>{data.location}</p>
        </div>
      </div>

      <section className="mb-8 break-inside-avoid">
        <h2 className="text-xs font-black text-gray-900 uppercase tracking-[0.2em] mb-4 border-l-4 border-brand-green pl-3">Executive Profile</h2>
        <p className="text-gray-700 leading-loose text-justify font-medium">{data.summary}</p>
      </section>

      {data.keyAchievements && (
        <section className="mb-10 break-inside-avoid">
            <h2 className="text-xs font-black text-gray-900 uppercase tracking-[0.2em] mb-4 border-l-4 border-brand-green pl-3">Key Achievements</h2>
            <div className="text-gray-700 leading-relaxed space-y-3 bg-gray-50 p-6 rounded-r-xl border-l-4 border-gray-900">
                    {data.keyAchievements.split('\n').map((line, i) => (
                    line.trim() && <p key={i} className="flex gap-3">
                        <span className="font-bold text-brand-green">→</span>
                        {line.replace(/^[•-]\s*/, '')}
                    </p>
                    ))}
            </div>
        </section>
      )}

      <div className="mb-8">
        <h2 className="text-xs font-black text-gray-900 uppercase tracking-[0.2em] mb-6 border-l-4 border-brand-green pl-3 break-inside-avoid">Professional Experience</h2>
        <div className="space-y-10">
            {data.experience.map((exp) => (
            <div key={exp.id} className="break-inside-avoid relative">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-2xl font-bold text-gray-900">{exp.role}</h3>
                  <span className="text-sm font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{exp.startDate} — {exp.endDate}</span>
                </div>
                <div className="text-brand-green font-bold uppercase tracking-wider text-sm mb-4">{exp.company}</div>
                <div className="text-gray-700 leading-relaxed space-y-2">
                    {exp.description.split('\n').map((line, i) => (
                        line.trim() ? <div key={i} className="flex gap-3">
                            <span className="text-gray-300 mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0 block"></span>
                            <span className="flex-1">{line.replace(/^[•-]\s*/, '')}</span>
                        </div> : null
                    ))}
                </div>
            </div>
            ))}
        </div>
      </div>
      
      <section className="break-inside-avoid bg-gray-900 text-white p-8 -mx-8 mb-8 rounded-sm">
         <h2 className="text-xs font-black text-brand-green uppercase tracking-[0.2em] mb-6">Core Competencies</h2>
         <div className="flex flex-wrap gap-3">
            {data.skills.split(',').map((skill, i) => (
                <span key={i} className="border border-gray-700 px-4 py-2 text-sm font-medium tracking-wide hover:bg-gray-800 transition-colors">
                    {skill.trim()}
                </span>
            ))}
         </div>
      </section>

      <section className="break-inside-avoid">
          <h2 className="text-xs font-black text-gray-900 uppercase tracking-[0.2em] mb-6 border-l-4 border-brand-green pl-3">Education</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {data.education.map(edu => (
                 <div key={edu.id} className="bg-gray-50 p-5 border border-gray-100">
                     <div className="font-bold text-gray-900 text-lg">{edu.school}</div>
                     <div className="text-brand-green font-medium">{edu.degree}</div>
                     <div className="text-gray-400 text-sm mt-2">{edu.year}</div>
                 </div>
             ))}
          </div>
      </section>
    </>
  );
}