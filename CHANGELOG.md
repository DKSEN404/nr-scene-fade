# Changelog / Registro de Cambios

## v1.0.4 (2026-05-29)

### English
- Fixed: Tab navigation not working in transition form (Tabs initialization now has fallback click handlers)
- Fixed: Content tab visible by default (static `active` class as fallback)

### Español
- Corregido: Navegación por pestañas no funcionaba en el formulario de transición (inicialización de Tabs ahora con fallback de click handlers)
- Corregido: Pestaña de Contenido visible por defecto (clase `active` estática como fallback)

## v1.0.3 (2026-05-29)

### English
- Fixed: 4 remaining i18n paths missing `.other` segment (allowPlayersToEnd, gmEndAll, gmHide, activateScene)
- Fixed: `src.split is not a function` crash with legacy saved transitions — added `typeof` guard in `#isVideo`/`#getVideoType` and sanitize `bgImg`/`audio`/`content` in `play()`
- Added: Tabbed form layout — Content, Effects, Options tabs using Foundry v12 `Tabs` API
- Improved: Effects displayed in 2-column grid to prevent overlapping labels

### Español
- Corregido: 4 rutas i18n faltantes con segmento `.other` (allowPlayersToEnd, gmEndAll, gmHide, activateScene)
- Corregido: Error `src.split is not a function` con transiciones guardadas en versiones anteriores — se agregó guard `typeof` en `#isVideo`/`#getVideoType` y sanitización de `bgImg`/`audio`/`content` en `play()`
- Añadido: Diseño de formulario con pestañas — pestañas Contenido, Efectos, Opciones usando la API `Tabs` de Foundry v12
- Mejorado: Efectos en cuadrícula de 2 columnas para evitar solapamiento de etiquetas

## v1.0.2 (2026-05-29)

### English
- Fixed: i18n keys not resolving in transition form (wrong `{{localize}}` paths — missing `.content`, `.background`, `.transition` segments)
- Fixed: `src.split is not a function` crash when playing transition (duplicate `name="bgImg"` caused form data to produce an array)
- i18n: All form labels now display correctly

### Español
- Corregido: Claves i18n sin resolver en el formulario de transición (rutas `{{localize}}` incorrectas — faltaban segmentos `.content`, `.background`, `.transition`)
- Corregido: Error `src.split is not a function` al reproducir transición (el `name="bgImg"` duplicado hacía que los datos del formulario produjeran un array)
- i18n: Todas las etiquetas del formulario se muestran correctamente ahora

## v1.0.1 (2026-05-29)

### English
- Fixed: `Missing helper: "contains"` crash when opening transition form
- Fixed: `api.play()` call passing `presetId` as positional argument instead of options object
- Added: Audio playback support (`audio` field, play/stop with fade out)
- Added: Video background support (.webm/.mp4 detection, `<video>` overlay)
- Added: Close button on overlay with GM-end-all socket sync
- Added: Dynamic z-index based on `showUI` and GM status
- Added: `fontFamily` input field to transition form
- Added: Reset button in Default Options form
- Migrated: Deprecated Handlebars helpers to Foundry v12 APIs (`selectOptions`, `<color-picker>`, `<file-picker>`)
- i18n: Added `fontFamily.label` and `reset` keys

### Español
- Corregido: Error `Missing helper: "contains"` al abrir el formulario de transición
- Corregido: Llamada a `api.play()` que pasaba `presetId` como argumento posicional en vez de objeto options
- Añadido: Reproducción de audio (campo `audio`, play/stop con fade out)
- Añadido: Soporte de video de fondo (detección .webm/.mp4, overlay `<video>`)
- Añadido: Botón de cierre en overlay con sincronización GM-end-all por socket
- Añadido: z-index dinámico según `showUI` y estado de GM
- Añadido: Campo `fontFamily` en el formulario de transición
- Añadido: Botón de reset en formulario de opciones por defecto
- Migrado: Helpers Handlebars obsoletos a APIs de Foundry v12 (`selectOptions`, `<color-picker>`, `<file-picker>`)
- i18n: Añadidas claves `fontFamily.label` y `reset`

## v1.0.0 (2026-05-29)

### English
- Initial release
- 6 DOM effects: scanlines, glitch-line, glitch-text, chromatic aberration, neon-border, typewriter
- 4 Canvas effects: digital rain, particles, static noise, cyber grid
- 6 presets: Amber Terminal, Netrunner, Combat, Mystery, Road, Afterlife
- Multiplayer sync via socketlib
- Context menu integration (scenes + journals)
- Journal header play button
- i18n: English, Spanish
- MIT License

### Español
- Lanzamiento inicial
- 6 efectos DOM: scanlines, glitch-line, glitch-text, aberración cromática, neon-border, typewriter
- 4 efectos Canvas: lluvia digital, partículas, ruido estático, rejilla 3D
- 6 presets: Terminal Ámbar, Netrunner, Combate, Misterio, Carretera, Afterlife
- Sincronización multijugador via socketlib
- Integración de menú contextual (escenas + journals)
- Botón de reproducción en cabecera de journal
- i18n: inglés, español
- Licencia MIT
