import Link from 'next/link';

interface NavService {
  id: number;
  title: string;
  slug: string;
  category: string;
  description?: string;
  icon?: string;
}

interface ServicesMenuProps {
  groupedServices: Record<string, NavService[]>;
}

const defaultIcons: Record<string, string> = {
  photo: 'photo_camera',
  video: 'videocam',
  architecture: 'view_in_ar',
  default: 'star',
};

export function ServicesMenu({ groupedServices }: ServicesMenuProps) {
  const categories = Object.keys(groupedServices);
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
      {categories.map((cat) => (
        <div key={cat}>
          <h3 className="text-lg font-bold mb-4 text-primary border-b border-slate-200 pb-2 uppercase">{cat}</h3>
          <ul>
            {groupedServices[cat].map((service) => (
              <li key={service.id} className="flex items-start gap-3 mb-6">
                <span className="material-symbols-outlined text-primary text-2xl">
                  {service.icon || defaultIcons[cat] || defaultIcons.default}
                </span>
                <div>
                  <Link href={`/service/${service.slug}`} className="font-semibold text-primary hover:text-orange text-base">
                    {service.title}
                  </Link>
                  {service.description && (
                    <p className="text-slate-500 text-sm mt-1">{service.description}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
