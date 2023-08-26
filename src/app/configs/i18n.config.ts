export const supportedLanguages = {
    en_US: 'English',
    fr_FR: 'French'
}

export const defaultLanguge = localStorage.getItem('lang') ||  Object.keys(supportedLanguages)[0]
