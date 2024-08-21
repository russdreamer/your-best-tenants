import { createContext, useContext, useState } from "react";

type ContactsContextProps = {
    children: React.ReactNode
}

type ContactsContextType = {
    openTitle?: string
    setOpenTitle(name: string|undefined): void
}
var defaultContext:ContactsContextType = {setOpenTitle: () => {}};
var ContactsContext:React.Context<ContactsContextType> = createContext<ContactsContextType>(defaultContext);

export const ContactsContextProvider = ({ children }: ContactsContextProps) => {
    const [titleName, setTitleName] = useState<string|undefined>("");
    const contextValue:ContactsContextType = {
        openTitle: titleName,
        setOpenTitle: setTitleName
    };

    return (
        <ContactsContext.Provider value={contextValue}>
            {children}
        </ContactsContext.Provider>
    );
}

export const useContacts = ():ContactsContextType => {
    return useContext(ContactsContext);
};