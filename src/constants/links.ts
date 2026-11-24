export const BOOKING_URL =
	"https://www.booking.com/hotel/es/qehome-confort-y-parquing-en-el-centro-de-manresa.es.html"

export const AIRBNB_URL = "https://www.airbnb.es/rooms/1292748522071548966"

// Address of the direct booking app. Empty: the site keeps linking to Booking and Airbnb.
const DIRECT_BASE = (import.meta.env.PUBLIC_DIRECT_BOOKING_URL ?? "").replace(/\/$/, "")
export const BOOKING_API = DIRECT_BASE
export const DIRECT_BOOKING = DIRECT_BASE !== ""
export const BOOKING_SLUG = "reservar"
export const directBookingUrl = (lang: string) => (DIRECT_BOOKING ? `/${lang}/${BOOKING_SLUG}/` : "")

export const CAL_MASSES_URL = "https://calmasses.com"

export const WHATSAPP_URL =
	"https://wa.me/34640955572?text=Hola%2C%20quiero%20m%C3%A1s%20informaci%C3%B3n%20sobre%20el%20apartamento."

export const PHONE_DISPLAY = "640 95 55 72"
export const PHONE_TEL = "+34640955572"
export const EMAIL = "qehomemanresa@gmail.com"
export const ADDRESS = "Carrer Doctor Esteve 9, Manresa"
export const MAPS_URL =
	"https://www.google.com/maps/place/Carrer+dels+Doctor+Esteve,+9,+08242+Manresa,+Barcelona"
