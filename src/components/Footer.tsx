import { useEffect, useRef } from "react";
import { useLanguage } from "../context/LanguageContext";
import FooterCSS from './Footer.module.css';
import { ContactsMenuHandlerType } from "./Contacts";

type FooterProps = {
    contactsMenu: React.RefObject<ContactsMenuHandlerType>
}

export default ({contactsMenu}: FooterProps) => {
    const { t } = useLanguage();
    const contactBtn = useRef<HTMLDivElement>(null);

    useEffect(() => {
        contactBtn.current?.addEventListener("click", clickContactEventHandler);
        
        return () => {
            contactBtn.current?.removeEventListener("click", clickContactEventHandler);
        }
    }, [t]);

    function clickContactEventHandler() {
        contactsMenu?.current?.open();
    }
      
    return (
        <div className={FooterCSS.wrapper}>
            <div ref={contactBtn} className={FooterCSS.contacts}>
                {t.header.contacts}
            </div>
        </div>
    );
}
