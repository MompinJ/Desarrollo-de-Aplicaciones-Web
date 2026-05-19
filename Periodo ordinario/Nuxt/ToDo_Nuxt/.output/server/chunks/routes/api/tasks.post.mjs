import { d as defineEventHandler, r as readBody, c as createError } from '../../nitro/nitro.mjs';
import { c as createTask } from '../../_/store.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const tasks_post = defineEventHandler(async (event) => {
  const { text } = await readBody(event);
  if (!(text == null ? void 0 : text.trim())) {
    throw createError({ statusCode: 400, message: "Text required" });
  }
  return createTask(text.trim());
});

export { tasks_post as default };
//# sourceMappingURL=tasks.post.mjs.map
