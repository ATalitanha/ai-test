interface AppLink {
  href: string;
  label: string;
  color: string;
  icon: string;
  category: string;
  popular?: boolean;
  new?: boolean;
}

interface CategorySection {
  title: string;
  items: AppLink[];
}