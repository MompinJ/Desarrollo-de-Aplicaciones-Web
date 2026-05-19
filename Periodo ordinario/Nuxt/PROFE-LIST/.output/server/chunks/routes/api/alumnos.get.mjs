import { d as defineEventHandler, g as getQuery } from '../../nitro/nitro.mjs';
import { g as getAlumnos } from '../../_/store.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const alumnos_get = defineEventHandler((event) => {
  const grupoId = getQuery(event).grupoId;
  return getAlumnos(grupoId ? parseInt(grupoId) : void 0);
});

export { alumnos_get as default };
//# sourceMappingURL=alumnos.get.mjs.map
