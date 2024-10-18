"use client";

import { ChangeEvent, useContext, useEffect } from "react";
import { LanguageContext } from "./LanguageProvider";

const LangChanger = () => {
  const { lang, setLang } = useContext(LanguageContext);

  useEffect(() => {
    if (lang) return;

    if (window.navigator.language.includes("ko")) {
      setLang("ko");
    } else {
      setLang("en");
    }
  }, [lang, setLang]);

  const onLangChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setLang(e.target.value as "ko" | "en");
  };

  return lang ? (
    <select
      onChange={onLangChange}
      value={lang || "en"}
      className="text-sm h-fit outline-none mx-2 border rounded"
    >
      <option value="ko">한국어</option>
      <option value="en">English</option>
    </select>
  ) : null;
};

export default LangChanger;
