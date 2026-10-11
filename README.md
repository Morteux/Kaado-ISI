# Kaado ISI

Aplicación web estática para estudiar vocabulario japonés y kanji mediante tarjetas de recuperación activa y repetición espaciada. La interfaz está en español y está pensada para usarse desde el navegador, tanto en ordenador como en móvil.

**No requiere cuenta ni servidor:** el progreso se guarda en el almacenamiento local del navegador.

## Contenido

- **Vocabulario:** palabras japonesas con lectura y significados en español e inglés, organizadas por tema.
- **Kanji · 初級 II:** estudio por capítulo y por modalidad: lectura kun (訓読み), lectura on (音読み) o significado.
- **Información de kanji:** niveles orientativos JLPT, curso escolar Jōyō y nivel de WaniKani cuando hay datos disponibles.
- **Campaña y rangos:** progreso global, desbloqueos y rangos inspirados en títulos históricos japoneses.
- **Ajuste del nivel inicial:** permite saltarse tarjetas que ya se conocen sin tener que recorrer todo el contenido desde cero.

## Cómo usarla

### 1. Elegir qué estudiar

En la parte superior de **Estudiar**, elige un bloque:

- **Vocabulario:** selecciona un tema o la opción que reúne los temas disponibles.
- **Kanji · 初級 II:** selecciona un capítulo o todos los capítulos disponibles, y elige una modalidad:
  - **訓読み · Lectura kun:** escribe una lectura kun aceptada para el kanji.
  - **音読み · Lectura on:** escribe una lectura on aceptada para el kanji.
  - **Traducción:** escribe un significado en español o inglés.

La lista de tarjetas muestra el contenido accesible según el progreso de la campaña. Las tarjetas nuevas se incorporan en tandas de cinco.

### 2. Responder una tarjeta

1. Mira la palabra o el kanji.
2. Escribe la traducción o lectura solicitada.
3. Pulsa **Comprobar respuesta** o la tecla Intro.
4. Si aciertas, pulsa **Siguiente** o Intro para continuar.
5. Si no recuerdas la respuesta, puedes intentarlo de nuevo o pulsar **Ver respuesta**.

En las tarjetas de vocabulario y de significado de kanji se acepta una respuesta en inglés o español. En los modos kun y on se aceptan las lecturas incluidas en los datos de esa tarjeta.

La comparación ignora diferencias de mayúsculas, tildes y puntuación, y tolera algunos errores de escritura pequeños según la longitud de la respuesta. No es un corrector lingüístico: una traducción válida que no esté incluida entre las respuestas aceptadas puede marcarse como incorrecta.

### 3. Repetición espaciada

Cada tarjeta mantiene su propia etapa. Si respondes correctamente sin fallos, avanza una etapa y se programa el siguiente repaso. Los intervalos normales son:

| Etapa alcanzada | Tiempo hasta el siguiente repaso |
| ---: | --- |
| 0 | Disponible inmediatamente |
| 1 | 4 horas |
| 2 | 8 horas |
| 3 | 1 día |
| 4 | 2 días |
| 5 | 7 días |
| 6 | 14 días |
| 7 | 30 días |
| 8 | 120 días |

Las tarjetas de una sesión se limitan a las que ya están disponibles para estudiar y cuyo próximo repaso ha vencido. Al terminar la cola, puedes volver a generarla para revisar las tarjetas que ya estén pendientes en ese momento.

#### Qué ocurre si te equivocas

- **Un fallo y luego aciertas:** la tarjeta baja una etapa.
- **Dos o más fallos y luego aciertas:** baja dos etapas.
- **Ver respuesta:** cuenta como una respuesta revelada y baja dos etapas.
- En caso de fallo o respuesta revelada, el próximo intervalo se reduce a la mitad del intervalo normal correspondiente a la etapa resultante. La etapa mínima es 0.

Los fallos no muestran automáticamente la solución: puedes volver a intentarlo. No hay botones para declarar una respuesta correcta sin escribirla, aunque sí existe el ajuste manual del nivel inicial descrito más abajo.

### 4. Desbloqueos y campaña

La progresión tiene dos niveles de desbloqueo:

- **Tandas de tarjetas nuevas:** aparecen cinco tarjetas inicialmente por bloque. Para liberar la tanda siguiente, al menos el 80 % de la tanda anterior debe haber sido visto y alcanzar la etapa 1 o superior.
- **Temas y capítulos:** el siguiente tema de vocabulario o capítulo de kanji se desbloquea cuando al menos el 80 % de las tarjetas del bloque anterior alcanza la etapa 3 o superior (intervalo normal de un día).

En kanji, las modalidades disponibles de cada carácter se consideran tarjetas independientes para el progreso y los desbloqueos. Una lectura conocida no implica automáticamente que se conozcan las demás lecturas o el significado.

El rango se calcula con el promedio de las etapas de **todo el contenido**, incluidos los bloques todavía bloqueados. El rango final, **Fudō Myōō**, requiere que todas las tarjetas lleguen a la etapa 8.

### 5. Consultar la lista

La pestaña **Lista** permite buscar tarjetas disponibles por palabra, lectura o traducción. Cambiar entre vocabulario y kanji actualiza la lista y sus filtros. La lista es una referencia del contenido accesible, no una herramienta para modificar directamente las respuestas o los datos.

### 6. Consultar y ajustar el progreso

La pestaña **Progreso** incluye:

- Estadísticas de las tarjetas de la selección actual.
- Una tabla de kanji con referencias JLPT, Jōyō y WaniKani disponibles.
- El estado separado de cada modalidad de kanji.
- El estado de los desbloqueos de la campaña.
- Herramientas para ajustar manualmente el nivel inicial.

#### Marcar como conocida una tarjeta

1. Abre **Progreso**.
2. En **Ajustar nivel inicial**, busca una palabra, traducción, kanji o lectura.
3. Pulsa **Conozco · 4/8** para colocar esa tarjeta en la etapa 4.
4. Si necesitas empezar esa tarjeta de nuevo, pulsa **Etapa 0**.

La tarjeta marcada como conocida se programa para repaso dentro de dos días. El cambio cuenta para los desbloqueos. El ajuste se hace por separado para cada palabra y para cada modalidad de kanji, así que conviene marcar solo lo que realmente sabes.

Al principio se muestran las primeras 30 tarjetas de esta herramienta para mantener la página manejable; utiliza el buscador para localizar cualquier otra.

### 7. Exportar o borrar el progreso

- **Exportar progreso JSON:** descarga un archivo con los datos de progreso locales. Guárdalo como copia de seguridad.
- **Reiniciar progreso:** borra todo el progreso de esta aplicación guardado en el navegador actual, después de pedir confirmación.

**Importante:** actualmente hay exportación, pero no importación desde un archivo JSON. El archivo exportado no se restaura desde la interfaz. Si borras los datos del navegador, usas otro navegador o cambias de dispositivo, el progreso no se sincroniza automáticamente ni se transfiere por sí solo.

## Cómo se guarda la información

- La aplicación usa el almacenamiento local del navegador, con la clave de almacenamiento **kaado-isi-campaign-v2**.
- No hay inicio de sesión, cuenta de usuario, base de datos remota ni sincronización entre dispositivos implementada en esta versión.
- El progreso permanece en el perfil del navegador en el que estudias. El modo privado, borrar los datos del sitio o algunas configuraciones del navegador pueden hacer que se pierda.
- El archivo exportado contiene datos de progreso y fechas de repaso; guárdalo en un lugar privado.

## Datos y atribución

La aplicación incluye datos de kanji con atribución a **OpenJLPT**, bajo licencia **CC BY-SA 4.0**. Las referencias JLPT mostradas son orientativas y proceden de datos externos; no representan una lista oficial publicada por el organismo del examen. Las referencias de Jōyō y WaniKani también se presentan como información de orientación, no como una equivalencia oficial entre sistemas.

## Limitaciones conocidas y mejoras recomendadas

Kaado ISI es un prototipo estático y local. Las siguientes mejoras aportarían bastante valor:

1. **Importar copias de seguridad:** permitir restaurar el JSON exportado, con validación y confirmación antes de reemplazar el progreso.
2. **Sincronización entre dispositivos:** requeriría una cuenta o un servicio remoto; ahora mismo el progreso vive en un único navegador.
3. **Mejor control de las respuestas:** revisar los sinónimos aceptados y permitir añadir alternativas válidas cuando una traducción natural no esté en la lista.
4. **Pruebas automatizadas:** probar el algoritmo SRS, los desbloqueos y los cambios de selección para evitar regresiones.
5. **Accesibilidad y usabilidad:** añadir opciones para tamaño de letra, modo claro y navegación por teclado más completa.
6. **Métricas más claras:** distinguir tarjetas únicas estudiadas, intentos, respuestas correctas y repasos completados; actualmente algunas estadísticas cuentan las revisiones acumuladas, no días consecutivos de estudio.

## Desarrollo

La aplicación está implementada como una página HTML autocontenida con CSS y JavaScript integrados. No requiere un proceso de compilación ni dependencias de instalación: basta con servir o abrir la página en un navegador moderno compatible con JavaScript y almacenamiento local.

El archivo principal es [index.html](./index.html).
