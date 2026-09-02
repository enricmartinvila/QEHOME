# Migración Astro

## Estado: completada ✓

- **Cluster 1:** cimientos Astro SSG
- **Cluster 2:** home comercial completa
- **Cluster 3:** landings transaccionales (parking, UManresa, Camino Ignaciano)
- **Cluster 4:** landings informativas (qué ver, Montserrat, enoturismo) + apagado SPA

## Comandos

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Dev Astro |
| `npm run build` | Build → `dist/` |
| `npm run preview` | Preview local |

## Estructura

- `src/pages/` — rutas SSG (`ca/`, `es/`, `en/` + landings)
- `src/components/` — UI Astro
- `src/i18n/` — traducciones (`ca.json` = catalán nativo)
- `public/` — assets estáticos, `sitemap.xml`, `robots.txt`

## URLs indexables (21)

| Slug | Tipo |
|------|------|
| `/` (home) | Comercial |
| `apartamento-parking-manresa/` | Transaccional |
| `alojamiento-umanresa/` | Transaccional |
| `alojamiento-camino-ignaciano-manresa/` | Transaccional |
| `que-ver-manresa/` | Informativa |
| `visitar-montserrat-desde-manresa/` | Informativa |
| `enoturismo-pla-de-bages/` | Informativa |

Cada slug existe en `/ca/`, `/es/` y `/en/`. Redirects sin prefijo de idioma → `/es/...` en `vercel.json`.

## Eliminado en Cluster 4

- `legacy-spa/` (React + Vite + react-router)
- `scripts/prerender.mjs` (Puppeteer)
- Restos SPA en `src/Pages/`, `src/Components/`, `src/languaguesFiles/`
- Dependencias React, react-router, puppeteer, etc.
