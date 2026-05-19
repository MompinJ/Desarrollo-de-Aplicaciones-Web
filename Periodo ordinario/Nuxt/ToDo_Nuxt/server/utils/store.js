let tasks = []
let nextId = 1

export function getTasks() {
  return tasks
}

export function createTask(text) {
  const task = { id: nextId++, text, done: false, favorite: false }
  tasks.push(task)
  return task
}

export function updateTask(id, fields) {
  const task = tasks.find(t => t.id === id)
  if (!task) return null
  Object.assign(task, fields)
  return task
}

export function deleteTask(id) {
  const idx = tasks.findIndex(t => t.id === id)
  if (idx === -1) return false
  tasks.splice(idx, 1)
  return true
}
