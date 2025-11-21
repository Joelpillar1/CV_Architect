import React from 'react';
import { ResumeData } from '../../types';

export default function ModernTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="p-12 font-sans text-gray-800 max-w-full h-full">
      <header className="mb-8 border-b-2 border-gray-900 pb-6">
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

      <section className="mb-8">
        <p className="text-gray-700 leading-relaxed">{data.summary}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold uppercase tracking-wider border-b border-gray-300 pb-2 mb-4">Experience</h2>
        <div className="space-y-6">
          {data.experience.map((exp) => (
            <div key={exp.id}>
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="font-bold text-lg text-gray-900">{exp.company}</h3>
                <span className="text-sm text-gray-500 italic">{exp.startDate} {exp.endDate ? `– ${exp.endDate}` : ''}</span>
              </div>
              <p className="text-gray-700 font-medium mb-2">{exp.role}</p>
              <div className="text-sm text-gray-600 leading-relaxed whitespace-pre-line pl-4 border-l-2 border-gray-200">
                {exp.description}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold uppercase tracking-wider border-b border-gray-300 pb-2 mb-4">Education & Certifications</h2>
        {data.education.map(edu => (
          <div key={edu.id} className="mb-2">
             <div className="flex justify-between">
                <span className="font-bold">{edu.school}</span>
                <span className="text-sm italic text-gray-500">{edu.year}</span>
             </div>
             <p>{edu.degree}</p>
          </div>
        ))}
        <div className="mt-4 text-sm">
           <span className="font-bold block mb-1">Certifications:</span>
           {data.certifications}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold uppercase tracking-wider border-b border-gray-300 pb-2 mb-4">Technical Skills</h2>
        <p className="text-sm leading-relaxed text-gray-700">
          {data.skills.split(',').map((skill, i) => (
            <span key={i} className="inline-block bg-gray-100 px-2 py-1 rounded mr-2 mb-2 border border-gray-200">
              {skill.trim()}
            </span>
          ))}
        </p>
      </section>
    </div>
  );
}