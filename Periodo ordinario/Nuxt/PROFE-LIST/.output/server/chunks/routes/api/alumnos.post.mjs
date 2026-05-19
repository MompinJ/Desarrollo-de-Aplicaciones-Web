import { d as defineEventHandler, r as readBody, c as createError } from '../../nitro/nitro.mjs';
import { c as createAlumno } from '../../_/store.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const alumnos_post = defineEventHandler(async (event) => {
  const { grupoId, nombre, matricula } = await readBody(event);
  if (!grupoId || !(nombre == null ? void 0 : nombre.trim())) throw createError({ statusCode: 400, message: "grupoId y nombre requeridos" });
  return createAlumno(parseInt(grupoId), nombre.trim(), (matricula == null ? void 0 : matricula.trim()) || "");
});

export { alumnos_post as default };
//# sourceMappingURL=alumnos.post.mjs.map
