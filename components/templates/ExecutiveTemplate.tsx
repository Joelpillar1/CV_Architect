import React from 'react';
import { ResumeData } from '../../types';

export default function ExecutiveTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="p-12 font-sans bg-white h-full">
      <div className="flex justify-between items-end border-b-4 border-gray-900 pb-4 mb-8">
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

      <div className="grid grid-cols-12 gap-8">
        {/* Left Column: Main Content */}
        <div className="col-span-8">
           <section className="mb-8">
             <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Profile</h2>
             <p className="text-gray-700 leading-relaxed text-justify">{data.summary}</p>
           </section>

           <section>
             <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Experience</h2>
             <div className="relative border-l-2 border-gray-200 ml-3 space-y-10">
               {data.experience.map((exp) => (
                 <div key={exp.id} className="relative pl-8">
                   <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-4 border-blue-600"></div>
                   <div className="flex justify-between items-baseline mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{exp.role}</h3>
                      <span className="font-mono text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded">{exp.startDate} - {exp.endDate}</span>
                   </div>
                   <div className="text-lg font-medium text-gray-500 mb-3">{exp.company}</div>
                   <div className="text-gray-600 leading-relaxed space-y-2">
                     {exp.description.split('\n').map((line, i) => (
                        line.trim() && <p key={i}>{line}</p>
                     ))}
                   </div>
                 </div>
               ))}
             </div>
           </section>
        </div>

        {/* Right Column: Sidebar Info */}
        <div className="col-span-4 space-y-10">
           <section className="bg-gray-50 p-6 rounded-xl">
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4">Areas of Expertise</h2>
              <ul className="space-y-2 text-sm text-gray-700">
                {data.skills.split(',').map((skill, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-blue-500 mr-2">▸</span>
                    {skill.trim()}
                  </li>
                ))}
              </ul>
           </section>

           <section>
             <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Education</h2>
             {data.education.map(edu => (
               <div key={edu.id} className="mb-4 border-l-2 border-blue-200 pl-4">
                 <div className="font-bold text-gray-900">{edu.school}</div>
                 <div className="text-sm text-gray-600">{edu.degree}</div>
                 <div className="text-xs text-gray-400 mt-1">{edu.year}</div>
               </div>
             ))}
           </section>

           <section>
             <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Certifications</h2>
             <div className="text-sm text-gray-600">
               {data.certifications.split(',').map((cert, i) => (
                 <div key={i} className="mb-2 pb-2 border-b border-gray-100 last:border-0">
                   {cert.trim()}
                 </div>
               ))}
             </div>
           </section>
        </div>
      </div>
    </div>
  );
}