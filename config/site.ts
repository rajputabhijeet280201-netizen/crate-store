export const SITE_CONFIG = {
  name: 'DevOps with Jeet',
  tagline: 'Concise, hands-on DevOps and cloud study notes (PDF downloads)',
  description:
    'Clear, practical DevOps study notes for engineers, students, and career-switchers in India. Covers Kubernetes, Docker, CI/CD, Terraform, and observability.',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  supportEmail: 'support@devopswithjeet.in',
  businessName: 'DevOps with Jeet Digital Learning',
  businessAddress: 'Sector 62, Noida, Uttar Pradesh 201309, India',
  currency: 'INR',
  currencySymbol: '₹',
  
  // GST Settings
  hasGst: false, // Set to true if GST registered
  gstin: '07AAAAA0000A1Z5', // Placeholder GSTIN if enabled
  sacCode: '998431', // Online text / digital publication services

  // Socials / Channels
  channels: {
    instagram: 'https://instagram.com/devopswithjeet',
    youtube: 'https://youtube.com/@devopswithjeet',
    whatsapp: 'https://wa.me/919999999999',
  },

  // Token Limits
  downloadExpiryHours: 48,
  downloadMaxAttempts: 5,
};
