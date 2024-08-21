import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import FrontViewCSS from './FrontView.module.css';

export type FrontViewHandlerType = {
    show(chidlren: React.ReactNode): void
}

export default forwardRef((_, ref) => {
    const closeBtn = useRef<HTMLButtonElement>(null);
    const [children, setChildren] = useState<React.ReactNode>();
    const frontContainer = useRef<HTMLDivElement>(null);
    const frontItem = useRef<HTMLDivElement>(null);

    const showFrontItem = (item: React.ReactNode) => {
        setChildren(item);
        if (frontContainer.current) {
            frontContainer.current.classList.add(FrontViewCSS.visible);
        }
    }

    const clickCloseEventHandler = (event:MouseEvent) => {
        if (frontContainer.current && !frontItem.current?.contains(event.target as Node)) {
            setChildren(null);
            frontContainer.current.classList.remove(FrontViewCSS.visible);
        }
    }

    useImperativeHandle(ref, ():FrontViewHandlerType => ({
        show(chidlren: React.ReactNode) {
            showFrontItem(chidlren);
        }
    }));

    useEffect(() => {
        closeBtn.current?.addEventListener("click", clickCloseEventHandler);
        frontContainer.current?.addEventListener("click", clickCloseEventHandler);
        return () => {
            closeBtn.current?.removeEventListener("click", clickCloseEventHandler);
            frontContainer.current?.removeEventListener("click", clickCloseEventHandler);
        }
    }, []);

    return(
        <>
        <div ref={frontContainer} className={FrontViewCSS['front-container']}>
            <div className={FrontViewCSS['closable']}>
                <button ref={closeBtn} type="button" aria-label="Close">
                    ×
                </button>
            </div>
            <div className={FrontViewCSS['front-item-container']}>
                <div ref={frontItem}>
                    {children}
                </div>
            </div>
        </div>
        </>
    );
});