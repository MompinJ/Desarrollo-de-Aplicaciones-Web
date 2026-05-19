let grupos = []
let alumnos = []
let asistencias = []
let nextGrupoId = 1
let nextAlumnoId = 1
let nextAsistenciaId = 1

// Grupos
export function getGrupos() { return grupos }
export function getGrupoById(id) { return grupos.find(g => g.id === id) }
export function createGrupo(nombre, descripcion = '') {
  const grupo = { id: nextGrupoId++, nombre, descripcion }
  grupos.push(grupo)
  return grupo
}
export function updateGrupo(id, fields) {
  const g = grupos.find(g => g.id === id)
  if (!g) return null
  Object.assign(g, fields)
  return g
}
export function deleteGrupo(id) {
  const idx = grupos.findIndex(g => g.id === id)
  if (idx === -1) return false
  grupos.splice(idx, 1)
  alumnos = alumnos.filter(a => a.grupoId !== id)
  return true
}

// Alumnos
export function getAlumnos(grupoId) {
  if (grupoId) return alumnos.filter(a => a.grupoId === grupoId)
  return alumnos
}
export function getAlumnoById(id) { return alumnos.find(a => a.id === id) }
export function createAlumno(grupoId, nombre, matricula = '') {
  const alumno = { id: nextAlumnoId++, grupoId, nombre, matricula }
  alumnos.push(alumno)
  return alumno
}
export function updateAlumno(id, fields) {
  const a = alumnos.find(a => a.id === id)
  if (!a) return null
  Object.assign(a, fields)
  return a
}
export function deleteAlumno(id) {
  const idx = alumnos.findIndex(a => a.id === id)
  if (idx === -1) return false
  alumnos.splice(idx, 1)
  asistencias = asistencias.filter(a => a.alumnoId !== id)
  return true
}

// Asistencias
export function getAsistencias({ grupoId, fecha, alumnoId } = {}) {
  let result = asistencias
  if (alumnoId) result = result.filter(a => a.alumnoId === alumnoId)
  if (fecha) result = result.filter(a => a.fecha === fecha)
  if (grupoId) {
    const ids = alumnos.filter(a => a.grupoId === grupoId).map(a => a.id)
    result = result.filter(a => ids.includes(a.alumnoId))
  }
  return result
}

export function registrarAsistencia(alumnoId, fecha, presente) {
  const existing = asistencias.find(a => a.alumnoId === alumnoId && a.fecha === fecha)
  if (existing) {
    existing.presente = presente
    return existing
  }
  const reg = { id: nextAsistenciaId++, alumnoId, fecha, presente }
  asistencias.push(reg)
  return reg
}

export function getEstadisticasPorGrupo() {
  return grupos.map(g => {
    const alumnosGrupo = alumnos.filter(a => a.grupoId === g.id)
    const totalAlumnos = alumnosGrupo.length
    if (totalAlumnos === 0) return { ...g, totalAlumnos: 0, porcentaje: 0, totalClases: 0 }

    const alumnoIds = alumnosGrupo.map(a => a.id)
    const asistenciasGrupo = asistencias.filter(a => alumnoIds.includes(a.alumnoId))
    const fechas = [...new Set(asistenciasGrupo.map(a => a.fecha))]
    const totalClases = fechas.length
    if (totalClases === 0) return { ...g, totalAlumnos, porcentaje: 0, totalClases: 0 }

    const totalPresentes = asistenciasGrupo.filter(a => a.presente).length
    const totalPosibles = totalAlumnos * totalClases
    const porcentaje = Math.round((totalPresentes / totalPosibles) * 100)

    return { ...g, totalAlumnos, totalClases, porcentaje }
  })
}
