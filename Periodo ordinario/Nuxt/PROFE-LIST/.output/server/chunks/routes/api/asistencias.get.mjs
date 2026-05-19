import { d as defineEventHandler, g as getQuery } from '../../nitro/nitro.mjs';
import { a as getAsistencias } from '../../_/store.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const asistencias_get = defineEventHandler((event) => {
  const q = getQuery(event);
  return getAsistencias({
    grupoId: q.grupoId ? parseInt(q.grupoId) : void 0,
    fecha: q.fecha,
    alumnoId: q.alumnoId ? parseInt(q.alumnoId) : void 0
  });
});

export { asistencias_get as default };
//# sourceMappingURL=asistencias.get.mjs.map
