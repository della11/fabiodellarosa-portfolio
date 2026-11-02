import { Category } from './enums';

export interface Project {
  title: string;
  category: Category;
  img: string;
  link: string;
  tags: Array<string>;
}
