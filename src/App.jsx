import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './Pages/MainPage'
import MainPage from './Pages/MainPage'
import Descripcion from './Pages/Descripcion'
import Espacios from './Pages/Espacios'
import Contacto from './Pages/Contacto'
import Header from './Pages/Header'
import { I18nProvider } from "./Components/i18nContext";
import DownloadingDiv from './Pages/DownloadingDiv'


function App() {

  return (
    <>
    <I18nProvider>
        <Header/>
        <MainPage/>
        <Descripcion/>
        <Espacios/>
        <Contacto/>
        {/* <DownloadingDiv /> */}
    </I18nProvider>

    </>
  )
}

export default App
