# Desafío UTU® — sitio de la carrera

Sitio de una sola página para el **Desafío UTU Ultra Trail** de Capilla del Monte, Córdoba.
La arquitectura de la página (orden de secciones, tipografía gigante, lista-calendario con
imagen que sigue al cursor, declaración de marca a pantalla completa, CTA final + footer)
sigue el modelo de `day1-run.webflow.io`. El código, el diseño y los contenidos son propios.

## Correr el sitio

Es HTML/CSS/JS plano, sin build. Cualquier servidor estático sirve:

```bash
cd ~/Proyectos/desafio-utu
python3 -m http.server 8733
# http://127.0.0.1:8733
```

## Estructura

```
index.html
assets/css/style.css
assets/js/main.js
assets/img/            fotos de carrera + logos de sponsors
```

## Identidad

Paleta y tipografías tomadas del sitio oficial del UTU, no inventadas:

| Token | Valor | Uso |
|-------|-------|-----|
| `--amarillo` | `#F7F839` | acento flúo: ticker, CTAs, hovers, números, checks |
| `--verde` | `#3C6151` | verde serrano: sección de la leyenda, acentos sobre fondo claro |
| `--naranja` | `#F29100` | disponible para detalles |
| `--menta` | `#84E4BD` | disponible |
| `--ink` | `#1D1D1B` | negro cálido de marca |
| `--bone` | `#F4F3EE` | fondo claro |

- **Display:** Oswald (la condensada del sitio oficial)
- **Cuerpo:** Poppins

El amarillo se usa siempre sobre fondo oscuro — sobre el hueso no tiene contraste suficiente.
Cuando hace falta un acento sobre fondo claro va el verde, que sí pasa contraste.

Los logotipos (`assets/img/logo1-negro.svg` y `logo-blanco.svg`) son los oficiales. El motivo de
chevrones `>>>` de la banda separadora también sale de la gráfica del evento y está inline como
data-URI en `.chevrons`, así que se le cambia el color editando el `stroke` en el CSS.


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
