// i18nContext.js
import { createContext, useContext, useState, useEffect } from "react"
import PropTypes from "prop-types"
import traduccionesCat from "../languaguesFiles/cat.json"
import traduccionesEng from "../languaguesFiles/eng.json"
import traduccionesEs from "../languaguesFiles/es.json"

const i18nContext = createContext()

export const I18nProvider = ({ children }) => {
    const [currLang, setCurrLang] = useState("cat")
    const [translations, setTranslations] = useState(traduccionesCat)

    // 🔹 Función para cargar traducciones según código de idioma
    const loadTranslations = (langCode) => {
        switch (langCode) {
            case "cat":
            case "ca":
                setCurrLang("cat")
                setTranslations(traduccionesCat)
                break
            case "es":
            case "es-ES":
                setCurrLang("es")
                setTranslations(traduccionesEs)
                break
            case "en":
            case "en-US":
            case "en-GB":
                setCurrLang("en")
                setTranslations(traduccionesEng)
                break
            default:
                setCurrLang("cat")
                setTranslations(traduccionesCat)
        }
    }

    // 🔹 Detectar idioma del navegador al montar
    useEffect(() => {
        if (typeof navigator !== "undefined") {
            const browserLang = navigator.language || navigator.userLanguage
            const shortLang = browserLang.split("-")[0].toLowerCase() // ej: "es" de "es-ES"
            loadTranslations(shortLang)
        }
    }, [])

    // 🔹 Permite cambiar idioma manualmente desde selects, etc.
    const handleSelectLanguage = (newLanguage) => {
        loadTranslations(newLanguage)
    }

    return (
        // eslint-disable-next-line react/react-in-jsx-scope
        <i18nContext.Provider
            value={{
                currLang,
                translations,
                handleSelectLanguage,
            }}
        >
            {children}
        </i18nContext.Provider>
    )
}

I18nProvider.propTypes = {
    children: PropTypes.node.isRequired,
}

export const useI18n = () => useContext(i18nContext)
