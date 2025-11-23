import React from 'react';
import { ResumeData } from '../../types';
import { Mail, Phone, Linkedin, MapPin } from 'lucide-react';

const formatMonthYear = (dateString: string) => {
  if (!dateString || dateString.toLowerCase() === 'present') {
    return 'Present';
  }
  try {
    const [year, month] = dateString.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleString('en-US', { month: 'short', year: 'numeric' });
  } catch (e) {
    return dateString;
  }
};

export default function MinimalTemplate({ data }: { data: ResumeData }) {
  return (
    <>
       {/* Header */}
       <header className="mb-12 break-inside-avoid">
         <h1 className="text-6xl font-light tracking-tighter mb-4 text-black">{data.fullName}</h1>
         <p className="text-sm font-medium text-gray-400 uppercase tracking-[0.2em]">{data.jobTitle}</p>
       </header>

       {/* Contact Grid */}
       <section className="mb-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-xs font-medium text-gray-500 break-inside-avoid border-b border-gray-100 pb-8">
          <div className="flex flex-col gap-1">
            <span className="uppercase tracking-wider text-gray-300 text-[10px]">Email</span>
            <span className="text-black break-all">{data.email}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="uppercase tracking-wider text-gray-300 text-[10px]">Phone</span>
            <span className="text-black">{data.phone}</span>
          </div>
          <div className="flex flex-col gap-1">
             <span className="uppercase tracking-wider text-gray-300 text-[10px]">Location</span>
             <span className="text-black">{data.location}</span>
          </div>
          <div className="flex flex-col gap-1">
             <span className="uppercase tracking-wider text-gray-300 text-[10px]">Social</span>
             <span className="text-black truncate">{data.linkedin}</span>
          </div>
       </section>

       <div className="grid grid-cols-1 gap-12">
          {/* Summary */}
          <section className="break-inside-avoid">
            <h2 className="text-xs font-bold uppercase tracking-widest mb-6 text-black">About</h2>
            <p className="text-gray-600 leading-loose font-light text-sm text-justify">{data.summary}</p>
          </section>
          
          {/* Experience */}
          <section>
             <h2 className="text-xs font-bold uppercase tracking-widest mb-8 text-black">Experience</h2>
             <div className="space-y-12">
                {data.experience.map(exp => (
                   <div key={exp.id} className="break-inside-avoid group">
                      <div className="flex justify-between items-baseline mb-2">
                         <h3 className="text-lg font-normal text-black">{exp.company}</h3>
                         <span className="text-xs text-gray-400 font-mono">
                           {formatMonthYear(exp.startDate)} — {formatMonthYear(exp.endDate)}
                         </span>
                      </div>
                      <div className="text-sm font-medium text-gray-500 mb-4">{exp.role}</div>
                      <p className="text-gray-600 text-sm leading-relaxed font-light text-justify whitespace-pre-line">{exp.description}</p>
                   </div>
                ))}
             </div>
          </section>

           {/* Achievements */}
           {data.keyAchievements && (
            <section className="break-inside-avoid">
                <h2 className="text-xs font-bold uppercase tracking-widest mb-6 text-black">Impact</h2>
                <div className="text-gray-600 text-sm leading-loose font-light space-y-2">
                    {data.keyAchievements.split('\n').map((line, i) => (
                    line.trim() && <p key={i}>{line.replace(/^[•-]\s*/, '')}</p>
                    ))}
                </div>
            </section>
           )}

          {/* Education & Skills Grid */}
          <div className="grid grid-cols-2 gap-12 break-inside-avoid">
             <section>
                <h2 className="text-xs font-bold uppercase tracking-widest mb-6 text-black">Education</h2>
                <div className="space-y-6">
                   {data.education.map(edu => (
                      <div key={edu.id}>
                         <div className="text-sm font-bold text-black">{edu.school}</div>
                         <div className="text-xs text-gray-500 mb-1">{edu.degree}</div>
                         <div className="text-[10px] text-gray-400">{edu.year}</div>
                      </div>
                   ))}
                </div>
             </section>

             <section>
                <h2 className="text-xs font-bold uppercase tracking-widest mb-6 text-black">Expertise</h2>
                <div className="text-sm text-gray-600 leading-loose font-light">
                   {data.skills.split(',').map((skill, i) => (
                      <div key={i} className="mb-1">{skill.trim()}</div>
                   ))}
                </div>
             </section>
          </div>
       </div>
    </>
  );
}