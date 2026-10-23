# Campos BUSS

Configuraciones derivadas de `FormContent.js` de BESS. `use: database` = dato persistible por backend, `calculate` = dato auxiliar, `local` = interfaz. Los nombres de campos originales se preservan. Los campos `usuarioRegistro` y `depositoSeleccionado` son auxiliares nuevos y no deben persistirse automáticamente. Las relaciones de fichas son declaraciones de presentación: necesitan endpoints de backend para resolverse. No hay escritura directa en Firestore.
