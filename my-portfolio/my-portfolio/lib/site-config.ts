export const siteConfig = {
  name: 'Danylo Zorkin',
  title: 'Danylo Zorkin | Freelance UX/UI Designer & Coder',
  description:
    'Freelance UX/UI designer and developer creating intuitive, beautiful digital experiences. View my portfolio and get in touch.',
  url: 'https://danylo.dev', // TODO: Replace with actual domain
  ogImage: '/og.png',
  keywords: ['UX Designer', 'UI Designer', 'Freelance Designer', 'Portfolio'],
  author: {
    name: 'Danylo Zorkin',
    email: 'danilzorkin1402@gmail.com',
    telegram: 'https://t.me/danylo_zorkin',
  },
  links: {
    email: 'mailto:danilzorkin1402@gmail.com',
    telegram: 'https://t.me/danylo_zorkin',
    // Add social links as needed
  },
  contact: {
    email: 'danilzorkin1402@gmail.com',
    subject: 'Portfolio inquiry — UX/UI design',
    body: `Hi Danil,
I'd like to discuss a UX/UI project.

Company:
Budget range:
Timeline:
Brief / link:`,
  },
}

export type SiteConfig = typeof siteConfig

