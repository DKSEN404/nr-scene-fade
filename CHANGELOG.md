# Changelog / Registro de Cambios

## v0.0.1 (2026-05-29)

### English
- Fixed: Core data-flow bug — `EditTransitionForm.getData()` read `this.options` (FormApplication window config) instead of `this.object` (actual saved transition data). When editing, the form displayed defaults instead of saved values, and saving without changes overwrote real data with defaults.
- Fixed: Edit path passed `transition.options.sceneID` to constructor, but `sceneID` was never saved as a form field, causing `this.sceneID` to be `undefined` and `_updateObject` to fail finding the scene. Now uses `scene.id` directly.
- Initial release (rebased from v1.0.x series).

### Español
- Corregido: Bug fundamental de flujo de datos — `EditTransitionForm.getData()` leía `this.options` (config de ventana de FormApplication) en vez de `this.object` (datos reales de transición). Al editar, el formulario mostraba defaults en vez de valores guardados.
- Corregido: La ruta de edición pasaba `transition.options.sceneID` al constructor, pero `sceneID` nunca se guardaba como campo del formulario, causando que `this.sceneID` fuera `undefined` y `_updateObject` no encontrara la escena. Ahora usa `scene.id` directamente.
- Lanzamiento inicial (rebase de la serie v1.0.x).
