<template>
  <div class="app">
    <header>
      <h1>ToDo Nuxt</h1>
    </header>

    <main>
      <form class="add-form" @submit.prevent="addTask">
        <input v-model="newText" placeholder="Nueva tarea..." />
        <button type="submit">Agregar</button>
      </form>

      <div class="filters">
        <button :class="{ active: filter === 'all' }" @click="filter = 'all'">Todas ({{ tasks.length }})</button>
        <button :class="{ active: filter === 'favorite' }" @click="filter = 'favorite'">Favoritas ({{ tasks.filter(t => t.favorite).length }})</button>
        <button :class="{ active: filter === 'done' }" @click="filter = 'done'">Realizadas ({{ tasks.filter(t => t.done).length }})</button>
      </div>

      <ul class="task-list">
        <li v-if="filteredTasks.length === 0" class="empty">Sin tareas</li>
        <li v-for="task in filteredTasks" :key="task.id" :class="{ done: task.done }">
          <div class="task-content">
            <span v-if="editingId !== task.id" class="task-text" @dblclick="startEdit(task)">{{ task.text }}</span>
            <input
              v-else
              v-model="editText"
              class="edit-input"
              @keyup.enter="saveEdit(task)"
              @keyup.escape="editingId = null"
              @blur="saveEdit(task)"
              autofocus
            />
          </div>
          <div class="task-actions">
            <button class="btn-icon" :class="{ active: task.favorite }" @click="toggle(task, 'favorite')" title="Favorita">★</button>
            <button class="btn-icon" :class="{ active: task.done }" @click="toggle(task, 'done')" title="Realizada">✓</button>
            <button class="btn-icon btn-delete" @click="remove(task.id)" title="Eliminar">✕</button>
          </div>
        </li>
      </ul>
    </main>
  </div>
</template>

<script setup>
const tasks = ref([])
const newText = ref('')
const filter = ref('all')
const editingId = ref(null)
const editText = ref('')

const filteredTasks = computed(() => {
  if (filter.value === 'favorite') return tasks.value.filter(t => t.favorite)
  if (filter.value === 'done') return tasks.value.filter(t => t.done)
  return tasks.value
})

async function fetchTasks() {
  tasks.value = await $fetch('/api/tasks')
}

async function addTask() {
  if (!newText.value.trim()) return
  await $fetch('/api/tasks', { method: 'POST', body: { text: newText.value } })
  newText.value = ''
  await fetchTasks()
}

async function toggle(task, field) {
  await $fetch(`/api/tasks/${task.id}`, {
    method: 'PUT',
    body: { [field]: !task[field] }
  })
  await fetchTasks()
}

async function remove(id) {
  await $fetch(`/api/tasks/${id}`, { method: 'DELETE' })
  await fetchTasks()
}

function startEdit(task) {
  editingId.value = task.id
  editText.value = task.text
}

async function saveEdit(task) {
  if (editText.value.trim() && editText.value !== task.text) {
    await $fetch(`/api/tasks/${task.id}`, {
      method: 'PUT',
      body: { text: editText.value.trim() }
    })
    await fetchTasks()
  }
  editingId.value = null
}

await fetchTasks()
</script>

<style>
* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  font-family: 'Segoe UI', sans-serif;
  background: #0f172a;
  color: #f1f5f9;
  min-height: 100vh;
}

.app {
  max-width: 640px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

header h1 {
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #22d3ee, #818cf8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 2rem;
  text-align: center;
}

.add-form {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.add-form input {
  flex: 1;
  padding: 0.75rem 1rem;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 8px;
  color: #f1f5f9;
  font-size: 1rem;
  outline: none;
}

.add-form input:focus { border-color: #818cf8; }

.add-form button {
  padding: 0.75rem 1.5rem;
  background: #818cf8;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: background 0.2s;
}

.add-form button:hover { background: #6366f1; }

.filters {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.filters button {
  padding: 0.4rem 1rem;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 20px;
  color: #94a3b8;
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.2s;
}

.filters button.active {
  background: #818cf8;
  border-color: #818cf8;
  color: white;
}

.task-list { list-style: none; display: flex; flex-direction: column; gap: 0.5rem; }

.task-list li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.875rem 1rem;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 8px;
  transition: border-color 0.2s;
}

.task-list li:hover { border-color: #475569; }

.task-list li.done .task-text {
  text-decoration: line-through;
  color: #64748b;
}

.task-content { flex: 1; min-width: 0; }

.task-text { cursor: pointer; word-break: break-word; }

.edit-input {
  width: 100%;
  background: #0f172a;
  border: 1px solid #818cf8;
  border-radius: 4px;
  padding: 0.25rem 0.5rem;
  color: #f1f5f9;
  font-size: 1rem;
  outline: none;
}

.task-actions { display: flex; gap: 0.25rem; flex-shrink: 0; }

.btn-icon {
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 6px;
  background: #0f172a;
  color: #475569;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-icon:hover { background: #334155; color: #94a3b8; }
.btn-icon.active { color: #fbbf24; }
.btn-icon.active:first-child { color: #fbbf24; }
.btn-icon.active:nth-child(2) { color: #22d3ee; }
.btn-delete:hover { color: #f87171 !important; }

.empty { text-align: center; color: #475569; padding: 2rem; }
</style>
