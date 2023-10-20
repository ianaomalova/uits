import {Snaked, SnakeObjectToCamelCase} from '@app/shared/utils/SnakeToCamelCase';
import {Profile} from '@app/shared/types/models/auth';

export interface IPost {
  id: number
  title: string
  shortDescription: string;
  content: string
  author: Profile
  createdAt: string
}

export class Post implements IPost {
  id: number;
  title: string;
  shortDescription: string;
  content: string;
  createdAt: string;
  author: Profile;

  constructor(snakedPost: Snaked<IPost>) {
    const post = SnakeObjectToCamelCase(snakedPost);

    this.id = post.id;
    this.title = post.title;
    this.shortDescription = post.shortDescription;
    this.content = post.content;
    this.createdAt = post.createdAt;
    try {
      this.author = SnakeObjectToCamelCase(post.author);
    } catch (e) {
      this.author = {
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        isModerator: false,
        isSuperuser: false,
        isAnonymous: true
      };
    }
  }
}
