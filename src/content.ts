// All site copy lives here, in both languages, so updating the portfolio never means touching components.

export type Lang = 'en' | 'es'

export interface Job {
  role: string
  company: string
  period: string
  points: string[]
}

export interface Content {
  meta: { title: string }
  nav: { about: string; experience: string; skills: string; education: string; contact: string }
  hero: {
    role: string
    tagline: string
    location: string
    ctaContact: string
    ctaExperience: string
  }
  stats: { value: string; label: string }[]
  about: { title: string; paragraphs: string[] }
  experience: { title: string; jobs: Job[] }
  skills: { title: string; groups: { name: string; items: string[] }[] }
  education: {
    title: string
    items: { degree: string; school: string; period: string }[]
    certsTitle: string
    certs: { issuer: string; year: string; names: string[] }
  }
  contact: { title: string; text: string }
  footer: string
  langSwitch: string
  skip: string
}

export const EMAIL = 'ferjomor@gmail.com'

export const content: Record<Lang, Content> = {
  en: {
    meta: { title: 'Fernando Morales Ralda — Senior Frontend Engineer' },
    nav: { about: 'About', experience: 'Experience', skills: 'Skills', education: 'Education', contact: 'Contact' },
    hero: {
      role: 'Senior Frontend Engineer',
      tagline:
        'I build real-time, multichannel SaaS interfaces with React, TypeScript and Flutter, and increasingly the NestJS and Java services behind them.',
      location: 'Guatemala City, Guatemala · Open to remote',
      ctaContact: 'Get in touch',
      ctaExperience: 'See my experience',
    },
    stats: [
      { value: '7+', label: 'years shipping SaaS products' },
      { value: '1,400+', label: 'commits as top contributor to the core product' },
      { value: '180+', label: 'components in the design system I maintain' },
      { value: '15+', label: 'services in a billing platform I designed' },
    ],
    about: {
      title: 'About',
      paragraphs: [
        'Frontend is where I have spent most of my career. At Ubiquo Labs I was the top contributor to an omnichannel messaging platform: a real-time inbox over Socket.IO, message rendering for WhatsApp, Instagram, Messenger, TikTok and RCS, and a shared component library with white-label themes for telecom carriers.',
        'Over the last year I moved toward fullstack work, owning features end to end, from the React UI to NestJS and Java services. I also served as Interim CTO at Novago, leading a team of 3 on a financial reporting platform for an iGaming business.',
      ],
    },
    experience: {
      title: 'Experience',
      jobs: [
        {
          role: 'Senior Software Engineer',
          company: 'Ubiquo Labs',
          period: 'Jan 2019 – Aug 2026',
          points: [
            'Top contributor (1,400+ commits) to the core React SPA of an omnichannel messaging SaaS: real-time inbox, agent assignment, presence and tags.',
            'Top contributor to the component library (180+ components, private NPM): introduced Storybook and white-label themes for 4 brands, including carriers Tigo and Claro.',
            'Shipped core features in the Flutter iOS/Android app (BLoC): agent assignment, multimedia quick replies, advanced search and contact merge.',
            'Designed a WhatsApp Business billing platform across 15+ services (React, NestJS, Java, AWS Lambda), with Playwright E2E and unit test coverage.',
            'Led a team of 4 on a private i18n library that opened English-speaking markets.',
          ],
        },
        {
          role: 'Interim CTO / Lead Developer',
          company: 'Novago (Contract)',
          period: 'Nov 2025 – Apr 2026',
          points: [
            'Led a team of 3 building a financial reporting platform with React 19, React Query, NestJS, MongoDB, Redis and a Python (Polars) file worker.',
            'Cut report turnaround from a full month to mid-month (45% faster) for 6 bet shops and 60+ affiliates.',
            'Built high-performance iGaming landing pages with Vanilla JS and CSS animations at 60fps.',
          ],
        },
        {
          role: 'Freelance Software Engineer',
          company: 'Self-employed',
          period: '2020 – Present',
          points: [
            'Built and maintain ERPs (Laravel) for 5+ hotels and restaurants, all still in production, including biometric attendance integration.',
          ],
        },
      ],
    },
    skills: {
      title: 'Skills',
      groups: [
        { name: 'Frontend', items: ['React (16–19)', 'TypeScript', 'JavaScript', 'Next.js', 'Redux', 'React Query', 'Tailwind', 'Storybook', 'Design Systems'] },
        { name: 'Mobile', items: ['Flutter', 'Dart', 'BLoC', 'React Native'] },
        { name: 'Backend', items: ['Node.js', 'NestJS', 'Java', 'Spring Boot', 'Laravel', 'MongoDB', 'Redis', 'Socket.IO'] },
        { name: 'Cloud & Testing', items: ['AWS Lambda', 'Kubernetes (EKS)', 'Docker', 'Playwright', 'Vitest', 'Jest'] },
        { name: 'AI tooling', items: ['Claude Code', 'Cursor', 'v0'] },
      ],
    },
    education: {
      title: 'Education',
      items: [
        { degree: 'B.S. in Computer Science and Engineering', school: 'Universidad de San Carlos de Guatemala', period: '2021 – Present' },
        { degree: 'Technical Degree in Informatics', school: 'Fundación Kinal', period: '2017 – 2019' },
      ],
      certsTitle: 'Certifications',
      certs: {
        issuer: 'Anthropic',
        year: '2026',
        names: ['Claude Code in Action', 'Claude Code 101', 'Teaching the AI Fluency Framework', 'AI Fluency for Nonprofits'],
      },
    },
    contact: {
      title: 'Contact',
      text: 'Looking for a senior frontend or fullstack engineer? I would love to hear about it.',
    },
    footer: 'Built with React, TypeScript and Tailwind. Hosted on GitHub Pages.',
    langSwitch: 'Ver en español',
    skip: 'Skip to content',
  },
  es: {
    meta: { title: 'Fernando Morales Ralda — Ingeniero Frontend Senior' },
    nav: { about: 'Sobre mí', experience: 'Experiencia', skills: 'Habilidades', education: 'Educación', contact: 'Contacto' },
    hero: {
      role: 'Ingeniero Frontend Senior',
      tagline:
        'Construyo interfaces SaaS multicanal y en tiempo real con React, TypeScript y Flutter, y cada vez más los servicios en NestJS y Java que las sostienen.',
      location: 'Ciudad de Guatemala, Guatemala · Disponible para remoto',
      ctaContact: 'Contáctame',
      ctaExperience: 'Ver mi experiencia',
    },
    stats: [
      { value: '7+', label: 'años construyendo productos SaaS' },
      { value: '1,400+', label: 'commits como principal contribuidor del producto' },
      { value: '180+', label: 'componentes en el sistema de diseño que mantengo' },
      { value: '15+', label: 'servicios en una plataforma de cobro que diseñé' },
    ],
    about: {
      title: 'Sobre mí',
      paragraphs: [
        'El frontend es donde he pasado la mayor parte de mi carrera. En Ubiquo Labs fui el principal contribuidor de una plataforma de mensajería omnicanal: una bandeja en tiempo real con Socket.IO, renderizado de mensajes de WhatsApp, Instagram, Messenger, TikTok y RCS, y una librería compartida de componentes con temas white-label para operadoras de telecomunicaciones.',
        'En el último año me moví hacia un rol fullstack, llevando funcionalidades de punta a punta, desde la UI en React hasta servicios en NestJS y Java. También fui CTO Interino en Novago, liderando a 3 personas en una plataforma de reportes financieros para un negocio de iGaming.',
      ],
    },
    experience: {
      title: 'Experiencia',
      jobs: [
        {
          role: 'Ingeniero de Software Senior',
          company: 'Ubiquo Labs',
          period: 'Ene 2019 – Ago 2026',
          points: [
            'Principal contribuidor (más de 1,400 commits) de la SPA en React de un SaaS de mensajería omnicanal: bandeja en tiempo real, asignación de agentes, presencia y etiquetas.',
            'Principal contribuidor de la librería de componentes (más de 180, NPM privado): introduje Storybook y temas white-label para 4 marcas, incluyendo las operadoras Tigo y Claro.',
            'Entregué funcionalidades clave en la app Flutter para iOS/Android (BLoC): asignación de agentes, respuestas rápidas multimedia, búsqueda avanzada y fusión de contactos.',
            'Diseñé una plataforma de cobro para WhatsApp Business en más de 15 servicios (React, NestJS, Java, AWS Lambda), con pruebas E2E en Playwright y unitarias.',
            'Lideré un equipo de 4 personas en una librería privada de i18n que abrió mercados de habla inglesa.',
          ],
        },
        {
          role: 'CTO Interino / Desarrollador Principal',
          company: 'Novago (Contrato)',
          period: 'Nov 2025 – Abr 2026',
          points: [
            'Lideré un equipo de 3 personas construyendo una plataforma de reportes financieros con React 19, React Query, NestJS, MongoDB, Redis y un worker de archivos en Python (Polars).',
            'Reduje la entrega de reportes de fin de mes a la quincena (45% más rápido) para 6 casas de apuestas y más de 60 afiliados.',
            'Construí landing pages de iGaming de alto rendimiento con Vanilla JS y animaciones CSS a 60fps.',
          ],
        },
        {
          role: 'Ingeniero de Software Freelance',
          company: 'Independiente',
          period: '2020 – Presente',
          points: [
            'Construí y mantengo ERPs (Laravel) para más de 5 hoteles y restaurantes, todos aún en producción, incluyendo integración de asistencia biométrica.',
          ],
        },
      ],
    },
    skills: {
      title: 'Habilidades',
      groups: [
        { name: 'Frontend', items: ['React (16–19)', 'TypeScript', 'JavaScript', 'Next.js', 'Redux', 'React Query', 'Tailwind', 'Storybook', 'Sistemas de Diseño'] },
        { name: 'Móvil', items: ['Flutter', 'Dart', 'BLoC', 'React Native'] },
        { name: 'Backend', items: ['Node.js', 'NestJS', 'Java', 'Spring Boot', 'Laravel', 'MongoDB', 'Redis', 'Socket.IO'] },
        { name: 'Cloud y Pruebas', items: ['AWS Lambda', 'Kubernetes (EKS)', 'Docker', 'Playwright', 'Vitest', 'Jest'] },
        { name: 'Herramientas de IA', items: ['Claude Code', 'Cursor', 'v0'] },
      ],
    },
    education: {
      title: 'Educación',
      items: [
        { degree: 'Ingeniería en Ciencias y Sistemas', school: 'Universidad de San Carlos de Guatemala', period: '2021 – Presente' },
        { degree: 'Perito Técnico en Informática', school: 'Fundación Kinal', period: '2017 – 2019' },
      ],
      certsTitle: 'Certificaciones',
      certs: {
        issuer: 'Anthropic',
        year: '2026',
        names: ['Claude Code in Action', 'Claude Code 101', 'Teaching the AI Fluency Framework', 'AI Fluency for Nonprofits'],
      },
    },
    contact: {
      title: 'Contacto',
      text: '¿Buscas un ingeniero frontend o fullstack senior? Me encantaría saber del proyecto.',
    },
    footer: 'Hecho con React, TypeScript y Tailwind. Publicado en GitHub Pages.',
    langSwitch: 'View in English',
    skip: 'Saltar al contenido',
  },
}
