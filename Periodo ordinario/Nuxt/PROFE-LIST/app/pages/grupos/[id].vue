<template>
  <div>
    <div class="page-header">
      <div>
        <NuxtLink to="/grupos" style="color:#64748b; text-decoration:none; font-size:.875rem;">&larr; Grupos</NuxtLink>
        <h1 class="page-title" style="margin-top:.25rem;">{{ grupo?.nombre || 'Grupo' }}</h1>
        <p v-if="grupo?.descripcion" style="color:#64748b; font-size:.875rem; margin-top:.25rem;">{{ grupo.descripcion }}</p>
      </div>
      <button class="btn btn-primary" @click="openModal()">+ Agregar Alumno</button>
    </div>

    <!-- Pasar lista -->
    <div class="card" style="margin-bottom:1.5rem;">
      <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:1rem;">
        <h3 style="font-size:1rem; font-weight:700;">Pasar Lista</h3>
        <div style="display:flex; gap:.5rem; align-items:center;">
          <input type="date" v-model="fecha" style="background:#0f172a; border:1px solid #334155; border-radius:6px; padding:.4rem .75rem; color:#f1f5f9; font-size:.875rem;" />
          <button class="btn btn-primary btn-sm" @click="guardarAsistencia">Guardar Asistencia</button>
        </div>
      </div>

      <div v-if="alumnos.length === 0" class="empty-state">Sin alumnos en este grupo</div>
      <table v-else>
        <thead>
          <tr>
            <th>Alumno</th>
            <th>Matricula</th>
            <th>Presente</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="a in alumnos" :key="a.id">
            <td>{{ a.nombre }}</td>
            <td style="color:#64748b">{{ a.matricula || '-' }}</td>
            <td>
              <label style="display:flex; align-items:center; gap:.5rem; cursor:pointer;">
                <input type="checkbox" v-model="asistenciaHoy[a.id]" style="width:16px; height:16px; accent-color:#818cf8;" />
                <span :class="asistenciaHoy[a.id] ? 'badge badge-green' : 'badge badge-red'">
                  {{ asistenciaHoy[a.id] ? 'Presente' : 'Ausente' }}
                </span>
              </label>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Lista alumnos con historial -->
    <div class="page-header" style="margin-bottom:1rem;">
      <h2 style="font-size:1.1rem; font-weight:700;">Alumnos ({{ alumnos.length }})</h2>
    </div>

    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Matricula</th>
            <th>Asistencias</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="alumnos.length === 0">
            <td colspan="4" class="empty-state">Sin alumnos</td>
          </tr>
          <tr v-for="a in alumnosConStats" :key="a.id">
            <td>{{ a.nombre }}</td>
            <td style="color:#64748b">{{ a.matricula || '-' }}</td>
            <td>
              <span class="badge" :class="a.porcentaje >= 80 ? 'badge-green' : a.porcentaje >= 60 ? 'badge-gray' : 'badge-red'">
                {{ a.asistencias }}/{{ a.total }} ({{ a.porcentaje }}%)
              </span>
            </td>
            <td>
              <div class="actions">
                <button class="btn btn-secondary btn-sm" @click="openModal(a)">Editar</button>
                <button class="btn btn-danger btn-sm" @click="eliminarAlumno(a.id)">Eliminar</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal alumno -->
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
        <div class="modal-actions">
          <button class="btn btn-secondary" @click="showModal = false">Cancelar</button>
          <button class="btn btn-primary" @click="guardarAlumno">Guardar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const grupoId = parseInt(route.params.id)

const [gruposAll, alumnosAll, todasAsistencias] = await Promise.all([
  $fetch('/api/grupos'),
  $fetch(`/api/alumnos?grupoId=${grupoId}`),
  $fetch(`/api/asistencias?grupoId=${grupoId}`)
])

const grupo = ref(gruposAll.find(g => g.id === grupoId))
const alumnos = ref(alumnosAll)
const historialAsistencias = ref(todasAsistencias)

const today = new Date().toISOString().split('T')[0]
const fecha = ref(today)

const asistenciaHoy = reactive({})

watch(fecha, cargarAsistenciaFecha, { immediate: true })

async function cargarAsistenciaFecha() {
  const data = await $fetch(`/api/asistencias?grupoId=${grupoId}&fecha=${fecha.value}`)
  alumnos.value.forEach(a => { asistenciaHoy[a.id] = false })
  data.forEach(r => { asistenciaHoy[r.alumnoId] = r.presente })
}

async function guardarAsistencia() {
  await Promise.all(
    alumnos.value.map(a =>
      $fetch('/api/asistencias', {
        method: 'POST',
        body: { alumnoId: a.id, fecha: fecha.value, presente: !!asistenciaHoy[a.id] }
      })
    )
  )
  historialAsistencias.value = await $fetch(`/api/asistencias?grupoId=${grupoId}`)
}

const alumnosConStats = computed(() => {
  const fechas = [...new Set(historialAsistencias.value.map(a => a.fecha))]
  return alumnos.value.map(a => {
    const registros = historialAsistencias.value.filter(r => r.alumnoId === a.id)
    const asistencias = registros.filter(r => r.presente).length
    const total = fechas.length
    const porcentaje = total > 0 ? Math.round((asistencias / total) * 100) : 0
    return { ...a, asistencias, total, porcentaje }
  })
})

const showModal = ref(false)
const form = ref({ id: null, nombre: '', matricula: '' })

function openModal(a = null) {
  form.value = a ? { id: a.id, nombre: a.nombre, matricula: a.matricula } : { id: null, nombre: '', matricula: '' }
  showModal.value = true
}

async function guardarAlumno() {
  if (!form.value.nombre.trim()) return
  if (form.value.id) {
    await $fetch(`/api/alumnos/${form.value.id}`, { method: 'PUT', body: { nombre: form.value.nombre, matricula: form.value.matricula } })
  } else {
    await $fetch('/api/alumnos', { method: 'POST', body: { grupoId, nombre: form.value.nombre, matricula: form.value.matricula } })
  }
  alumnos.value = await $fetch(`/api/alumnos?grupoId=${grupoId}`)
  await cargarAsistenciaFecha()
  showModal.value = false
}

async function eliminarAlumno(id) {
  if (!confirm('Eliminar alumno?')) return
  await $fetch(`/api/alumnos/${id}`, { method: 'DELETE' })
  alumnos.value = await $fetch(`/api/alumnos?grupoId=${grupoId}`)
  historialAsistencias.value = await $fetch(`/api/asistencias?grupoId=${grupoId}`)
  await cargarAsistenciaFecha()
}
</script>
