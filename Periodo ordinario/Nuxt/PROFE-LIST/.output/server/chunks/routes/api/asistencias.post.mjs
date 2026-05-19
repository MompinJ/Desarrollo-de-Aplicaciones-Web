import { d as defineEventHandler, r as readBody, c as createError } from '../../nitro/nitro.mjs';
import { r as registrarAsistencia } from '../../_/store.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const asistencias_post = defineEventHandler(async (event) => {
  const { alumnoId, fecha, presente } = await readBody(event);
  if (!alumnoId || !fecha) throw createError({ statusCode: 400, message: "alumnoId y fecha requeridos" });
  return registrarAsistencia(parseInt(alumnoId), fecha, !!presente);
});

export { asistencias_post as default };
//# sourceMappingURL=asistencias.post.mjs.map
