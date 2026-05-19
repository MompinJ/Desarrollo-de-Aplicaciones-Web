<template>
  <div class="layout">
    <nav class="sidebar">
      <div class="sidebar-brand">
        <h2>Asistencias</h2>
      </div>
      <ul class="nav-links">
        <li><NuxtLink to="/">Dashboard</NuxtLink></li>
        <li><NuxtLink to="/grupos">Grupos</NuxtLink></li>
        <li><NuxtLink to="/alumnos">Alumnos</NuxtLink></li>
      </ul>
      <div class="sidebar-section">
        <span class="sidebar-section-title">Pasar Lista</span>
        <ul class="nav-links">
          <li v-if="grupos.length === 0">
            <span style="padding:.5rem 1.5rem; color:#475569; font-size:.85rem; display:block;">Sin grupos</span>
          </li>
          <li v-for="g in grupos" :key="g.id">
            <NuxtLink :to="`/grupos/${g.id}`">{{ g.nombre }}</NuxtLink>
          </li>
        </ul>
      </div>
    </nav>
    <main class="content">
      <NuxtPage />
    </main>
  </div>
</template>

<script setup>
const grupos = ref([])

async function cargarGrupos() {
  grupos.value = await $fetch('/api/grupos')
}

onMounted(cargarGrupos)

const route = useRoute()
watch(() => route.path, cargarGrupos)
</script>

<style>
* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  font-family: 'Segoe UI', sans-serif;
  background: #0f172a;
  color: #f1f5f9;
  min-height: 100vh;
}

.layout {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 220px;
  background: #1e293b;
  border-right: 1px solid #334155;
  padding: 1.5rem 0;
  flex-shrink: 0;
}

.sidebar-brand {
  padding: 0 1.5rem 1.5rem;
  border-bottom: 1px solid #334155;
}

.sidebar-brand h2 {
  font-size: 1.25rem;
  font-weight: 700;
  background: linear-gradient(135deg, #22d3ee, #818cf8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.sidebar-section {
  margin-top: 1rem;
  border-top: 1px solid #334155;
  padding-top: 0.75rem;
}

.sidebar-section-title {
  display: block;
  padding: 0 1.5rem 0.4rem;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #475569;
}

.nav-links {
  list-style: none;
  padding: 1rem 0;
}

.nav-links li a {
  display: block;
  padding: 0.625rem 1.5rem;
  color: #94a3b8;
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.2s;
  border-left: 3px solid transparent;
}

.nav-links li a:hover {
  color: #f1f5f9;
  background: #0f172a;
}

.nav-links li a.router-link-active {
  color: #818cf8;
  border-left-color: #818cf8;
  background: rgba(129, 140, 248, 0.08);
}

.content {
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
}

/* Shared components */
.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
}

.page-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #f1f5f9;
}

.btn {
  padding: 0.5rem 1.25rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 600;
  transition: all 0.2s;
}

.btn-primary { background: #818cf8; color: white; }
.btn-primary:hover { background: #6366f1; }
.btn-secondary { background: #334155; color: #f1f5f9; }
.btn-secondary:hover { background: #475569; }
.btn-danger { background: #ef4444; color: white; }
.btn-danger:hover { background: #dc2626; }
.btn-sm { padding: 0.35rem 0.75rem; font-size: 0.8rem; }

.table-wrap {
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 12px;
  overflow: hidden;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead tr { border-bottom: 1px solid #334155; }

th {
  padding: 0.875rem 1rem;
  text-align: left;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #64748b;
}

td {
  padding: 0.875rem 1rem;
  font-size: 0.9rem;
  border-bottom: 1px solid #1e293b;
}

tbody tr { border-bottom: 1px solid #334155; }
tbody tr:last-child { border-bottom: none; }
tbody tr:hover { background: rgba(255,255,255,0.02); }

.actions { display: flex; gap: 0.5rem; }

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.modal {
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 12px;
  padding: 2rem;
  width: 400px;
  max-width: 95vw;
}

.modal h3 {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  font-size: 0.8rem;
  font-weight: 600;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.4rem;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 0.625rem 0.875rem;
  background: #0f172a;
  border: 1px solid #334155;
  border-radius: 8px;
  color: #f1f5f9;
  font-size: 0.9rem;
  outline: none;
  transition: border-color 0.2s;
}

.form-group input:focus,
.form-group select:focus { border-color: #818cf8; }

.form-group select option { background: #1e293b; }

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 1.5rem;
}

/* Cards */
.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.card {
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 12px;
  padding: 1.25rem;
}

.card-value {
  font-size: 2.5rem;
  font-weight: 800;
  color: #818cf8;
  line-height: 1;
  margin-bottom: 0.5rem;
}

.card-label {
  font-size: 0.875rem;
  color: #64748b;
}

/* Progress bar */
.progress-bar {
  height: 8px;
  background: #334155;
  border-radius: 4px;
  overflow: hidden;
  margin-top: 0.5rem;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #22d3ee, #818cf8);
  border-radius: 4px;
  transition: width 0.4s ease;
}

.empty-state {
  text-align: center;
  padding: 3rem;
  color: #475569;
}

.badge {
  display: inline-block;
  padding: 0.2rem 0.6rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
}

.badge-green { background: rgba(34,197,94,0.15); color: #4ade80; }
.badge-red { background: rgba(239,68,68,0.15); color: #f87171; }
.badge-gray { background: rgba(100,116,139,0.15); color: #94a3b8; }
</style>
