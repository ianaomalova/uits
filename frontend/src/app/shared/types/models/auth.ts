export interface TelegramUser {
  id: number,
  userId: number,
  username: string,
  chatId: number,
  assignedUser: number
}

export interface Profile {
  avatar: string;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  isSuperuser: boolean;
  isModerator: boolean;
  isAnonymous: boolean;
  telegramCode: string;
  telegramUser: TelegramUser | null;
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
    avatar: getDefaultUserAvatarPath(),
    telegramCode: null,
    telegramUser: null
  };
}

export const getDefaultUserAvatarPath = (): string => '/assets/images/avatars/default-user.png'
