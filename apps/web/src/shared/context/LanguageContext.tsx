import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { isNotEmpty } from "../utils";

type SupportedLanguages = 'ru' | 'en';

interface LanguageContextProps {
  language: SupportedLanguages;
  handleLanguageChange: (language: SupportedLanguages) => void;
}

interface LanguageProviderProps {
    children: React.ReactNode;
}

const LanguageContext = React.createContext<LanguageContextProps | null>(null);

export const LanguageProvider: React.FC<LanguageProviderProps> = (props) => {
  const { children } = props;

  const router = useRouter();

  const [language, setLanguage] = useState<SupportedLanguages>('ru');

  useEffect(() => {
    if (router.locale === "ru") {
      setLanguage('ru');
    } else {
      setLanguage('en');
    }
  }, [router.locale]);

  const handleLanguageChange = (language: SupportedLanguages) => {
    setLanguage(language);

    if (isNotEmpty(router.query)) {
      router.push('/', '/', {locale: language});  

      return;
    }

    router.push(router.pathname, router.pathname, { locale: language });
  };

  const value = { language, handleLanguageChange };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used with LanguageProvider");
  }

  return context;
};