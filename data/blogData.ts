export interface BlogPost {
  id?: string;
  _id?: string;
  slug: string;
  title: string;
  category: string;
  categorySlug: string;
  date: string;
  author: string;
  image: string;
  bgColor: string; // Pastel background color for the studyfound card style
  readTime: string;
  popular: boolean;
  content: string;
  views: number;
}

export const blogPosts: BlogPost[] = [];
