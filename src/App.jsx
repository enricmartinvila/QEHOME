import './App.css'
import { I18nProvider } from "./Components/i18nContext"
import Contacte from './Pages/Contacto'
import Descripcion from './Pages/Descripcion'
import Header from './Pages/Header'
import './Pages/MainPage'
import MainPage from './Pages/MainPage'
import { Analytics } from "@vercel/analytics/react"

function App() {

  return (
    <>
    <I18nProvider>
        <Header/>
        <MainPage/>
        <Descripcion/>
        <Contacte />
        <Analytics />
        {/* <DownloadingDiv /> */}
    </I18nProvider>

    </>
  )
}

export default App
