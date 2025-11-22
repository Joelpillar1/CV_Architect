import React from 'react';
import { ResumeData } from '../../types';
import { Linkedin, Mail, AtSign } from 'lucide-react';

const formatMonthYear = (dateString: string) => {
  if (!dateString || dateString.toLowerCase() === 'present') {
    return 'Present';
  }
  try {
    const [year, month] = dateString.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleString('en-US', { month: 'short', year: 'numeric' });
  } catch (e) {
    return dateString; // Failsafe for any other format
  }
};

export default function VanguardTemplate({ data }: { data: ResumeData }) {
  // Split skills for the two-column layout
  const skills = data.skills.split(',').map(s => s.trim());
  const midPoint = Math.ceil(skills.length / 2);
  const skillsCol1 = skills.slice(0, midPoint);
  const skillsCol2 = skills.slice(midPoint);

  return (
    <div className="font-sans text-gray-800 text-sm">
      {/* Header */}
      <header className="text-center mb-6 break-inside-avoid">
        <h1 className="text-4xl font-bold text-black mb-1">{data.fullName}</h1>
        <p className="text-lg text-gray-600">{data.jobTitle}</p>
      </header>
      
      <hr className="border-gray-300" />

      {/* Contact Info */}
      <section className="my-4 grid grid-cols-3 gap-4 text-xs text-center break-inside-avoid">
        <div className="flex items-center justify-center gap-2">
          <Linkedin size={14} className="text-gray-600" />
          <span className="text-gray-700">{data.linkedin}</span>
        </div>
        <div className="flex items-center justify-center gap-2">
          <Mail size={14} className="text-gray-600" />
          <span className="text-gray-700">{data.email}</span>
        </div>
        <div className="flex items-center justify-center gap-2">
          <AtSign size={14} className="text-gray-600" />
          <span className="text-gray-700">{data.atHandle}</span>
        </div>
      </section>

      <hr className="border-gray-300 mb-6" />

      {/* Professional Summary */}
      <section className="mb-6 break-inside-avoid">
        <h2 className="text-xs font-bold uppercase tracking-widest border-b-2 border-black pb-1 mb-3">Professional Summary</h2>
        <p className="text-sm leading-relaxed text-justify">{data.summary}</p>
      </section>

      {/* Areas of Expertise */}
      <section className="mb-6 break-inside-avoid">
        <h2 className="text-xs font-bold uppercase tracking-widest border-b-2 border-black pb-1 mb-3">Areas of Expertise</h2>
        <div className="grid grid-cols-2 gap-x-8 text-sm">
          <ul className="list-disc list-inside space-y-1">
            {skillsCol1.map((skill, i) => <li key={i}>{skill}</li>)}
          </ul>
          <ul className="list-disc list-inside space-y-1">
            {skillsCol2.map((skill, i) => <li key={i}>{skill}</li>)}
          </ul>
        </div>
      </section>

      {/* Key Achievement */}
      {data.keyAchievements && (
        <section className="mb-6 break-inside-avoid">
          <h2 className="text-xs font-bold uppercase tracking-widest border-b-2 border-black pb-1 mb-3">Key Achievement</h2>
          <ul className="list-disc list-inside space-y-1 text-sm">
            {data.keyAchievements.split('\n').map((line, i) => (
              line.trim() && <li key={i}>{line.replace(/^[•-]\s*/, '')}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Professional Experience */}
      <section className="mb-6">
        <h2 className="text-xs font-bold uppercase tracking-widest border-b-2 border-black pb-1 mb-4 break-inside-avoid">Professional Experience</h2>
        <div className="space-y-6">
          {data.experience.map(exp => (
            <div key={exp.id} className="break-inside-avoid">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="text-base font-bold">{exp.role}</h3>
                <span className="text-xs text-gray-500 font-medium">{formatMonthYear(exp.startDate)} - {formatMonthYear(exp.endDate)}</span>
              </div>
              <p className="text-sm italic text-gray-600 mb-2">{exp.company}</p>
              <ul className="list-disc list-inside space-y-1 text-sm pl-2">
                {exp.description.split('\n').map((line, i) => (
                   line.trim() && <li key={i}>{line.replace(/^[•-]\s*/, '')}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="mb-6 break-inside-avoid">
        <h2 className="text-xs font-bold uppercase tracking-widest border-b-2 border-black pb-1 mb-3">Education</h2>
        <div className="flex justify-between items-baseline">
            <div>
                <h3 className="text-base font-bold">{data.education[0]?.degree || ''}</h3>
                <p className="text-sm italic text-gray-600">{data.education[0]?.school || ''}</p>
            </div>
            <span className="text-xs text-gray-500 font-medium">{data.education[0]?.year || ''}</span>
        </div>
      </section>

      {/* Certification */}
      {data.certifications && (
        <section className="break-inside-avoid">
          <h2 className="text-xs font-bold uppercase tracking-widest border-b-2 border-black pb-1 mb-3">Certification</h2>
          <ul className="list-disc list-inside text-sm">
            <li>{data.certifications}</li>
          </ul>
        </section>
      )}
    </div>
  );
}