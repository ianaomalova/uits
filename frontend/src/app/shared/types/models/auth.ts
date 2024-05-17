import {Permission} from "@app/shared/types/permission.enum";

export interface TelegramUser {
  id: number,
  userId: number,
  username: string,
  chatId: number,
  assignedUser: number
}

export interface Profile {
  pk: number;
  avatar: string;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  isSuperuser: boolean;
  isModerator: boolean;
  isTeacher: boolean;
  isAnonymous: boolean;
  telegramCode: string;
  telegramUser: TelegramUser | null;
}


export const createAnonymousProfile = (): Profile => {
  return {
    pk: -1,
    username: 'anonymous',
    isSuperuser: false,
    isModerator: false,
    isTeacher: false,
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

export const getUserPermissions = (profile: Profile): Permission[] => {
  if (profile.isSuperuser) {
    return [Permission.SUPERUSER, Permission.MODERATOR, Permission.TEACHER, Permission.USERS]
  }
  if (profile.isModerator) {
    return [Permission.MODERATOR, Permission.USERS]
  }
  if (profile.isTeacher) {
    return [Permission.TEACHER, Permission.USERS]
  }
  if (!profile.isAnonymous) {
    return [Permission.USERS]
  } else {
    return []
  }
}
