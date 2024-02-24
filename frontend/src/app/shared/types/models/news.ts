import {Snaked, SnakeObjectToCamelCase} from '@app/shared/utils/SnakeToCamelCase';
import {createAnonymousProfile, Profile} from '@app/shared/types/models/auth';
import {string} from "@amcharts/amcharts4/core";
import {id} from "@swimlane/ngx-datatable";

export interface IPost {
  id: number
  title: string
  shortDescription: string;
  author: Profile
  createdAt: string
}


abstract class BasePost implements IPost {
  id: number;
  title: string;
  shortDescription: string;
  author: Profile;
  createdAt: string;


  protected constructor(post: IPost) {
    this.id = post.id;
    this.title = post.title;
    this.shortDescription = post.shortDescription;
    this.createdAt = post.createdAt;

    try {
      this.author = SnakeObjectToCamelCase(post.author);
    } catch (e) {
      this.author = createAnonymousProfile();
    }
  }
}

export class ListPost extends BasePost {
  previewImage: string;
  previewThumbnail: string;

  constructor(snakedPost: Snaked<ListPost>) {
    const post = SnakeObjectToCamelCase(snakedPost);
    super(post);
    this.previewImage = post.previewImage;
    this.previewThumbnail = post.previewThumbnail;
  }
}

export class Post extends BasePost {
  content: string;
  previewImage: string;
  previewImageDescription: string;

  constructor(snakedPost: Snaked<Post>) {
    const post = SnakeObjectToCamelCase(snakedPost);
    super(post);
    this.content = post.content;
    this.previewImage = post.previewImage;
    this.previewImageDescription = post.previewImageDescription;
  }
}


