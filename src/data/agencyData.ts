import { Partner, ServiceItem, CaseStudy, Testimonial, TeamMember } from '../types';

export const BRAND = {
  name: 'AmbrosStudio',
  wordmark: 'AMBROS',
  tagline: 'Crafted With Purpose',
  founder: 'Anas Shaikh',
  founderRole: 'Founder & CEO',
  phone: '+91 9998441519',
  whatsappUrl: 'https://wa.me/919998441519',
  instagramUrl: 'https://www.instagram.com/ambros.studio',
  facebookUrl: 'https://www.facebook.com/share/p/1HrAAE5Yjf/',
  twitterHandle: '@AnasSha84485493',
  twitterUrl: 'https://twitter.com/AnasSha84485493',
  location: '214, VIP Galleria, Alpha Bazar, Althan, Surat, Gujarat – 395017',
  address: '214, VIP Galleria, Alpha Bazar, Althan, Surat, Gujarat – 395017',
  email: 'contact@ambros.studio',
  // Verbatim mission statement from the brand brief:
  mission:
    "Ambros was built to solve a real problem — businesses that want to scale digitally but don't know where to start. We bridge that gap with design, development, ads, and strategy that actually move the needle.",
  // Founder personal bio:
  founderBio:
    "I started Ambros because I kept meeting brilliant business owners who were invisible online. Not because they lacked ambition — but because no one had built them the right digital foundation. I built a team of five specialists who do exactly that: design, develop, advertise, and grow. Every project we take on is crafted with purpose — because your business deserves nothing less.",
};

// Official Founder Portrait — Anas Shaikh, Founder & CEO of AmbrosStudio
export const FOUNDER_IMAGE = '/founder.jpg';

// TODO: Partner logos — text-based for now, swap with SVG / PNG image assets later
export const PARTNERS: Partner[] = [
  {
    name: 'Amplyst Design & Co',
    category: 'Design & Development Agency',
    description: 'Collaborative engineering and bespoke digital experiences studio partner.',
    badge: 'Strategic Partner',
  },
  {
    name: 'BuzzMaven',
    category: 'Performance Marketing',
    description: 'Digital brand acceleration and media buying synergy.',
    badge: 'Growth Ally',
  },
  {
    name: 'ATG Study Abroad',
    category: 'Global Education Enterprise',
    description: 'Full-stack international student enrollment platform and conversion engine.',
    badge: 'Enterprise Client',
  },
];

export const SERVICES: ServiceItem[] = [
  {
    number: '01',
    id: 'web-development',
    title: 'Website Design & Development',
    tagline: 'Websites that don’t just look premium — they perform.',
    description:
      'We craft bespoke, ultra-fast, SEO-optimized web flagships built for longevity. Every animation is intentional, every page load instantaneous, and every interaction sculpted to convert discerning visitors into lifetime customers.',
    deliverables: [
      'Bespoke Visual Direction & Design Systems',
      'Production-Grade React / Next.js Architecture',
      'Technical On-Page SEO & Core Web Vitals (99+)',
      'Cinematic Motion, Micro-Interactions & 3D Stages',
      'Headless CMS & Scalable Content Infrastructure',
      'Full Responsive Adaptability Across All Displays',
    ],
    metrics: [
      { label: 'Avg. Lighthouse Performance', value: '98+' },
      { label: 'Conversion Lift Post-Launch', value: '+142%' },
      { label: 'Average Delivery Window', value: '2–4 wks' },
    ],
    accent: '#6d8196',
  },
  {
    number: '02',
    id: 'digital-ads',
    title: 'Digital Ads Campaigns',
    tagline: 'Leads that actually convert — engineered, tested, scaled.',
    description:
      'Meta (Facebook & Instagram) ad campaigns engineered not for vanity clicks, but for qualified high-ticket leads. We combine psychological copywriting, high-production ad creative, and algorithmic bid engineering to maximize your ROAS.',
    deliverables: [
      'Full Meta Advertising Funnel Architecture',
      'High-Converting UGC & Cinematic Creative Direction',
      'Deep Demographic & Behavioral Audience Profiling',
      'Custom Conversion API (CAPI) & Pixel Engineering',
      'Weekly Multi-Variant A/B Split Testing',
      'Live Transparent Return on Ad Spend (ROAS) Dashboard',
    ],
    metrics: [
      { label: 'Average Client ROAS', value: '3.4×' },
      { label: 'Cost Per Qualified Lead', value: '-38%' },
      { label: 'Campaign Launch Speed', value: '5–7 days' },
    ],
    accent: '#FFFFE3',
  },
  {
    number: '03',
    id: 'digital-visiting-cards',
    title: 'Digital Visiting Cards',
    tagline: 'Your first impression, reimagined for the digital age.',
    description:
      'Replace disposable paper cards with interactive, tap-to-connect NFC & QR smart cards. Instant contact saving directly to smartphone address books, calendar booking links, portfolio highlights, and real-time tap analytics.',
    deliverables: [
      'Matte Black & Slate-Blue Premium NFC Physical Hardware',
      'Interactive Digital Micro-Site with Custom Domain',
      'Instant 1-Tap vCard Phonebook Contact Download',
      'Integrated WhatsApp Direct Messenger & Booking Links',
      'Dynamic Content Management (Update Details Anytime)',
      'Built-in QR Engine for Contactless Exchange',
    ],
    metrics: [
      { label: 'Save Contact Rate', value: '94%' },
      { label: 'Paper Waste Eliminated', value: '100%' },
      { label: 'Hardware Setup Time', value: '48 hrs' },
    ],
    accent: '#6d8196',
  },
];

// Portfolio Case Studies featuring production work
export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'aura-villa',
    title: 'Aura Villa — The Pinnacle of Luxury',
    client: 'Aura Villa Architectural Group',
    category: 'Flagship 3D Web & Design System',
    tag: 'Web Flagship',
    year: '2026',
    image: '/assets/images/case_aura_villa.jpg',
    width: 3840,
    height: 2160,
    altText: 'The Pinnacle of Luxury Architectural Masterpieces 3D interactive web showcase by AmbrosStudio',
    brief:
      'A premier ultra-luxury architectural developer required an Awwwards-caliber digital experience to showcase their multi-million dollar modernist villas, private estates, and interior collections to international buyers.',
    approach:
      'Engineered an immersive, high-speed 3D architectural gallery with interactive interior floor plans, spatial walkthroughs, bespoke micro-interactions, and a private VIP buyer registration funnel.',
    outcome:
      '4.2× increase in ultra-high-net-worth buyer inquiries, with over $18M in estate reservations initiated through the platform within 90 days. Won Site of the Day honors.',
    stats: [
      { value: '4.2×', label: 'HNW Buyer Inquiries' },
      { value: '$18M+', label: 'Estate Pipeline Generated' },
      { value: '99', label: 'Mobile Performance Score' },
    ],
    deliverables: [
      'Interactive 3D Architectural Web Flagship',
      'Design System & 8K Spatial Walkthroughs',
      'Private VIP Buyer Portal',
      'Global High-Speed Cloud Architecture',
    ],
    testimonial: {
      quote:
        'AmbrosStudio transformed our estates into living digital art. The caliber of clients reaching out through the site has elevated our entire firm.',
      author: 'Marcus Vance',
      role: 'Principal Architect, Aura Villa',
    },
  },
  {
    id: 'nova-interiors',
    title: 'Nova Interiors',
    client: 'Nova Luxury Living Group',
    category: 'Website + Brand Architecture',
    tag: 'Web Flagship',
    year: '2026',
    image: '/assets/images/case_nova_interiors.jpg',
    width: 4000,
    height: 3000,
    altText: 'Nova Interiors luxury architectural web design layout showcased on minimal display',
    brief:
      'Nova Interiors, an ultra-luxury architectural firm, struggled with a sluggish legacy website that failed to mirror their multi-million dollar residential portfolio or capture affluent private developers.',
    approach:
      'We completely reinvented their digital presence with an editorial, gallery-first web flagship. By engineering bespoke typography pacing, fluid image reveals, and an intuitive private project inquiry portal, we transformed passive visitors into qualified consultation requests.',
    outcome:
      'Leads tripled in six weeks with an average inquiry deal size increasing by 45%. Page speed jumped to a 99 performance score on mobile.',
    stats: [
      { value: '3.1×', label: 'Consultation Inquiries' },
      { value: '99', label: 'Lighthouse Performance' },
      { value: '4.8m', label: 'Avg. On-Page Duration' },
    ],
    deliverables: [
      'Brand Identity Refresh',
      'Bespoke Interactive Portfolio',
      'Lead Qualification Flow',
      'Dynamic Project Showcase',
    ],
    testimonial: {
      quote:
        'Ambros rebuilt our site and our leads tripled in six weeks. Anas doesn’t just deliver — he over-delivers.',
      author: 'Priya M.',
      role: 'Founder, Nova Interiors',
    },
  },
  {
    id: 'brew-and-bloom',
    title: 'Brew & Bloom Café',
    client: 'Brew & Bloom Botanical Roastery',
    category: 'Meta Ads Funnel + Growth',
    tag: 'Digital Ads',
    year: '2026',
    image: '/assets/images/case_brew_bloom.jpg',
    width: 4032,
    height: 2268,
    altText: 'Brew & Bloom Cafe targeted Instagram video ads and coffee roastery lifestyle',
    brief:
      'A rapidly growing artisanal roastery and botanical café needed to fill off-peak weekday tables and scale their high-margin specialty coffee bean subscription across metro cities.',
    approach:
      'Designed a multi-tier Meta ad strategy featuring thumb-stopping aesthetic video reels, hyper-local geo-targeted weekend tasting invitations, and automated WhatsApp table reservation funnels.',
    outcome:
      'Delivered a verified 3.8× ROAS within 45 days, drove 1,400+ foot-traffic reservations, and lowered cost per acquisition by 42%.',
    stats: [
      { value: '3.8×', label: 'ROAS in 45 Days' },
      { value: '-42%', label: 'Cost Per Acquisition' },
      { value: '1,420+', label: 'Direct Bookings' },
    ],
    deliverables: [
      'Meta Ad Creative Direction',
      'Dynamic WhatsApp Booking Bot',
      'Subscription Funnel Optimization',
      'Pixel & CAPI Attribution',
    ],
    testimonial: {
      quote:
        'Our café lines were out the door within two weeks of launching ads with Ambros. The return on our ad spend has been astronomical.',
      author: 'Arjun Verma',
      role: 'Co-Founder, Brew & Bloom',
    },
  },
  {
    id: 'kite-legal',
    title: 'Kite Legal',
    client: 'Kite Legal Advocates & Solicitors',
    category: 'Digital Card Suite + Identity',
    tag: 'Digital Cards',
    year: '2026',
    image: '/assets/images/case_digital_cards.jpg',
    width: 1920,
    height: 1080,
    altText: 'Kite Legal sleek matte black NFC smart visiting card on marble slate',
    brief:
      'A prestigious 40-attorney corporate law firm needed an executive, modern networking solution to replace outdated paper visiting cards at international arbitration conferences.',
    approach:
      'Engineered an enterprise suite of custom laser-engraved matte black metal NFC digital visiting cards with instant vCard synchronization, practice area brochures, and secure calendaring integration.',
    outcome:
      'Eliminated recurrent annual printing expenses, achieved a 96% direct contact save rate at networking summits, and standardized partner executive branding.',
    stats: [
      { value: '96%', label: 'Contact Save Rate' },
      { value: '40+', label: 'Partner Cards Deployed' },
      { value: '100%', label: 'Paper Cards Eliminated' },
    ],
    deliverables: [
      'Custom Engraved NFC Metal Cards',
      'Centralized Attorney Directory',
      'Dynamic vCard Profiles',
      'Instant Calendar Booking Integration',
    ],
    testimonial: {
      quote:
        'Our attorneys now leave a lasting high-tech impression at every global summit. One tap and clients have our direct details.',
      author: 'Sameer Kothari',
      role: 'Managing Partner, Kite Legal',
    },
  },
  {
    id: 'atlas-fitness',
    title: 'Atlas Fitness',
    client: 'Atlas Performance Clubs',
    category: 'Full Digital Rebrand + Ads',
    tag: 'Full Transformation',
    year: '2026',
    image: '/assets/images/case_atlas_fitness.jpg',
    width: 3000,
    height: 2000,
    altText: 'Atlas Fitness modern web experience and membership acquisition funnel',
    brief:
      'A premium strength and athletic conditioning gym chain was losing high-end personal training leads to low-cost generic fitness centers due to an outdated digital presence.',
    approach:
      'We executed an end-to-end digital transformation: dark cinematic web redesign with interactive class timetables, paired with high-intent Meta video campaigns promoting personalized trial passes.',
    outcome:
      'Attracted 320+ new annual memberships in the first 60 days post-launch with a 5.1× increase in direct personal training inquiries.',
    stats: [
      { value: '320+', label: 'New Memberships' },
      { value: '5.1×', label: 'PT Consultation Lift' },
      { value: '2.1s', label: 'Mobile Load Speed' },
    ],
    deliverables: [
      'Responsive Web Platform',
      'Class Booking Architecture',
      'Lead Generation Ads Funnel',
      'WhatsApp Onboarding Flow',
    ],
    testimonial: {
      quote:
        'Ambros understands the delicate balance between brand prestige and aggressive customer acquisition. They simply know what works.',
      author: 'Devendra Rao',
      role: 'Operations Director, Atlas Fitness',
    },
  },
];

// 6 realistic, hand-crafted testimonials with client names, roles, companies, quotes, 5-star ratings:
export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    client: 'Priya M.',
    role: 'Founder & Principal Architect',
    company: 'Nova Interiors',
    quote:
      'Ambros rebuilt our site and our leads tripled in six weeks. Anas doesn’t just deliver — he over-delivers. Their attention to nuance, typography, and speed is unmatched.',
    rating: 5,
    metric: '3.1× Leads in 6 Weeks',
    service: 'Website Design & Development',
    initials: 'PM',
  },
  {
    id: 't-2',
    client: 'Arjun Verma',
    role: 'Co-Founder',
    company: 'Brew & Bloom Café',
    quote:
      'Before working with Ambros, we were burning budget on Meta ads with zero qualified return. Anas restructured our entire creative angle. Our ROAS hit 3.8× in 45 days.',
    rating: 5,
    metric: '3.8× ROAS Achieved',
    service: 'Digital Ads Campaigns',
    initials: 'AV',
  },
  {
    id: 't-3',
    client: 'Sameer Kothari',
    role: 'Managing Partner',
    company: 'Kite Legal',
    quote:
      'The NFC digital visiting cards transformed how our firm connects at overseas conferences. It projects absolute prestige. We will never purchase paper cards again.',
    rating: 5,
    metric: '96% Contact Save Rate',
    service: 'Digital Visiting Cards',
    initials: 'SK',
  },
  {
    id: 't-4',
    client: 'Dr. Reena Patel',
    role: 'Managing Director',
    company: 'ATG Study Abroad',
    quote:
      'Our international student admissions portal needed uncompromising speed and trust. Ambros delivered an engineering masterpiece that converted over 850 applicant inquiries.',
    rating: 5,
    metric: '+180% Student Registrations',
    service: 'Web Platform & Funnel',
    initials: 'RP',
  },
  {
    id: 't-5',
    client: 'Devendra Rao',
    role: 'Operations Director',
    company: 'Atlas Fitness',
    quote:
      'From the very first discovery call with Anas, we knew we were in expert hands. The new website plus lead ads sold out our VIP conditioning cohort in less than 3 weeks.',
    rating: 5,
    metric: '320+ New Annual Members',
    service: 'Website + Meta Ads',
    initials: 'DR',
  },
  {
    id: 't-6',
    client: 'Kabir Singhania',
    role: 'Chief Creative Officer',
    company: 'Amplyst Design & Co',
    quote:
      'Partnering with Ambros on client builds is seamless. Anas and his team bring rare technical rigor and taste. They understand how design and business metrics must harmonize.',
    rating: 5,
    metric: 'Strategic Agency Partner',
    service: 'Full-Stack Development',
    initials: 'KS',
  },
];

// Team section: "A Team of 5 Specialists" — placeholder cards with roles (Designer, Developer, Ads Strategist, Content, Growth)
export const TEAM_SPECIALISTS: TeamMember[] = [
  {
    name: 'Karan Dave',
    role: 'Lead UI/UX & Motion Designer',
    focus: 'Visual Systems & 3D Spatial Experiences',
    avatarText: 'KD',
    isPlaceholder: true,
  },
  {
    name: 'Zayan Mehta',
    role: 'Senior Full-Stack Engineer',
    focus: 'Next.js, High-Performance Web & SEO',
    avatarText: 'ZM',
    isPlaceholder: true,
  },
  {
    name: 'Nisha Singhal',
    role: 'Meta Ads & Media Strategist',
    focus: 'Performance Funnels & Paid Acquisition',
    avatarText: 'NS',
    isPlaceholder: true,
  },
  {
    name: 'Rohan Joshi',
    role: 'Direct-Response Copywriter & Content Lead',
    focus: 'Persuasive Copywriting & Storytelling',
    avatarText: 'RJ',
    isPlaceholder: true,
  },
  {
    name: 'Ayesha Merchant',
    role: 'Growth & Conversion Optimization Specialist',
    focus: 'Data Analytics, A/B Testing & Retargeting',
    avatarText: 'AM',
    isPlaceholder: true,
  },
];

export const FAQS = [
  {
    question: 'What types of businesses do you work with?',
    answer:
      'We work with ambitious founders, established lifestyle brands, professional firms, and scaling ventures that recognize the ROI of world-class design and targeted customer acquisition.',
  },
  {
    question: 'How does your timeline work?',
    answer:
      'Web flagships are delivered within 2 to 4 weeks across disciplined sprints. Digital visiting cards are ready in 48 hours. Meta Ads funnels are fully designed and launched within 5 to 7 days.',
  },
  {
    question: 'Why do you choose WhatsApp for all primary communications?',
    answer:
      'Direct, frictionless communication wins. Instead of hiding behind ticket queues or delayed email chains, our clients have direct WhatsApp access to Anas and the creative team.',
  },
  {
    question: 'Can you handle both web design and paid advertising together?',
    answer:
      'Yes — in fact, that is our greatest competitive advantage. When the team designing your landing page is the same team running your ads, conversion friction disappears.',
  },
  {
    question: 'How do the Digital Visiting Cards work?',
    answer:
      'Our physical cards contain embedded NFC chips. When tapped against any modern iPhone or Android, your branded digital profile opens instantly without requiring any app download.',
  },
];

