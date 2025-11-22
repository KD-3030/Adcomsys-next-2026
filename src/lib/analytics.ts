// Google Analytics event tracking utilities

export const GA_EVENTS = {
  // User Events
  SIGNUP: 'sign_up',
  LOGIN: 'login',
  LOGOUT: 'logout',
  
  // Paper Events
  PAPER_SUBMIT: 'paper_submission',
  PAPER_VIEW: 'paper_view',
  
  // Payment Events
  PAYMENT_SUBMIT: 'payment_submission',
  PAYMENT_VERIFY: 'payment_verified',
  
  // Contact Events
  CONTACT_FORM: 'contact_form_submission',
  
  // Download Events
  DOWNLOAD_GUIDE: 'download_registration_guide',
  DOWNLOAD_TEMPLATE: 'download_paper_template',
  FILE_DOWNLOAD: 'file_download',
  
  // Navigation Events
  VIEW_SPEAKERS: 'view_speakers',
  VIEW_COMMITTEE: 'view_committee',
  VIEW_SCHEDULE: 'view_schedule',
  
  // External Links
  CLICK: 'click',
  CMT_PORTAL: 'click_cmt_portal',
  SPRINGER_LINK: 'click_springer_link',
} as const

export type GAEventName = typeof GA_EVENTS[keyof typeof GA_EVENTS]

interface GAEventParams {
  category?: string
  label?: string
  value?: number
  [key: string]: string | number | boolean | undefined
}

/**
 * Track a Google Analytics event
 * @param eventName - The name of the event
 * @param params - Additional parameters for the event
 */
export const trackEvent = (eventName: GAEventName, params?: GAEventParams) => {
  if (typeof window === 'undefined' || !window.gtag) {
    console.log('[Analytics] Event tracked:', eventName, params)
    return
  }

  try {
    window.gtag('event', eventName, {
      event_category: params?.category,
      event_label: params?.label,
      value: params?.value,
      ...params,
    })
  } catch (error) {
    console.error('[Analytics] Error tracking event:', error)
  }
}

/**
 * Track page views (automatically handled by the GoogleAnalytics component)
 * @param url - The page URL
 * @param title - The page title
 */
export const trackPageView = (url: string, title?: string) => {
  if (typeof window === 'undefined' || !window.gtag) return

  try {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '', {
      page_path: url,
      page_title: title,
    })
  } catch (error) {
    console.error('[Analytics] Error tracking page view:', error)
  }
}

/**
 * Track user signup
 * @param method - Signup method (email, social, etc.)
 */
export const trackSignup = (method: string = 'email') => {
  trackEvent(GA_EVENTS.SIGNUP, {
    category: 'engagement',
    method,
  })
}

/**
 * Track user login
 * @param method - Login method
 */
export const trackLogin = (method: string = 'email') => {
  trackEvent(GA_EVENTS.LOGIN, {
    category: 'engagement',
    method,
  })
}

/**
 * Track paper submission
 * @param paperId - The paper ID
 * @param subjectArea - The subject area
 */
export const trackPaperSubmission = (paperId: string, subjectArea?: string) => {
  trackEvent(GA_EVENTS.PAPER_SUBMIT, {
    category: 'conversion',
    label: subjectArea,
    value: 1,
    paper_id: paperId,
  })
}

/**
 * Track payment submission
 * @param amount - Payment amount
 * @param category - Payment category (student, academician, etc.)
 */
export const trackPaymentSubmission = (amount: number, category: string) => {
  trackEvent(GA_EVENTS.PAYMENT_SUBMIT, {
    category: 'conversion',
    label: category,
    value: amount,
  })
}

/**
 * Track contact form submission
 */
export const trackContactForm = () => {
  trackEvent(GA_EVENTS.CONTACT_FORM, {
    category: 'engagement',
    value: 1,
  })
}

/**
 * Track external link clicks
 * @param linkName - Name of the external link
 * @param url - The URL being clicked
 */
export const trackExternalLink = (linkName: string, url: string) => {
  trackEvent(GA_EVENTS.CLICK, {
    category: 'outbound',
    label: linkName,
    value: 1,
    link_url: url,
  })
}

/**
 * Track file downloads
 * @param fileName - Name of the file
 * @param fileType - Type of file (pdf, doc, etc.)
 */
export const trackDownload = (fileName: string, fileType: string) => {
  trackEvent(GA_EVENTS.FILE_DOWNLOAD, {
    category: 'engagement',
    label: fileName,
    file_type: fileType,
  })
}
