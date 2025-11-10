// i18nContext.js
import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import traduccionesCat from "../languaguesFiles/cat.json";
import traduccionesEng from "../languaguesFiles/eng.json";
import traduccionesEs from "../languaguesFiles/es.json";

const i18nContext = createContext();
export const I18nProvider = ({ children }) => {
  const [currLang, setCurrLang] = useState("cat");
  const [translations, setTranslations] = useState(traduccionesCat);

  const handleSelectLanguage = (newLanguage) => {
    setCurrLang(newLanguage);
    console.log(newLanguage);
    switch (newLanguage) {
      case "cat":
        setTranslations(traduccionesCat);
        break;
      case "en":
        setTranslations(traduccionesEng);
        break;
      case "es":
        setTranslations(traduccionesEs);
        break;
      default:
        setTranslations(traduccionesCat);
    }
  };

  return (
    <i18nContext.Provider
      value={{
        currLang,
        translations,
        handleSelectLanguage,
      }}
    >
      {children}
    </i18nContext.Provider>
  );
};

I18nProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useI18n = () => {
  return useContext(i18nContext);
};
