import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import mailIcon from '../assets/mail.svg';
import phoneIcon from '../assets/phone.svg';
import instagramIcon from '../assets/img/Instagram_icon.png';
import ContactsCSS from "./Contacts.module.css";
import { useLanguage } from '../context/LanguageContext';
import ContactItem, { ContactItemProps } from './ContactItem';
import { useFrontView } from '../context/FrontViewContext';
import { ContactsContextProvider } from '../context/ContactsContext';

export type ContactsMenuHandlerType = {
    open(): void;
}

export default forwardRef((_, contactBtnRef) => {
    const { t }  = useLanguage();
    const contactBtn = useRef<HTMLButtonElement>(null);
    const contactsMenu = useRef<HTMLDivElement>(null);
    const closeBtn = useRef<HTMLButtonElement>(null);

    const { ref } = useFrontView();

    useEffect(() => {
        contactBtn.current?.addEventListener("click", clickContactEventHandler);
        closeBtn.current?.addEventListener("click", clickCloseEventHandler);
        contactsMenu.current?.addEventListener("click", clickCloseEventHandler);

        return () => {
            contactBtn.current?.removeEventListener("click", clickContactEventHandler);
            closeBtn.current?.removeEventListener("click", clickCloseEventHandler);
            contactsMenu.current?.removeEventListener("click", clickCloseEventHandler);
        }
    }, [t]);

    useImperativeHandle(contactBtnRef, ():ContactsMenuHandlerType => ({
        open: clickContactEventHandler
    }));

    const phoneOptions = {copy: {before: t.contacts.actions.copy, after: t.contacts.actions.copied}, open: t.contacts.actions.call};
    const mailOptions = {copy: {before: t.contacts.actions.copy, after: t.contacts.actions.copied}, open: t.contacts.actions.email};
    const contacts: Array<ContactItemProps> = [
        {title: t.contacts.igor, url: "https://www.instagram.com/igatroll", img: instagramIcon, sameTab: false},
        {title: t.contacts.mary, url: "https://www.instagram.com/masha_chuchko", img: instagramIcon, sameTab: false},
        {title: t.contacts.email, url: "mailto:" + t.contacts.email, img: mailIcon, sameTab: true, options: mailOptions},
        {title: t.contacts.phone, url: "tel:" + t.contacts.phone.replace(/\s+/g, ''), img: phoneIcon, sameTab: true, options: phoneOptions},
    ];

    const menuEl:React.ReactNode = <ContactsContextProvider>{contacts.map((c, i) => <ContactItem key={i} {...c}/>)}</ContactsContextProvider>

    const clickContactEventHandler = () => {
        ref?.current?.show(menuEl);
    }

    const clickCloseEventHandler = () => {
        if (contactsMenu.current) {
            contactsMenu.current.style.display = "none";
        }
    }

    
    return(
        <button ref={contactBtn} className={ContactsCSS['nav-bar-item']}>
            {t?.header.contacts}
        </button>
    );
});