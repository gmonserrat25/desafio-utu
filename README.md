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

## Secciones

| # | Sección | Equivalente en el modelo |
|---|---------|--------------------------|
| 1 | Ticker amarillo + nav con logo oficial | ticker + nav |
| 2 | Hero "Sé parte de la leyenda" + cuenta regresiva | hero |
| 3 | Los números de la carrera | — |
| 4 | Destacado 70K | Next Run |
| 5 | Las 7 distancias (lista con hover) | Calendar |
| 6 | Material obligatorio | — |
| 7 | La leyenda del Uturunco (verde serrano) | Our Mission |
| 8 | Aftermovie | — |
| 9 | Ediciones anteriores: resultados y fotos | — |
| 10 | Cronograma de 3 días | — |
| 11 | La sierra + compromiso ambiental | — |
| 12 | Cómo llegar + alojamiento y gastronomía | — |
| 13 | Dudas frecuentes | — |
| 14 | Sponsors | Shop |
| 15 | Inscripción + newsletter | Ready? / Signup |
| 16 | Footer | footer |

## Cambiar la fecha de la próxima edición

Todo lo que depende de la fecha sale de un solo bloque, arriba de `assets/js/main.js`:

```js
const UTU = {
  edicion: 2027,
  start: new Date('2027-08-27T14:00:00-03:00'),
  dias: ['27.08', '28.08', '29.08'],
  confirmada: false,        // true saca el asterisco de "fecha a confirmar"
  inscripcion: 'https://tyr.com.ar/utu2026'
};
```

Eso alimenta el año del hero, el texto de fecha, la cuenta regresiva y los tres días del
cronograma. **La fecha 2027 es estimada** (último fin de semana de agosto, como las ediciones
anteriores): la edición 2026 se corrió el 28, 29 y 30 de agosto de 2026 y la organización
todavía no publicó la próxima. Por eso `confirmada: false` agrega un asterisco.

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
