export const SITE_CONFIG = {
  name: 'GrowthNotes',
  tagline: 'High-Retention Digital Marketing Study Notes (PDF Downloads)',
  description:
    'Clear, practical digital marketing study notes crafted for students, freelancers, and beginners in India. Master SEO, Meta Ads, Google Ads, GA4, and Funnels.',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  supportEmail: 'support@growthnotes.in',
  businessName: 'GrowthNotes Digital Learning',
  businessAddress: 'Sector 62, Noida, Uttar Pradesh 201309, India',
  currency: 'INR',
  currencySymbol: '₹',
  
  // GST Settings
  hasGst: false, // Set to true if GST registered
  gstin: '07AAAAA0000A1Z5', // Placeholder GSTIN if enabled
  sacCode: '998431', // Online text / digital publication services

  // Socials / Channels
  channels: {
    instagram: 'https://instagram.com/growthnotes.in',
    youtube: 'https://youtube.com/@growthnotes',
    whatsapp: 'https://wa.me/919999999999',
  },

  // Token Limits
  downloadExpiryHours: 48,
  downloadMaxAttempts: 5,
};
