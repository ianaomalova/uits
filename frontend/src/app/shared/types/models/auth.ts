export interface Profile {
  avatar: string;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  isSuperuser: boolean;
  isModerator: boolean;
  isAnonymous: boolean;
}


export const createAnonymousProfile = (): Profile => {
  return {
    username: 'anonymous',
    isSuperuser: false,
    isModerator: false,
    isAnonymous: true,
    email: null,
    lastName: '',
    firstName: '',
    avatar: getDefaultUserAvatarPath()
  };
}

export const getDefaultUserAvatarPath = (): string => '/assets/images/avatars/default-user.png'
