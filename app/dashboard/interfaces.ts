export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  discount: number;
  image: string;
  description: string;
  charity: string;
  charityPercent: number;
  stock: number;
  rating: number;
  reviews: number;
  tags: string[];
  sizes?: string[];
  colors?: string[];
  pages?: number;
  author?: string;
  volume?: string;
  material?: string;
  persons?: number;
  size?: string;
  players?: string;
  ageGroup?: string;
  height?: string;
}

export interface Charity {
  id: string;
  name: string;
  description: string;
  logo: string;
  website: string;
  totalRaised: number;
  childrenHelped?: number;
  peopleHelped?: number;
}
export interface ProductCatalog {
  categories: Category[];
  products: Product[];
  charities: Charity[];
}
