CREATE TABLE IF NOT EXISTS albumes (
  slug        TEXT PRIMARY KEY,
  titulo      TEXT NOT NULL,
  artista     TEXT NOT NULL,
  genero      TEXT NOT NULL,
  anio        INTEGER NOT NULL,
  sello       TEXT NOT NULL,
  pistas      INTEGER NOT NULL,
  imagen      TEXT,
  resumen     TEXT,
  descripcion TEXT
)
