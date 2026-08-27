# Dossier de investigación — índice en español

*(Resumen en español de `README.md` y del dossier. Los archivos de investigación en sí están en inglés — contienen citas textuales de fuentes en inglés que no conviene traducir. Si quieres el detalle de alguno en español, pídemelo y te lo resumo.)*

Investigación con fuentes primarias detrás del producto, recuperada el 27/8/2026. Cada archivo abre con un resumen simple, etiqueta la confianza de cada dato, y termina con lo que hay que re-verificar antes de que el código dependa de ello.

**Nota de método (léela una vez):** este entorno no pudo abrir páginas web directamente (un proxy de red lo bloqueó), así que los datos se obtuvieron de resultados de buscador sobre las páginas oficiales citadas, cruzados entre fuentes. Todo lo importante lleva etiqueta — **OFFICIAL** (fuente de gobierno/legislación), **WEAK** (proveedor/blog/sitio de reseñas), **UNVERIFIED** (no se pudo confirmar) — y cada archivo lista qué re-chequear abriendo los documentos primarios en un navegador normal antes de que la Etapa 1 construya sobre ello.

| Archivo | Respuesta en una línea |
|---|---|
| `pricing-arrangements.md` | Para 2026-27 la agencia dividió el documento de precios en un Pricing Schedule + Support Catalogue (un Excel — nuestra futura fuente de datos); los precios cambian cada julio más ajustes de mitad de año, así que los datos de precios deben versionarse, nunca escribirse fijos en el código. |
| `claims-process.md` | Los reclamos se envían por carga masiva de CSV; la agencia ahora corre chequeos automáticos y revisiones humanas dirigidas *antes* de pagar, y cancela >50% (en valor) de lo que revisa manualmente — el momento de mercado por el que existe este producto. |
| `practice-standards.md` | Los proveedores registrados enfrentan auditorías externas recurrentes contra estándares con fuerza de ley; los estándares están en plena reforma, así que el mapeo de evidencia también debe versionarse. |
| `record-keeping.md` | Retención mayormente de 7 años, por clase de registro; una ley nueva extiende el deber de 7 años sobre registros de pago a TODOS los proveedores desde el 27/8/2026. La regla "conservar registros de menores hasta los 25" NO pudo verificarse en la ley del NDIS — tema para abogado. |
| `privacy-obligations.md` | Los datos de participantes son información de salud sensible; hay que asumir cobertura total de la Ley de Privacidad; las reglas de transparencia sobre decisiones automatizadas comienzan el 10/12/2026 y describen nuestro producto casi exactamente. |
| `competitors.md` | Los incumbentes dominan turnos/registros de cuidado; sus módulos de facturación concentran las quejas. La validación pre-envío y la evidencia de auditoría por reclamo están vacantes como categorías — FlowLogic y Careview son las amenazas más cercanas. |
| `sources/README.md` | Carpeta para los documentos primarios reales; la descarga desde este entorno está bloqueada — los baja el fundador desde su navegador. |
