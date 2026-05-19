import { d as defineEventHandler } from '../../nitro/nitro.mjs';
import { e as getGrupos } from '../../_/store.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const grupos_get = defineEventHandler(() => getGrupos());

export { grupos_get as default };
//# sourceMappingURL=grupos.get.mjs.map
