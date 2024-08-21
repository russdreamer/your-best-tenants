import { ChangeEvent, useState } from 'react';
import LanguageSwitcherCss from './LanguageSwitcher.module.css';
import { Languages, useLanguage } from '../context/LanguageContext';

export default() => {
    const { language, changeLanguage } = useLanguage();
    var [selectedLangOpt, setSelectedLangOpt] = useState<string>(getCurrentLocale(language));

    const handleLanguageSelectChange = (ev: ChangeEvent<HTMLSelectElement>) => {
        const target = ev.target;
        setSelectedLangOpt(shortenLanguage(target.options[target.selectedIndex].text));
        changeLanguage(target.options[target.selectedIndex].id);
    }

    
    return(
        <div className={LanguageSwitcherCss['switcher-box']}>
        <select name="language" id={LanguageSwitcherCss['lan']} className={LanguageSwitcherCss.switcher}>
            <option value="" defaultValue="true">{selectedLangOpt}</option>
        </select>
        <select name="language" onChange={(ev) => handleLanguageSelectChange(ev)} id={LanguageSwitcherCss['lan-fake']} className={LanguageSwitcherCss.switcher} value={language ? language : 1}>
            {Object.entries(Languages).map(([, lang]) => (<option key={lang.code} id={lang.code} value={lang.code}>{lang.flag} {lang.name}</option>))}
        </select>
        </div>
    );
}

function getCurrentLocale(languageCode: string): string {
    var language = Object.entries(Languages).map(([, lang]) => lang).find(lang => lang.code == languageCode);
    return shortenLanguage(language ? `${language.flag} ${language.name}` : `${Languages.English.flag} ${Languages.English.name}`);
}

function shortenLanguage(text: string): string {
    const splits = text.split(" ");
    return `${splits[0]} ${splits[1].substring(0, 2)}`;
}
