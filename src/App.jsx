import "./App.css"
import { I18nProvider } from "./Components/i18nContext"
import Contacte from "./Pages/Contacto"
import Descripcion from "./Pages/Descripcion"
import Header from "./Pages/Header"
import "./Pages/Main"
import Main from "./Pages/Main"
import { Analytics } from "@vercel/analytics/react"

function App() {
	return (
		<>
			<I18nProvider>
				<Header />
				<Main />
				<Descripcion />
				<Contacte />
				<Analytics />
			</I18nProvider>
		</>
	)
}

export default App
