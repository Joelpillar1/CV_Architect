import React from 'react';
import { ResumeData } from '../../types';

export default function ClassicTemplate({ data }: { data: ResumeData }) {
  return (
    <>
      <div className="text-center border-b-4 border-gray-800 pb-6 mb-8 break-inside-avoid">
        <h1 className="text-5xl font-bold mb-3">{data.fullName}</h1>
        <div className="text-sm space-x-4">
           <span className="font-bold">{data.location}</span>
           <span>•</span>
           <span className="font-bold">{data.phone}</span>
           <span>•</span>
           <span className="font-bold text-blue-800">{data.email}</span>
        </div>
        <p className="mt-2 text-gray-600 text-sm">{data.linkedin}</p>
      </div>

      <section className="mb-8 break-inside-avoid">
        <h2 className="text-lg font-bold uppercase border-b-2 border-gray-300 mb-4 text-blue-900">Professional Summary</h2>
        <p className="text-justify leading-relaxed text-gray-800">{data.summary}</p>
      </section>

      {data.keyAchievements && (
         <section className="mb-8 break-inside-avoid">
           <h2 className="text-lg font-bold uppercase border-b-2 border-gray-300 mb-4 text-blue-900">Key Achievements</h2>
           <div className="text-gray-800 pl-5">
             {data.keyAchievements.split('\n').map((line, i) => (
                line.trim() ? <div key={i} className="mb-1 relative pl-2">
                  <span className="absolute left-[-1rem]">•</span>
                  {line.replace(/^[•-]\s*/, '')}
                </div> : null
             ))}
           </div>
         </section>
      )}

      <h2 className="text-lg font-bold uppercase border-b-2 border-gray-300 mb-4 text-blue-900 break-inside-avoid">Work Experience</h2>
      <div className="space-y-8 mb-8">
        {data.experience.map((exp) => (
        <div key={exp.id} className="break-inside-avoid">
            <div className="flex justify-between items-center mb-1">
            <h3 className="font-bold text-lg text-gray-900">{exp.role}</h3>
            <span className="text-sm font-bold text-gray-600">{exp.startDate} – {exp.endDate}</span>
            </div>
            <p className="font-semibold italic text-gray-700 mb-3">{exp.company}</p>
            <div className="text-gray-800 pl-5">
            {exp.description.split('\n').map((line, i) => (
                line.trim() ? <div key={i} className="mb-1 relative pl-2">
                   <span className="absolute left-[-1rem]">•</span>
                   {line.replace(/^[•-]\s*/, '')}
                </div> : null
            ))}
            </div>
        </div>
        ))}
      </div>

      <h2 className="text-lg font-bold uppercase border-b-2 border-gray-300 mb-4 text-blue-900 break-inside-avoid">Education</h2>
      <div className="mb-8">
        {data.education.map(edu => (
          <div key={edu.id} className="flex justify-between mb-3 break-inside-avoid">
             <div>
                <span className="font-bold block text-gray-900">{edu.school}</span>
                <span className="italic text-gray-700">{edu.degree}</span>
             </div>
             <span className="font-bold text-sm text-gray-600">{edu.year}</span>
          </div>
        ))}
      </div>

      <section className="break-inside-avoid">
        <h2 className="text-lg font-bold uppercase border-b-2 border-gray-300 mb-4 text-blue-900">Core Competencies</h2>
        <div className="grid grid-cols-2 gap-x-8 gap-y-2">
          {data.skills.split(',').map((skill, i) => (
             <div key={i} className="flex items-center">
               <span className="w-1.5 h-1.5 bg-blue-900 rounded-full mr-2 shrink-0"></span>
               <span className="text-gray-800">{skill.trim()}</span>
             </div>
          ))}
        </div>
      </section>
    </>
  );
}