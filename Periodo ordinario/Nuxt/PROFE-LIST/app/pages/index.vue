<template>
  <div>
    <div class="page-header">
      <h1 class="page-title">Dashboard</h1>
    </div>

    <div class="cards-grid">
      <div class="card">
        <div class="card-value">{{ grupos.length }}</div>
        <div class="card-label">Grupos</div>
      </div>
      <div class="card">
        <div class="card-value">{{ alumnos.length }}</div>
        <div class="card-label">Alumnos</div>
      </div>
      <div class="card">
        <div class="card-value">{{ promedioGeneral }}%</div>
        <div class="card-label">Asistencia General</div>
      </div>
    </div>

    <h2 style="font-size:1.1rem; font-weight:700; color:#94a3b8; text-transform:uppercase; letter-spacing:.05em; margin-bottom:1rem;">Asistencia por Grupo</h2>

    <div v-if="estadisticas.length === 0" class="empty-state">
      Sin grupos registrados. <NuxtLink to="/grupos" style="color:#818cf8;">Crea un grupo</NuxtLink>
    </div>

    <div class="table-wrap" v-else>
      <table>
        <thead>
          <tr>
            <th>Grupo</th>
            <th>Alumnos</th>
            <th>Clases</th>
            <th>Asistencia</th>
            <th>Porcentaje</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="g in estadisticas" :key="g.id">
            <td>
              <NuxtLink :to="`/grupos/${g.id}`" style="color:#818cf8; text-decoration:none;">{{ g.nombre }}</NuxtLink>
            </td>
            <td>{{ g.totalAlumnos }}</td>
            <td>{{ g.totalClases }}</td>
            <td>
              <div class="progress-bar">
                <div class="progress-fill" :style="{ width: g.porcentaje + '%' }"></div>
              </div>
            </td>
            <td>
              <span class="badge" :class="g.porcentaje >= 80 ? 'badge-green' : g.porcentaje >= 60 ? 'badge-gray' : 'badge-red'">
                {{ g.porcentaje }}%
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
const [estadisticas, grupos, alumnos] = await Promise.all([
  $fetch('/api/estadisticas'),
  $fetch('/api/grupos'),
  $fetch('/api/alumnos')
])

const promedioGeneral = computed(() => {
  if (!estadisticas.length) return 0
  const conClases = estadisticas.filter(g => g.totalClases > 0)
  if (!conClases.length) return 0
  return Math.round(conClases.reduce((s, g) => s + g.porcentaje, 0) / conClases.length)
})
</script>
