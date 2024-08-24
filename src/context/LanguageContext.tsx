import { createContext, useContext, useState } from 'react';
import en from '../assets/translations/en.json';
import nl from '../assets/translations/nl.json';
import ru from '../assets/translations/ru.json';
import enFlag from '../assets/img/en_flag.png';
import ruFlag from '../assets/img/ru_flag.png';
import nlFlag from '../assets/img/nl_flag.png';

type Language = {
    name: string,
    code: string,
    flag: string
}

type Translation = {
    header: {
        contacts: string,
        title: string
    },
    content: {
        section1: string
        section2: string
        section3: string
        section4: {
            title: string
            point1: string
            point2: string
            point3: string
            point4: string
        }
        section5: string
        section6: string
    },
    contacts: {
        igor: string,
        mary: string,
        phone: string,
        email: string,
        actions: {
            copy: string,
            copied: string,
            call: string,
            email: string
        }
    }
}

const translations: {[key: string] : Translation} = {
    en,
    nl,
    ru
}

type LanguageContextType = {
    language: string
    changeLanguage(value: string): void
    t: Translation
}

export const Languages: {[key:string]: Language} = {
    English: {name: "English", code: "en", flag: enFlag},
    Dutch: {name: "Netherlands", code: "nl", flag: nlFlag},
    Russian: {name: "Русский", code: "ru", flag: ruFlag}
}

const defaultLanguageCode = Languages.English.code;
export var LanguageContext:React.Context<LanguageContextType> = createContext<LanguageContextType>({language:defaultLanguageCode, changeLanguage: ()=>{}, t:translations[defaultLanguageCode]});

type LanguageContextProps = {
    children: React.ReactNode
}

export const LanguageProvider = ({ children }: LanguageContextProps) => {
    const [language, setLanguage] = useState(getUserLanguage());
    const changeLanguage = (newLanguage:string) => {
        setUserLanguage(newLanguage);
        setLanguage(newLanguage);
    };

    const t = translations[language];
    const langContext = {language, changeLanguage, t};

    return (
        <LanguageContext.Provider value={langContext}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = ():LanguageContextType => {
    return useContext(LanguageContext);
};

function getUserLanguage(): string {
    const lan = localStorage.getItem('lan');
    var ul = Object.values(Languages).find(v => v.code == lan)?.code;
    if (!ul) {
        var prefLanguages = navigator.languages;
        if (prefLanguages) {
            prefLanguages = prefLanguages.flatMap(l => l.split('-')).map(l => l.toLowerCase());
            ul = prefLanguages.find(el => el == Object.values(Languages).find(v => v.code == el)?.code);
        }
    }
    return ul || defaultLanguageCode;
}

function setUserLanguage(newLanguage: string): void {
    localStorage.setItem('lan', newLanguage);
}