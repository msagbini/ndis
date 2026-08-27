# Umbral de "seguir o parar" para la validación de la Etapa 0

*(Versión en español de `go-no-go.md`. Si algo difiere, el original en inglés manda.)*

**Estado:** PROPUESTO — se vuelve vinculante cuando lo apruebes por escrito (un mensaje diciendo "umbral aprobado" alcanza). La aprobación ocurre **antes** de la primera entrevista, para que el listón no se pueda mover después de ver los resultados.

## Por qué existe este documento

La investigación de escritorio dice que los proveedores NDIS pierden dinero por reclamos rechazados y temen las auditorías. La investigación de escritorio es barata y a menudo errónea. Antes de construir nada, probamos la afirmación con gente real. Este documento fija, por adelantado, exactamente qué resultado significa "constrúyelo" — para que ni el optimismo ni el esfuerzo ya invertido puedan torcer la interpretación.

## El umbral (propuesto)

De **al menos 10 entrevistas completadas** con decisores u operadores diarios de proveedores NDIS (5–50 empleados) o gestores de planes:

1. **Dolor:** al menos el **60%** reporta, en los últimos 12 meses, al menos uno de:
   - un reclamo rechazado, cancelado o con dinero recuperado por la agencia, o
   - una preparación de auditoría que describan como dolorosa, costosa o atemorizante (en sus palabras — la hoja de puntuación define qué cuenta).
2. **Señal de disposición a pagar:** al menos el **50%** gasta hoy **A$150 o más por mes** en software operativo (turnos, gestión de cuidado, contabilidad — cualquier cosa que paguen para operar).

**Ambas** condiciones deben cumplirse. Dolor sin gasto es un mercado que sufre pero no compra software.

### Señales secundarias (se registran, no deciden)

- Cómo revisan reclamos hoy (persona, planilla, nada).
- Si alguien pregunta espontáneamente "¿puedo probarlo?" u ofrece pilotear.
- Qué duele más: reclamos rechazados (flujo de caja) o preparación de auditoría (riesgo existencial).

## Qué significa cada resultado

| Resultado | Veredicto | Qué hacemos |
|---|---|---|
| Pasan ambas | **GO (seguir)** | Etapa 1 (motor de reglas). Las notas alimentan el diseño del golden set. |
| Pasa dolor, falla gasto | **Candidato a PIVOTE** | El problema es real pero este segmento quizá no paga. Considerar: solo gestores de planes (más volumen, retorno más claro) o proveedores más grandes. Mini-ronda nueva de entrevistas antes de cualquier código. |
| Falla dolor | **NO-GO (parar)** | La premisa central está mal o exagerada. Paramos. Documentamos lo aprendido. Cualquier pivote parte de evidencia nueva, no de releer la misma investigación de escritorio. |
| Menos de 10 entrevistas tras esfuerzo razonable (≈40+ contactos en ~3 semanas) | **No concluyente** | La dificultad de llegar al mercado es en sí un hallazgo — predice la dificultad de venderle. Conversamos antes de gastar más. |

## Cláusula de honestidad

Si las entrevistas fallan el umbral, mi reporte lo dirá sin rodeos y recomendará parar o pivotar. Ser complaciente no es un servicio; el daño real es gastar un año construyendo para un mercado que no va a pagar.

## Reglas de conteo (para que la aritmética no se discuta después)

- "Entrevista completada" = se respondieron las preguntas esenciales (★) de `interview-script.md`.
- Los porcentajes se calculan solo sobre entrevistas completadas.
- Una organización = una entrevista, aunque hayan estado dos personas en la llamada.
- Yo lleno `scoring-sheet.md` desde tus notas crudas y muestro la aritmética. Tú revisas el veredicto, no las sumas.
