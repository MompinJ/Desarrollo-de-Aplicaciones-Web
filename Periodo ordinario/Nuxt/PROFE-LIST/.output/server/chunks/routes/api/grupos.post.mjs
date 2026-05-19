import { d as defineEventHandler, r as readBody, c as createError } from '../../nitro/nitro.mjs';
import { f as createGrupo } from '../../_/store.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const grupos_post = defineEventHandler(async (event) => {
  const { nombre, descripcion } = await readBody(event);
  if (!(nombre == null ? void 0 : nombre.trim())) throw createError({ statusCode: 400, message: "Nombre requerido" });
  return createGrupo(nombre.trim(), (descripcion == null ? void 0 : descripcion.trim()) || "");
});

export { grupos_post as default };
//# sourceMappingURL=grupos.post.mjs.map
