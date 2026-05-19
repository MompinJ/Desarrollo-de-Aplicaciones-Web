<template>
  <div>
    <div class="page-header">
      <h1 class="page-title">Grupos</h1>
      <button class="btn btn-primary" @click="openModal()">+ Nuevo Grupo</button>
    </div>

    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripcion</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="grupos.length === 0">
            <td colspan="3" class="empty-state">Sin grupos</td>
          </tr>
          <tr v-for="g in grupos" :key="g.id">
            <td>
              <NuxtLink :to="`/grupos/${g.id}`" style="color:#818cf8; text-decoration:none;">{{ g.nombre }}</NuxtLink>
            </td>
            <td style="color:#64748b">{{ g.descripcion || '-' }}</td>
            <td>
              <div class="actions">
                <button class="btn btn-secondary btn-sm" @click="openModal(g)">Editar</button>
                <button class="btn btn-danger btn-sm" @click="eliminar(g.id)">Eliminar</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="showModal" class="modal-overlay" @click.self="showModal = false">
      <div class="modal">
        <h3>{{ form.id ? 'Editar Grupo' : 'Nuevo Grupo' }}</h3>
        <div class="form-group">
          <label>Nombre</label>
          <input v-model="form.nombre" placeholder="Ej. Grupo A" />
        </div>
        <div class="form-group">
          <label>Descripcion</label>
          <input v-model="form.descripcion" placeholder="Descripcion opcional" />
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
const grupos = ref(await $fetch('/api/grupos'))
const showModal = ref(false)
const form = ref({ id: null, nombre: '', descripcion: '' })

function openModal(g = null) {
  form.value = g ? { id: g.id, nombre: g.nombre, descripcion: g.descripcion } : { id: null, nombre: '', descripcion: '' }
  showModal.value = true
}

async function guardar() {
  if (!form.value.nombre.trim()) return
  if (form.value.id) {
    await $fetch(`/api/grupos/${form.value.id}`, { method: 'PUT', body: { nombre: form.value.nombre, descripcion: form.value.descripcion } })
  } else {
    await $fetch('/api/grupos', { method: 'POST', body: { nombre: form.value.nombre, descripcion: form.value.descripcion } })
  }
  grupos.value = await $fetch('/api/grupos')
  showModal.value = false
}

async function eliminar(id) {
  if (!confirm('Eliminar grupo y todos sus alumnos?')) return
  await $fetch(`/api/grupos/${id}`, { method: 'DELETE' })
  grupos.value = await $fetch('/api/grupos')
}
</script>
