import { useEffect, useRef, useState } from 'react'
import ContactItemCSS from './ContactItem.module.css'
import { useContacts } from '../context/ContactsContext'

export type ContactItemProps = {
    title: string,
    url: string,
    img: string,
    sameTab: boolean,
    options?: {
        copy: {
            before: string,
            after: string
        },
        open: string
    }
}

export default ({title, url, img, sameTab, options}: ContactItemProps) => {
    var {openTitle, setOpenTitle} = useContacts();
    const [withDelay, setWithDelay] = useState(false);
    const [isOptionVisible, setOptionVisible] = useState(false);
    const contactBtn = useRef<HTMLButtonElement>(null);
    const copyOptionBtn = useRef<HTMLButtonElement>(null);
    const openOptionBtn = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        contactBtn.current?.addEventListener("click", clickContactEventHandler);
        copyOptionBtn.current?.addEventListener("click", clickCopyOptionEventHandler);
        openOptionBtn.current?.addEventListener("click", clickOpenOptionEventHandler);
        return () => {
            contactBtn.current?.removeEventListener("click", clickContactEventHandler);
            copyOptionBtn.current?.removeEventListener("click", clickCopyOptionEventHandler);
            openOptionBtn.current?.removeEventListener("click", clickOpenOptionEventHandler);
        }
    }, []);

    useEffect(() => {
        setOptionVisible(openTitle == title);
        setWithDelay(openTitle == undefined);
    }, [openTitle]);

    const clickContactEventHandler = () => {
        if (options) {
            setOpenTitle(title);
        } else {
            window.open(url, sameTab ? '_self' : '_blank');
        }
    }

    const clickCopyOptionEventHandler = () => {
        navigator.clipboard.writeText(title);
        setOpenTitle(undefined);
    }

    const clickOpenOptionEventHandler = () => {
        setOpenTitle(undefined);
        window.open(url, sameTab ? '_self' : '_blank');
    }

    return (
        <div className={ContactItemCSS['buttons-container']}>
            <button ref={contactBtn} className={`${ContactItemCSS.item} ${isOptionVisible? '' : ContactItemCSS['visible']} ${withDelay ? ContactItemCSS['delay'] : ''}`}>
                <div className={ContactItemCSS.wrapper}>
                    <img className={ContactItemCSS.icon} src={img} alt=""/>
                    {title}
                </div>
            </button>
            <div className={`${ContactItemCSS['item-options']} ${isOptionVisible ? ContactItemCSS['visible'] : ''} ${withDelay? ContactItemCSS['delay'] : ''}`}>
                <button ref={copyOptionBtn} className={`${ContactItemCSS.option} ${ContactItemCSS['option-left']} ${isOptionVisible ? ContactItemCSS['visible'] : ''} ${withDelay? ContactItemCSS['delay'] : ''}`}>
                    <div className={ContactItemCSS.wrapper}>
                        {withDelay ? options?.copy.after : options?.copy.before}
                    </div>
                </button>
                <button ref={openOptionBtn} className={`${ContactItemCSS.option} ${ContactItemCSS['option-right']} ${isOptionVisible? ContactItemCSS['visible'] : ''} ${withDelay? ContactItemCSS['delay'] : ''}`}>
                    <div className={ContactItemCSS.wrapper}>
                        {options?.open}
                    </div>
                </button>
            </div>
        </div>
    );
}