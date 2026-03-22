export const dynamic = "force-dynamic";
import { ContractForm } from '@/components/sections/contact/ContractForm';
import { StrapiImage } from '@/components/ui/StrapiImage';
import { fetchContact } from '@/lib/common'; // Giả định có API fetchContact cho hero

export default async function ContactPage() {
	// Hero động từ API
	const data = await fetchContact();
	const hero = data?.hero;

	return (
		<main className="w-full min-h-screen bg-slate-50 dark:bg-slate-900">
			{/* Hero section (dynamic) */}
			{hero && (
				<section className="relative w-full h-80 md:h-100 flex items-center justify-center overflow-hidden">
					{hero.image && (
						<StrapiImage
							media={hero.image}
							alt={hero.title}
							className="absolute inset-0 w-full h-full object-cover z-0"
							fill
						/>
					)}
					<div className="relative z-10 flex flex-col items-center justify-center w-full h-full bg-black/40">
						<h1 className="text-3xl md:text-5xl font-bold text-white text-center mb-2 drop-shadow-lg uppercase">{hero.title}</h1>
						<p className="text-lg md:text-xl text-white text-center drop-shadow mb-2 max-w-2xl">{hero.subtitle}</p>
					</div>
				</section>
			)}
			{/* Static content below hero */}
			<section className="w-full flex flex-col items-center justify-center py-12 px-4 bg-white dark:bg-background-dark">
				<div className="w-full max-w-6xl flex flex-col md:flex-row gap-8">
					{/* Left: Contact info */}
					<div className="flex-1 flex flex-col gap-6 items-center md:items-start">
						<h2 className="text-2xl font-extrabold mb-4 text-[#0a2c56] tracking-wide uppercase">CONNECT WITH US!</h2>
						<div className="flex flex-col gap-5 w-full max-w-xs">
							{/* Email */}
							<div className="flex items-center gap-4 bg-[#0a2c56] rounded-xl px-6 py-4 shadow-md">
								<div className="flex flex-col items-start">
									<span className="text-yellow-400 font-bold text-base mb-1">Email</span>
									<div className="flex items-center gap-2">
										<svg width="28" height="28" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="6" fill="#0a2c56"/><path d="M4 8.5V16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8.5l-7.293 5.293a1 1 0 0 1-1.414 0L4 8.5Z" fill="#fff"/><path d="M20 6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v.382l8 5.824 8-5.824V6Z" fill="#fff"/></svg>
										<span className="text-white font-medium">support@fotober.com</span>
									</div>
								</div>
							</div>
							{/* Whatsapp */}
							<div className="flex items-center gap-4 bg-[#0a2c56] rounded-xl px-6 py-4 shadow-md">
								<div className="flex flex-col items-start">
									<span className="text-yellow-400 font-bold text-base mb-1">Whatsapp</span>
									<div className="flex items-center gap-2">
										<svg width="28" height="28" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="6" fill="#0a2c56"/><path d="M7.5 7.5h9v9h-9v-9Z" fill="#fff"/><path d="M16.5 7.5h-9v9h9v-9Zm-9-1.5A1.5 1.5 0 0 0 6 7.5v9A1.5 1.5 0 0 0 7.5 18h9a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 16.5 6h-9Z" fill="#fff"/></svg>
										<span className="text-white font-medium">+84 942 110 297</span>
									</div>
								</div>
							</div>
							{/* Address */}
							<div className="flex items-center gap-4 bg-[#0a2c56] rounded-xl px-6 py-4 shadow-md">
								<div className="flex flex-col items-start">
									<span className="text-yellow-400 font-bold text-base mb-1">Address</span>
									<div className="flex items-center gap-2">
										<svg width="28" height="28" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="6" fill="#0a2c56"/><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z" fill="#fff"/></svg>
										<span className="text-white font-medium">Cau Giay District, Hanoi, Vietnam</span>
									</div>
								</div>
							</div>
						</div>
					</div>
					{/* Right: Contact form */}
					<div className="flex-1 flex flex-col items-center">
						<ContractForm  />
					</div>
				</div>
			</section>
		</main>
	);
}
