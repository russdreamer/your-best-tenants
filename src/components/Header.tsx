import HeaderCSS from './Header.module.css';
import Contacts from './Contacts';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '../context/LanguageContext';
import { forwardRef } from 'react';


export default forwardRef((_, ref) => {
    const { t }  = useLanguage();
    return(
        <header>
            <div className={HeaderCSS['header-content']}>
                <div className={HeaderCSS.title}>
                    <i>{t.header.title}</i>
                </div>
                <div className={HeaderCSS['nav-items']}>
                    <Contacts ref={ref}/>
                    <LanguageSwitcher />
                </div>
            </div>
        </header>
    );
});