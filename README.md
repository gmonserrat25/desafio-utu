# Desafío UTU® — sitio de la carrera

Sitio de una sola página para el **Desafío UTU Ultra Trail** de Capilla del Monte, Córdoba.
La arquitectura de la página (orden de secciones, tipografía gigante, lista-calendario con
imagen que sigue al cursor, declaración de marca a pantalla completa, CTA final + footer)
sigue el modelo de `day1-run.webflow.io`. El código, el diseño y los contenidos son propios.

## Correr el sitio

Es HTML/CSS/JS plano, sin build. Cualquier servidor estático sirve:

```bash
cd ~/Proyectos/desafio-utu
python3 -m http.server 8733 --bind 0.0.0.0
```

- Desde la misma máquina: http://127.0.0.1:8733
- Desde el celular en la misma red: `http://<IP-de-la-Mac>:8733`
  (la IP sale con `ipconfig getifaddr en0`)

## Dónde está publicado

**En vivo:** https://gmonserrat25.github.io/desafio-utu/ — público, sin login, servido
por GitHub Pages desde la rama `main` de este repo. Para actualizarlo alcanza con
`git push`: Pages reconstruye solo en un par de minutos.

El `.nojekyll` de la raíz está para que Pages sirva los archivos tal cual en vez de
pasarlos por Jekyll.

### Otras dos formas que quedaron armadas

- **Higgsfield** (`desafio-utu.higgsfield.app`): el sitio está desplegado ahí, con el
  contenido portado a un proyecto React + TanStack Start. La URL responde
  `401 unauthenticated` porque un sitio desplegado y no publicado pide sesión de
  Higgsfield; para abrirlo a cualquiera hay que publicarlo, y eso lo lista en el feed
  de la comunidad. Queda listo por si algún día conviene.
- **Artifact de Claude**: `build-artifact.py` genera `artifact.html`, el mismo contenido
  sin el envoltorio `<html>/<head>/<body>` que el host del Artifact aporta. Se publica
  pasando `assets/` como archivos adjuntos. Sirve para compartir con alguien que tenga
  sesión de Claude; no es una URL abierta.

El embed de YouTube del aftermovie puede no cargar según dónde se sirva la página; por
eso el bloque tiene además un enlace "Abrir en YouTube" que siempre funciona.

## Identidad

Paleta y tipografías de la marca, aplicadas con la lógica editorial de la referencia:
lienzo claro, muchísimo aire, tipografía enorme en negro, y el amarillo reservado para
dos gestos y nada más.

| Token | Valor | Uso |
|-------|-------|-----|
| `--ink` | `#1D1D1B` | negro cálido de marca — el peso de la página |
| `--bone` | `#F4F3EE` | el lienzo |
| `--amarillo` | `#F7F839` | **sólo dos gestos**: el relleno de los botones al pasar por encima, y el fondo del KV en la lista |
| `--verde` | `#3C6151` | acentos chicos: los puntos de la fecha, el domingo del cronograma, los links |

- **Display:** Oswald · **Cuerpo:** Poppins
- Logotipos oficiales en `assets/img/logo1-negro.svg` y `logo-blanco.svg`

La regla del amarillo es a propósito. Usado como banda de señalización, el sitio termina
pareciéndose al que la carrera ya tiene; usado dos veces, marca la identidad sin tomarse
la página.

## Secciones

Qué toma cada una del modelo:

| # | Sección | De dónde sale |
|---|---------|---------------|
| 1 | Top line + nav | el top-line de la referencia |
| 2 | Hero con foto y pie de foto | el hero con retrato y su crédito |
| 3 | Próxima edición, fecha partida `28.08.` | el bloque "Next Run" |
| 4 | Las 7 distancias, lista con pares dato/valor | el "Calendar" con `Start:` / `Distance:` |
| 5 | Statement "Por qué se corre" | el "Our Mission" centrado |
| 6 | Lo que llevás (material obligatorio) | la sección de producto y sus categorías |
| 7 | Video | — |
| 8 | Tres días (cronograma) | — |
| 9 | Llegar | — |
| 10 | Dudas | — |
| 11 | Acompañan | — |
| 12 | Cierre + mail | el "Ready? / Sign up" |
| 13 | Footer con las secciones en grande | el footer de la referencia |

Lo que **no** se toma del sitio que la carrera ya tiene: su titular, su cuenta regresiva,
su sección de la leyenda del Uturunco y su listado de alojamientos. Todo el copy de acá
está escrito para este sitio; los datos duros son hechos de la carrera.

## Cambiar la fecha de la próxima edición

Arriba de `assets/js/main.js`:

```js
const UTU = {
  dias: ['27.08', '28.08', '29.08'],
  inscripcion: 'https://tyr.com.ar/utu2026'
};
```

`dias` alimenta los tres días del cronograma. La fecha grande del bloque "Próxima edición"
y la del top line están escritas en `index.html` — son dos lugares, buscá `28.08`.

**Las fechas de 2027 son estimadas.** La edición 2026 se corrió el 28, 29 y 30 de agosto
y la organización todavía no publicó la próxima; puse el último fin de semana de agosto,
como las ediciones anteriores.

## Datos de la carrera

Distancias oficiales (distancia real / desnivel positivo / altura máxima):

| Prueba | Distancia | D+ | Altura máx. |
|--------|-----------|-----|------------|
| KV | 5 km | 1.000 m | 1.940 m |
| 10K | 13,3 km | 400 m | 1.253 m |
| 20K | 20,3 km | 800 m | 1.644 m |
| 28K | 26,8 km | 1.420 m | 1.940 m |
| 35K | 36 km | 1.980 m | 1.940 m |
| 55K | 54 km | 2.440 m | 1.940 m |
| 70K | 70,2 km | 3.300 m | 1.940 m |

- Sede: Eco Camping Calabalumba, Capilla del Monte, Córdoba.
- Cerros del circuito: Uritorco (1.940 m), Overo y Las Gemelas.
- Organiza: Warriors Runners. Puntúa para ITRA y UTMB Index.
- Inscripción: https://tyr.com.ar/utu2026
- Instagram: [@desafioutu](https://instagram.com/desafioutu) · Facebook: [ultratrailutu](https://facebook.com/ultratrailutu)
- Contacto: desafio.utu@gmail.com

El cronograma está calcado de la edición anterior y la propia página lo aclara: los horarios
definitivos se publican junto al reglamento.

## Assets

- **Textos**: todo el copy está escrito para este sitio. Los datos duros — distancias,
  desniveles, alturas, sede, horarios — son hechos de la carrera y salen de las fuentes
  del final; lo que no se reutiliza es la redacción del sitio oficial.
- **Fotos**: las siete fotos de carrera son las oficiales de `desafioutu.com` (crédito:
  Pablo Bar / Desafío UTU), redimensionadas a 1800 px de ancho. Están acreditadas en el footer.
  Antes de publicar conviene confirmar el uso con la organización.
- **Video**: el aftermovie es el embed oficial de YouTube (`fa8ClNP2SfY`, edición 2023). Se carga
  recién al hacer click, así que no pesa en la carga inicial. Si aparece un aftermovie más nuevo,
  se cambia el `data-yt` del `#filmFrame` en `index.html`.
- **Logos de sponsors**: los del sitio oficial.

## Pendientes

- **Precios por distancia**: las inscripciones 2026 ya cerraron y los valores no quedaron
  publicados en ningún lado, así que no hay tabla de precios. Hay que pedírselos a la
  organización. La sección de dudas dice que se publican al abrir la inscripción.
- **Material obligatorio**: el bloque de "todas las distancias" y el de las largas está armado
  con lo que confirmé (dorsal, chip, remera, hidratación propia; frontal, manta térmica y
  botiquín para las largas) más los ítems habituales del reglamento de un ultra. Hay que
  contrastarlo contra el reglamento oficial cuando salga — la propia sección lo aclara.
- **Tiempos de corte** por distancia: faltan, van junto al reglamento.
- El formulario de newsletter valida el mail pero no tiene backend — hay que engancharlo a
  Mailchimp, Brevo o similar.
- Reglamento y listado de material obligatorio: falta la página/PDF.

## Fuentes

- [desafioutu.com](https://desafioutu.com/) — distancias, desniveles, fechas, sponsors
- [CDM Noticias](https://cdmnoticias.com.ar/2025/08/29/desafio-utu-2025/) — cronograma y sede
- [Agencia Córdoba Deportes](https://deportes.cba.gov.ar/se-presento-el-desafio-utu-2025-la-gran-cita-del-trail-cordobes/) — organización y recorrido
