import { d as defineEventHandler, a as getRouterParam, r as readBody, c as createError } from '../../../nitro/nitro.mjs';
import { u as updateAlumno } from '../../../_/store.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const _id__put = defineEventHandler(async (event) => {
  const id = parseInt(getRouterParam(event, "id"));
  const fields = await readBody(event);
  const a = updateAlumno(id, fields);
  if (!a) throw createError({ statusCode: 404, message: "Alumno no encontrado" });
  return a;
});

export { _id__put as default };
//# sourceMappingURL=_id_.put.mjs.map
