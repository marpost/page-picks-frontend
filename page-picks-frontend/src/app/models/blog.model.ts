import {User} from "./user.model";

export interface Blog {
  id?: number;
  title: string;
  content: string;
  author?: User;
  createdAt?: Date;
  updatedAt?: Date;
  tags?: string[];
  likes?: number;
}



