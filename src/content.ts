// All site copy lives here, in both languages, so updating the portfolio never means touching components.

export type Lang = 'en' | 'es'
export type ProjectId = 'dashboard' | 'database' | 'pokemon' | 'backrooms'

export interface Job {
  role: string
  company: string
  period: string
  points: string[]
  stack: string[]
}

export interface Project {
  id: ProjectId
  title: string
  kind: string
  description: string
  stack: string[]
  demo: string
  code: string
}

export interface Content {
  meta: { title: string }
  nav: { about: string; experience: string; projects: string; skills: string; contact: string }
  hero: {
    location: string
    role: string
    tagline: string
    ctaContact: string
    ctaProjects: string
    paletteHint: string
  }
  card: { front: string; back: string; flip: string; stackTitle: string; stack: string[] }
  stats: { value: number; suffix: string; label: string }[]
  about: { title: string; paragraphs: string[] }
  experience: { title: string; jobs: Job[] }
  projects: { title: string; subtitle: string; demo: string; code: string; items: Project[] }
  skills: { title: string; groups: { name: string; items: string[] }[] }
  education: {
    title: string
    items: { degree: string; school: string; period: string }[]
    certsTitle: string
    certs: { issuer: string; year: string; names: string[] }
  }
  contact: {
    title: string
    headline: string
    text: string
    topicLabel: string
    topics: { id: string; label: string; subject: string }[]
    nameLabel: string
    namePlaceholder: string
    messageLabel: string
    messagePlaceholder: string
    send: string
    copy: string
    copied: string
    or: string
    localTime: string
    github: string
    greeting: string
  }
  palette: {
    open: string
    placeholder: string
    empty: string
    goTo: string
    actions: string
    switchLang: string
    toggleTheme: string
    copyEmail: string
    openGithub: string
    hint: string
  }
  theme: { light: string; dark: string }
  footer: string
  langSwitch: string
  skip: string
}

export const EMAIL = 'ferjomor@gmail.com'
export const GITHUB = 'https://github.com/ferjoo'
export const TIME_ZONE = 'America/Guatemala'

const projectLinks = {
  dashboard: { demo: 'https://ferjoo.github.io/financial-dashboard/', code: 'https://github.com/ferjoo/financial-dashboard' },
  database: { demo: 'https://ferjoo.github.io/airline-database/', code: 'https://github.com/ferjoo/airline-database' },
  pokemon: { demo: 'https://ferjoo.github.io/LFP_practica1/', code: 'https://github.com/ferjoo/LFP_practica1' },
  backrooms: { demo: 'https://ferjoo.github.io/backrooms/', code: 'https://github.com/ferjoo/backrooms' },
}

const profileStack = ['React', 'TypeScript', 'Node.js', 'NestJS', 'Java', 'Flutter', 'MongoDB', 'AWS']

export const content: Record<Lang, Content> = {
  en: {
    meta: { title: 'Fernando Morales Ralda — Software Developer' },
    nav: { about: 'About', experience: 'Experience', projects: 'Projects', skills: 'Skills', contact: 'Contact' },
    hero: {
      location: 'Guatemala City',
      role: 'Software Developer',
      tagline:
        'Seven years building SaaS products end to end: web and mobile interfaces with React and Flutter, and the services behind them with Node.js, NestJS and Java on AWS.',
      ctaContact: 'Let’s talk',
      ctaProjects: 'See projects',
      paletteHint: 'or press',
    },
    card: { front: 'Profile', back: 'Daily stack', flip: 'Drag to rotate · click to flip', stackTitle: 'Stack', stack: profileStack },
    stats: [
      { value: 7, suffix: '+', label: 'years shipping SaaS products' },
      { value: 1400, suffix: '+', label: 'commits as top contributor to the core product' },
      { value: 5, suffix: '+', label: 'businesses running ERPs I built' },
      { value: 15, suffix: '+', label: 'services in a billing platform I designed' },
    ],
    about: {
      title: 'About',
      paragraphs: [
        'I build software across the whole stack. At Ubiquo Labs I spent seven years on an omnichannel messaging platform: the React app and its component library, a Flutter mobile app, and a WhatsApp Business billing platform that spans 15+ services in Java, NestJS and AWS Lambda.',
        'I also served as Interim CTO at Novago, leading a team of 3 on a financial reporting platform, and as a freelancer I build and maintain ERP systems for hotels and restaurants.',
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
            'Designed a WhatsApp Business billing platform across 15+ services, with Playwright E2E and unit test coverage.',
          ],
          stack: ['React', 'TypeScript', 'Storybook', 'Flutter', 'NestJS', 'Java'],
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
          stack: ['React 19', 'React Query', 'NestJS', 'MongoDB', 'Redis', 'Python'],
        },
        {
          role: 'Freelance Software Engineer',
          company: 'Self-employed',
          period: '2020 – Present',
          points: ['Built and maintain ERPs for 5+ hotels and restaurants, all still in production, including biometric attendance integration.'],
          stack: ['Laravel', 'PHP', 'SQL'],
        },
      ],
    },
    projects: {
      title: 'Projects',
      subtitle: 'Things you can open and play with right now.',
      demo: 'Live demo',
      code: 'Code',
      items: [
        {
          id: 'dashboard',
          title: 'Financial Dashboard',
          kind: 'Fintech dashboard · demo with sample data',
          description:
            'The reporting platform I led as Interim CTO: branch and agent performance, partner metrics, period comparisons, activity heatmaps and 5-role access control. This demo runs entirely in the browser with invented data.',
          stack: ['React 19', 'TypeScript', 'React Query', 'Recharts', 'Tailwind 4'],
          ...projectLinks.dashboard,
        },
        {
          id: 'database',
          title: 'Airline Operations Database',
          kind: 'Database design · Oracle',
          description:
            'A relational model for running an airline: airports and gates, fleet and maintenance, flights split into segments, crew qualifications and assignments, reservations, baggage claims and operational alerts. 29 tables, 36 foreign keys and 39 check constraints, with an interactive schema explorer.',
          stack: ['Oracle 23ai', 'SQL', 'ER modeling', 'Data Modeler'],
          ...projectLinks.database,
        },
        {
          id: 'pokemon',
          title: 'Pokémon Team Lexer',
          kind: 'Compiler theory',
          description:
            'A lexer for a custom language that describes Pokémon teams. It tokenizes the input, reports lexical errors with their exact position and renders each team with its stats.',
          stack: ['React 19', 'TypeScript', 'Vite', 'Lexical analysis'],
          ...projectLinks.pokemon,
        },
        {
          id: 'backrooms',
          title: 'Backrooms',
          kind: 'Game · Vanilla JavaScript',
          description: 'A first-person horror maze in pure Vanilla JavaScript, no libraries and no engine: a raycasting renderer on Canvas 2D, an entity that hunts you with pathfinding, and 3D spatial audio generated live with the Web Audio API.',
          stack: ['Vanilla JS', 'Canvas 2D', 'Web Audio API', 'Raycasting'],
          ...projectLinks.backrooms,
        },
      ],
    },
    skills: {
      title: 'Skills',
      groups: [
        { name: 'Frontend', items: ['React (16–19)', 'TypeScript', 'JavaScript', 'Next.js', 'Redux', 'React Query', 'Tailwind', 'Storybook', 'Three.js'] },
        { name: 'Backend', items: ['Node.js', 'NestJS', 'Java', 'Spring Boot', 'Python', 'Laravel', 'MongoDB', 'Redis', 'ActiveMQ', 'Socket.IO'] },
        { name: 'Mobile, cloud & testing', items: ['Flutter', 'Dart', 'AWS Lambda', 'Kubernetes (EKS)', 'Docker', 'Playwright', 'Jest', 'Claude Code'] },
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
      headline: 'Let’s build something people enjoy using.',
      text: 'Pick a topic, write a couple of lines and your email app opens with everything filled in.',
      topicLabel: 'What is it about?',
      topics: [
        { id: 'job', label: 'Full-time role', subject: 'Full-time opportunity' },
        { id: 'freelance', label: 'Freelance project', subject: 'Freelance project' },
        { id: 'hello', label: 'Just saying hi', subject: 'Hello from your portfolio' },
      ],
      nameLabel: 'Your name',
      namePlaceholder: 'Juan Pérez',
      messageLabel: 'Message',
      messagePlaceholder: 'Tell me about the role, the team or the idea…',
      send: 'Open in my email app',
      copy: 'Copy email',
      copied: 'Copied!',
      or: 'or',
      localTime: 'My local time',
      github: 'GitHub',
      greeting: 'Hi Fernando,',
    },
    palette: {
      open: 'Open command menu',
      placeholder: 'Type a command or search…',
      empty: 'Nothing matches that.',
      goTo: 'Go to',
      actions: 'Actions',
      switchLang: 'Ver en español',
      toggleTheme: 'Toggle light / dark',
      copyEmail: 'Copy email address',
      openGithub: 'Open GitHub profile',
      hint: '↑↓ to move · Enter to run · Esc to close',
    },
    theme: { light: 'Switch to light theme', dark: 'Switch to dark theme' },
    footer: 'Designed and built by me with React, TypeScript, Three.js, Tailwind and Motion.',
    langSwitch: 'ES',
    skip: 'Skip to content',
  },
  es: {
    meta: { title: 'Fernando Morales Ralda — Desarrollador de Software' },
    nav: { about: 'Sobre mí', experience: 'Experiencia', projects: 'Proyectos', skills: 'Habilidades', contact: 'Contacto' },
    hero: {
      location: 'Ciudad de Guatemala',
      role: 'Desarrollador de Software',
      tagline:
        'Siete años construyendo productos SaaS de punta a punta: interfaces web y móviles con React y Flutter, y los servicios que las sostienen con Node.js, NestJS y Java sobre AWS.',
      ctaContact: 'Hablemos',
      ctaProjects: 'Ver proyectos',
      paletteHint: 'o presiona',
    },
    card: { front: 'Perfil', back: 'Stack diario', flip: 'Arrastra para girar · clic para voltear', stackTitle: 'Stack', stack: profileStack },
    stats: [
      { value: 7, suffix: '+', label: 'años construyendo productos SaaS' },
      { value: 1400, suffix: '+', label: 'commits como principal contribuidor del producto' },
      { value: 5, suffix: '+', label: 'negocios usan ERPs que construí' },
      { value: 15, suffix: '+', label: 'servicios en una plataforma de cobro que diseñé' },
    ],
    about: {
      title: 'Sobre mí',
      paragraphs: [
        'Construyo software en todo el stack. En Ubiquo Labs pasé siete años en una plataforma de mensajería omnicanal: la app en React y su librería de componentes, una app móvil en Flutter y una plataforma de cobro para WhatsApp Business que abarca más de 15 servicios en Java, NestJS y AWS Lambda.',
        'También fui CTO Interino en Novago, liderando a 3 personas en una plataforma de reportes financieros, y como freelance construyo y mantengo sistemas ERP para hoteles y restaurantes.',
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
            'Diseñé una plataforma de cobro para WhatsApp Business en más de 15 servicios, con pruebas E2E en Playwright y unitarias.',
          ],
          stack: ['React', 'TypeScript', 'Storybook', 'Flutter', 'NestJS', 'Java'],
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
          stack: ['React 19', 'React Query', 'NestJS', 'MongoDB', 'Redis', 'Python'],
        },
        {
          role: 'Ingeniero de Software Freelance',
          company: 'Independiente',
          period: '2020 – Presente',
          points: ['Construí y mantengo ERPs para más de 5 hoteles y restaurantes, todos aún en producción, incluyendo integración de asistencia biométrica.'],
          stack: ['Laravel', 'PHP', 'SQL'],
        },
      ],
    },
    projects: {
      title: 'Proyectos',
      subtitle: 'Cosas que puedes abrir y probar ahora mismo.',
      demo: 'Ver demo',
      code: 'Código',
      items: [
        {
          id: 'dashboard',
          title: 'Financial Dashboard',
          kind: 'Dashboard fintech · demo con datos de ejemplo',
          description:
            'La plataforma de reportes que lideré como CTO Interino: rendimiento por sucursal y por agente, métricas de socios, comparativas entre periodos, mapas de calor de actividad y control de acceso de 5 roles. Este demo corre completo en el navegador con datos inventados.',
          stack: ['React 19', 'TypeScript', 'React Query', 'Recharts', 'Tailwind 4'],
          ...projectLinks.dashboard,
        },
        {
          id: 'database',
          title: 'Base de datos para operaciones aéreas',
          kind: 'Diseño de bases de datos · Oracle',
          description:
            'Un modelo relacional para operar una aerolínea: aeropuertos y puertas, flota y mantenimiento, vuelos divididos en segmentos, calificaciones y asignación de tripulación, reservas, reclamos de equipaje y alertas operativas. 29 tablas, 36 llaves foráneas y 39 restricciones CHECK, con un explorador interactivo del esquema.',
          stack: ['Oracle 23ai', 'SQL', 'Modelado E-R', 'Data Modeler'],
          ...projectLinks.database,
        },
        {
          id: 'pokemon',
          title: 'Pokémon Team Lexer',
          kind: 'Teoría de compiladores',
          description:
            'Un analizador léxico para un lenguaje propio que describe equipos Pokémon. Tokeniza la entrada, reporta errores léxicos con su posición exacta y muestra cada equipo con sus estadísticas.',
          stack: ['React 19', 'TypeScript', 'Vite', 'Análisis léxico'],
          ...projectLinks.pokemon,
        },
        {
          id: 'backrooms',
          title: 'Backrooms',
          kind: 'Juego · Vanilla JavaScript',
          description: 'Un laberinto de terror en primera persona hecho en Vanilla JavaScript puro, sin librerías ni motor: renderizado por raycasting en Canvas 2D, un ente que te persigue con búsqueda de rutas y audio espacial 3D generado en vivo con la Web Audio API.',
          stack: ['Vanilla JS', 'Canvas 2D', 'Web Audio API', 'Raycasting'],
          ...projectLinks.backrooms,
        },
      ],
    },
    skills: {
      title: 'Habilidades',
      groups: [
        { name: 'Frontend', items: ['React (16–19)', 'TypeScript', 'JavaScript', 'Next.js', 'Redux', 'React Query', 'Tailwind', 'Storybook', 'Three.js'] },
        { name: 'Backend', items: ['Node.js', 'NestJS', 'Java', 'Spring Boot', 'Python', 'Laravel', 'MongoDB', 'Redis', 'ActiveMQ', 'Socket.IO'] },
        { name: 'Móvil, cloud y pruebas', items: ['Flutter', 'Dart', 'AWS Lambda', 'Kubernetes (EKS)', 'Docker', 'Playwright', 'Jest', 'Claude Code'] },
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
      headline: 'Construyamos algo que la gente disfrute usar.',
      text: 'Elige un tema, escribe un par de líneas y tu app de correo se abre con todo listo.',
      topicLabel: '¿De qué se trata?',
      topics: [
        { id: 'job', label: 'Puesto de tiempo completo', subject: 'Oportunidad de tiempo completo' },
        { id: 'freelance', label: 'Proyecto freelance', subject: 'Proyecto freelance' },
        { id: 'hello', label: 'Solo saludar', subject: 'Hola desde tu portafolio' },
      ],
      nameLabel: 'Tu nombre',
      namePlaceholder: 'Juan Pérez',
      messageLabel: 'Mensaje',
      messagePlaceholder: 'Cuéntame del puesto, del equipo o de la idea…',
      send: 'Abrir en mi correo',
      copy: 'Copiar email',
      copied: '¡Copiado!',
      or: 'o',
      localTime: 'Mi hora local',
      github: 'GitHub',
      greeting: 'Hola Fernando,',
    },
    palette: {
      open: 'Abrir menú de comandos',
      placeholder: 'Escribe un comando o busca…',
      empty: 'Nada coincide con eso.',
      goTo: 'Ir a',
      actions: 'Acciones',
      switchLang: 'View in English',
      toggleTheme: 'Cambiar tema claro / oscuro',
      copyEmail: 'Copiar dirección de email',
      openGithub: 'Abrir perfil de GitHub',
      hint: '↑↓ para moverte · Enter para ejecutar · Esc para cerrar',
    },
    theme: { light: 'Cambiar a tema claro', dark: 'Cambiar a tema oscuro' },
    footer: 'Diseñado y construido por mí con React, TypeScript, Three.js, Tailwind y Motion.',
    langSwitch: 'EN',
    skip: 'Saltar al contenido',
  },
}
