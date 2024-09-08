import { User } from './user.model';
import {Book} from "../service/interface/book";

export interface UserBookStatus {
  id?: number;
  user: User;
  book: Book;
  status: string;
  currentPage?: number;
  rating?: number;
  review?: string;
  favorite?: boolean;
}
