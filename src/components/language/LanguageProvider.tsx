"use client";

import { createContext, Dispatch, SetStateAction, useState } from "react";

export const LanguageContext = createContext({
  lang: null,
  setLang: () => {},
} as {
  lang: "ko" | "en" | null;
  setLang: Dispatch<SetStateAction<"ko" | "en" | null>>;
});

const LanguageProvider = ({ children }: { children: JSX.Element }) => {
  const [lang, setLang] = useState<"ko" | "en" | null>(null);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
