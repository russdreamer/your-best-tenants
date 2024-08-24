import { ChangeEvent, useEffect, useState } from 'react';
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

    useEffect(() => {

    }, [selectedLangOpt]);

    return(
        <div className={LanguageSwitcherCss['switcher-box']}>
            <div className={`${LanguageSwitcherCss.switcher} ${LanguageSwitcherCss['switcher-container']}`}>
                <img src={getFlagSource(language)} className={LanguageSwitcherCss.flag}/>
                <select name="language" id={LanguageSwitcherCss['lan']}>
                    <option value="" defaultValue="true">{selectedLangOpt}</option>
                </select>
            </div>
            <select name="language" onChange={(ev) => handleLanguageSelectChange(ev)} id={LanguageSwitcherCss['lan-fake']} className={LanguageSwitcherCss.switcher} value={language ? language : 1}>
                {Object.entries(Languages).map(([, lang]) => (<option key={lang.code} id={lang.code} value={lang.code}>{lang.name}</option>))}
            </select>
        </div>
    );
}

function getFlagSource(languageCode: string): string {
    return Object.entries(Languages).map(([, lang]) => lang).find(lang => lang.code == languageCode)?.flag || Languages.English.flag;
}

function getCurrentLocale(languageCode: string): string {
    var language = Object.entries(Languages).map(([, lang]) => lang).find(lang => lang.code == languageCode);
    return shortenLanguage(language ? language.name :  Languages.English.name);
}

function shortenLanguage(text: string): string {
    return text.substring(0, 2);
}
