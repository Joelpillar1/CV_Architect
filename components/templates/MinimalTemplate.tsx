import React from 'react';
import { ResumeData } from '../../types';
import { Mail, Phone, Linkedin, MapPin } from 'lucide-react';

export default function MinimalTemplate({ data }: { data: ResumeData }) {
  return (
    <>
       {/* Header */}
       <header className="mb-12 break-inside-avoid">
         <h1 className="text-6xl font-light tracking-tighter mb-4 text-black">{data.fullName}</h1>
         <p className="text-sm font-medium text-gray-400 uppercase tracking-[0.2em