import {Snaked, SnakeObjectToCamelCase} from '@app/shared/utils/SnakeToCamelCase';
import {Profile} from '@app/shared/types/models/auth';

export interface IPost {
  id: number
  content: string
  author: Profile
  createdAt: string
}

export class Post implements IPost {
  id: number;
  content: string;
  createdAt: string;
  author: Profile;

  constructor(snakedPost: Snaked<IPost>) {
    const post = SnakeObjectToCamelCase(snakedPost);
    this.id = post.id;
    this.content = post.content;
    this.createdAt = post.createdAt;
    this.author = SnakeObjectToCamelCase(post.author);
  }
}
