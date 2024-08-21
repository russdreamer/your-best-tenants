import { useRef } from 'react';
import AppCss from './App.module.css'
import FrontView, { FrontViewHandlerType } from './components/FrontView';
import Header from './components/Header'
import { LanguageProvider } from './context/LanguageContext';
import { FrontViewProvider } from './context/FrontViewContext';
import Content from './components/Content';
import Footer from './components/Footer';
import { ContactsMenuHandlerType } from './components/Contacts';

function App() {
  const frontViewRef = useRef<FrontViewHandlerType>(null);
  const contactsMenu = useRef<ContactsMenuHandlerType>(null);

  return (
    <>
    <FrontViewProvider frontViewRef={frontViewRef}>
    <LanguageProvider>
        <FrontView ref={frontViewRef}/>
        <Header ref={contactsMenu}/>
        <div className={AppCss.container}>
          <div className={AppCss.content}>
            <Content/>
          </div>
        </div>
        <Footer contactsMenu={contactsMenu}/>
        </LanguageProvider>
      </FrontViewProvider>
    </>
  )
}

export default App
