import { d as defineEventHandler } from '../../nitro/nitro.mjs';
import { g as getTasks } from '../../_/store.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const tasks_get = defineEventHandler(() => {
  return getTasks();
});

export { tasks_get as default };
//# sourceMappingURL=tasks.get.mjs.map
