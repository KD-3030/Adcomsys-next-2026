import { Metadata } from 'next'
import { siteConfig } from '@/config/site'

interface GenerateMetadataProps {
  title?: string
  description?: string
  path?: string
  keywords?: string[]
  image?: string
  noIndex?: boolean
  type?: 'website' | 'article'
}

export function generateMetadata({
  title,
  description = siteConfig.description,
  path = '',
  keywords = siteConfig.keywords,
  image = siteConfig.ogImage,
  noIndex = false,
  type = 'website',
}: GenerateMetadataProps = {}): Metadata {
  const pageTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.title
  const url = `${siteConfig.url}${path}`
  const imageUrl = image.startsWith('http') ? image : `${siteConfig.url}${image}`

  return {
    title: pageTitle,
    description,
    keywords: keywords.join(', '),
    authors: [{ name: siteConfig.name }],
    creator: 'UEM Kolkata',
    publisher: 'UEM Kolkata',
    applicationName: siteConfig.name,
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: type,
      locale: 'en_US',
      url: url,
      title: pageTitle,
      description,
      siteName: siteConfig.name,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description,
      images: [imageUrl],
      creator: '@adcomsys',
    },
    manifest: '/site.webmanifest',
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
      ],
      other: [
        {
          rel: 'mask-icon',
          url: '/safari-pinned-tab.svg',
          color: '#fca311',
        },
      ],
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    },
    other: {
      'msapplication-TileColor': '#14213d',
    },
  }
}
