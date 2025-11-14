import Script from 'next/script'
import { siteConfig } from '@/config/site'

export function StructuredData() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'AdComSys 2026',
    url: siteConfig.url,
    logo: `${siteConfig.url}/assets/logos/adcomsys-logo.png`,
    description: siteConfig.description,
    email: siteConfig.links.email,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IN',
      addressLocality: 'Kolkata',
      addressRegion: 'West Bengal',
    },
    parentOrganization: {
      '@type': 'EducationalOrganization',
      name: 'University of Engineering and Management, Kolkata',
      url: 'https://uem.edu.in',
    },
  }

  const eventSchema = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: 'AdComSys 2026 - Third International Conference on Advanced Computing and Systems',
    description: siteConfig.description,
    startDate: '2026-06-25',
    endDate: '2026-06-26',
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/MixedEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: 'University of Engineering and Management',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'University Area, Plot No. III, B/5, New Town',
        addressLocality: 'Kolkata',
        addressRegion: 'West Bengal',
        postalCode: '700160',
        addressCountry: 'IN',
      },
    },
    image: [`${siteConfig.url}${siteConfig.ogImage}`],
    organizer: {
      '@type': 'Organization',
      name: 'UEM Kolkata - Department of CST & CSIT',
      url: siteConfig.url,
      email: siteConfig.links.email,
    },
    offers: [
      {
        '@type': 'Offer',
        name: 'Student Registration',
        price: '5500',
        priceCurrency: 'INR',
        availability: 'https://schema.org/InStock',
        url: `${siteConfig.url}/registration`,
        validFrom: '2025-11-15',
      },
      {
        '@type': 'Offer',
        name: 'Academic Registration',
        price: '6000',
        priceCurrency: 'INR',
        availability: 'https://schema.org/InStock',
        url: `${siteConfig.url}/registration`,
        validFrom: '2025-11-15',
      },
    ],
    performer: {
      '@type': 'PerformingGroup',
      name: 'Distinguished Keynote Speakers',
    },
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    publisher: {
      '@type': 'Organization',
      name: 'UEM Kolkata',
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/assets/logos/adcomsys-logo.png`,
      },
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <>
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <Script
        id="event-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(eventSchema),
        }}
      />
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
    </>
  )
}
