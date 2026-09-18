export type PageId = 'home' | 'about' | 'services' | 'work' | 'contact';

export interface Partner {
  name: string;
  category: string;
  description: string;
  url?: string;
  badge: string;
}

export interface ServiceItem {
  number: string;
  id: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  metrics: {
    label: string;
    value: string;
  }[];
  accent: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  category: string;
  tag: string;
  year: string;
  image: string;
  altText: string;
  brief: string;
  approach: string;
  outcome: string;
  stats: {
    value: string;
    label: string;
  }[];
  deliverables: string[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
}

export interface Testimonial {
  id: string;
  client: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
  metric: string;
  service: string;
  initials: string;
}

export interface TeamMember {
  name: string;
  role: string;
  focus: string;
  isPlaceholder?: boolean;
  avatarText: string;
}
