"use client";
import { submitLead } from '@/lib/lead';
import { sendLeadToTelegram } from '@/lib/telegram';
import type { TryForFreeSection } from "@/types/home";
import React from "react";
// Removed uploadFileToStrapi

export function TryForFreeSection({ heading, bullets, services, description }: TryForFreeSection) {
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    service: "",
    message: "",
    imageLinks: [""] as string[],
    shareLink: "",
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

  // Link Management
  const handleImageLinkChange = (index: number, value: string) => {
    const newLinks = [...form.imageLinks];
    newLinks[index] = value;
    setForm(prev => ({ ...prev, imageLinks: newLinks }));
  };

  const addImageLink = () => {
    setForm(prev => ({ ...prev, imageLinks: [...prev.imageLinks, ""] }));
  };

  const removeImageLink = (index: number) => {
    if (form.imageLinks.length > 1) {
      const newLinks = form.imageLinks.filter((_, i) => i !== index);
      setForm(prev => ({ ...prev, imageLinks: newLinks }));
    } else {
      // If only one remains, just clear it instead of removing
      const newLinks = [""];
      setForm(prev => ({ ...prev, imageLinks: newLinks }));
    }
  };

  // Handle change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, files } = e.target as any;
    setForm((prev) => ({ ...prev, [name]: files ? files[0] : value }));
    setErrors((prev: any) => ({ ...prev, [name]: validateField(name, files ? files[0] : value) }));
  };


  // Validate all fields
  const validateAll = () => {
    const newErrors: any = {};
    ["name", "email", "phone", "service"].forEach((field) => {
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
      imageLinks: form.imageLinks.filter(l => l.trim() !== "").map(url => ({ url })),
      status_lead: 'new',
      source: 'website-page',
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
        imageLinks: [""],
        shareLink: "",
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
            <p className="text-slate-600 dark:text-slate-400 text-base max-w-2xl mx-auto">{description}</p>
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
                  <div className="flex flex-col gap-4">
                    <label className="text-sm font-black text-navy-custom dark:text-slate-300 uppercase tracking-wider">Image Links (Cloudinary, Drive, Dropbox...)</label>
                    <div className="flex flex-col gap-3">
                      {form.imageLinks.map((link, index) => (
                        <div key={index} className="flex gap-2 animate-fade-in group">
                          <div className="relative flex-1">
                            <input
                              value={link}
                              onChange={(e) => handleImageLinkChange(index, e.target.value)}
                              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm p-3.5 focus:ring-primary focus:border-primary transition-all pr-10"
                              placeholder={`https://example.com/image-${index + 1}.jpg`}
                              type="url"
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-primary transition-colors material-symbols-outlined text-base">link</span>
                          </div>
                          {form.imageLinks.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeImageLink(index)}
                              className="size-[46px] rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-all shrink-0"
                              title="Remove link"
                            >
                              <span className="material-symbols-outlined text-lg">delete</span>
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={addImageLink}
                      className="flex items-center justify-center gap-2 py-3 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-500 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all"
                    >
                      <span className="material-symbols-outlined text-lg">add_circle</span>
                      ADD MORE LINK
                    </button>
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
