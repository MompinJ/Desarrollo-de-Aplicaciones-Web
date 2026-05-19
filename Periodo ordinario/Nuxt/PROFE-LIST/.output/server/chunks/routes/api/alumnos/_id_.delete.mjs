import { d as defineEventHandler, a as getRouterParam, c as createError } from '../../../nitro/nitro.mjs';
import { d as deleteAlumno } from '../../../_/store.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const _id__delete = defineEventHandler((event) => {
  const id = parseInt(getRouterParam(event, "id"));
  if (!deleteAlumno(id)) throw createError({ statusCode: 404, message: "Alumno no encontrado" });
  return { success: true };
});

export { _id__delete as default };
//# sourceMappingURL=_id_.delete.mjs.map
