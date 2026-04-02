"use client";
import React from "react";
import type { TryForFreeSection } from "@/types/home";
import { submitLead } from '@/lib/lead';
import { sendLeadToTelegram } from '@/lib/telegram';
import { uploadFileToStrapi } from '@/lib/upload';

export function TryForFreeSection({ heading, bullets, services }: TryForFreeSection) {
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    service: "",
    message: "",
    file: null,
    shareLink: "",
    attachments: null,
  });
  const [errors, setErrors] = React.useState<any>({});
  const [submitStatus, setSubmitStatus] = React.useState<string | null>(null);
  const [showToast, setShowToast] = React.useState(false);

  // Validate field
  const validateField = (field: string, value: any) => {
    switch (field) {
      case "name":
        return value.trim() ? "" : "The field is required.";
      case "email":
        if (!value.trim()) return "The field is required.";
        // Simple email regex
        return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value) ? "" : "Invalid email format.";
      case "phone":
        if (!value.trim()) return "The field is required.";
        if (!/^\d+$/.test(value)) return "Invalid phone number.";
        return value.length > 7 ? "" : "Phone must be at least 8 digits.";
      case "service":
        return value ? "" : "The field is required.";
      default:
        return "";
    }
  };

  // Handle change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, files } = e.target as any;
    setForm((prev) => ({ ...prev, [name]: files ? files[0] : value }));
    setErrors((prev:any) => ({ ...prev, [name]: validateField(name, files ? files[0] : value) }));
  };

  // Handle file upload
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setForm((prev: any) => ({ ...prev, file }));
    setErrors((prev: any) => ({ ...prev, file: validateField("file", file) }));
    if (file) {
      try {
        const uploadedId = await uploadFileToStrapi(file);
        setForm((prev: any) => ({ ...prev, attachments: [uploadedId] }));
      } catch (err) {
        setForm((prev: any) => ({ ...prev, attachments: null }));
        setErrors((prev: any) => ({ ...prev, file: 'File upload failed' }));
      }
    } else {
      setForm((prev: any) => ({ ...prev, attachments: null }));
    }
  };

  // Validate all fields
  const validateAll = () => {
    const newErrors: any = {};
    ["name", "email", "phone", "service", "file"].forEach((field) => {
      newErrors[field] = validateField(field, form[field as keyof typeof form]);
    });
    setErrors(newErrors);
    return Object.values(newErrors).every((err) => !err);
  };

  // Handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateAll()) return;
    setSubmitStatus(null);
    const leadData = {
      full_name: form.name,
      email: form.email,
      company: form.company,
      phone: form.phone,
      service: form.service,
      message: form.message,
      shareLink: form.shareLink,
      status_lead: 'new',
      source: 'website-page',
      attachments: form.attachments,
    };
    try {
      await submitLead(leadData);
      const serviceName = services?.find(s => String(s.documentId) === String(form.service))?.title || "Chưa chọn";
      await sendLeadToTelegram({ ...leadData, service: { name: serviceName } });
      setSubmitStatus('success');
      setShowToast(true);
      setForm({
        name: "",
        email: "",
        company: "",
        phone: "",
        service: "",
        message: "",
        file: null,
        shareLink: "",
        attachments: null,
      });
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
      <section className="bg-slate-50 dark:bg-slate-800/20 py-8 px-2" id="try-free">
      <div className="max-w-4xl w-full mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-navy-custom dark:text-white text-2xl md:text-3xl font-black uppercase mb-2 tracking-tight">{heading || "TRY FOR FREE"}</h2>
          <p className="text-slate-600 dark:text-slate-400 text-base max-w-2xl mx-auto">Experience our services with no commitment. Get your sample photos professionally edited in record time.</p>
        </div>
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          {/* 3 bước bên trái */}
          <div className="w-full lg:w-[40%] flex flex-col gap-10">
            {bullets?.map((step, idx) => (
              <div className="flex gap-6 items-start group" key={step.id || idx}>
                <div className="size-14 rounded-full bg-primary text-white flex items-center justify-center font-bold text-2xl shrink-0 shadow-lg shadow-primary/20 transition-transform group-hover:scale-110">{idx + 1}</div>
                <div className="pt-1">
                  <h4 className="font-black text-xl text-navy-custom dark:text-white mb-2 uppercase tracking-wide">{step.heading}</h4>
                  <p className="text-slate-500 dark:text-slate-400 text-base leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
          {/* Form bên phải */}
          <div className="w-full lg:w-[60%]">
            <div className="bg-white dark:bg-slate-900 p-8 md:p-10 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800">
              <form className="flex flex-col gap-6" onSubmit={handleSubmit} noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-black text-navy-custom dark:text-slate-300 uppercase tracking-wider">Full Name</label>
                    <input name="name" value={form.name} onChange={handleChange} className={`w-full rounded-xl border ${errors.name ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'} dark:bg-slate-800 text-sm p-3.5 focus:ring-primary focus:border-primary`} placeholder="Enter your full name" type="text" />
                    {errors.name && <span className="text-red-500 text-xs mt-1">{errors.name}</span>}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-black text-navy-custom dark:text-slate-300 uppercase tracking-wider">Email</label>
                    <input name="email" value={form.email} onChange={handleChange} className={`w-full rounded-xl border ${errors.email ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'} dark:bg-slate-800 text-sm p-3.5 focus:ring-primary focus:border-primary`} placeholder="example@email.com" type="email" />
                    {errors.email && <span className="text-red-500 text-xs mt-1">{errors.email}</span>}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-black text-navy-custom dark:text-slate-300 uppercase tracking-wider">company name/website</label>
                    <input name="company" value={form.company} onChange={handleChange} className="w-full rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm p-3.5 focus:ring-primary focus:border-primary" placeholder="Your business name" type="text" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-black text-navy-custom dark:text-slate-300 uppercase tracking-wider">Phone</label>
                    <input name="phone" value={form.phone} onChange={handleChange} className={`w-full rounded-xl border ${errors.phone ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'} dark:bg-slate-800 text-sm p-3.5 focus:ring-primary focus:border-primary`} placeholder="Your phone number" type="tel" />
                    {errors.phone && <span className="text-red-500 text-xs mt-1">{errors.phone}</span>}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-black text-navy-custom dark:text-slate-300 uppercase tracking-wider">Interested Service</label>
                  <div className="relative">
                    <select
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                      className={`w-full rounded-xl border pr-10 ${errors.service ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'} dark:bg-slate-800 text-sm p-3.5 focus:ring-primary focus:border-primary appearance-none`}
                    >
                      <option value="">Choose service...</option>
                      {services && services.length > 0 ? (
                        services.map((s: any) => (
                          <option key={s.documentId || s.id} value={s.documentId || s.id}>{s.title}</option>
                        ))
                      ) : (
                        <option value="other">Other</option>
                      )}
                    </select>
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 material-symbols-outlined text-lg">expand_more</span>
                  </div>
                  {errors.service && <span className="text-red-500 text-xs mt-1">{errors.service}</span>}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-black text-navy-custom dark:text-slate-300 uppercase tracking-wider">Message</label>
                  <textarea name="message" value={form.message} onChange={handleChange} className="w-full rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm p-3.5 focus:ring-primary focus:border-primary" placeholder="Describe your specific editing requirements..." rows={4}></textarea>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-black text-navy-custom dark:text-slate-300 uppercase tracking-wider">Upload File</label>
                  <input name="file" type="file" onChange={handleFileChange} className={`border border-2 border-dashed ${errors.file ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'} rounded-xl p-4 bg-slate-50/50 dark:bg-slate-800/50 cursor-pointer hover:bg-slate-100 transition-colors`} />
                  {errors.file && <span className="text-red-500 text-xs mt-1">{errors.file}</span>}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-black text-navy-custom dark:text-slate-300 uppercase tracking-wider">Share Link (Drive/Dropbox)</label>
                  <input name="shareLink" value={form.shareLink} onChange={handleChange} className="w-full rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm p-3.5 focus:ring-primary focus:border-primary h-full" placeholder="https://drive.google.com/..." type="url" />
                </div>
                <button className="w-full bg-orange-custom text-navy-custom font-black py-4 rounded-xl shadow-lg hover:shadow-orange-custom/20 transition-all hover:scale-[1.02] active:scale-95 mt-4 text-lg uppercase tracking-widest" type="submit">
                  SEND REQUEST NOW
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
