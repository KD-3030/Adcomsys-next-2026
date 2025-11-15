import Script from 'next/script'
import { siteConfig } from '@/config/site'

export function StructuredData() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'AdComSys 2026',
    alternateName: 'International Conference on Advanced Computing and Systems',
    url: siteConfig.url,
    logo: `${siteConfig.url}/assets/logos/adcomsys-logo.png`,
    description: siteConfig.description,
    email: siteConfig.links.email,
    foundingDate: '2024',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IN',
      addressLocality: 'Kolkata',
      addressRegion: 'West Bengal',
      postalCode: '700160',
      streetAddress: 'University Area, Plot No. III, B/5, New Town',
    },
    parentOrganization: {
      '@type': 'EducationalOrganization',
      name: 'University of Engineering and Management, Kolkata',
      url: 'https://uem.edu.in',
    },
    sameAs: [
      siteConfig.links.cmt,
      'https://www.facebook.com/adcomsys',
      'https://twitter.com/adcomsys',
      'https://www.linkedin.com/company/adcomsys'
    ],
  }

  const eventSchema = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: 'AdComSys 2026 - Third International Conference on Advanced Computing and Systems',
    description: siteConfig.description,
    startDate: '2026-06-25T09:00:00+05:30',
    endDate: '2026-06-26T18:00:00+05:30',
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
      geo: {
        '@type': 'GeoCoordinates',
        latitude: '22.6207',
        longitude: '88.4317',
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
        category: 'Student',
      },
      {
        '@type': 'Offer',
        name: 'Academic Registration',
        price: '6000',
        priceCurrency: 'INR',
        availability: 'https://schema.org/InStock',
        url: `${siteConfig.url}/registration`,
        validFrom: '2025-11-15',
        category: 'Academic',
      },
      {
        '@type': 'Offer',
        name: 'Industry Registration',
        price: '8000',
        priceCurrency: 'INR',
        availability: 'https://schema.org/InStock',
        url: `${siteConfig.url}/registration`,
        validFrom: '2025-11-15',
        category: 'Industry Professional',
      },
    ],
    performer: {
      '@type': 'PerformingGroup',
      name: 'Distinguished Keynote Speakers',
    },
    about: [
      'Artificial Intelligence',
      'Machine Learning',
      'Internet of Things',
      'Cloud Computing',
      'Cybersecurity',
      'Data Science',
      'Advanced Computing Systems',
    ],
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: 'en-US',
    publisher: {
      '@type': 'Organization',
      name: 'UEM Kolkata',
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/assets/logos/adcomsys-logo.png`,
        width: '512',
        height: '512',
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

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteConfig.url,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'About',
        item: `${siteConfig.url}/about`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Call for Papers',
        item: `${siteConfig.url}/call-for-papers`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'Registration',
        item: `${siteConfig.url}/registration`,
      },
    ],
  }

  return (
    <>
      <Script
        id="organization-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <Script
        id="event-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(eventSchema),
        }}
      />
      <Script
        id="website-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
    </>
  )
}
