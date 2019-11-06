import { TRANSLATIONS } from '../constants/translateLanguage';
export const trls = (translate_key) => {
    return(
        TRANSLATIONS["nl_BE"][translate_key]
    )
};