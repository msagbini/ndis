# Dónde encontrar a la gente

*(Versión en español de `finding-people.md`. Los términos de búsqueda quedan en inglés porque así hay que escribirlos en los buscadores.)*

Meta: una lista de ~40 prospectos (proveedores NDIS de 5–50 empleados y gestores de planes) en `prospect-list-template.csv`. Presupuesto: unas dos horas.

Nota de honestidad: las fuentes de abajo son reales, pero las páginas se mueven y los grupos cambian de nombre. Cada punto dice exactamente qué hacer; si un enlace no funciona o la página se ve distinta a lo descrito, dímelo — no pierdas tiempo buscando. Los nombres y correos individuales **no** vienen pre-cargados, porque inventar datos de contacto sería peor que inútil; de estas fuentes salen los reales.

## 1. Registros oficiales (lo mejor para volumen)

**NDIS Provider Finder** — el directorio público de proveedores registrados, de la propia agencia.
1. Entra a `https://www.ndis.gov.au` y usa el buscador del sitio con **"Provider Finder"** (también aparece en Participants → Working with providers).
2. Busca por tu ciudad/región. Filtra o revisa soportes como "daily personal activities" o "community participation" — esos son los servicios que prestan los proveedores de 5–50 empleados que buscamos.
3. Cada ficha muestra el nombre del negocio y normalmente teléfono y sitio web. Cópialos al CSV.
4. Salta los gigantes (nombres que reconocerías de la TV, o fichas que cubren todos los estados) — tienen equipos de cumplimiento y no son nuestros primeros clientes.

**Registro de proveedores de la NDIS Commission** — el regulador (NDIS Quality and Safeguards Commission) publica un registro consultable de todos los proveedores registrados.
1. Entra a `https://www.ndiscommission.gov.au` y busca en el sitio **"provider register"**.
2. Lo mismo: filtra por tu estado, junta nombres pequeños y medianos.

Para **gestores de planes** en particular: filtra o busca el grupo de registro **"Plan Management"** (grupo 0127 — ver `../research/record-keeping.md`). Buscar en Google `"plan management" NDIS site:.com.au` también los encuentra rápido, porque se promocionan directo a los participantes.

## 2. Asociaciones del sector (lo mejor para contactos semi-cálidos)

- **Disability Intermediaries Australia (DIA)** — la asociación específica de gestores de planes y coordinadores de apoyo. Su sitio tiene un **directorio de miembros**. Busca: `Disability Intermediaries Australia member directory`.
- **National Disability Services (NDS)** — la asociación de proveedores de servicios de discapacidad. Organiza eventos y publica lista de miembros. Busca: `National Disability Services members`.
- **Ability Roundtable** y redes estatales de proveedores también existen; trátalas como secundarias.

## 3. Grupos de Facebook (lo mejor para encontrar gente que ya se queja)

Facebook es donde esta industria habla de verdad. En el buscador de Facebook, busca estas frases y pide unirte a los 2–3 grupos más grandes (miles de miembros, activos en la última semana):

- `NDIS providers` (hay varios grupos grandes de dueños/operadores)
- `NDIS plan managers`
- `NDIS business` / `NDIS provider support`

Unirse suele requerir contestar 1–2 preguntas de filtro — contesta con honestidad: "I run/am starting a business that helps providers with claims and audits, and I'm doing research — not selling anything."

Ya dentro: **no publiques una encuesta.** En cambio, busca dentro del grupo las palabras `rejected`, `cancelled claim`, `audit`, y escríbele por privado a quienes se quejaron (usa el mensaje de LinkedIn/DM de `outreach-messages.md` — el mismo texto sirve).

## 4. LinkedIn (lo mejor para gestores de planes y gerentes de operaciones)

1. En el buscador de LinkedIn escribe **"plan manager NDIS"** u **"operations manager NDIS"**, filtra Personas → Ubicación: Australia.
2. Busca también **"claims officer NDIS"** y **"NDIS finance"** — esa gente sufre los rechazos en carne propia.
3. Conecta con la nota corta de `outreach-messages.md`. 10–15 solicitudes por día es seguro; más arriesga que LinkedIn te restrinja la cuenta.

## 5. Consultores y newsletters (secundario, pero de alta calidad)

Existe una pequeña industria de consultores NDIS cuyo negocio entero es ayudar a proveedores a pasar auditorías — por ejemplo, busca **"Disability Services Consulting"** (también conocidos como DSC / Team DSC), que publica newsletters y capacitaciones muy leídas. Un consultor habla con docenas de proveedores; una conversación amistosa con uno vale como cinco entrevistas en textura de mercado. El email tiene variante para consultores.

## Lista pre-cargada (2026-08-27)

Ya dejé **31 organizaciones reales** en `prospect-list.csv` (17 gestores de planes y 14 proveedores, repartidos entre VIC, NSW, QLD, WA y SA), encontradas por búsqueda web — cada fila cita la URL donde apareció. Reglas que se respetaron: ningún email, teléfono ni nombre de persona inventado (por eso esas columnas están vacías: se completan visitando el sitio de cada una); los gigantes nacionales y los vendedores de software quedaron afuera a propósito. **Antes de contactar a cualquiera, abre su sitio web y verifica que la fila sea correcta** — los tamaños de equipo casi nunca aparecían en los resultados, así que confírmalos en la página "About/Our team" o LinkedIn.

## Cómo llenar el CSV

Abre `prospect-list-template.csv` en cualquier app de hojas de cálculo (o pídeme que lo administre yo). Una fila por organización. La columna `segment` es `provider`, `plan_manager` o `consultant`. No te obsesiones con `size_guess` — el conteo de la página "our team" del sitio o "se ve chico/mediano" alcanza.

Para en ~40 filas. Seguir armando lista después de eso es procrastinar; empieza a enviar.
