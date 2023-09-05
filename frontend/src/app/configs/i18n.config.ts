export const supportedLanguages = {
    ru_RU: 'Русский',
    en_US: 'English'
}

export const defaultLanguge = localStorage.getItem('lang') ||  Object.keys(supportedLanguages)[0]
