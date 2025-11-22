// Google Analytics gtag types
export interface GtagEvent {
  action: string
  category: string
  label?: string
  value?: number
}

declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js',
      targetId: string | Date,
      config?: {
        page_path?: string
        page_title?: string
        page_location?: string
        event_category?: string
        event_label?: string
        value?: number
        method?: string
        [key: string]: any
      }
    ) => void
    dataLayer: any[]
  }
}

export {}
