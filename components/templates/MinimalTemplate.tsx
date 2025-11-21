import React from 'react';
import { ResumeData } from '../../types';

export default function MinimalTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="p-12 text-gray-800 h-full max-w-full flex flex-col">
       <header className="mb-12">
         <h1 className="text-6xl font-light tracking-tighter mb-4 text-black">{data.fullName}</h1>
         <div className="flex text-sm font-medium text-gray-400 uppercase tracking-widest space-x-6">
            <span>{data.jobTitle}</span>
            <span>{data.location}</span>
         </div>
       </header>

       <div className="flex-1 grid grid-cols-12 gap-12">
         <div className="col-span-3 space-y-12">
            <div>
              <h3 className="font-bold text-black mb-4 text-sm">CONTACT</h3>
              <div className="text-gray-500 space-y-1 flex flex-col text-sm">
                <span>{data.email}</span>
                <span>{data.phone}</span>
                <span className="truncate">{data.linkedin}</span>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-black mb-4 text-sm">EDUCATION</h3>
              <div className="space-y-4">
                {data.education.map(edu => (
                  <div key={edu.id} className="text-gray-500">
                    <div className="text-gray-900 font-medium">{edu.school}</div>
                    <div>{edu.degree}</div>
                    <div className="text-xs mt-1">{edu.year}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-bold text-black mb-4 text-sm">SKILLS</h3>
              <div className="flex flex-wrap gap-2">
                 {data.skills.split(',').map((skill, i) => (
                   <span key={i} className="text-xs text-gray-600 border border-gray-200 px-2 py-1 rounded-sm">{skill.trim()}</span>
                 ))}
              </div>
            </div>
         </div>

         <div className="col-span-9 space-y-12 border-l border-gray-100 pl-12">
            <div>
               <h3 className="font-bold text-black mb-4 text-sm tracking-widest">ABOUT</h3>
               <p className="text-gray-600 leading-7 font-light text-lg">{data.summary}</p>
            </div>

            <div>
              <h3 className="font-bold text-black mb-8 text-sm tracking-widest">EXPERIENCE</h3>
              <div className="space-y-10">
                {data.experience.map(exp => (
                  <div key={exp.id} className="group">
                    <div className="flex items-baseline justify-between mb-2">
                       <h4 className="text-xl font-medium text-black group-hover:text-blue-600 transition-colors">{exp.role}</h4>
                       <span className="text-sm text-gray-400 font-light">{exp.startDate} — {exp.endDate}</span>
                    </div>
                    <div className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">{exp.company}</div>
                    <div className="text-gray-600 leading-relaxed">
                       {exp.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
         </div>
       </div>
    </div>
  );
}