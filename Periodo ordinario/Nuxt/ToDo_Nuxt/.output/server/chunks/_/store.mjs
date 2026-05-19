let tasks = [];
let nextId = 1;
function getTasks() {
  return tasks;
}
function createTask(text) {
  const task = { id: nextId++, text, done: false, favorite: false };
  tasks.push(task);
  return task;
}
function updateTask(id, fields) {
  const task = tasks.find((t) => t.id === id);
  if (!task) return null;
  Object.assign(task, fields);
  return task;
}
function deleteTask(id) {
  const idx = tasks.findIndex((t) => t.id === id);
  if (idx === -1) return false;
  tasks.splice(idx, 1);
  return true;
}

export { createTask as c, deleteTask as d, getTasks as g, updateTask as u };
//# sourceMappingURL=store.mjs.map
