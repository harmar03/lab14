# DiscoStore

API REST para gestionar un catálogo de álbumes musicales. Construida con Node.js, Express, SQLite y Zod.

## Requisitos

- Node.js v22 o superior (usa `node:sqlite` incorporado)

## Instalación

```bash
npm install
```

## Configuración

Copiar el archivo de ejemplo y ajustar si es necesario:

```bash
cp .env.example .env
```

| Variable | Por defecto | Descripción        |
|----------|-------------|--------------------|
| `PORT`   | `3000`      | Puerto del servidor |
| `HOST`   | `localhost` | Host del servidor  |

## Ejecución

```bash
# producción
npm start

# desarrollo (reinicio automático)
npm run dev
```

Al iniciar por primera vez se crea `discostore.db` y se puebla automáticamente con los álbumes de `datos/albumes.json`.

## Endpoints

| Método   | Ruta             | Descripción                        |
|----------|------------------|------------------------------------|
| GET      | `/`              | Información de la API              |
| GET      | `/albumes`       | Lista todos los álbumes            |
| GET      | `/album/:slug`   | Obtiene un álbum por slug          |
| GET      | `/genero/:genero`| Slugs de álbumes de un género      |
| GET      | `/search/:text`  | Búsqueda por texto libre           |
| POST     | `/albumes`       | Crea un nuevo álbum                |
| PUT      | `/album/:slug`   | Actualiza un álbum existente       |
| DELETE   | `/album/:slug`   | Elimina un álbum                   |
| GET      | `/imagenes/*`    | Sirve imágenes estáticas           |

## Códigos de respuesta

| Código | Significado                                   |
|--------|-----------------------------------------------|
| 200    | Lectura o actualización exitosa               |
| 201    | Álbum creado (cabecera `Location` incluida)   |
| 204    | Álbum eliminado (sin cuerpo)                  |
| 400    | Error de validación Zod                       |
| 404    | Álbum no encontrado                           |
| 409    | El slug del álbum ya existe                   |

## Estructura del álbum

```json
{
  "slug":        "thriller",
  "titulo":      "Thriller",
  "artista":     "Michael Jackson",
  "genero":      "Pop",
  "anio":        1982,
  "sello":       "Epic Records",
  "pistas":      9,
  "imagen":      "thriller.avif",
  "resumen":     "El album mas vendido de la historia.",
  "descripcion": "Album de Michael Jackson que redefinio la musica pop de los anos 80."
}
```

> El `slug` se genera automáticamente desde el `titulo` al crear un álbum vía POST.

## Estructura del proyecto

```
lab14/
├── .env.example
├── .gitignore
├── package.json
├── datos/
│   └── albumes.json        ← datos iniciales (8 álbumes)
├── imagenes/               ← archivos de imagen
└── src/
    ├── index.js            ← arranque del servidor
    ├── app.js              ← configuración de Express
    ├── db.js               ← conexión y poblado de SQLite
    ├── esquemas/
    │   └── album.esquema.js
    ├── modelos/
    │   └── album.modelo.js
    ├── controladores/
    │   └── album.controlador.js
    └── rutas/
        └── album.rutas.js
```
