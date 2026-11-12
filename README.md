# SolarisTech V2 · Publicación en GitHub Pages

## Archivos de entrega

El ZIP `SolarisTech-V2-GitHub-Pages.zip` contiene la web lista para publicarse, con `index.html` directamente en su raíz. No necesita instalar paquetes, compilar ni configurar una base de datos.

1. Descomprime el ZIP.
2. Sube **el contenido de la carpeta descomprimida** a la raíz de tu repositorio GitHub. Conserva `assets/`, `vendor/` y el archivo `.nojekyll`.
3. En GitHub abre **Settings → Pages**.
4. Selecciona **Deploy from a branch**, rama **main**, carpeta **/ (root)** y guarda.
5. Espera la publicación y abre la URL que proporciona GitHub. En la página principal presiona **Simulación**.

Si el repositorio usa un workflow previo que publica la carpeta `dist/`, elige una sola ruta: coloca los archivos web dentro de `dist/` para conservar ese workflow, o usa la publicación desde rama descrita arriba con los archivos en la raíz. Este ZIP está organizado para la segunda opción.

La carpeta `solaristech/dist/` del proyecto de desarrollo contiene los mismos archivos web. El repositorio de desarrollo conserva por separado su configuración de Sites y el workflow para `dist/`.

## Abrir en tu computadora

Abre `index.html` y pulsa **Simulación**, o abre `simulacion.html` directamente. Para una prueba mediante servidor local, si tienes Python instalado:

```text
python -m http.server 8000
```

Abre `http://localhost:8000`. El guardado local puede variar al abrir archivos directamente; exporta JSON para conservar un estudio. En GitHub Pages los datos se guardan en el navegador y no se envían a un servidor.

## Qué incluye

- Identidad SolarisTech: azul marino, azul y naranja; matrícula A01742512.
- Página principal con botón **Simulación**.
- Tres montajes: cara activa contra el piso, horizontal mirando al cielo y perpendicular a los rayos del sol.
- Irradiancia directa, difusa, reflexión del suelo, elevación solar y resistencia de carga editables.
- Curvas I–V y P–V, punto de operación, Voc, Isc y máxima potencia teórica.
- Registro experimental editable, notas, resolución del instrumento, exportación CSV y JSON e importación JSON.
- Modelos matemáticos en formato LaTeX, una ecuación por renglón, con fuentes y supuestos.
- La herramienta de dimensionamiento/cotización V1 sigue accesible desde la página principal.

## Tus datos experimentales

| Montaje | Voltaje reportado (V) | Corriente indicada (A) |
|---|---:|---:|
| Cara al piso | 0 | 0 |
| Cara al aire | 0.085 | 0 |
| Apuntando al sol | 0.131 | 0 |

La corriente se reportó cero en circuito cerrado. No se confirmó si V e I se tomaron simultáneamente con una misma carga, por lo que el tipo inicial es “Sin confirmar simultaneidad”. La potencia experimental solo se calcula al confirmar ese protocolo. No se interpreta la lectura cero como prueba de corriente física exactamente nula. Resolución, rango, conexiones, fusible y método del instrumento no fueron documentados.

Los parámetros del modelo (Voc_ref = 0.15 V, Isc_ref = 0.02 A, una celda, n = 1.3, R = 100 Ω y condiciones de luz) son ejemplos **no calibrados**. No sustituyen la ficha del panel ni las mediciones. Los valores calculados no tienen por qué coincidir con las tres lecturas.

## Modelo y límites

Se usa un diodo ideal, a 25 °C, sin resistencia serie y sin fugas en paralelo. Se obtiene la corriente fotogenerada escalando Isc de referencia con la irradiancia. Se resuelve la intersección de la curva con V = RI mediante bisección; la potencia máxima se busca numéricamente. El caso al piso usa únicamente irradiancia residual ingresada porque la superficie está tapada por el suelo. El modelo de cielo abierto no se aplica a esa cara.

No calcula eficiencia, no reconstruye una curva experimental a partir de tres puntos de orientaciones diferentes y no diagnostica el instrumento. Para calibrar hacen falta datos adicionales, preferentemente barridos I–V bajo condiciones de irradiancia y temperatura documentadas.

Fuentes y ecuaciones están en la sección “Modelos matemáticos”. Los originales LaTeX se incluyen en `assets/modelos-celdas.tex`. KaTeX 0.16.22 se usa para pre-renderizar, con fuentes y licencia MIT en `vendor/katex/`; no se descarga código de internet al usar la web.

## Verificación

En el proyecto de desarrollo: `node check.cjs`, `node check-cell.cjs`, `node --check dist/cell-app.js`. Se verificaron oscuridad, proyección geométrica, extremos Voc/Isc, consistencia V = RI, máxima potencia, tratamiento de mediciones, entradas inválidas y extremos numéricos. Se verificaron en navegador el acceso desde la página principal, selección de montaje y gráfica P–V.

## Estructura principal

`index.html`: inicio y cotizador; `simulacion.html`: laboratorio V2; `cell-engine.js`: modelo; `cell-app.js`: interacción y gráficas; `cell-math.js`: fórmulas pre-renderizadas; `cell.css`: diseño V2; `styles.css`: identidad compartida; `assets/`: logos y originales LaTeX; `vendor/`: KaTeX y fuentes locales.

Si editas JavaScript, recarga la página. Los datos previamente guardados en el navegador tienen prioridad sobre los valores iniciales. “Restablecer modelo” restablece solo parámetros del modelo y conserva las mediciones; estas se editan en su tabla.

## Actualización V2.1: nuevo panel y fotones

Lecturas actuales: piso 0 V y 2.22 mA; aire 0.085 V y 3.45 mA; sol 0.131 V y 3.52 mA. Los voltajes fueron confirmados por el usuario. La tabla acepta mA, mientras el modelo y las exportaciones conservan A. La simultaneidad sigue pendiente de confirmar. Se usa una nueva clave de guardado para conservar los estudios anteriores del otro panel sin mezclarlos.

La sección Fotones, debajo del primer simulador, permite variar longitud de onda, flujo total de fotones/s, banda prohibida, reflexión, absorción, espesor y recolección. Es un modelo monocromático de una capa activa: h c / lambda, umbral energético, Beer–Lambert y corriente q por pares recolectados/s. La animación representa paquetes; los contadores son tasas esperadas. No modela el espectro solar completo ni la estructura óptica del panel comercial. El coeficiente alfa es un supuesto editable constante por encima del umbral, no una tabla medida de silicio.

El módulo fotónico no ajusta las mediciones del panel. Distingue efecto fotoeléctrico interno de emisión al vacío. Incluye fórmulas pre-renderizadas, fuentes y pausa de animación. Pruebas: node tests/photon.test.cjs.
