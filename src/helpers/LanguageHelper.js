import { languages } from '../assets';

/**
 * A language helper class to manage saving the language in the storage, getting the language from the storage and switching the language.
 */
class LanguageHelper {
    language = null;
    strLanguage = null;

    /**
     * Gets the language from the local storage and sets the class' language accordingly.
     */
    constructor() {
        const browserLanguage = navigator.language;
        const userSelectedLanguage = localStorage.getItem('language');
        const chosenLanguage = userSelectedLanguage || browserLanguage;
        this.strLanguage = chosenLanguage;
        if (chosenLanguage === 'en')
            this.language = languages.en;
        else this.language = languages.tr;
    }

    /**
     * Gets the language as a string which is either "tr" or "en" at this point.
     */
    getLanguage() {
        return this.language;
    }

    /**
     * Saves the language setting in the local storage as a string which is either "tr" or "en" at this point.
     * @param {string} lang either "tr" or "en"
     */
    setLanguage(lang) {
        localStorage.setItem('language', lang);
        if (lang === 'en')
            this.language = languages.en;
        else this.language = languages.tr;
    }
}

export default new LanguageHelper();