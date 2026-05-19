# Supabase Authentication

Sistema de login/signup con Node.js + Supabase. Usa cookies HTTPOnly para mantener sesion.

## Caracteristicas

- Registro con verificacion de correo
- Login / logout
- Pagina privada protegida por cookie de sesion
- Manejo de errores en vistas estaticas

## Configuracion

1. Instalar dependencias

```bash
npm install
```

2. Crear proyecto en Supabase (https://supabase.com). Copiar Project URL y anon key.

3. Crear archivo .env:

```
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_KEY=tu_anon_key
```

4. Levantar servidor

```bash
npm run dev
```

Servidor expuesto en http://localhost:3000.

## Estructura

```
server.js              Express principal
private.html           Dashboard protegido
public/
  index.html           Formularios login y signup
  error.html           Pagina de error
  signup_success.html  Pagina de confirmacion
package.json
.env
```

## Uso

1. Abrir http://localhost:3000
2. Registrarse con email valido
3. Verificar correo
4. Login con credenciales
5. Acceder al dashboard privado

Autor: MompinJ
