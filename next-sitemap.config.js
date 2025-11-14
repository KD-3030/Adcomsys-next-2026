/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://adcomsys2026.uem.edu.in',
  generateRobotsTxt: false, // We have a custom robots.txt
  generateIndexSitemap: false,
  exclude: [
    '/admin/*',
    '/api/*',
    '/authors/*',
    '/login',
    '/signup',
    '/test-connection',
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/', '/authors/', '/login', '/signup'],
      },
    ],
  },
  transform: async (config, path) => {
    // Customize priority and change frequency
    let priority = 0.7
    let changefreq = 'weekly'

    if (path === '/') {
      priority = 1.0
      changefreq = 'daily'
    } else if (path === '/call-for-papers' || path === '/registration') {
      priority = 0.9
      changefreq = 'daily'
    } else if (path.includes('/about') || path.includes('/committee') || path.includes('/speakers')) {
      priority = 0.8
      changefreq = 'weekly'
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
    }
  },
}
