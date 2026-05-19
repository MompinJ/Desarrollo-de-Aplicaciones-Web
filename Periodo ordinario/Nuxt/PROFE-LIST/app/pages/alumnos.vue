<template>
  <div>
    <div class="page-header">
      <h1 class="page-title">Alumnos</h1>
      <button class="btn btn-primary" @click="openModal()">+ Nuevo Alumno</button>
    </div>

    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Matricula</th>
            <th>Grupo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="alumnos.length === 0">
            <td colspan="4" class="empty-state">Sin alumnos</td>
          </tr>
          <tr v-for="a in alumnos" :key="a.id">
            <td>{{ a.nombre }}</td>
            <td style="color:#64748b">{{ a.matricula || '-' }}</td>
            <td>
              <NuxtLink :to="`/grupos/${a.grupoId}`" style="color:#818cf8; text-decoration:none;">
                {{ nombreGrupo(a.grupoId) }}
              </NuxtLink>
            </td>
            <td>
              <div class="actions">
                <button class="btn btn-secondary btn-sm" @click="openModal(a)">Editar</button>
                <button class="btn btn-danger btn-sm" @click="eliminar(a.id)">Eliminar</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="showModal" class="modal-overlay" @click.self="showModal = false">
      <div class="modal">
        <h3>{{ form.id ? 'Editar Alumno' : 'Nuevo Alumno' }}</h3>
        <div class="form-group">
          <label>Nombre</label>
          <input v-model="form.nombre" placeholder="Nombre completo" />
        </div>
        <div class="form-group">
          <label>Matricula</label>
          <input v-model="form.matricula" placeholder="Matricula (opcional)" />
        </div>
        <div class="form-group">
          <label>Grupo</label>
          <select v-model="form.grupoId">
            <option value="">Selecciona un grupo</option>
            <option v-for="g in grupos" :key="g.id" :value="g.id">{{ g.nombre }}</option>
          </select>
        </div>
        <div class="modal-actions">
          <button class="btn btn-secondary" @click="showModal = false">Cancelar</button>
          <button class="btn btn-primary" @click="guardar">Guardar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const [alumnos, grupos] = await Promise.all([
  $fetch('/api/alumnos'),
  $fetch('/api/grupos')
])

const alumnosRef = ref(alumnos)
const gruposRef = ref(grupos)

const showModal = ref(false)
const form = ref({ id: null, nombre: '', matricula: '', grupoId: '' })

function nombreGrupo(id) {
  return gruposRef.value.find(g => g.id === id)?.nombre || 'Sin grupo'
}

function openModal(a = null) {
  form.value = a ? { id: a.id, nombre: a.nombre, matricula: a.matricula, grupoId: a.grupoId } : { id: null, nombre: '', matricula: '', grupoId: '' }
  showModal.value = true
}

async function guardar() {
  if (!form.value.nombre.trim() || !form.value.grupoId) return
  if (form.value.id) {
    await $fetch(`/api/alumnos/${form.value.id}`, {
      method: 'PUT',
      body: { nombre: form.value.nombre, matricula: form.value.matricula, grupoId: parseInt(form.value.grupoId) }
    })
  } else {
    await $fetch('/api/alumnos', {
      method: 'POST',
      body: { grupoId: parseInt(form.value.grupoId), nombre: form.value.nombre, matricula: form.value.matricula }
    })
  }
  alumnosRef.value = await $fetch('/api/alumnos')
  showModal.value = false
}

async function eliminar(id) {
  if (!confirm('Eliminar alumno?')) return
  await $fetch(`/api/alumnos/${id}`, { method: 'DELETE' })
  alumnosRef.value = await $fetch('/api/alumnos')
}
</script>
