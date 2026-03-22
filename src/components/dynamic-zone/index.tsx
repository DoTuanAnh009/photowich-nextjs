/**
 * Dynamic Zone Renderer
 * 
 * Maps Strapi dynamic zone components to React components.
 * This is the bridge between CMS data structure and UI.
 */

import { DynamicZoneComponent, ServiceDetail, Services, ShowcaseSection } from "@/types/strapi";


// Import homepage section components
import { HeroSliderSection } from "@/components/sections/home/HeroSliderSection";
import { WhyChooseUsSection } from "@/components/sections/home/WhyChooseUsSection";
import { ServiceListSection } from "@/components/sections/home/ServiceListSection";
import { ProcessStepsSection } from "@/components/sections/home/ProcessStepsSection";
import { TestimonialSection } from "@/components/sections/home/TestimonialSection";
import { PartnersSection } from "@/components/sections/home/PartnersSection";
import { TryForFreeSection } from "@/components/sections/home/TryForFreeSection";
import { FAQSection } from "../sections/service/FAQSection";
import { RichTextSection } from "../sections/service/RichTextSection";
import { ExploreServicesSection } from "../sections/service/ExploreServicesSection";
import { ShowCaseSection } from "../sections/service/ShowcaseSection";
import { HeroSlideService } from "../services/HeroSlideService";


/**
 * Component registry mapping __component to React component
 */
const componentRegistry: Record<string, React.ComponentType<any>> = {
  'home.hero-slider-section': HeroSliderSection,
  'blog.blog-hero-section': HeroSlideService,
  'home.why-choose-us-section': WhyChooseUsSection,
  'home.service-list-section': ServiceListSection,
  'sections.rich-text-section': RichTextSection,
  'blog.text-section': RichTextSection,
  'sections.process-steps-section': ProcessStepsSection,
  'home.testimonial-section': TestimonialSection,
  'home.partners-section': PartnersSection,
  'sections.faq-section': FAQSection,
  'home.try-for-free-section': TryForFreeSection,
  'sections.showcase-section': ShowCaseSection,
  'service.explore-services-section': ExploreServicesSection,
};

interface DynamicZoneProps {
  sections: DynamicZoneComponent[] | null | undefined;
  services?: Services[]| null | undefined;
}

/**
 * Render dynamic zone sections from Strapi
 * 
 * @example
 * <DynamicZone sections={homepage.sections} />
 */
export function DynamicZone({ sections, services }: DynamicZoneProps) {
  if (!sections || sections.length === 0) {
    return null;
  }

  return (
    <>
      {sections.map((section, index) => {
        if (!section || !section.__component) return null;
        const Component = componentRegistry[section.__component];
        if (!Component) {
          // Log warning in development, skip in production
          if (process.env.NODE_ENV === 'development') {
            console.warn(
              `[DynamicZone] Unknown component: ${section?.__component}`
            );
          }
          return null;
        }
        const isShowcaseSlide = section.__component === 'sections.showcase-section' && (section as ShowcaseSection).is_slide === true;
        return (
          <div key={`dz-block-${section.__component}-${section.id}-${index}`}>
            {section.__component === 'home.try-for-free-section' ? (
              <Component {...section} services={services} />
            ) : (
              <Component {...section} />
            )}
            {isShowcaseSlide && services && services.length > 0 && (
              <ExploreServicesSection key={`explore-services-after-slide-${index}`} services={services} />
            )}
          </div>
        );
      })}
    </>
  );
}
