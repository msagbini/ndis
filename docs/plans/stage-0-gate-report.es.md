# Reporte de puerta de la Etapa 0 — para el fundador

*(Versión en español de `stage-0-gate-report.md`, escrita para alguien que no leyó el código ni el historial.)*

**Fecha:** 2026-08-27.

## Qué se construyó, en palabras simples

La Etapa 0 está completa salvo la parte que solo un humano puede hacer: las entrevistas. El repositorio contiene:

1. **Un dossier de investigación** (`docs/research/`, empieza por su README): cómo funcionan de verdad los precios del NDIS, el proceso de reclamos, las auditorías, la conservación de registros y la ley de privacidad — desde fuentes gubernamentales, con cada dato etiquetado según qué tan sólido es.
2. **Un kit de entrevistas completo** (`docs/interviews/`): dónde encontrar prospectos (con 31 organizaciones reales ya pre-cargadas), los mensajes exactos de contacto, un guion palabra por palabra, plantilla de notas, y una hoja de puntuación que lleno yo — no tú.
3. **Un listón de "seguir o parar" por escrito** (`docs/go-no-go.md`, en español `go-no-go.es.md`): la regla de aprobación/reprobación de las entrevistas, fijada antes de que ocurra ninguna.
4. **Un esqueleto de repositorio funcionando**: chequeos automáticos (formato, tipos, pruebas) en cada cambio, local y en GitHub. Sin código de producto, a propósito.

## Lo que encontró la investigación (las cuatro cosas que importan)

1. **La tesis se sostiene en fuentes de gobierno.** La auditoría nacional encontró que la agencia del NDIS pagaba históricamente sin chequeos previos básicos y ahora lo está corrigiendo: chequeos automáticos más ~20.000 revisiones humanas dirigidas por mes — y **más de la mitad del valor en dólares de lo que revisan manualmente termina cancelado**. "Demuéstralo antes de cobrar" es real y está documentado.
2. **El momento de mercado se fortaleció durante la investigación.** Una ley nueva (sancionada el 20/8/2026) hace obligatoria la conservación de registros de pagos por 7 años para **todos** los proveedores — incluso los no registrados — con multas, desde el 27/8/2026. Y desde el 10/12/2026 las políticas de privacidad deben revelar la toma de decisiones automatizada — regla que nuestro diseño explicable y determinista convierte en argumento de venta.
3. **El nicho parece abierto, con dos amenazas con nombre.** Ningún competidor comercializa la validación pre-envío contra presupuestos del plan y límites de precio como su producto; la evidencia de auditoría a nivel de reclamo parece territorio libre. Amenazas más cercanas: FlowLogic (lado proveedores) y Careview (lado gestores de planes). Los usuarios de los incumbentes se quejan sobre todo de exactamente las fallas de facturación que nosotros prevendríamos.
4. **Un "dato" del encargo original no pasó la verificación.** La regla "conservar los registros de menores hasta que cumplan 25" aparece solo en blogs de proveedores de software, no en la ley del NDIS que pudimos encontrar. Puede aplicar igual vía leyes estatales de registros de salud — quedó marcada para un abogado, no asumida.

## Lo que me preocupa (con honestidad)

1. **Techo de calidad de la investigación.** La red de este entorno no pudo abrir páginas web directamente; todo llegó vía resultados de buscador sobre las páginas oficiales. Las etiquetas de confianza son honestas y cada archivo lista qué re-verificar — pero los documentos de precios y las guías de códigos de error deben descargarse y leerse antes de que el código de la Etapa 1 confíe en ellos.
2. **Riesgo de plataforma.** Careview o FlowLogic podrían lanzar una función de "validación" en un ciclo de versiones. Nuestras respuestas — independencia (validamos reclamos de cualquier sistema) y profundidad — son argumentos, no pruebas, hasta que los clientes las confirmen en entrevistas.
3. **Las entrevistas son la prueba de verdad.** Todo lo anterior sigue siendo investigación de escritorio hecha mejor. Si diez conversaciones reales fallan el listón acordado, lo honesto es parar o pivotar, y el documento nos compromete a eso por adelantado.

## Mi recomendación

**Creo que debemos seguir — hacia las entrevistas, no hacia el código.** La evidencia justifica invertir tu tiempo en contactar; todavía no justifica escribir la Etapa 1. Nada de la Etapa 1 debería empezar hasta tener el veredicto de las entrevistas.

## Qué necesito de ti (la lista completa — nada más espera tu respuesta)

**1. Aprobar (o ajustar) el listón de seguir/parar.**
- **Qué necesito:** una respuesta diciendo "umbral aprobado" (o tus cambios).
- **Por qué importa:** debe quedar fijo antes de la primera entrevista para que los resultados no se puedan reinterpretar.
- **Tus opciones:** aprobarlo como está (≥60% reporta dolor de reclamos o preparación de auditoría dolorosa, Y ≥50% gasta ≥A$150/mes en software, sobre ≥10 entrevistas) — o proponer otros números.
- **Mi recomendación:** aprobarlo como está; es exigente y alcanzable con ~10 llamadas.
- **Si prefieres no decidir:** di "tu decisión" y el listón propuesto queda vinculante.

**2. Hacer el contacto y las entrevistas** (lo único que no puedo hacer yo).
- Paso a paso: (1) lee `docs/interviews/README.es.md` — cinco minutos; (2) verifica y completa la lista pre-cargada según `finding-people.es.md` (~1–2 horas); (3) envía los mensajes de `outreach-messages.md` (guía en español en `outreach-messages.es.md`); (4) antes de la primera llamada, pídeme el ensayo — hago de proveedor escéptico; (5) tras cada llamada, pégame tus notas y yo puntúo todo.
- Éxito = 10 llamadas completadas en ~3 semanas desde el primer contacto.

**3. BLOQUEANTE solo para la Etapa 1 (no para las entrevistas): confirmar que puedes descargar dos archivos** desde tu computadora y compartírmelos cuando arranque la Etapa 1: el NDIS Pricing Schedule 2026-27 y el NDIS Support Catalogue 2026-27 (enlaces en `docs/research/sources/README.md`). Mi conexión no pudo bajarlos; el motor de precios debe construirse desde los archivos reales, no desde mis notas.

Nada más te necesita. Renombrar el producto, contratar abogado y decidir precios quedan deliberadamente para después de un veredicto GO.
