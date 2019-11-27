import { TRANSLATIONS } from '../constants/translateLanguage';
export const trls = (translate_key) => {
    var lang = window.localStorage.getItem('tekwoods_lang');
    return(
        TRANSLATIONS[lang][translate_key]
    )
};