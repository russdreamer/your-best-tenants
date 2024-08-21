import { createContext, useContext } from "react";
import { FrontViewHandlerType } from "../components/FrontView";

type FrontViewContextProps = {
    frontViewRef: React.RefObject<FrontViewHandlerType>
    children: React.ReactNode
}

type FrontViewContextType = {
    ref: React.RefObject<FrontViewHandlerType>|undefined
}

export var FrontViewContext:React.Context<FrontViewContextType> = createContext<FrontViewContextType>({ref: undefined});

export const FrontViewProvider = ({frontViewRef, children }: FrontViewContextProps) => {
    const frontViewContext:FrontViewContextType = {ref: frontViewRef};

    return (
        <FrontViewContext.Provider value={frontViewContext}>
            {children}
        </FrontViewContext.Provider>
    );
}

export const useFrontView = ():FrontViewContextType => {
    return useContext(FrontViewContext);
};