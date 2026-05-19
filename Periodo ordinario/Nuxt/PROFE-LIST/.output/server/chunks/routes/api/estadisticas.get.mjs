import { d as defineEventHandler } from '../../nitro/nitro.mjs';
import { b as getEstadisticasPorGrupo } from '../../_/store.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const estadisticas_get = defineEventHandler(() => getEstadisticasPorGrupo());

export { estadisticas_get as default };
//# sourceMappingURL=estadisticas.get.mjs.map
