import { getAsistencias } from '../utils/store'
export default defineEventHandler((event) => {
  const q = getQuery(event)
  return getAsistencias({
    grupoId: q.grupoId ? parseInt(q.grupoId) : undefined,
    fecha: q.fecha,
    alumnoId: q.alumnoId ? parseInt(q.alumnoId) : undefined
  })
})
