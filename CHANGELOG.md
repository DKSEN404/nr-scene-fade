# Changelog / Registro de Cambios

## v0.0.4 (2026-05-29)

### English
- Fixed: Scene activation now happens immediately after fadeIn instead of after fadeOut + cleanup — scene starts loading for players while the transition plays.
- Fixed: Close button didn't work during transition — `play()` kept running after manual `stop()`, causing stale lifecycle. Added `if (!this.#isActive) return;` guard after the display timer.
- Changed: Close button icon from X to play icon, restyled with dark glass aesthetic (translucent background, backdrop-filter blur, gray color) to blend with any transition.

### Español
- Corregido: La activación de escena ahora ocurre inmediatamente después del fadeIn — la escena empieza a cargar para los jugadores mientras la transición se reproduce.
- Corregido: El botón de cierre no funcionaba durante la transición — `play()` seguía ejecutándose después de un `stop()` manual. Se agregó guard `if (!this.#isActive) return;` tras el temporizador.
- Cambiado: Icono del botón de cierre de X a play, rediseñado con estética glass oscuro (fondo translúcido, blur, color gris) para mimetizarse con cualquier transición.

## v0.0.3 (2026-05-29)

### English
- Fixed: Transition overlay stayed frozen after the display period — `play()` never called `#fadeOut` or `stop()`, leaving the overlay visible permanently. Added `#fadeOut()` and auto-close lifecycle: fadeIn → display for `delay` ms → fadeOut → cleanup.
- Fixed: `activateScene` option was saved in the form but never executed during play. Added `sceneId` to play options in `ContextMenu.mjs` and `scene.view()` call in `play()` after fadeOut.
- Added: `#fadeOut(options)` method that animates overlay opacity to 0 over `fadeOut` ms.

### Español
- Corregido: El overlay de la transición se quedaba congelado — `play()` nunca llamaba a `#fadeOut` ni `stop()`, dejando el overlay visible permanentemente. Se agregó `#fadeOut()` y ciclo de vida automático: fadeIn → mostrar por `delay` ms → fadeOut → limpieza.
- Corregido: La opción `activateScene` se guardaba en el formulario pero nunca se ejecutaba al reproducir. Se agregó `sceneId` a las opciones de play en `ContextMenu.mjs` y llamada a `scene.view()` en `play()` después del fadeOut.
- Añadido: Método `#fadeOut(options)` que anima la opacidad del overlay a 0 durante `fadeOut` ms.

## v0.0.2 (2026-05-29)

### English
- Fixed: Overlay never displayed — `#createOverlay` created a wrapper `<div>` with `id="nr-scene-fade-overlay"` and then inserted the Handlebars template as inner HTML, which also created a `<div id="nr-scene-fade-overlay">` (duplicate ID). `getElementById()` returned the outer wrapper which had `display: none` (no `nr-visible` class), hiding the entire overlay. Removed the wrapper element — the template now appends directly to `document.body`.

### Español
- Corregido: Overlay nunca se mostraba — `#createOverlay` creaba un wrapper `<div>` con `id="nr-scene-fade-overlay"` y luego insertaba el template Handlebars como inner HTML, que también creaba un `<div id="nr-scene-fade-overlay">` (ID duplicado). `getElementById()` devolvía el wrapper externo con `display: none` (sin clase `nr-visible`), ocultando todo el overlay. Se eliminó el wrapper — el template ahora se inserta directamente en `document.body`.

## v0.0.1 (2026-05-29)

### English
- Fixed: Core data-flow bug — `EditTransitionForm.getData()` read `this.options` (FormApplication window config) instead of `this.object` (actual saved transition data). When editing, the form displayed defaults instead of saved values, and saving without changes overwrote real data with defaults.
- Fixed: Edit path passed `transition.options.sceneID` to constructor, but `sceneID` was never saved as a form field, causing `this.sceneID` to be `undefined` and `_updateObject` to fail finding the scene. Now uses `scene.id` directly.
- Initial release (rebased from v1.0.x series).

### Español
- Corregido: Bug fundamental de flujo de datos — `EditTransitionForm.getData()` leía `this.options` (config de ventana de FormApplication) en vez de `this.object` (datos reales de transición). Al editar, el formulario mostraba defaults en vez de valores guardados.
- Corregido: La ruta de edición pasaba `transition.options.sceneID` al constructor, pero `sceneID` nunca se guardaba como campo del formulario, causando que `this.sceneID` fuera `undefined` y `_updateObject` no encontrara la escena. Ahora usa `scene.id` directamente.
- Lanzamiento inicial (rebase de la serie v1.0.x).
