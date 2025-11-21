import React from 'react';
import { ResumeData } from '../../types';

export default function ClassicTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="p-12 font-serif text-gray-900 max-w-full h-full leading-normal">
      <div className="text-center border-b-4 border-gray-800 pb-6 mb-8">
        <h1 className="text-5xl font-bold mb-3">{data.fullName}</h1>
        <div className="text-sm space-x-4">
           <span className="font-bold">{data.location}</span>
           <span>•</span>
           <span className="font-bold">{data.phone}</span>
           <span>•</span>
           <span className="font-bold text-blue-800">{data.email}</span>
        </div>
        <p className="mt-2 text-gray-600">{data.linkedin}</p>
      </div>

      <section className="mb-8">
        <h2 className="text-lg font-bold uppercase border-b-2 border-gray-300 mb-4 text-blue-900">Professional Summary</h2>
        <p className="text-justify text-sm leading-6">{data.summary}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold uppercase border-b-2 border-gray-300 mb-4 text-blue-900">Work Experience</h2>
        <div className="space-y-6">
          {data.experience.map((exp) => (
            <div key={exp.id}>
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-bold text-lg">{exp.role}</h3>
                <span className="text-sm font-bold text-gray-600">{exp.startDate} – {exp.endDate}</span>
              </div>
              <p className="font-semibold italic text-gray-700 mb-2">{exp.company}</p>
              <div className="text-sm text-gray-800 pl-5 list-disc">
                {exp.description.split('\n').map((line, i) => (
                   line.trim() ? <div key={i} className="mb-1">• {line.replace(/^[•-]\s*/, '')}</div> : null
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold uppercase border-b-2 border-gray-300 mb-4 text-blue-900">Education</h2>
        {data.education.map(edu => (
          <div key={edu.id} className="flex justify-between mb-2">
             <div>
                <span className="font-bold block">{edu.school}</span>
                <span className="italic">{edu.degree}</span>
             </div>
             <span className="font-bold text-sm">{edu.year}</span>
          </div>
        ))}
      </section>

      <section>
        <h2 className="text-lg font-bold uppercase border-b-2 border-gray-300 mb-4 text-blue-900">Core Competencies</h2>
        <div className="grid grid-cols-2 gap-2 text-sm">
          {data.skills.split(',').map((skill, i) => (
             <div key={i} className="flex items-center">
               <span className="w-1.5 h-1.5 bg-blue-900 rounded-full mr-2"></span>
               {skill.trim()}
             </div>
          ))}
        </div>
      </section>
    </div>
  );
}