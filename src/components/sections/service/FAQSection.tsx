"use client";
import type { FAQSection as FAQSectionType } from '@/types/service';
import { useState } from 'react';

export function FAQSection({ heading, faqs }: FAQSectionType) {
  const [openId, setOpenId] = useState<number | null>(null);
  if (!faqs || faqs.length === 0) return null;
  return (
    <section className=" bg-slate-100 dark:bg-[#E8E8E8]">
      <div className='py-6  max-w-5xl mx-auto px-6 mt-3'>
        {heading && <h2 className="text-2xl md:text-3xl text-center font-bold mb-8 text-primary dark:text-white">{heading}</h2>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 ">
        {faqs.map((item, idx) => (
          <div key={item.id} className="py-6 px-2">
            <button
              className="flex items-center pointer-events-auto w-full text-left gap-4 focus:outline-none"
              onClick={() => setOpenId(openId === item.id ? null : item.id)}
              aria-expanded={openId === item.id}
              aria-controls={`faq-answer-${item.id}`}
            >
              <span className={`material-symbols-outlined text-primary text-2xl transition-all duration-300 ${openId === item.id ? 'rotate-180' : ''}`}>{openId === item.id ? 'remove_circle' : 'add_circle'}</span>
              <span className="font-semibold text-primary pointer-events-auto dark:text-white text-lg">{item.question}</span>
            </button>
            <div
              id={`faq-answer-${item.id}`}
              className={`overflow-hidden transition-all duration-300 ease-in-out ${openId === item.id ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}
            >
              <p className="text-slate-600 dark:text-slate-400">{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
}
