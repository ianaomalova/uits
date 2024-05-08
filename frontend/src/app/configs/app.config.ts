import {AppConfig} from '@app/shared/types/app-config.interface';
import {defaultLanguge} from './i18n.config';

export const AppConfiguration: AppConfig = {
  layoutType: 'horizontal',
  sideNavCollapse: false,
  mobileNavCollapse: false,
  lang: defaultLanguge,
  navMenuColor: 'light',
  headerNavColor: '#ffffff'
};

// Change your API endpoint here
export const API_ENDPOINT = '/api';

export const AVATAR_DEFAULT_URL = 'assets/images/avatars/avatar_default.jpg';

export const UNSAVED_WARN_MESSAGE = "Внимание: Вы имеете несохраненные данные. Нажмите Отменить, чтобы вернуться и сохранить изменения, или OK чтобы уйти со страницы и потерять изменения.";
