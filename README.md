# SolarisTech — landing page estático

Landing page responsive en HTML, CSS y JavaScript puro. No requiere frameworks, instalación ni proceso de compilación.

## Verlo localmente
Abre `index.html` en tu navegador. Para una vista más fiel, también puedes iniciar un servidor local desde esta carpeta:

```bash
python -m http.server 8000
```

Después visita `http://localhost:8000`.

## Antes de publicar
1. Abre `script.js`.
2. Cambia `CONTACT_EMAIL = "tucorreo@ejemplo.com"` por el correo real que recibirá las solicitudes.
3. Revisa textos, datos de contacto y condiciones comerciales para que correspondan a tu proyecto.

**Nota sobre el formulario:** al ser un sitio estático y no tener backend, el formulario prepara un correo mediante `mailto:`. No almacena ni envía datos por sí solo. Para recibir solicitudes sin depender del programa de correo del visitante, conecta más adelante un servicio de formularios o un backend.

## Publicar en GitHub Pages
1. Crea un repositorio nuevo en GitHub, por ejemplo `solaristech`.
2. Sube el contenido de esta carpeta al nivel principal del repositorio. `index.html` debe quedar en la raíz.
3. En GitHub abre **Settings → Pages**.
4. En **Build and deployment**, selecciona **Deploy from a branch**.
5. Elige la rama `main` y la carpeta `/(root)`, luego pulsa **Save**.
6. Espera a que termine el despliegue. GitHub mostrará la URL pública en esa misma sección de Pages.

Si el repositorio se llama `TU-USUARIO.github.io`, la dirección normalmente será `https://TU-USUARIO.github.io/`. Si tiene otro nombre, normalmente será `https://TU-USUARIO.github.io/solaristech/`.

## Estructura
- `index.html` — contenido y secciones.
- `styles.css` — diseño responsive.
- `script.js` — menú móvil, año y formulario de correo.
- `assets/logo.svg` — símbolo de marca y favicon.
