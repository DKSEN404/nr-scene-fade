# Changelog / Registro de Cambios

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
