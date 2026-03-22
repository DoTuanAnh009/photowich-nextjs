"use client";
import { sendLeadToTelegram } from '@/lib/telegram';
import { submitLead } from '@/lib/lead';
import React from "react";

export const ContractForm = () => {
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = React.useState<any>({});

  // Validate field
  const validateField = (field: string, value: any) => {
    switch (field) {
      case "name":
        return value.trim() ? "" : "The field is required.";
      case "email":
        if (!value.trim()) return "The field is required.";
        return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value) ? "" : "Invalid email format.";
      case "phone":
        if (!value.trim()) return "The field is required.";
        return /^\+?\d{7,}$/.test(value) ? "" : "Invalid phone number.";
      default:
        return "";
    }
  };

  // Handle change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev: any) => ({ ...prev, [name]: validateField(name, value) }));
  };

  // Validate all fields
  const validateAll = () => {
    const newErrors: any = {};
    ["name", "email", "phone"].forEach((field) => {
      newErrors[field] = validateField(field, form[field as keyof typeof form]);
    });
    setErrors(newErrors);
    return Object.values(newErrors).every((err) => !err);
  };

  // Handle submit
  const [submitStatus, setSubmitStatus] = React.useState<string | null>(null);
  const [showToast, setShowToast] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateAll()) return;
    setSubmitStatus(null);
    const leadData = {
      full_name: form.name,
      email: form.email,
      phone: form.phone,
      message: form.message,
      status_lead: 'new',
      source: 'contact-page',
    };
    try {
      await submitLead(leadData);
      await sendLeadToTelegram(leadData);
      setSubmitStatus('success');
      setShowToast(true);
      setForm({ name: '', email: '', phone: '', message: '' });
      setErrors({});
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      setSubmitStatus('error');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  return (
    <>
      {showToast && submitStatus === 'success' && (
        <div className="fixed top-6 right-6 z-50 bg-green-600 text-white font-bold px-6 py-3 rounded-xl shadow-lg animate-fade-in">
          Your request has been submitted successfully!
        </div>
      )}
      {showToast && submitStatus === 'error' && (
        <div className="fixed top-6 right-6 z-50 bg-red-600 text-white font-bold px-6 py-3 rounded-xl shadow-lg animate-fade-in">
          Failed to submit. Please try again.
        </div>
      )}
      <div className="bg-white dark:bg-slate-900 p-10 md:p-16 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800 max-w-2xl w-full mx-auto">
      <form className="flex flex-col gap-6" onSubmit={handleSubmit} noValidate>
        {submitStatus === 'success' && (
          <div className="text-green-600 font-bold text-center mb-2">Your request has been submitted successfully!</div>
        )}
        {submitStatus === 'error' && (
          <div className="text-red-600 font-bold text-center mb-2">Failed to submit. Please try again.</div>
        )}
        <h2 className="text-2xl font-extrabold mb-4 text-[#0a2c56] tracking-wide uppercase text-center">HOW CAN WE HELP YOU?</h2>
        <div className="flex flex-col gap-2">
          <label className="text-lg font-bold text-[#0a2c56] mb-1">Name<span className="text-red-500">*</span></label>
            <input name="name" value={form.name} onChange={handleChange} className={`w-full rounded-xl border ${errors.name ? 'border-red-500' : 'border-slate-300'} text-base p-3 shadow-md focus:ring-primary focus:border-primary`} placeholder="For example: John Wick" type="text" />
            {errors.name && <span className="text-red-500 text-xs mt-1">{errors.name}</span>}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-lg font-bold text-[#0a2c56] mb-1">Email<span className="text-red-500">*</span></label>
            <input name="email" value={form.email} onChange={handleChange} className={`w-full rounded-xl border ${errors.email ? 'border-red-500' : 'border-slate-300'} text-base p-3 shadow-md focus:ring-primary focus:border-primary`} placeholder="For example: JohnWick@gmail.com" type="email" />
            {errors.email && <span className="text-red-500 text-xs mt-1">{errors.email}</span>}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-lg font-bold text-[#0a2c56] mb-1">Phone number<span className="text-red-500">*</span></label>
            <input name="phone" value={form.phone} onChange={handleChange} className={`w-full rounded-xl border ${errors.phone ? 'border-red-500' : 'border-slate-300'} text-base p-3 shadow-md focus:ring-primary focus:border-primary`} placeholder="For example: +123456789" type="tel" />
            {errors.phone && <span className="text-red-500 text-xs mt-1">{errors.phone}</span>}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-lg font-bold text-[#0a2c56] mb-1">Anything you want us to know</label>
            <textarea name="message" value={form.message} onChange={handleChange} className="w-full rounded-xl border border-slate-300 text-base p-3 shadow-md focus:ring-primary focus:border-primary" placeholder="Write your message here..." rows={4}></textarea>
          </div>
          <button className="w-full bg-[#fdb913] text-[#0a2c56] font-black py-3 rounded-xl shadow-lg hover:shadow-orange-custom/20 transition-all hover:scale-[1.02] active:scale-95 mt-4 text-lg uppercase tracking-widest flex items-center justify-center gap-2" type="submit">
            SUBMIT
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" className="ml-2">
              <rect width="24" height="24" rx="6" fill="#fdb913" />
              <path d="M8 12h8m0 0l-3-3m3 3l-3 3" stroke="#0a2c56" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </form>
        </div>
      </>
    );
}
