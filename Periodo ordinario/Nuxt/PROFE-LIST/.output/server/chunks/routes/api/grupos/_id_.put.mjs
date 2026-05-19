import { d as defineEventHandler, a as getRouterParam, r as readBody, c as createError } from '../../../nitro/nitro.mjs';
import { i as updateGrupo } from '../../../_/store.mjs';
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
  const g = updateGrupo(id, fields);
  if (!g) throw createError({ statusCode: 404, message: "Grupo no encontrado" });
  return g;
});

export { _id__put as default };
//# sourceMappingURL=_id_.put.mjs.map
