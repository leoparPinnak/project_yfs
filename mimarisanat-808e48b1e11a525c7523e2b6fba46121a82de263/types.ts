export interface NavItem {
  label: string;
  path: string;
}

export interface ProjectFeature {
  title: string;
  description: string;
  iconName: 'Home' | 'Shield' | 'Leaf' | 'MapPin';
}

export interface Partner {
  name: string;
  logoUrl: string;
}

export interface ContactFormState {
  name: string;
  email: string;
  phone: string;
  message: string;
}