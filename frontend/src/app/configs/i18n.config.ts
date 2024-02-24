export const supportedLanguages = {
    ru_RU: 'Русский',
    en_US: 'English'
};

export const defaultLanguge = localStorage.getItem('uits_lang') ||  Object.keys(supportedLanguages)[0];
