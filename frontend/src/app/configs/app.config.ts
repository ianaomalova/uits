import { AppConfig } from '@app/shared/types/app-config.interface';
import { defaultLanguge } from './i18n.config';

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
